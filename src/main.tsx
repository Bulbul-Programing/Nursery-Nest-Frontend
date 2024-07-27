import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import router from "./routes/router.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
   {/* don't delete refresh use it */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <RouterProvider router={router} />
      {/* </PersistGate> */}
       <Toaster />
    </Provider>
  </React.StrictMode>
);
