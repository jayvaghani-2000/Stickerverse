import { getUserById, setUserPasswordById } from "../../models/user";

export const handleGetUserById = async (id: string) => {
  try {
    const user = await getUserById(id);
    return user;
  } catch (err) {
    throw err;
  }
};

export const handleSetUserPassword = async (id: string) => {
  try {
    const user = await setUserPasswordById(id);
    return user;
  } catch (err) {
    throw err;
  }
};
