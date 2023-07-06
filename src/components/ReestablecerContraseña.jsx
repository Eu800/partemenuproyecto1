import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function ReestablecerContraseña(props) {
  
  const { listaUsuarios, setListaUsuarios } = props;
  
  // Se instancia el hook useNavigate
  let navegar = useNavigate();
  // Se define una variable de estado para el usuario
  const [usuario, setUsuario] = useState("");
  // Se define una variable de estado para la contraseña
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  // Se define una variable de estado para confirmar la contraseña
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  // Función para limpiar los campos
  const limpiarCampos = () => {
    setUsuario("");
    setNuevaContraseña("");
    setConfirmarContraseña("");
  };

  // Funcion manejadora para restablecer la contraseña
  const handleRestablecerContraseña = (e) => {e.preventDefault();

    // Verificar si el usuario existe en la lista de usuarios
    const usuarioExistente = listaUsuarios.find((usr) => usr.user === usuario);
    // Si existe el usuario en la lista, se le permite restablecer la contraseña
    if (usuarioExistente) {
      if (nuevaContraseña === confirmarContraseña) {
        // Actualizar la contraseña del usuario
        const usuariosActualizados = listaUsuarios.map((usr) => {
          if (usr.user === usuario) {
            return { ...usr, pass: nuevaContraseña };
          }
          return usr;
        });
        // Se actualiza el estado de la lista con la nueva contraseña del usuario
        setListaUsuarios(usuariosActualizados);
        // Se muestra una alerta mostrando que se restablecio la contraseña exitosamente
        alert("Contraseña restablecida exitosamente");
        limpiarCampos();
        // Se dirige a la interfa de inicio
        navegar("/");
      } else {
        limpiarCampos();
        alert("Las contraseñas no coinciden")
      }
    } 
    // Si no existe el usuario, se muestra una alerta con el error
    else {
      limpiarCampos();
      alert("Este usuario no existe");
    }
  };

  return (
    <div className="todo">
      <div>
          <button id="fle" onClick={()=>{navegar("/")}}>
            <img className="buho"  src={require("../flecha.png")} alt="img/brigadistas"  width={30}/>
          </button>
        </div>
        <img className="buho4" src={require("../buho.png")} alt="img/buho" />
      <h1>Reestablecer Contraseña</h1>
      <form onSubmit={handleRestablecerContraseña}>
        <div className="form-group">
          <label htmlFor="usuario"><strong>Usuario:</strong></label>
          <input
            type="text"
            id="usuario"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nueva-contraseña"><strong>Nueva Contraseña:</strong></label>
          <input
            type="password"
            id="nueva-contraseña"
            placeholder="Ingrese su nueva contraseña"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmar-contraseña"><strong>Confirmar Contraseña:</strong></label>
          <input
            type="password"
            id="confirmar-contraseña"
            placeholder="Confirme su nueva contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit" >Restablecer</button>

        
      </form>
    </div>
  );
}

export default ReestablecerContraseña;
