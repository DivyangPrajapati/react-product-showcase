import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Index from "./components/Index";
import Layout from "./components/Layout";
import Shop from "./components/Shop";
import Product from "./components/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { 
            index: true, 
            element: <Index /> 
          },
          {
            path: "shop",
            element: <Shop />
          },
          {
            path: "shop/:category",
            element: <Shop />
          },
          {
            path: "product/:productId",
            element: <Product />
          }
        ]
      },
    ],
  },
]/* , {
  basename: "/learning/reactjs/react-products/",
} */);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
