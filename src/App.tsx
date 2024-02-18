import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  return (
    <React.StrictMode>
      <div className="App">
        <RouterProvider router={routers} />
      </div>
    </React.StrictMode>
  );
}

export default App;
