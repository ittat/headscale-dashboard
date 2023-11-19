

// Data API 最大感受是希望页面专注于页面内部的本分，页面之外的联动和数据交换不是页面需要关心的内容

// import Layout from "../components/Layout";

import { createHashRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../pages/Error";

import Login from "../pages/login";
import { homeLoader, layoutLoader } from "./loaders";
import HomePage from "../pages/home";
import UsersPage from "../pages/users";
import NodesPage from "../pages/nodes";
import RoutesPage from "../pages/routes";
import ApiKeysPage from "../pages/apikey";
import NodeDetail from "@/pages/nodes/detail";



// Data API
export const routerData = createHashRouter([
  {
    path: "/404",
    element: <ErrorPage />,
    errorElement: <Layout />,

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: layoutLoader,
    children: [

      {
        path: "/",
        element: <HomePage />,
        loader:homeLoader,
        index: true, // set as default one

      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/nodes",
        element: <NodesPage />,
      },
      {
        path: "/routes",
        element: <RoutesPage />,
      },
  
      {
        path: "/apikeys",
        element: <ApiKeysPage />,
      },


  
    ],
  },

  {
    path: '/node/:id',
    element: <NodeDetail />,
  
  },
]);
