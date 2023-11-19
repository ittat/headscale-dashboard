import services from "@/services";
import {
  DatePicker,
  DayOfWeek,
  PrimaryButton,
  TextField,
  defaultDatePickerStrings,
} from "@fluentui/react";
import { useState } from "react";

const AddKey = () => {
  const [date, updateDate] = useState<Date | null | undefined>();
  const [key, setKey] = useState<string>();

  const [copy, setCopyLabel] = useState<string>("Copy");

  const onAddClick = async () => {
    if (date) {
      const newkey = await services.key.addApiKey(date);
      if (newkey) {
        setKey(newkey);
      } else {
        throw new Error("NetWork Error!");
      }
    } else {
      throw new Error("Please Select User!");
    }
  };

  const onKeyCopy = () => {
    navigator.clipboard.writeText(key);
    setCopyLabel("OK! Copied! Remember it!");

    setTimeout(() => {
      setCopyLabel("Copy");
    }, 3000);
  };

  return key ? (
    <div className="flex flex-col w-[280px] py-0  gap-4">
      <TextField label="New Key:" disabled value={key} />

      <PrimaryButton onClick={onKeyCopy} readOnly={true} className="self-end">
        {copy}
      </PrimaryButton>
    </div>
  ) : (
    <div className="flex flex-col w-[280px] py-0  gap-4">
      <DatePicker
        className="flex-grow"
        firstDayOfWeek={DayOfWeek.Sunday}
        placeholder="Select a date..."
        ariaLabel="Select a expired date"
        isRequired
        value={date}
        onSelectDate={updateDate}
        strings={defaultDatePickerStrings}
      />

      <PrimaryButton onClick={onAddClick} disabled={!date} className="self-end">
        Add
      </PrimaryButton>
    </div>
  );
};

export default AddKey;
