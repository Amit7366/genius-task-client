import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import AddTask from "../Pages/AddTask/AddTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import Home from "../Pages/Home/Home/Home";
import MyTask from "../Pages/MyTask/MyTask";

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
                element: <AddTask></AddTask>
            },
            {
                path:'/my-task',
                element: <MyTask></MyTask>
            },
            {
                path:'/completed-task',
                element: <CompletedTask></CompletedTask>
            },
        ]
    }
])