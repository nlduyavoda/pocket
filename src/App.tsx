import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  return (
    <React.StrictMode>
      <div className="App h-screen w-screen inline-flex justify-center items-center">
        <RouterProvider router={routers} />
      </div>
    </React.StrictMode>
  );
}

export default App;
