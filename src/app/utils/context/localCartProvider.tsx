"use client";
import {
  LOCAL_STORE_KEY,
  LocalCart,
  LocalCartSchema,
} from "@/app/components/Shared/Types/localStoreType";
import { useAuthStore } from "@/app/store/authentication";
import { useLazyGetUserCartQuery } from "@/app/store/cart/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";
import { defaultCart } from "../constant";
import useLocalStorage from "../hook/useLocalStorage";

type CartContextType = {
  localCart: LocalCart;
  setLocalCart: Dispatch<SetStateAction<LocalCart>>;
  refetchCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuthStore();
  const [localCart, setLocalCart] = useLocalStorage(
    LOCAL_STORE_KEY.CART,
    defaultCart,
    LocalCartSchema
  );

  const [getCart] = useLazyGetUserCartQuery({});

  useEffect(() => {
    if (authenticated) {
      getCart({});
    }
  }, [authenticated]);

  return (
    <CartContext.Provider
      value={{
        localCart: localCart as LocalCart,
        setLocalCart: setLocalCart as Dispatch<SetStateAction<LocalCart>>,
        refetchCart: () => {
          getCart({});
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useLocalCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useLocalCart must be used inside CartProvider");
  }

  return context;
};

export default CartProvider;
