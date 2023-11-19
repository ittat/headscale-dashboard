import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

import {
  Nav,
  INavLink,
  INavStyles,
  INavLinkGroup,
} from "@fluentui/react/lib/Nav";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogProps,
  ILabelStyles,
  IStyleSet,
  Label,
  Pivot,
  PivotItem,
  PrimaryButton,
  Spinner,
  ThemeProvider,
} from "@fluentui/react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { InfoIcon, LeaveIcon } from "@fluentui/react-icons-mdl2";

import LOGO from "../../assets/logo.svg";
import appStore from "@/stores/app.store";
import Info from "./Info";

export type IGobalDialogProps = PropsWithChildren<
  IDialogProps & {
    hideOk?: boolean;
    hideCancel?: boolean;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
  }
>;

const Layout: React.FC<PropsWithChildren<{}>> = (props) => {
  const nav = useNavigate();
  const location = useLocation();

  const [showGlobalSpinner, setGlobalSpinner] = useState(false);

  const [dialog, setDisalog] = useState<IGobalDialogProps>();

  useEffect(() => {
    window.showGlobalSpinner = () => setGlobalSpinner(true);
    window.hideGlobalSpinner = () => setGlobalSpinner(false);

    window.showDialog = (props: IGobalDialogProps) => setDisalog(props);
    window.hideDialog = () => setDisalog(undefined);
  }, []);

  const onCilck = (item: PivotItem) => {
    console.log(item.props.itemKey);

    switch (item.props.itemKey) {
      case "Status":
        nav("/");
        break;
      case "Users":
        nav("/users");
        break;
      case "Nodes":
        nav("/nodes");
        break;
      case "Routes":
        nav("/routes");
        break;
      case "ApiKey":
        nav("/apikeys");
        break;

      default:
        break;
    }
  };

  const defaultSelectedKey = useMemo(
    () =>
      location.pathname == "/"
        ? "Status"
        : location.pathname == "/nodes"
        ? "Nodes"
        : location.pathname == "/routes"
        ? "Routes"
        : "Users",
    [location]
  );

  return (
    <div id="" className="flex flex-col w-full h-screen">
      <div className="flex gap-3 items-center p-3">
        <img src={LOGO} width={80} />
        <span className="font-[100] text-[25px]">Headscale Dashboard</span>
      </div>
      <div className="flex justify-between items-center">
        <Pivot
          aria-label="Basic Pivot Example"
          onLinkClick={onCilck}
          defaultSelectedKey={defaultSelectedKey}
          className="pl-5"
        >
          <PivotItem headerText="Nodes" itemKey={"Nodes"}></PivotItem>
          {/* <PivotItem itemKey={"Activity"} headerText="Activity"></PivotItem> */}
          <PivotItem headerText="Users" itemKey={"Users"}></PivotItem>

          <PivotItem headerText="Routes" itemKey={"Routes"}></PivotItem>

          {/* <PivotItem headerText="Auth Key" itemKey={"AuthKey"} /> */}
          <PivotItem headerText="Admin Key" itemKey={"ApiKey"} />
          {/* <PivotItem
                        headerText="Device"
                        itemKey={'Device'}
                        hidden
                    >
                    </PivotItem> */}
        </Pivot>

        <div>
          <InfoIcon
            onClick={() => {
              window.showDialog({
                dialogContentProps: {
                  type: DialogType.largeHeader,
                  title: "Info.",
                },
                hideOk:true,
                cancelText:'Close',
                children: <Info/>,
              } as IGobalDialogProps);
            }}
            style={{ fontSize: "18px" }}
            className={"text-center  pr-10  cursor-pointer hover:text-blue-500 "}
          />
          <LeaveIcon
            onClick={() => {
              window.showDialog({
                dialogContentProps: {
                  type: DialogType.largeHeader,
                  title: "Comfirm",
                },
                onOk() {
                  appStore.logout();
                  nav("/login");
                },
                okText: "Comfirm",
                cancelText: "Cancel",
                children: <div className="py-5">Do you comfirm to logout?</div>,
              } as IGobalDialogProps);
            }}
            style={{ fontSize: "18px" }}
            className={"text-center  pr-10  cursor-pointer hover:text-red-500 "}
          />
        </div>
      </div>

      <div className="pl-4 pt-2 flex-grow  ">
        <Outlet />
      </div>

      {/* dialog */}
      {dialog && (
        <Dialog
          hidden={!dialog}
          onDismiss={() => setDisalog(undefined)}
          dialogContentProps={dialog?.dialogContentProps}
          modalProps={dialog?.modalProps}
        >
          {dialog?.children}

          {dialog.hideOk && dialog.hidden ? null : (
            <DialogFooter>
              {dialog?.hideOk ? null : (
                <PrimaryButton
                  onClick={async () => {
                    try {
                      setGlobalSpinner(true);
                      await dialog?.onOk?.();
                      setDisalog(undefined);
                    } catch (e) {
                      console.log(e);
                    } finally {
                      setGlobalSpinner(false);
                    }
                  }}
                  text={dialog?.okText ?? "OK"}
                />
              )}

              {dialog?.hideCancel ? null : (
                <DefaultButton
                  onClick={() => setDisalog(undefined)}
                  text={dialog?.cancelText ?? "Cancel"}
                />
              )}
            </DialogFooter>
          )}
        </Dialog>
      )}

      {/* loading  */}
      {showGlobalSpinner && (
        <div className="absolute h-full w-full top-[50%] left-[50%] bg-black/10 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center h-full">
          <Spinner
            label="loading..."
            ariaLive="assertive"
            labelPosition="bottom"
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
