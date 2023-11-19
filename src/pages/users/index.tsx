/*
 * @Date         : 2023-11-17 10:51:37
 * @LastEditTime : 2023-11-17 19:11:43
 * @Description  : file content
 * @FilePath     : \headscale-manager\src\pages\users\index.tsx
 */

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
import { AccountBrowserIcon } from "@fluentui/react-icons-mdl2";
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

const UsersPage = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "get_users",
    (key, ...args) => services.user.getUsersList(...args),
    { refreshInterval: 30000, shouldRetryOnError: false }
  );

  const [select, setSelect] = useState<USER.v1User>();
  const onSelectionChanged = () => {
    setSelect(selection.current.getSelection()[0] as USER.v1User);
  };

  const _getKey = (item: USER.v1User) => {
    return item.id;
  };
  const selection = useRef<Selection>(
    new Selection({
      onSelectionChanged: onSelectionChanged,
    })
  );

  const _items: ICommandBarItemProps[] = [
    {
      key: "RefreshItem",
      text: "Refresh",
      iconProps: { iconName: "Refresh" },
      onClick: ()=>reflashData(mutate),
    },
    {
      key: "newItem",
      text: "New",
      iconProps: { iconName: "Add" },
      onClick(ev, item) {
        let selectValue: { name: string } = { name: null };
        const onOk = async () => {
          console.log(selectValue);

          if (selectValue.name) {
            const user = await services.user.addUser(selectValue.name);

            if (user) {
              mutate();
            } else {
              throw new Error("NetWork Error!");
            }
          } else {
            throw new Error("Please Input User Name!");
          }
        };
        window.showDialog({
          dialogContentProps: {
            type: DialogType.largeHeader,
            title: "Add New User",
          },
          onOk,

          children: <AddUser user={selectValue} />,
        } as IGobalDialogProps);
      },
    },

    {
      key: "Rename",
      text: "Rename",
      iconProps: { iconName: "Rename" },
      disabled: !select,
      onClick(ev, item) {
        let selectValue: { name: string } = { name: select.name };
        let copy_name = select.name;
        const onOk = async () => {
          console.log(selectValue);

          if (selectValue.name && selectValue.name !== copy_name) {
            const user = await services.user.renameUser(
              copy_name,
              selectValue.name
            );

            if (user) {
              mutate();
            } else {
              throw new Error("NetWork Error!");
            }
          } else {
            throw new Error("Please Input User Name!");
          }
        };
        window.showDialog({
          dialogContentProps: {
            type: DialogType.largeHeader,
            title: "Add New User",
          },
          onOk,

          children: <AddUser user={selectValue} />,
        } as IGobalDialogProps);
      },
    },
    {
      key: "DeleteItem",
      text: "Delete",
      iconProps: { iconName: "Delete", color: "red" },
      disabled: !select,
      onClick() {
        const onOk = async () => {
          const res = await services.user.deleteUser(select.name);

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
              Do you want to delete this user?
            </div>
          ),
        } as IGobalDialogProps);
      },
    },
  ];

  const columns: IColumn[] = [
    {
      key: "icon",
      name: "Icon",
      //   className: classNames.fileIconCell,
      //   iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: "Column operations for File type, Press to sort on File type",
      iconName: "Page",
      isIconOnly: true,
      fieldName: "name",
      minWidth: 16,
      maxWidth: 16,
      //   onColumnClick: _onColumnClick,
      onRender: () => <AccountBrowserIcon />,
    },

    {
      key: "name",
      name: "Name",
      fieldName: "name",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      onRender: (item: USER.v1User) => {
        return <span>{item.name}</span>;
      },
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
      onRender: (item: USER.v1User) => {
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
          key={"usersList"}
            items={data}
            compact={false}
            columns={columns}
            selection={selection.current}
            // selectionMode={SelectionMode.single}
            // getKey={_getKey}
            setKey="id"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selectionPreservedOnEmptyClick={true}
            enterModalSelectionOnTouch={true}
            // isSelectedOnFocus
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

export default UsersPage;
