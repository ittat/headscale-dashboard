/*
 * @Date         : 2023-11-17 10:51:37
 * @LastEditTime : 2023-11-17 18:58:18
 * @Description  : file content
 * @FilePath     : \headscale-manager\src\pages\nodes\index.tsx
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
  Selection,
  SelectionMode,
  setVirtualParent,
  Spinner,
  TooltipHost,
  MarqueeSelection,
  DayOfWeek,
  DatePicker,
  defaultDatePickerStrings,
  DialogType,
} from "@fluentui/react";
import { Menu } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import services from "../../services";
import { Node } from "../../types/node";
import { ApiKey, AuthKey } from "../../types/key";
import Table from "@/components/Table";
import { Routes } from "@/types/routes";
import { reflashData } from "@/utils";
import { IGobalDialogProps } from "@/components/Layout";
import StatusDot from "@/components/StatusDot";
import AddKey from "./AddKey";

const DetailsList = styled(_DetailsList)`
  .ms-DetailsHeader {
    padding: 0;
  }
`;

const CommandBar = styled(_CommandBar)`
  .ms-CommandBar {
    padding-left: 10px;
    height: 35px;
  }
  .ms-Icon {
    font-size: 12px;
  }

  .ms-Button-textContainer {
    font-size: 12px;
  }
`;

const ApiKeysPage = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "get_nodes",
    (key, ...args) => services.key.getApiKeys(...args),
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
    {
      key: "newItem",
      text: "New",
      iconProps: { iconName: "Add" },
      onClick(ev, item) {
        const onOk = async () => {
          mutate();
        };
        window.showDialog({
          dialogContentProps: {
            type: DialogType.largeHeader,
            title: "Add New API Key",
          },
          hideOk: true,
          // hideCancel: true,
          cancelText:"Done",
          onOk,
          
          maxWidth:"500px",
          minWidth:"500px",
          children: (
           <AddKey/>
          ),
        } as IGobalDialogProps);
      },
    },
  ];

  if (select) {
    _items.push({
      key: "ExpiredItem",
      text: "Expire",
      iconProps: { iconName: "Blocked" },
      onClick() {
        const onOk = async () => {
          const res = await services.key.expireApiKey(select.prefix);

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
              Do you want to expired this apiKey?
            </div>
          ),
        } as IGobalDialogProps);
      },
    });
  }

  const columns: IColumn[] = [
    {
      key: "id",
      name: "ID",
      fieldName: "id",
      minWidth: 10,
      maxWidth: 10,
      isResizable: true,
      data: "string",
      onRender: (item: ApiKey.v1Key) => {
        return <span>{item.id}</span>;
      },
      isPadded: true,
    },
    {
      key: "expiration1",
      name: "",
      fieldName: "expiration",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      data: "string",
      onRender: (item: ApiKey.v1Key) => (
        <div className="flex justify-start items-center h-full">
          <StatusDot
            stutus={new Date(item.expiration) > new Date()}
            activeClass="bg-green-400"
            activeLabel="Valid"
            inactiveLabel="Expired"
          />
        </div>
      ),
      isPadded: true,
    },
    {
      key: "prefix",
      name: "Prefix",
      fieldName: "prefix",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      onRender: (item: ApiKey.v1Key) => {
        return <span>{item.prefix}</span>;
      },
      isPadded: true,
    },
    {
      key: "expiration",
      name: "expiration",
      fieldName: "expiration",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      // onRender: (item: ApiKey.v1Key) => {
      //   return <span>{item.expiration}</span>;
      // },
      isPadded: true,
    },

    {
      key: "lastSeen",
      name: "lastSeen",
      fieldName: "lastSeen",
      minWidth: 70,
      maxWidth: 150,
      isResizable: true,
      data: "string",
      onRender: (item: ApiKey.v1Key) => {
        return <span>{item.lastSeen}</span>;
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
      onRender: (item: ApiKey.v1Key) => {
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
            items={data}
            compact={false}
            columns={columns}
            selectionMode={SelectionMode.single}
            selection={selection.current}
            getKey={_getKey}
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

export default ApiKeysPage;
