import './App.css';
import Menuizquierdo from './components/menuizquierdo';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './components/Login';
import { useState } from 'react';
import AñadirUsuarios from './components/AñadirUsuarios';
import ReestablecerContraseña from './components/ReestablecerContraseña';

// Se define una lista con los datos de usuarios ya registrados (Simular usuarios registrados en la BDD)
const datosLista = [
  { user: "Stalin", apellido:"Ramirez", correo: "stalin.ramirez@epn.edu.ec", pass: 12345, telef: 1123456789 },
  { user: "Estalin", apellido:"Ramirez", correo: "stalin.ramirez@epn.edu.ec", pass: 67891, telef: 1123456789 },
  { user: "Mateo", apellido:"Ramirez", correo: "stalin.ramirez@epn.edu.ec", pass: 23456, telef: 1123456789 },
];

function App() {
  // Variable de estado global
  const [listaUsers, setListaUsers] =useState(datosLista)
  return (
    <div className="App">
      {/* Se definen las rutas hacia cada uno de las interfaces*/}
      <BrowserRouter>
        <Routes>
          {/* Se envia la lista de usuarios*/}
          <Route path="/" element={<Login parametro={listaUsers}/>}/>
          {/* Se envia la lista de usuarios*/}
          <Route path="/login/newUser" element={<AñadirUsuarios lista={listaUsers}/>}/>
          {/* Se envia la lista de usuarios y la funcion para guardar el nuevo estado de la lista*/}
          <Route path="/login/updatePass" element={<ReestablecerContraseña  listaUsuarios={listaUsers} setListaUsuarios={setListaUsers}/>}/>
          <Route path="/menubrigadista/:user" element={<Menuizquierdo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
export default App;
