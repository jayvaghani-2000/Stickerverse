type getDataType = (user: any) => {
  id: string;
};

export const getTokenData: getDataType = (user: any) => {
  return { id: user.sub as string };
};
