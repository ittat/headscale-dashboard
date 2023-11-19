import StatusDot from "@/components/StatusDot";
import services from "@/services";
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
import React from "react";
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
`

const NodeDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `get_node_${id}`,
    (key, ...args) => services.node.getNodeById(id),
    { shouldRetryOnError: false }
  );

  const testTags: ITag[] = [
    "black",
    "blue",
    "brown",
    "cyan",
    "green",
    "magenta",
    "mauve",
    "orange",
    "pink",
    "purple",
    "red",
    "rose",
    "violet",
    "white",
    "yellow",
  ].map((item) => ({ key: item, name: item }));

  const picker = React.useRef<IBasePicker<ITag>>(null);
  // const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const onItemSelected = React.useCallback((item: ITag): ITag | null => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    return item;
  }, []);

  const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? testTags.filter(
          (tag) =>
            tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 &&
            !listContainsTagList(tag, tagList)
        )
      : [];
  };

  const filterSelectedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? testTags.filter(
          (tag) =>
            tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0
        )
      : [];
  };

  const getTextFromItem = (item: ITag) => item.name;

  return (
    <div className="text-center">
      <div style={{ fontSize: "20px" }} className="flex flex-col">
        expired
        <BlockedSiteIcon />
        <BlockedSiteSolid12Icon />
        rename
        <EditIcon />
        user
        <ContactIcon />
        status
        <ConnectVirtualMachineIcon />
        <DisconnectVirtualMachineIcon />
        <WifiEthernetIcon />
        <WifiWarning4Icon />
        tags
        <TagGroupIcon />
        router ips
        <EngineeringGroupIcon />
        <WebEnvironmentIcon />
        sync
        <SyncIcon />
        link
        <RemoteIcon />
        <RemoveLinkChainIcon />
        <RemoveLinkIcon />
      </div>

      {/* <Persona text={data.name} size={PersonaSize.size48} /> */}

      <DocumentCard
      // onClickHref="http://bing.com"
      className="m-5"
      >
        <div
          style={{ fontSize: "20px" }}
          className=" flex justify-between p-5 pb-3"
        >
          <SyncIcon />
          <BackToWindowIcon
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />
        </div>

        <RemoteIcon className="text-[35px] pt-5 pb-3" />

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


          <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={false}
            // onDismiss={p.resetChoice}
            truncated={true}
          >
             <TagGroupIcon  className="inline pr-1"/> 
            {['asdasd','asdsadsad23','ew23ee2e','23wdew2wwesws','sdfdsfds'].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
          
              <div className=" pt-2 text-center relative"><AddToIcon className="relative right-[-15px] text-[18px]"/></div>

  
            {/* <div className="">
              <TagGroupIcon />{" "}
              {data.validTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="">
              <TagGroupIcon />{" "}
              {data.forcedTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="">
              <TagGroupIcon />{" "}
              {data.invalidTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div> */}
          </MessageBar>
        </div>
      </DocumentCard>

      <div className="font-[600]  text-[50px] text-center pb-5">
        {data?.online ? <RemoveLinkChainIcon /> : <RemoveLinkIcon />}
      </div>
      <div className="font-[600]  text-[30px] relative">
        {data?.givenName}
        <EditIcon className="absolute  bottom-3 cursor-pointer text-[18px] pl-2 hover:text-blue-500" />
      </div>

      <div className="font-[100]  text-[16px] relative">
        s key name: {data?.name}
      </div>

      <label htmlFor="picker1">Tags:</label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected colors"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        // disabled={tagPicker}
        inputProps={{
          id: "picker1",
        }}
      />

      {/* <AcceptMediumIcon /> */}
    </div>
  );
};

export default NodeDetail;
