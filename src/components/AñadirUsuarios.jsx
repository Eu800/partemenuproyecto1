import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AñadirUsuarios(props) {
  let navegar = useNavigate();
  // Se obitene la lista desestrcuturando el props
  const { lista } = props;
  // Se define una variable de estado para el nuevo usuario
  const [usuario, setUsuario] = useState({
    user: "",
    apellido: "",
    correo: "",
    pass: "",
    telef: "",
  });
  // Se define una variable de estado para comprobar la contraseña
  const [repetirPass, setRepetirPass] = useState("");

  function agregarUsuario() {
    // Si las contraseñas no coinciden, se enviará una alerta de error
    if (usuario.pass !== repetirPass.pass) {
      alert("Tus contraseñas no coinciden");
      console.log(lista);
      return;
    }
    
    // Se valida si el nuevo usuario coincide con uno ya ingreaso anteriormente
    if (lista.find((usr) => usr.user === usuario.user) === undefined) {
      lista.push(usuario);
      navegar("/");
      // Se muestra una alerta avisando que se registró correctamente
      alert("Te has registrado exitosamente :)")
      console.log(lista);
    }
    // Caso contrario, se muestra una alerta con el fallo de registro 
    else alert("nombre de usuario ya existe!!!!");

  }
  return (
    <div className="todo">
      <img className="buho3" src={require("../buho.png")} alt="img/buho" />
      <button
        onClick={() => {
          navegar("/");
        }}
      >
        <img className="buho"  src={require("../flecha.png")} alt="img/brigadistas" width={30} />
      </button>

      <h1>Registro de Usuarios</h1>
      <form>
        <div className="form-group">
          <label htmlFor="nombre"><strong>Nombre:</strong></label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese su nombre"
            required
            onChange={(e) => setUsuario({ ...usuario, user: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido"><strong>Apellido:</strong></label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingrese su apellido"
            required
            onChange={(e) =>
              setUsuario({ ...usuario, apellido: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"><strong>Correo Electrónico:</strong></label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            required
            onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><strong>Contraseña:</strong></label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            required
            onChange={(e) => setUsuario({ ...usuario, pass: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password"><strong>Repetir Contraseña:</strong></label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Repita su contraseña"
            required
            onChange={(e) =>
              setRepetirPass({ ...usuario, pass: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone"><strong>Número de Celular:</strong></label>
          <input
            type="tel"
            id="phone"
            placeholder="Ingrese su número de celular"
            required
            onChange={(e) => setUsuario({ ...usuario, telef: e.target.value })}
          />
        </div>
        <button  type="submit" onClick={agregarUsuario}>
          Registrar
        </button>
      </form>
      
    </div>
  );
}

export default AñadirUsuarios;
