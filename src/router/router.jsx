import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import AllClasses from "@/pages/class/AllClasses";
import TeachForm from "@/pages/teach/TeachForm";
import DashboardLayout from "@/pages/Dashboard/StudentDashboard";
import MyEnrollClass from "@/components/studentdashboard/MyEnrollClass";
import MyEnrollClassDetails from "@/components/studentdashboard/MyEnrollClassDetails";
import MyProfile from "@/components/studentdashboard/MyProfile";

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
    },{
        path:'dashboard',
        element:<DashboardLayout/>,
        children:[
            {
                path:'my-enroll-class',
                element:<MyEnrollClass/>
            },{
                path:'myenroll-class/:id',
                element:<MyEnrollClassDetails/>
            },
            {
                path:'profile',
                element:<MyProfile/>
            }
        ]
    },
    {
        path: '/about',
        element: <h1>About</h1>
    }
])

export default router;