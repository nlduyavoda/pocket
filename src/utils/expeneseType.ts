enum HousingCategory {
  HomeMaintenance = "home_maintenance",
  Utilities = "utilities",
  RentOrMortgage = "rent_or_mortgage",
}

enum TransportationCategory {
  PublicTransport = "public_transport",
  Fuel = "fuel",
  Insurance = "insurance",
  CarPayment = "car_payment",
}

enum HealthcareCategory {
  Prescriptions = "prescriptions",
  Insurance = "insurance",
  OtherMedicalExpenses = "other_medical_expenses",
}

enum EntertainmentCategory {
  Subscriptions = "subscriptions",
  MoviesAndEvents = "movies_and_events",
  DiningOut = "dining_out",
}

enum PersonalCareCategory {
  Toiletries = "toiletries",
  Haircuts = "haircuts",
}

enum DebtsCategory {
  CreditCardPayments = "credit_card_payments",
  LoanPayments = "loan_payments",
}

enum SavingsCategory {
  EmergencyFund = "emergency_fund",
  Retirement = "retirement",
  OtherSavings = "other_savings",
}

enum OtherExpensesCategory {
  GiftsAndDonations = "gifts_and_donations",
  Miscellaneous = "miscellaneous",
}

export interface ExpenseType {
  id: string;
  date_added: string;
  total_expenses: number;
  event?: string;
  housing: Record<HousingCategory, number>;
  transportation: Record<TransportationCategory, number>;
  groceries: number;
  healthcare: Record<HealthcareCategory, number>;
  entertainment: Record<EntertainmentCategory, number>;
  personal_care: Record<PersonalCareCategory, number>;
  debts: Record<DebtsCategory, number>;
  savings: Record<SavingsCategory, number>;
  other_expenses: Record<OtherExpensesCategory, number>;
}

const expense: ExpenseType = {
  id: "2JyV97xfCZIwqMuh2Wyr",
  date_added: "2024-01-10T12:00:00Z",
  total_expenses: 1999,
  event: "",
  housing: {
    [HousingCategory.HomeMaintenance]: 50,
    [HousingCategory.Utilities]: 15000,
    [HousingCategory.RentOrMortgage]: 1000,
  },
  transportation: {
    [TransportationCategory.PublicTransport]: 40,
    [TransportationCategory.Fuel]: 80,
    [TransportationCategory.Insurance]: 100,
    [TransportationCategory.CarPayment]: 300,
  },
  groceries: 300,
  healthcare: {
    [HealthcareCategory.Prescriptions]: 50,
    [HealthcareCategory.Insurance]: 200,
    [HealthcareCategory.OtherMedicalExpenses]: 20,
  },
  entertainment: {
    [EntertainmentCategory.Subscriptions]: 20,
    [EntertainmentCategory.MoviesAndEvents]: 30,
    [EntertainmentCategory.DiningOut]: 100,
  },
  personal_care: {
    [PersonalCareCategory.Toiletries]: 30,
    [PersonalCareCategory.Haircuts]: 20,
  },
  debts: {
    [DebtsCategory.CreditCardPayments]: 100,
    [DebtsCategory.LoanPayments]: 50,
  },
  savings: {
    [SavingsCategory.EmergencyFund]: 200,
    [SavingsCategory.Retirement]: 150,
    [SavingsCategory.OtherSavings]: 50,
  },
  other_expenses: {
    [OtherExpensesCategory.GiftsAndDonations]: 30,
    [OtherExpensesCategory.Miscellaneous]: 40,
  },
};
