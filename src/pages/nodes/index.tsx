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
  PrimaryButton,
  Dialog,
  DialogType,
  MarqueeSelection,
  HoverCard,
  HoverCardType,
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react";
import { Menu } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import services from "../../services";
import { Node } from "../../types/node";
import { AddLinkIcon, AutomateFlowIcon } from "@fluentui/react-icons-mdl2";
import StatusDot from "../../components/StatusDot";
import { IGobalDialogProps } from "../../components/Layout";
import AddNode from "./AddNode";
import { reflashData } from "../../utils";
import RenameNode from "./RenameNode";
import Table from "@/components/Table";
import { Link } from "react-router-dom";
import NodeCard from "./NodeCard";
import AddNodeCard from "./AddNodeCard";

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

  *:hover {
    box-shadow: none !important;
    border-color: transparent !important;
  }
  * {
    box-shadow: none !important;
    border-color: transparent !important;
  }
`;

const nodeCardProps = {
  onRenderCompactCard: () => {
    return <>sdfdsf</>;
  },
  renderData: [],
};


const addNode = (mutate:Function)=>{

  let selectValue: { key: string; user: string } = { key: null,  user: null };
  const onOk = async () => {
    if (selectValue.key && selectValue.user) {
      const newnode = await services.node.addNode(
        selectValue.user,
        selectValue.key
      );
      if (newnode) {
        mutate();
      } else {
        throw new Error("NetWork Error!");
      }
    } else {
      throw new Error("Please Select User!");
    }
  };
  window.showDialog({
    dialogContentProps: {
      type: DialogType.largeHeader,
      title: "Add New Node",
      // subText: 'Please select the new node add to ',
    },
    onOk,

    children: <AddNode user={selectValue} />,
  } as IGobalDialogProps);
  
}

const NodesPage = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "get_nodes",
    (key, ...args) => services.node.getNodes(...args),
    { refreshInterval: 30000, shouldRetryOnError: false }
  );

  const [select, setSelect] = useState<Node.v1Node>();
  const onSelectionChanged = () => {
    setSelect(selection.current.getSelection()[0] as Node.v1Node);
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
      onClick: ()=>addNode(mutate)
    },
    {
      key: "renameItem",
      text: "Rename",
      iconProps: { iconName: "Rename" },
      disabled: !select,
      onClick(ev, item) {
        let selectValue: { name: string } = { name: select.givenName };

        const onOk = async () => {
          console.log(selectValue);

          if (selectValue.name) {
            const newnode = await services.node.renameNode(
              select.id,
              selectValue.name
            );
            if (newnode) {
              mutate();
            } else {
              throw new Error("NetWork Error!");
            }
          } else {
            throw new Error("Please Select User!");
          }
        };
        window.showDialog({
          dialogContentProps: {
            type: DialogType.largeHeader,
            title: "Rename This Node",
            // subText: 'Please select the new node add to ',
          },
          onOk,

          children: <RenameNode node={selectValue} />,
        } as IGobalDialogProps);
      },
    },
    {
      key: "DeleteItem",
      text: "Delete",
      iconProps: { iconName: "Delete" },
      disabled: !select,
      onClick() {
        const onOk = async () => {
          const res = await services.node.deleteNode(select.id);

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
              Do you want to delete this Node?
            </div>
          ),
        } as IGobalDialogProps);
      },
    },
  ];

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Icon",
      isIconOnly: true,
      fieldName: "name",
      minWidth: 16,
      maxWidth: 16,
      onRender: () => <AddLinkIcon />,
    },
    {
      key: "column0",
      name: "Name",
      fieldName: "name",
      minWidth: 70,
      maxWidth: 90,
      // onColumnClick: _onColumnClick,
      data: "string",
      isPadded: true,
      onRender(item: Node.v1Node, index, column) {
        return (
          <HoverCard
            // cardDismissDelay={2000}
            // type={HoverCardType.plain}
            expandingCardProps={nodeCardProps}
            instantOpenOnClick={true}
            // componentRef={hoverCard}
            // onCardHide={onCardHide}
          >
            <div>{item.name} </div>
          </HoverCard>
        );
      },
    },
    {
      key: "column02",
      name: "Given Name",
      fieldName: "givenName",
      minWidth: 70,
      maxWidth: 90,
      data: "string",
      isPadded: true,
    },
    {
      key: "column2",
      name: "Status",
      fieldName: "online",
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      // onColumnClick: _onColumnClick,
      data: "string",
      onRender: (item: Node.v1Node) => (
        <StatusDot
          stutus={item.online}
          activeClass="bg-green-400"
          activeLabel="Online"
          inactiveLabel="Offline"
        />
      ),
      isPadded: true,
    },

    {
      key: "column3",
      name: "IP Addresses",
      fieldName: "ipAddresses",
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: "string",
      onRender: (item: Node.v1Node) => {
        return (
          <span>
            {item.ipAddresses?.map((ip) => (
              <div>{ip}</div>
            ))}
          </span>
        );
      },
      isPadded: true,
    },

    {
      key: "column5",
      name: "Used by",
      fieldName: "item.user.name",
      minWidth: 70,
      maxWidth: 100,
      isResizable: true,
      data: "string",
      onRender: (item: Node.v1Node) => {
        return <span>{item.user.name}</span>;
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
      <div className=" ">
        <CommandBar items={_items} />

        <div
          className=" flex  overflow-auto  flex-wrap  gap-5"
          style={{ height: "65vh", width: "95vw" }}
        >
          {data.map((node) => (
            <NodeCard
              node={node}
              select={select}
              key={node.id}
              onClick={() =>
                select?.id != node.id ? setSelect(node) : setSelect(undefined)
              }
            />
          ))}

          <AddNodeCard onClick={()=>addNode(mutate)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <PrimaryButton onClick={() => reflashData(mutate)}>Reflash</PrimaryButton>
    </div>
  );
};

export default NodesPage;
