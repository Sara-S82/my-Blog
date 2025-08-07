import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import routes from "./Routes/routes"
import Home from "./pages/Home";

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
      <BrowserRouter>
        <Approutes />
      </BrowserRouter>

    </div>
  );
}

export default App;
