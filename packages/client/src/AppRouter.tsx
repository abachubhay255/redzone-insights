import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Shell } from "./navigation/Shell";
import { Scores } from "./pages/Scores";
import { NotFound } from "./pages/NotFound";

const routerBase = [
  {
    id: "root",
    path: "/",
    element: <Shell />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Scores />
      }
    ]
  }
];

const router = createBrowserRouter(routerBase);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
