export const prepareNumberPayload = (obj: any, convert: string[]) => {
  Object.keys(obj).forEach(i => {
    if (convert.includes(i)) {
      obj[i] = Number(obj[i]);
    }
  });

  return obj;
};

export const prepareQueryNumberArrayPayload = (obj: any, convert: string[]) => {
  Object.keys(obj).forEach(i => {
    if (convert.includes(i)) {
      obj[i] = JSON.parse(obj[i]).map((j: string) => Number(j));
    }
  });

  return obj;
};

export const prepareBooleanPayload = (obj: any, convert: string[]) => {
  Object.keys(obj).forEach(i => {
    if (convert.includes(i)) {
      obj[i] = obj[i] === "false" ? false : Boolean(obj[i]);
    }
  });

  return obj;
};
