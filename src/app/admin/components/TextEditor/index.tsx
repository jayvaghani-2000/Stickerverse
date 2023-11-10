import ReactQuillWrapper from "./editor";

type propType = {
  onChange: (value: string) => void;
  value: string;
};

const TextEditor = (props: propType) => (
  <div>
    <ReactQuillWrapper {...props} />
  </div>
);

export default TextEditor;
