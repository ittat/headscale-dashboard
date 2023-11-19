import useSWR from "swr";
import services from "../../services";
import { ComboBox, IComboBoxOption, IComboBoxStyles, TextField } from "@fluentui/react";

const RenameNode = (props: { node: {name: string} }) => {

  return (
    <TextField  label="Change Name" defaultValue={props.node.name} onChange={(ev,v)=>{props.node.name = v}}/>
  );
};

export default RenameNode;
