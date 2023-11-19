import StatusDot from "@/components/StatusDot";
import services from "@/services";
import { Node } from "@/types/node";
import {
  DocumentCard,
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

const AddNodeCard = (props: { onClick?: () => void }) => {
  return (
    <div className="text-center break-inside-avoid w-[350px] ">
      <DocumentCard
        // onClickHref="http://bing.com"
        className={`flex flex-col justify-center  cursor-pointer items-center  h-[275px] m-auto opacity-50 hover:opacity-100 hover:border-blue-300 hover:border-[1px] hover:border-solid hover:text-blue-500`}
        onClick={props.onClick}
      >
        <AddToIcon className="text-[40px]  mt-8 mb-3  " />

        <div className={"w-full text-center"}> ADD </div>
        {/* <div className="h-[168px]" /> */}
      </DocumentCard>
    </div>
  );
};

export default AddNodeCard;
