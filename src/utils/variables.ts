export const sum = (a: number, b: number) => {
  return a + b;
};

export type MonthlyExpenses = {
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

// Example usage
export const defaultMonthlyExpenses: MonthlyExpenses = {
  housing: {
    rent_or_mortgage: 1200,
    utilities: 150,
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
  total_expenses: 2770, // Sum of all expenses
};


