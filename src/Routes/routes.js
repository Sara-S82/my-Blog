import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register"


const routes = [

    { path: 'login', element: <Login /> },

    { path: 'register', element: <Register /> },
    { path: '/', element: <Home /> }
]
export default routes;