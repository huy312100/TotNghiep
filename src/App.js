import logo from './logo.svg';
import './App.css';
import Login from "./Component/Login/Login";
import Footer from "./Component/Footer";
import Navbar from "./Component/Mainpage/Student/Navbar";
import Student from "./Component/Mainpage/Student/Student";
import RouterMD from './router/Router';


function App() {
  return (
    <div style={{backgroundColor:"#ebf2ff"}}>
      <RouterMD/>
    </div>
  );
}

export default App;
