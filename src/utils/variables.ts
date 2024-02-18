import { format } from "date-fns";

export const sum = (a: number, b: number) => {
  return a + b;
};

export const formatDate = (date: string) => {
  return format(new Date(date), "dd / MMMM / yyy");
};

export const format_TimestampToDate = (time: any) => {
  // Combine seconds and nanoseconds into a single timestamp
  const timestamp = time.seconds + time.nanoseconds / 1e9;

  // Convert to a Date object
  return new Date(timestamp * 1000); // JavaScript uses milliseconds, so multiply by 1000
};

export const antDesignProviderTheme = {
  components: {
    Typography: {
      colorPrimary: "#fff",
    },
    Button: {
      colorPrimary: "#00b96b",
      algorithm: true, // Enable algorithm
    },
    Input: {
      colorPrimary: "#eb2f96",
      algorithm: true, // Enable algorithm
    },
  },
};

export type MonthlyExpenses = {
  id: string;
  date_added: string;
  event: string;
  housing: {
    rent_or_mortgage: number;
    utilities: number;
    home_maintenance: number;
  };
  transportation: {
    car_payment: number;
    insurance: number;
    fuel: number;
    public_transport: number;
  };
  groceries: number;
  healthcare: {
    insurance: number;
    prescriptions: number;
    other_medical_expenses: number;
  };
  entertainment: {
    dining_out: number;
    subscriptions: number;
    movies_and_events: number;
  };
  personal_care: {
    haircuts: number;
    toiletries: number;
  };
  debts: {
    credit_card_payments: number;
    loan_payments: number;
  };
  savings: {
    emergency_fund: number;
    retirement: number;
    other_savings: number;
  };
  other_expenses: {
    gifts_and_donations: number;
    miscellaneous: number;
  };
  total_expenses: number;
};

export type ExpenseType<T extends string> = { [K in T]: string };

export const ExpenseCategories: ExpenseType<keyof MonthlyExpenses> = {
  id: "id",
  event: "sự kiện",
  date_added: "ngày",
  housing: "nhà ở",
  transportation: "giao thông",
  groceries: "thực phẩm",
  healthcare: "chăm sóc sức khỏe",
  entertainment: "giải trí",
  personal_care: "chăm sóc cá nhân",
  debts: "nợ",
  savings: "tiết kiệm",
  other_expenses: "các khoản chi phí khác",
  total_expenses: "tổng chi phí",
};

export const ExpenseProperties = {
  rent_or_mortgage: "tiền thuê hoặc trả góp",
  utilities: "tiện ích",
  home_maintenance: "bảo dưỡng nhà cửa",
  car_payment: "trả góp xe",
  insurance: "bảo hiểm",
  fuel: "nhiên liệu",
  public_transport: "giao thông công cộng",
  prescriptions: "đơn thuốc",
  other_medical_expenses: "các chi phí y tế khác",
  dining_out: "ăn ngoại trời",
  subscriptions: "đăng ký",
  movies_and_events: "phim và sự kiện",
  haircuts: "cắt tóc",
  toiletries: "đồ dùng cá nhân",
  credit_card_payments: "thanh toán thẻ tín dụng",
  loan_payments: "thanh toán khoản vay",
  emergency_fund: "quỹ khẩn cấp",
  retirement: "hưu trí",
  other_savings: "tiết kiệm khác",
  gifts_and_donations: "quà tặng và đóng góp",
  miscellaneous: "linh tinh",
};
export const defaultEventProperties: any = {
  title: "default event title",
  startDate: new Date(),
  endDate: new Date(),
};

// Example usage
export const defaultMonthlyExpenses: MonthlyExpenses = {
  id: "",
  date_added: "2024-01-10T12:00:00Z",
  total_expenses: 2770, // Sum of all expenses,
  event: "",
  housing: {
    rent_or_mortgage: 1000,
    utilities: 15000,
    home_maintenance: 50,
  },
  transportation: {
    car_payment: 300,
    insurance: 100,
    fuel: 80,
    public_transport: 40,
  },
  groceries: 300,
  healthcare: {
    insurance: 200,
    prescriptions: 50,
    other_medical_expenses: 20,
  },
  entertainment: {
    dining_out: 100,
    subscriptions: 20,
    movies_and_events: 30,
  },
  personal_care: {
    haircuts: 20,
    toiletries: 30,
  },
  debts: {
    credit_card_payments: 100,
    loan_payments: 50,
  },
  savings: {
    emergency_fund: 200,
    retirement: 150,
    other_savings: 50,
  },
  other_expenses: {
    gifts_and_donations: 30,
    miscellaneous: 40,
  },
};

export type Expenses_keys = keyof MonthlyExpenses;

type SubKeys<T> = T extends object ? keyof T : string;

export type NestedKeys = SubKeys<MonthlyExpenses[Expenses_keys]>;

type DataType = {
  key: string;
  category: string;
  expense: string;
  value: DataType[];
};
export type SubChild1<T extends Expenses_keys> = { [K in T]: DataType };
export type Child1 = SubChild1<Expenses_keys>;
