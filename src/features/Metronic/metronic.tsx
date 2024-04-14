import { MetronicLayout } from "@layouts/MetronicLayout";
import { Overview } from "./overview";
import { Payment } from "./payment";

export const MetronicPage = () => {
  return (
    <MetronicLayout>
      <Overview />
      <Payment />
      {[1, 2, 3, 4].map((ele) => {
        return <div key={ele}>block {ele + 1}</div>;
      })}
    </MetronicLayout>
  );
};
