import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavLayout from "./layouts/Layout/Layout.js";
import MainPage from "./pages/MainPage/MainPage";
import ThemeProvider from "./providers/ThemeProvider";

import "./i18n.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <MainPage type="left" />,
      },
      {
        path: "/:second",
        element: <MainPage type="left" />,
      },
      {
        path: "/right",
        element: <MainPage type="right" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
