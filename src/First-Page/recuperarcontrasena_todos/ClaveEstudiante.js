import React, { useState } from "react";
import "../css/index.css";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import URL from '../../URL.js'
import axios from 'axios';

const ClaveEstudiante = () => {

    const [Datos, setDatos] = useState({});
  
    const Escribir = (e) => {
      setDatos({
        ...Datos,
        [e.target.name]: e.target.value.trim(),
        tipousuario : 7485,
        d : 0
      });
    }
    
    console.log(Datos.Correo);
    async function noRecargar(e) {
      e.preventDefault();
  
      const consulta = await axios({
        method: "post",
        url: `${URL.servidor}/api-php-react/Crud_Cambiar_clave.php`,
        data : Datos
      })

      if (Object.keys(Datos).length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Vacios',
          text: '¡Recuerda llenar todos los campos!'
        })
      } else {
        Swal.fire({
          title: '¿El correo ingresado es el correcto?',
          showDenyButton: true,
          confirmButtonText: `¡Si!`,
          denyButtonText: `Corregir`,
          text: Datos.Correo
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(consulta.data);
            if (consulta.data === true) {
              Swal.fire("¡Perfecto!", "Revisa tu correo", "success").then(() => {
                window.location.replace("/")
  
              });
            } else {
              Swal.fire("No existe!", "Corrige tu correo", "warning");
            }
          }
        })
      }
    };
  
    return (
      <div className="container mt-5 mb-5">
        <h2 className="text-center mt-5 dt"> ¿Haz olvidado tú contraseña? </h2>
        <p className="text-center">¡No te preocupes, te ayudaremos!</p>
        <div className="mt-5 m-auto">
          {" "}
          <p className="text-center bg-dark  text-white mt-5">
            Estimado <span className="font-weight-bold text-uppercase"> Estudiante </span>por favor ingresa el correo de la cuenta que desea recuperar la
            contraseña.
          </p>

          <div className=" w-80 h-25 mt-5 m-auto text-center">

  
            <form
              onSubmit={noRecargar}
              className="container-sm mt-3"
              autoComplete="off"
            >
              <input
                className="form-control w-75 m-auto form-input-recuperar"
                name="Correo"
                id="emailto"
                onChange={Escribir}
                minLength="5"
                maxLength="40"
                required
                pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
                type="email"
                placeholder="Correo registrado"
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                name="submit"
                className="mt-4 mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="30"
                  fill="currentColor"
                  className=" bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ClaveEstudiante;
