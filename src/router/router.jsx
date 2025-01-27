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
import AdminDashboardLayout from "@/pages/Dashboard/AdminDashBoardLayout";
import TeacherRequest from "@/components/admin/TeacherRequest";
import Users from "@/components/admin/Users";
import AllClassesAdmin from "@/components/admin/AllClassesAdmin";
import AdminProfile from "@/components/admin/AdminProfile";
import TeacherDashBoardLayout from "@/pages/Dashboard/TeacherDashBoardLayout";
import AddClass from "@/components/teacher/AddClass";
import MyClasses from "@/components/teacher/Myclasses";
import ClassDetails from "@/components/teacher/ClassDetails";
import TeacherProfile from "@/components/teacher/TeacherProfile";

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
    },{
        path: 'admin',
        element: <AdminDashboardLayout/>,
        children: [
            {
                path: 'teacher-request',
                element: <TeacherRequest/>
            },
            {
                path: 'users',
                element: <Users/>
            },{
                path:'all-classes',
                element:<AllClassesAdmin/>
            },{
                path:'profile',
                element:<AdminProfile   />
            }
        ]
    },{
        path:'teacher',
        element:<TeacherDashBoardLayout/>,
        children:[{
            path:'addclass',
            element:<AddClass/>
        },
        {
            path:'my-classes',
            element:<MyClasses/>
        },
        {
            path:'my-classes/:id',
            element:<ClassDetails/>
        },
        {
            path:'profile',
            element:<TeacherProfile/>
        }
    
    ]
    },
    {
        path: '/about',
        element: <h1>About</h1>
    }
])

export default router;