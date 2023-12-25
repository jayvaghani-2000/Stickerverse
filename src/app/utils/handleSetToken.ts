import axios from "axios";

export const handleSetToken = async (token: string) => {
  await axios.post(`/api/token/setToken`, {
    token: token,
  });
};
export const handleRemoveToken = async () => {
  await axios.get(`/api/token/removeToken`);
};
