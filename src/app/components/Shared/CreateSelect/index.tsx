import CreatableSelect from "react-select/creatable";

type propsType = {
  options: { value: number; label: string }[];
  createOption: (option: string) => void;
  value?: { value: number; label: string };
};

const CreateSelect = (props: propsType) => {
  const { options, createOption, value } = props;

  return (
    <CreatableSelect
      isClearable
      options={options}
      onCreateOption={option => {
        createOption(option);
      }}
      value={value}
    />
  );
};

export default CreateSelect;
