"use client";
import { LOCAL_STORE_KEY } from "@/app/components/Shared/Types/localStoreType";
import { useAppDispatch } from "@/app/store";
import { useAuthStore } from "@/app/store/authentication";
import { useLazyGetUserCartQuery } from "@/app/store/cart/api";
import {
  resetVisitorCartData,
  setVisitorCartData,
} from "@/app/store/visitorCart";
import {
  useCreateVisitorCartMutation,
  useLazyGetVisitorCartQuery,
} from "@/app/store/visitorCart/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";
import { z } from "zod";
import useLocalStorage from "../hook/useLocalStorage";

type CartContextType = {
  localCart: string;
  setLocalCart: Dispatch<SetStateAction<string>>;
  refetchCart: () => void;
  createCart: () => Promise<string>;
  refetchVisitCart: (id: string) => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { authenticated, authCheck } = useAuthStore();
  const [localCart, setLocalCart] = useLocalStorage(
    LOCAL_STORE_KEY.CART,
    "",
    z.string().uuid()
  );

  const dispatch = useAppDispatch();

  const [createVisitorCart] = useCreateVisitorCartMutation({});
  const [getCart] = useLazyGetUserCartQuery({});
  const [getVisitorCart] = useLazyGetVisitorCartQuery({});

  const refreshVisitorCart = () => {
    dispatch(resetVisitorCartData());
    setLocalCart("");
  };

  const handleCreateVisitorCart = async () => {
    const res = await createVisitorCart({});
    if ("data" in res) {
      setLocalCart(res.data.id as string);
      return res.data.id;
    } else {
      refreshVisitorCart();
      return "";
    }
  };

  useEffect(() => {
    if (authenticated) {
      console.log({ res: "TTTTT" });
      getCart({});
    }
  }, [authenticated]);

  const getVisitorCartOnLoad = async () => {
    try {
      const cartId = localStorage.getItem(LOCAL_STORE_KEY.CART);
      if (cartId) {
        z.string().uuid().parse(JSON.parse(cartId));
        const res = await getVisitorCart({ id: JSON.parse(cartId) });
        if (res.isError) {
          throw new Error();
        }
        dispatch(
          setVisitorCartData({
            visitorCartId: JSON.parse(cartId),
          })
        );
      }
    } catch (err) {
      refreshVisitorCart();
    }
  };

  useEffect(() => {
    if (authCheck && !authenticated) {
      getVisitorCartOnLoad();
    }
  }, [authenticated, authCheck]);

  return (
    <CartContext.Provider
      value={{
        localCart: localCart as string,
        setLocalCart: setLocalCart as Dispatch<SetStateAction<string>>,
        refetchCart: async () => {
          await getCart({});
        },
        createCart: handleCreateVisitorCart,
        refetchVisitCart: async (id: string) => {
          await getVisitorCart({ id: id });
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
