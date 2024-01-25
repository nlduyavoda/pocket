import {
  Expenses_keys,
  MonthlyExpenses,
  defaultMonthlyExpenses,
} from "@utils/variables";

export const onFilterPayment = (payment: MonthlyExpenses): MonthlyExpenses => {
  const initPayment = { ...defaultMonthlyExpenses };
  const fetchKeys = Object.keys(payment) as Expenses_keys[];
  fetchKeys.forEach((fetchKey: Expenses_keys) => {
    if (typeof payment[fetchKey] !== "undefined") {
      const fetchVal = payment[fetchKey] as never;
      initPayment[fetchKey] = fetchVal;
    }
  });
  return initPayment;
};
