import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App/App.css';
import {useState} from "react";
import {BrowserRouter, Redirect, Route, Router, Routes} from 'react-router-dom';
import {LoginComp} from "./App/Login/Login";
import {RegisterComp} from "./App/Register/Register";
import MainPage from "./App/MainPage/MainPage";
import SUIContracts from "./App/Contracts/SUIContracts";
import EtheriumContracts from "./App/Contracts/EtheriumContracts";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginComp/>} />
            <Route path='/register' element={<RegisterComp/>} />
            <Route
                path="/:id"
                element={<MainPage />}></Route>
            <Route
                exact
                path="/SUIContracts/:id"
                element={<SUIContracts />}></Route>
              <Route
                  exact
                  path="/EtheriumContracts/:id"
                  element={<EtheriumContracts />}></Route>

          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;