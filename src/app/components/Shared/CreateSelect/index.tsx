import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props} className="py-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" fill="white" />
          <path
            d="M6 8L10 12.33L14 8"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </components.DropdownIndicator>
    )
  );
};

type propsType = {
  options: { value: number; label: string }[];
  createOption: (option: string) => void;
  value?: { value: number; label: string };
};

const CreateSelect = (props: propsType) => {
  const isMobile = useMobileScreen();
  const isTab = useTabScreen();
  const { options, createOption, value } = props;

  const getSelectSize = () => {
    if (isMobile) {
      return "28px";
    } else if (isTab) {
      return "38px";
    }
    return "50px";
  };

  const getPaddingSize = () => {
    if (isMobile) {
      return "0px 0px 0px 12px";
    } else if (isTab) {
      return "0px 0px 0px 16px";
    }
    return "0px 0px 0px 20px";
  };

  return (
    <CreatableSelect
      options={options}
      onCreateOption={option => {
        createOption(option);
      }}
      instanceId={"Category"}
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: "2px solid #000 !important",
          boxShadow: "none !important",
          borderRadius: "none !important",
          height: getSelectSize(),
          alignItems: "center",
          minHeight: "unset",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#fcf8f3" : "#fff",
          color: "#000",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#e2dfda",
            color: "#000",
          },
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "black",
          fontSize: "14px",
          fontWeight: "500",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: getPaddingSize(),
          margin: 0,
          color: state.isDisabled ? "#ccc" : "black",
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: "#6c6c6c",
          fontSize: "14px",
          fontWeight: "500",
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: "none",
        }),
      }}
      components={{
        DropdownIndicator,
      }}
      value={value}
    />
  );
};

export default CreateSelect;
