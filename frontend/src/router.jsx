import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ArticleDetail from "./components/ArticleDetail";
import HomePage from "./pages/Home"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage /> 
      },
      {
        path: "/:slug",
        element: <ArticleDetail />
      }
    ]
  }
]);