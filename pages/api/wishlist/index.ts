import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getTokenData } from "../helpers/utils/getTokenData";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";
import jwtMiddleware from "../helpers/utils/validateToken";
import {
  handleAddToWishlist,
  handleDeleteWishlistItem,
  handleGetUserWishlist,
} from "../helpers/wishlist";

async function handler(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { id } = getTokenData(user);
  try {
    switch (req.method) {
      case "GET":
        const wishlist = await handleGetUserWishlist(id);
        return res.status(200).json({ wishlist });
      case "POST":
        const updatedWishlist = await handleAddToWishlist(id, req.body);
        return res.status(201).json({ wishlist: updatedWishlist });
      case "DELETE":
        await handleDeleteWishlistItem(id, req.body);
        return res.status(200).json({ success: true });
      default:
        res.setHeader("Allow", "POST, GET, DELETE");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default jwtMiddleware(handler);
