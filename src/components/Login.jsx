import React, { useId, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const formRef = useRef(null);
  //variable de navegacion entre pantallas
  let navegar=useNavigate();
  
  const [linkClicked, setLinkClicked] = useState(false)
  const { parametro } = props;
  // fijar un estado inicial
  const [lista, setLista] = useState(parametro);

  // declarando un estado inicial con un objeto
  const [usuario, setUsuario] = useState({
    user: "",
    pass: "",
  });

  const handleInicio = () => {
    // Verificar si el usuario y la contraseña coinciden con los elementos de datosLista
    const validUser = lista.some(
      (item) => item.user === usuario.user && item.pass.toString() === usuario.pass
    );

    if (validUser) {
      console.log("Inicio de sesión exitoso");
      navegar("/menubrigadista/:"+usuario.user);
      formRef.current.reset();
      //limpiarCampos();
      // Realizar acciones adicionales después de iniciar sesión correctamente
    } else {
      alert("Datos Mal Ingresados")
      formRef.current.reset();
      //limpiarCampos();
      // Realizar acciones adicionales para manejar el inicio de sesión fallido
    }
  };

  return (
    <div className="fondo">
      <div className="todo">
      <img className="buho" src={require("../buho.png")} alt="img/buho" />
      <img className="buho2" src={require("../buho.png")} alt="img/buho" />
        <h1>Brigadas EPN</h1>
        <img className="escudo" src={require("../escudo.png")} alt="img/escudoepn" />
        <br />
        <p className="texto">
          <strong>
            Unidos por la protección fortaleciendo nuestra comunidad: Bienvenidos a
            la página de seguridad Brigada Comunitaria EPN
          </strong>
        </p>
        <hr />

        <form ref={formRef}>
          <div className="input-container" >
            <label id="uss" htmlFor="usurio"><strong>Usuario:</strong></label>
            <input
              id="us"
              type="text"
              placeholder="ingrese su usuario"
              onChange={(e) => setUsuario({ ...usuario, user: e.target.value })}
            />
            <br />
            <label htmlFor="pass"><strong>Contraseña:</strong></label>
            <input
              type="password"
              onChange={(e) => setUsuario({ ...usuario, pass: e.target.value })}
            />
          </div>
          <br />
          <button
            onClick={handleInicio}
          >
            Inicio
          </button>
        </form>

        <br />
        <label >
        <Link className="link-no-subrayado" to={"/login/newUser"}>¿No Tienes una Cuenta?</Link>
        </label>
        <img src={require("../Brigadistas.png")} alt="img/brigadistas" />
        <label >
        <Link className="link-no-subrayado" to={"/login/updatePass"}>Restablecer Contraseña</Link>
        </label>
      </div>
    </div>
  );
}

export default Login;
