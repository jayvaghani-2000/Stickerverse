import { differenceInDays, differenceInHours } from "date-fns";

export const getDifferenceInHours = (date: string) => {
  return differenceInHours(new Date(), new Date(date));
};

export const getDifferenceInDays = (date: string) => {
  return differenceInDays(new Date(), new Date(date));
};
