import './App.css';
import Menuizquierdo from './components/menuizquierdo';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './components/Login';
import { useState } from 'react';
import AñadirUsuarios from './components/AñadirUsuarios';
import ReestablecerContraseña from './components/ReestablecerContraseña';

const datosLista = [
  { user: "Stalin", apellido:"Ramirez", correo: "stalin.ramirez@epn.edu.ec", pass: 12345, telef: 1123456789 },
  { user: "Estalin", apellido:"Ramirez", correo: "stalin.ramirez@epn.edu.ec", pass: 67891, telef: 1123456789 },
  { user: "Mateo", apellido:"Ramirez", correo: "stalin.ramirez@epn.edu.ec", pass: 23456, telef: 1123456789 },
];

function App() {
  const [listaUsers, setListaUsers] =useState(datosLista)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login parametro={listaUsers}/>}/>
          <Route path="/login/newUser" element={<AñadirUsuarios lista={listaUsers}/>}/>
          <Route path="/login/updatePass" element={<ReestablecerContraseña  listaUsuarios={listaUsers} setListaUsuarios={setListaUsers}/>}/>
          <Route path="/menubrigadista/:user" element={<Menuizquierdo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
export default App;
