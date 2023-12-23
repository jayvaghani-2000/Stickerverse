import { getUserById } from "../../models/user";

export const handleGetUserById = async (id: string) => {
  try {
    const user = await getUserById(id);
    return user;
  } catch (err) {
    throw err;
  }
};
