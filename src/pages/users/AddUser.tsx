import useSWR from "swr";
import services from "../../services";
import { TextField } from "@fluentui/react";

const AddUser = (props: { user: {name: string} }) => {


  return (
    <TextField label="User Name"  onChange={(e,v)=>{props.user.name = v}}  defaultValue={props.user.name?? ""}/>
  );
};

export default AddUser;
