import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function ReestablecerContraseña({ listaUsuarios, setListaUsuarios }) {
  let navegar = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const limpiarCampos = () => {
    setUsuario("");
    setNuevaContraseña("");
    setConfirmarContraseña("");
  };

  const handleRestablecerContraseña = (e) => {e.preventDefault();

    // Verificar si el usuario existe en la lista de usuarios
    const usuarioExistente = listaUsuarios.find((usr) => usr.user === usuario);

    if (usuarioExistente) {
      if (nuevaContraseña === confirmarContraseña) {
        // Actualizar la contraseña del usuario
        const usuariosActualizados = listaUsuarios.map((usr) => {
          if (usr.user === usuario) {
            return { ...usr, pass: nuevaContraseña };
          }
          return usr;
        });

        setListaUsuarios(usuariosActualizados);
        alert("Contraseña restablecida exitosamente");
        limpiarCampos();
        navegar("/");
      } else {
        limpiarCampos();
        alert("Las contraseñas no coinciden")
      }
    } else {
      limpiarCampos();
      alert("Usuario no encontrado");
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
