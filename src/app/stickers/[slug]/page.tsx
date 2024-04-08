import WithHeader from "@/app/components/HOC/withHeader";
import ProductDetail from "@/app/components/ProductDetailPage";
import { getStickerDetails } from "actions/(public)/stickers/getStickerDetail";
type propType = { params: { slug: string }; searchParams: {} };

// export async function generateMetadata(prop: propType) {
//   const { data } = await getStickerDetails(prop.params.slug);
//   return {
//     title: data?.productName,
//     icons: { apple: "/icon.png" },
//     twitter: {
//       card: "summary_large_image",
//       title: data?.productName,
//       description:
//         "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
//       images: [
//         {
//           url: data?.image[0].url,
//         },
//       ],
//     },
//     openGraph: {
//       type: "website",
//       title: data?.productName,
//       description:
//         "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
//       images: [{ url: data?.image[0].url }],
//     },
//   };
// }

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
