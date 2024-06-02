import WithHeader from "@/app/components/HOC/withHeader";
import ProductDetail from "@/app/components/ProductDetailPage";
import axios from "axios";
type propType = { params: { slug: string }; searchParams: {} };

export async function generateMetadata(prop: propType) {
  const res = await axios.get(
    `https://jayvaghani.info/api/sticker/get-sticker-details?slug=${prop.params.slug}`
  );

  const data = res.data;
  return {
    metadataBase: new URL("https://jayvaghani.info"),
    title: data?.productName,
    icons: { apple: "/icon.png" },
    twitter: {
      card: "summary_large_image",
      title: data?.productName,
      description:
        "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
    },
    openGraph: {
      type: "website",
      title: data?.productName,
      description:
        "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
    },
  };
}

const StickerDetail = async (props: propType) => {
  const a = await fetch(
    `https://jayvaghani.info/api/sticker/get-sticker-details?slug=${props.params.slug}`
  );

  const res = await a.json();
  console.log(res);

  return (
    <WithHeader>
      {res.data ? (
        <ProductDetail product={res.data} />
      ) : (
        <div>{res.data.error}</div>
      )}
    </WithHeader>
  );
};

export default StickerDetail;
