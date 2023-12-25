import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_KEYS } from "./cookies";

type method = "GET" | "POST" | "PUT" | "DELETE";

export const AllMethods: method[] = ["GET", "POST", "PUT", "DELETE"];

export async function verifyJWTToken(token: string) {
  try {
    if (token?.startsWith("Bearer")) {
      const decode = jwt.verify(
        token.split(" ")[1],
        process.env.NEXT_JWT_SECRET!
      );
      if ("user" in ((decode ?? {}) as JwtPayload)) {
        return ((decode ?? {}) as JwtPayload).user;
      } else {
        throw new Error("Unauthorized");
      }
    }
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

export default function jwtMiddleware(handler: any, throwError: method[] = []) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cookieToken = `Bearer ${req.cookies[COOKIE_KEYS.TOKEN]}`;

    // Get the JWT token from the request headers
    const token =
      (req.headers.Authorization as string) ||
      (req.headers.authorization as string);

    if (!token && throwError.includes(req.method as method)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decoded = await verifyJWTToken(token || cookieToken);
      return handler(req, res, decoded);
    } catch (error) {
      if (throwError.includes(req.method as method)) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        return handler(req, res, {});
      }
    }
  };
}
