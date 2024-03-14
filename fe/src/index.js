import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";

import { MaterialUIControllerProvider } from "../src/app/@context";
import AuthProvider from "provider/AuthProvider";
import NotificationProvider from "provider/NotificationProvider";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
