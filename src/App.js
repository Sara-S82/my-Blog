import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import routes from "./Routes/routes"
import Home from "./pages/Home";
import { AuthoProvider } from "./context/AuthoContext"
import { Container } from '@mui/material'
import './App.css'
function App() {

  const Approutes = () => {
    return useRoutes(routes)
  }
  return (<>


    <AuthoProvider>

      <BrowserRouter>
        <Approutes />
      </BrowserRouter>
    </AuthoProvider>
  </>

  );
}

export default App;
