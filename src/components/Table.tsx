import { CheckboxVisibility, DetailsList, DetailsRow, IDetailsListProps, IDetailsRowStyles, getTheme } from "@fluentui/react";

const theme = getTheme();

const Table = (props: IDetailsListProps) => {


  const  _onRenderRow: IDetailsListProps['onRenderRow'] = props => {
        const customStyles: Partial<IDetailsRowStyles> = {};
        if (props) {
          if (props.itemIndex % 2 === 0) {
            // Every other row renders with a different background color
            customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
          }
    
          return <DetailsRow {...props} styles={customStyles} />;
        }
        return null;
      };
  return (
    <DetailsList compact={false} setKey={props.setKey ?? "id"}  checkboxVisibility={CheckboxVisibility.always}  {...props}   onRenderRow={_onRenderRow}   />
  );
};



export default Table