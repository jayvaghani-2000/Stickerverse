import axios from "axios";

export const handleSetToken = async (token: string) => {
  await axios.post(`/api/token/setToken?date=${Date.now()}`, {
    token: token,
  });
};
export const handleRemoveToken = async () => {
  await axios.get(`/api/token/removeToken?date=${Date.now()}`);
};
