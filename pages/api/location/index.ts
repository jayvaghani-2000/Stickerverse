import { LocationDataType } from "@/app/utils/getLocation";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handleAddAddress } from "../helpers/address";
import { getTokenData } from "../helpers/utils/getTokenData";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";
import jwtMiddleware from "../helpers/utils/validateToken";

async function handler(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { id } = getTokenData(user);
  try {
    switch (req.method) {
      case "GET":
        const data = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latitude},${req.query.longitude}&key=${process.env.GOOGLE_MAP_API_KEY}`
        );
        const json: LocationDataType = await data.json();
        return res.status(200).json({ data: json });
      case "POST":
        await handleAddAddress(id, req.body);
        return res.status(201).json({ success: true });

      default:
        res.setHeader("Allow", "POST, GET");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default jwtMiddleware(handler);
