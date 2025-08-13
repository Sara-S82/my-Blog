import { ChildCare, Create } from "@mui/icons-material";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register"
import { Children } from "react";
import Profile from "../pages/Profile";
import CreatePost from "../pages/CreatePost";
import Privatelink from "../components/Privatelink";
import BlogDetails from "../pages/BlogDetails"
const routes = [

    {
        path: 'login', element: <Login />
    },
    {
        path: 'profile', element: <Privatelink>
            <Profile />
        </Privatelink>
    }, {
        path: 'createpost', element: <Privatelink><CreatePost /></Privatelink>
    },
    { path: 'register', element: <Register /> },
    { path: '/', element: <Home /> },
    {
        path: "/post/:slug", element: <BlogDetails />
    }

]
export default routes;
