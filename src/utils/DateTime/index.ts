import { format } from "date-fns";

export const DATE_TIME_FORMAT = "MM/dd/yyyy";
export function formatDate(selectedDate: string | Date) {
  return format(new Date(selectedDate), DATE_TIME_FORMAT);
}
