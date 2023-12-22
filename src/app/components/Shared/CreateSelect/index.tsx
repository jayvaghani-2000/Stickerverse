import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";

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

type propsType<T> = {
  options: { value: T; label: string }[];
  createOption: (option: string) => void;
  value?: { value: T; label: string } | null;
  id: string;
  placeholder: string;
  onChange: (value: T) => void;
};

function CreateSelect<T extends number | string>(props: propsType<T>) {
  const isMobile = useMobileScreen();
  const isTab = useTabScreen();
  const { options, createOption, value, id, placeholder, onChange } = props;

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
      placeholder={placeholder}
      instanceId={id}
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
          fontSize: "16px",
          fontWeight: "500",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: getPaddingSize(),
          margin: 0,

          color: state.isDisabled ? "#ccc" : "black",
        }),
        input: (provided, state) => ({
          ...provided,
          margin: "0px",
          paddingBottom: "0px",
          paddingTop: "0px",
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
      onChange={option => {
        onChange(option!.value as T);
      }}
      components={{
        DropdownIndicator,
      }}
      value={value}
    />
  );
}

export default CreateSelect;
