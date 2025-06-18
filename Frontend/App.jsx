import React from "react";
import ReactDOM from "react-dom/client";
import File from "./src/File";
import {createBrowserRouter , Outlet,RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <div>
        <File />
    </div>
  );
}

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App />,
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
