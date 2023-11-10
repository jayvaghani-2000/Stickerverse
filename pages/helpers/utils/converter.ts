export const preparePayload = (obj: any, convert: string[]) => {
  Object.keys(obj).forEach(i => {
    if (convert.includes(i)) {
      obj[i] = Number(obj[i]);
    }
  });

  return obj;
};
