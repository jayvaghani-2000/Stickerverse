import WithHeader from "@/app/components/HOC/withHeader";
import ProductDetail from "@/app/components/ProductDetailPage";
import { getStickerDetails } from "actions/(public)/stickers/getStickerDetail";
import axios from "axios";
type propType = { params: { slug: string }; searchParams: {} };

export async function generateMetadata(prop: propType) {
  const { data } = await getStickerDetails(prop.params.slug);
  return {
    metadataBase: new URL("https://jayvaghani.info"),
    title: data?.productName,
    icons: { apple: "/icon.png" },
    twitter: {
      card: "summary_large_image",
      title: data?.productName,
      description:
        "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
      images: [
        {
          url: data?.image[0].url,
        },
      ],
    },
    openGraph: {
      type: "website",
      title: data?.productName,
      description:
        "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
      images: [{ url: data?.image[0].url }],
    },
  };
}

const StickerDetail = async (props: propType) => {
  const res = await axios.get(
    `/api/stickers/get-sticker-details?slug=${props.params.slug}`
  );

  return (
    <WithHeader>
      {res.data.success ? (
        <ProductDetail product={res.data.data} />
      ) : (
        <div>{res.data.error}</div>
      )}
    </WithHeader>
  );
};

export default StickerDetail;
