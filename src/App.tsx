import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import RootLayout from "@layouts/RootLayout";

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  return (
    <React.StrictMode>
      <RootLayout>
        <RouterProvider router={routers} />
      </RootLayout>
    </React.StrictMode>
  );
}

export default App;
