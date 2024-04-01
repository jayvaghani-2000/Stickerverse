import { getStickerDetailType } from "actions/utils/types.type";
import { MotionImage } from "../MotionImage";

type propType = {
  product: getStickerDetailType["data"];
};

const Preview = (props: propType) => {
  const { product } = props;
  const { image } = product!;

  return (
    <div className="relative flex justify-center gap-2 mt-3 sm:mt-5">
      {image.map(i => (
        <div
          key={i.id}
          className="h-10 w-10 md:h-15 md:w-15 lg:h-20 lg:w-20 rounded-lg overflow-hidden border border-black"
        >
          <MotionImage
            src={i.url}
            alt=""
            fill
            placeholder="blur"
            blurDataURL={i.blurUrl}
            style={{ objectFit: "cover" }}
            sizes={"80px"}
          />
        </div>
      ))}
    </div>
  );
};

export default Preview;
