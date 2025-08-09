import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import routes from "./Routes/routes"
import Home from "./pages/Home";
import { AuthoProvider } from "./context/AuthoContext"
import './App.css'
function App() {

  const Approutes = () => {
    return useRoutes(routes)
  }
  return (
    <div className="App">


      {/* <Login></Login>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Register></Register> */}
      <AuthoProvider>

        <BrowserRouter>
          <Approutes />
        </BrowserRouter>
      </AuthoProvider>


    </div>
  );
}

export default App;
