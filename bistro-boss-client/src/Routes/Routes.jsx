import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home.jsx";
import Manu from "../pages/Manu/Manu.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import Login from "../pages/Login/Login.jsx";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/manu',
            element: <Manu></Manu>
        },
        {
            path: '/shop',
            element: <Shop></Shop>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
      ]
    },
  ]);