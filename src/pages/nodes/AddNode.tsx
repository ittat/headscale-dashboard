import useSWR from "swr";
import services from "../../services";
import { ComboBox, IComboBoxOption, IComboBoxStyles, TextField } from "@fluentui/react";

const AddNode = (props: { user: {key: string,user:string} }) => {
  const { data, error, isLoading } = useSWR("get_users", (key, ...args) =>
    services.user.getUsersList(...args)
  );

  const options: IComboBoxOption[] = data
    ? data.map((user) => {
        return { key: user.id, text: user.name };
      })
    : [];

  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
  return (
    <>
    <ComboBox
      label="Please select the new node add to "
      options={options}
      styles={comboBoxStyles}
      onChange={(_,op)=>{props.user.user = op.text}}
      autoComplete="on"
    />
    <TextField label="set auth key from clent"  onChange={(ev,v)=>{props.user.key = v}}/>
    </>

  );
};

export default AddNode;
