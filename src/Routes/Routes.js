import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import AddTask from "../Pages/AddTask/AddTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import EditTask from "../Pages/EditTask/EditTask";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import MyTask from "../Pages/MyTask/MyTask";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/about',
                element: <About></About>
            },
            {
                path:'/add-task',
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },
            {
                path:'/my-task',
                element: <PrivateRoutes><MyTask></MyTask></PrivateRoutes>
            },
            {
                path:'/tasks/:id',
                loader: ({params}) => fetch(`http://localhost:5000/tasks/${params.id}`),
                element: <PrivateRoutes><EditTask></EditTask></PrivateRoutes>
            },
            {
                path:'/completed-task',
                element: <PrivateRoutes><CompletedTask></CompletedTask></PrivateRoutes>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
        ]
    }
])