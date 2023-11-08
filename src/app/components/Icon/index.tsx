import Images, { imagesList } from "./svg/import";

type propType = {
  name: imagesList;
};

const Icon = (props: propType) => {
  const { name } = props;

  const Image = Images[name];

  return <Image />;
};

export default Icon;
