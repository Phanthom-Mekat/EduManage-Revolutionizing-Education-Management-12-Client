import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import AllClasses from "@/pages/class/AllClasses";
import TeachForm from "@/pages/teach/TeachForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/all-classes',
                element: <AllClasses/>,
            },{
                path: '/teach',
                element: <TeachForm/>
            }

        ]

    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '/about',
        element: <h1>About</h1>
    }
])

export default router;