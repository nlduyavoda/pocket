import { MetronicLayout } from "@layouts/MetronicLayout";
import { Overview } from "./overview";
import { Payment } from "./payment";

export const MetronicPage = () => {
  return (
    <MetronicLayout>
      <Overview />
      <Payment />
    </MetronicLayout>
  );
};
