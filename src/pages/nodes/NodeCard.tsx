import StatusDot from "@/components/StatusDot";
import services from "@/services";
import { Node } from "@/types/node";
import {
  DocumentCard as _DocumentCard,
  DocumentCardActivity,
  DocumentCardLogo,
  DocumentCardStatus,
  DocumentCardTitle,
  IBasePicker,
  IBasePickerSuggestionsProps,
  ITag,
  MessageBar as _MessageBar,
  MessageBarType,
  Persona,
  PersonaSize,
  TagPicker,
} from "@fluentui/react";
import {
  AcceptMediumIcon,
  AddToIcon,
  BackToWindowIcon,
  BlockedSiteIcon,
  BlockedSiteSolid12Icon,
  BrushIcon,
  ConnectVirtualMachineIcon,
  ContactIcon,
  DisconnectVirtualMachineIcon,
  DoubleBookmarkIcon,
  EditIcon,
  EngineeringGroupIcon,
  RemoteIcon,
  RemoveLinkChainIcon,
  RemoveLinkIcon,
  SyncIcon,
  TagGroupIcon,

  WebEnvironmentIcon,
  WifiEthernetIcon,
  WifiWarning4Icon,
} from "@fluentui/react-icons-mdl2";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested tags",
  noResultsFoundText: "No color tags found",
};

const Tag = styled.span`
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0px 5px 0px 5px;
  /* margin: 4px; */
  /* background-color: ${(props) => props.color ?? "#f0f0f0"}; */
  /* color: ${(props) => props.color ?? "#f0f0f0"}; */
  transition: all 0.2s;
  font-size: 12px;
  border: 1px solid gray;
  /* line-height: 2; */
  margin: 1px 3px;
  display: inline-block;
  &:hover {
    cursor: pointer;

    &:after {
      content: "x";
      padding-left: 4px;
    }
  }
`;

const MessageBar = styled(_MessageBar)`
  .ms-MessageBar-icon {
    display: none;
  }
`;


const DocumentCard = styled(_DocumentCard)`


.selected:after{

}

`

const NodeCard = (props: { select?:Node.v1Node , node: Node.v1Node , onClick?: () => void}) => {
  const data = props.node;
  const [expand, setExpand] = useState(false);

  const isSelected = props.node.id == props.select?.id ;

  return (
    <div className="text-center break-inside-avoid w-[350px] ">
      <DocumentCard
        // onClickHref="http://bing.com"
        className={`m-auto ${expand ? "expand" : ""}   ${isSelected? 'border-solid border-blue-600 selected' :'hover:border-blue-100 hover:border-[1px] hover:border-solid'}`}
        onClick={props.onClick}
      >
        {isSelected && (
          <div
            style={{ fontSize: "20px" }}
            className=" absolute w-full flex  flex-row-reverse justify-between p-5 pb-3"
          >
           
           {expand && <SyncIcon />} 
            <BackToWindowIcon
              className="cursor-pointer text-blue-500"
            
            />
          </div>
        )}

        <RemoteIcon className="text-[30px]  mt-8 mb-3" />

        <div className={"w-full text-start"}>
          <DocumentCardTitle
            title={data?.givenName}
            shouldTruncate
            className="pb-0 mb-0 text-[25px] font-[600] text-center"
          />
          <div className="flex justify-center items-end leading-none">
            <span>{data?.name}</span>
            <EditIcon className=" cursor-pointer text-[12px] pl-2 hover:text-blue-500" />
          </div>

          <div className="pl-7 pt-5  pb-1 flex gap-4">
            <StatusDot
              stutus={!!data?.online}
              activeClass={"bg-green-400"}
              activeLabel={"Online"}
              inactiveLabel={"Offline"}
            />

            <div>
              <BlockedSiteIcon className="text-red-500 text-[14px]" /> expired
            </div>

            <div>
              <ContactIcon className="text-[13px]" /> {data?.user?.name}
            </div>
          </div>

          {data?.ipAddresses?.map((ip) => (
            <DocumentCardStatus
              statusIcon="EngineeringGroup"
              status={ip}
              className="text-start"
            />
          ))}

          {!expand && <div className="mb-5"/>}

          {expand && (
            <MessageBar
              messageBarType={MessageBarType.info}
              isMultiline={false}
              // onDismiss={p.resetChoice}
              truncated={true}
            >
              <TagGroupIcon className="inline pr-1" />
              {data.validTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}

              <div className=" pt-2 text-center relative">
                <AddToIcon className="relative right-[-15px] text-[18px]" />
              </div>
            </MessageBar>
          )}
        </div>
      </DocumentCard>
    </div>
  );
};

export default NodeCard;
