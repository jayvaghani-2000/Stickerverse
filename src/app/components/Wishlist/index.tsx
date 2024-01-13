"use client";
import { useWishlistStore } from "@/app/store/wishlist";
import { useGetUserWishlistQuery } from "@/app/store/wishlist/api";
import EmptyWishlist from "./EmptyWishlist";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  useGetUserWishlistQuery({});
  const { wishlist, loading } = useWishlistStore();
  return wishlist.length > 0 || loading ? <WishlistItem /> : <EmptyWishlist />;
};

export default Wishlist;
