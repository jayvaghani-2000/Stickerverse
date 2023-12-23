import { differenceInHours } from "date-fns";

export const getDifferenceInHours = (date: string) => {
  return differenceInHours(new Date(), new Date(date));
};
