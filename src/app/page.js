import RootLayout from "@layouts/RootLayout";
import HomeLayout from "@layouts/HomeLayout";
import { PocketForm } from "@features/PocketForm";

export default function HomePage() {
  return (
    <RootLayout>
      <HomeLayout>
        <PocketForm />
      </HomeLayout>
    </RootLayout>
  );
}
