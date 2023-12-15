import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const handleErrorMsg = (error: unknown) => {
  if (error instanceof ZodError) {
    const errorMessage = error.errors
      .map(e => `${e.path[0]}: ${e.message}`)
      .join("\n");
    return { success: false, message: errorMessage };
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          success: false,
          message: "Duplicate entry. This username or email is already in use.",
        };
      // Add more cases for other Prisma error codes if needed
      default:
        return {
          success: false,
          message: "An error occurred while processing your request.",
        };
    }
  } else {
    // Handle other types of errors
    return { success: false, message: "An unexpected error occurred." };
  }
};
