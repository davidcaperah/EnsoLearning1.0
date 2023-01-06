import React, { useState } from "react";
import "../css/index.css";


const Recuperarcontraseña = () => {

  const [Perfil, setPerfil] = useState({});


  const perfilKey = (e) => {
    setPerfil({
      ...Perfil,
      [e.target.name]: e.target.value.trim()
    });
  }


  const valorP = Object.values(Perfil);
  if (valorP[0] === "1") {
    window.location.replace("/ClaveEstudiante")
  } else if (valorP[0] === "2") {
    window.location.replace("/claveDocente")
  } else if (valorP[0] === "3") {
    window.location.replace("/ClaveAcudiente")
  } else if (valorP[0] === "4") {
    window.location.replace("/ClaveAdmin")
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mt-5 dt"> ¿Haz olvidado tú contraseña? </h2>
      <p className="text-center">¡No te preocupes, te ayudaremos!</p>
      <div className="mt-5 m-auto">
        {" "}
        <p className="text-center bg-dark  text-white mt-5">
          Selecciona tu perfil por favor.
        </p>

        <div className=" w-80 h-25 mt-5 m-auto text-center">

          <select className=" w-50 form-control m-auto " name="Estado" onChange={perfilKey}>
            <option unselectable="true" > ¿Eres? </option>
            <option value="1" > Estudiantes </option>
            <option value="2" > Docente </option>
            <option value="3" > Acudiente </option>
            <option value="4" > Coordinador </option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default Recuperarcontraseña;
