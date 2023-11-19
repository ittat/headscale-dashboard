
import {
  Button,
  CommandBarButton,
  CommandBar as _CommandBar,
  DetailsList as _DetailsList,
  DetailsListLayoutMode,
  FocusTrapZone,
  IColumn,
  ICommandBarItemProps,
  Label,
  mergeStyleSets,
  SelectionMode,
  setVirtualParent,
  Spinner,
  TooltipHost,
  DialogType,
  Selection,
  MarqueeSelection,
} from "@fluentui/react";
import { AccountBrowserIcon, AutomateFlowIcon } from "@fluentui/react-icons-mdl2";
import { Menu } from "@headlessui/react";
import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import services from "../../services";
import { Node } from "../../types/node";
import { USER } from "../../types/user";
import AddUser from "./AddUser";
import { IGobalDialogProps } from "../../components/Layout";
import { reflashData, useForceUpdate } from "../../utils";
import Table from "@/components/Table";
import { Link } from "react-router-dom";
import StatusDot from "@/components/StatusDot";
import { Routes } from "@/types/routes";

const DetailsList = styled(_DetailsList)`
  .ms-DetailsHeader {
    padding: 0;
  }
`;

const CommandBar = styled(_CommandBar)`
  .ms-CommandBar {
    padding-left: 15px;
    height: 35px;
  }
  .ms-Icon {
    font-size: 12px;
  }

  .ms-Button-textContainer {
    font-size: 12px;
  }
`;
const OnlineStatus = (item: Node.v1Node) => {
  return item.online ? (
    <span className="flex gap-1 items-center">
      {" "}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      Online
    </span>
  ) : (
    <span className="flex gap-1 items-center">
      {" "}
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
      </span>
      Offline
    </span>
  );
};
const RoutesPage = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "get_users",
    (key, ...args) => services.routes.getRoutes(...args),
    { refreshInterval: 30000, shouldRetryOnError: false }
  );

  const [select, setSelect] = useState<Routes.v1Route>();
  const onSelectionChanged = () => {
    setSelect(selection.current.getSelection()[0] as Routes.v1Route);
  };

  const selection = useRef<Selection>(
    new Selection({
      onSelectionChanged: onSelectionChanged,
    })
  );

  const _getKey = (item: Node.v1Node) => {
    return item.id;
  };

  const _items: ICommandBarItemProps[] = [
    {
      key: "RefreshItem",
      text: "Refresh",
      iconProps: { iconName: "Refresh" },
      onClick: () => reflashData(mutate),
    },
  ];

  if (select) {
    if (select.enabled) {
      _items.push({
        key: "Disable",
        text: "Disable",
        iconProps: { iconName: "CirclePause" },
        onClick() {
          window.showGlobalSpinner();
          services.routes
            .disableRouter(select.id)
            .catch((e) => {})
            .finally(() => window.hideGlobalSpinner());
        },
      });
    } else {
      _items.push({
        key: "Enable",
        text: "Enable",
        iconProps: { iconName: "FastForward" },
        onClick() {
          window.showGlobalSpinner();
          services.routes
            .enableRouter(select.id)
            .catch((e) => {})
            .finally(() => window.hideGlobalSpinner());
        },
      });
    }

    _items.push({
      key: "Delete",
      text: "Delete",
      iconProps: { iconName: "Delete" },
      onClick() {
        const onOk = async () => {
          const res = await services.routes.deleteRoute(select.id);

          if (res) {
            mutate();
          } else {
            throw new Error("NetWork Error!");
          }
        };
        window.showDialog({
          dialogContentProps: {
            type: DialogType.normal,
            title: "Danger Action",
            subText: "",
          },
          onOk,

          children: (
            <div className="font-bold py-5 pl-2">
              Do you want to delete this route?
            </div>
          ),
        } as IGobalDialogProps);
      },
    });
  }

  const columns: IColumn[] = [
    {
      key: "icon",
      name: "Icon",
      //   className: classNames.fileIconCell,
      //   iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: "Column operations for File type, Press to sort on File type",
      iconName: "Page",
      isIconOnly: true,
      fieldName: "",
      minWidth: 16,
      maxWidth: 16,
      //   onColumnClick: _onColumnClick,
      onRender: () => <AutomateFlowIcon />,
    },

    {
      key: "prefix",
      name: "Prefix",
      fieldName: "prefix",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      onRender: (item: Routes.v1Route) => {
        return <span>{item.prefix}</span>;
      },
      isPadded: true,
    },
    {
      key: "enabled",
      name: "Status",
      fieldName: "enabled",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      onRender: (item: Routes.v1Route) => (
        <StatusDot
          stutus={item.enabled}
          activeClass="bg-green-400"
          activeLabel="Enable"
          inactiveLabel="Disable"
        />
      ),
      isPadded: true,
    },
    {
      key: "createdAt",
      name: "Created At",
      fieldName: "createdAt",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      onRender: (item: Routes.v1Route) => {
        return <span>{item.createdAt}</span>;
      },
      isPadded: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner
          label="loading..."
          ariaLive="assertive"
          labelPosition="bottom"
        />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className="flex justify-center items-center h-full">{error}</div>
    );
  }

  if (data) {
    return (
      <div className=" w-full h-full">
        <CommandBar
          items={_items}
          overflowButtonProps={{ ariaLabel: "More commands" }}
        />

        <MarqueeSelection selection={selection.current}>
          <Table
            key={"routeslist"}
            items={data}
            compact={false}
            columns={columns}
            selectionMode={SelectionMode.single}
            selection={selection.current}
            setKey="id"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            // onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">Free Me Now!</div>
  );
};

export default RoutesPage;
