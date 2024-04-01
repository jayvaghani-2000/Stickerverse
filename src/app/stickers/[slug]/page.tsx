import WithHeader from "@/app/components/HOC/withHeader";
import ProductDetail from "@/app/components/ProductDetailPage";
import { getStickerDetails } from "actions/(public)/stickers/getStickerDetail";
type propType = { params: { slug: string }; searchParams: {} };

export async function generateMetadata(prop: propType) {
  const { data } = await getStickerDetails(prop.params.slug);
  return {
    title: data?.productName,
  };
}

const StickerDetail = async (props: propType) => {
  const sticker = await getStickerDetails(props.params.slug);
  return (
    <WithHeader>
      {sticker.success ? (
        <ProductDetail product={sticker.data} />
      ) : (
        <div>{sticker.error}</div>
      )}
    </WithHeader>
  );
};

export default StickerDetail;
