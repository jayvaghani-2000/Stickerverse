import {
  addAddress,
  deleteUserAddress,
  getUserAddress,
} from "../../models/address";

export const handleAddAddress = async (id: string, body: unknown) => {
  try {
    const address = await addAddress(id, body);
    return address;
  } catch (err) {
    throw err;
  }
};

export const handleGetAddress = async (id: string) => {
  try {
    const addresses = await getUserAddress(id);
    return addresses;
  } catch (err) {
    throw err;
  }
};

export const handleDeleteAddress = async (id: string) => {
  try {
    const address = await deleteUserAddress(id);
    return address;
  } catch (err) {
    throw err;
  }
};
