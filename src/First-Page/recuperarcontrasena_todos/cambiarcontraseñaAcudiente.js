import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import Swal from "sweetalert2";
import axios from 'axios';
import URL from './../../URL';




const Cambiarcontraseña = () => {

  const [Datos, setDatos] = useState({});
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  let DatosJson = "";
  // const params = useParams();

  if (token) {
    let datos = {
      token: token,
      d : 1
    }
    DatosJson = JSON.stringify(datos);
  } else {
    window.location.replace("/");
  }

  useEffect(() => {
    const sendData = async () => {
      const api = axios.create({ baseURL: URL.servidor });
      const respuesta = await api.post('/api-php-react/Crud_Cambiar_clave.php', DatosJson);
      console.log(DatosJson);
      setDatos({
        ...Datos,
        infotoken: respuesta.data
        // d : 
      })
      
      console.log(respuesta);
      if (!respuesta.data) {
        window.location.replace("/");
      } else {

      }
    }
    sendData();
  }, [Datos,DatosJson]);

  const Escribir = (e) => {
    setDatos({
      ...Datos,
      [e.target.name]: e.target.value.trim(),
      d : 4
    });
  }

  const claveNueva = async () => {
    const api = axios.create({ baseURL: URL.servidor });
    const respuesta = await api.post('/api-php-react/Crud_Cambiar_clave.php', Datos);
    console.log(respuesta);
    const resinfo = respuesta.data;
    console.log(resinfo);
    return resinfo;
  }


  async function noRecargar(e) {
    e.preventDefault();
    if (Datos.clave === Datos.claveconfimar) {
      if (Object.keys(Datos).length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Vacios',
          text: '¡Recuerda llenar todos los campos!'
        })
      } else {
        Swal.fire({
          title: '¿Desea cambiar la contraseña?',
          showDenybutton: true,
          confirmbuttonText: `¡Si!`,
          denybuttonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            claveNueva().then(r => {
              Swal.fire({
                icon: 'success',
                title: 'Felicidades',
                text: '¡Tu contraseña ha sido cambiada!'
              })
              console.log(r);
              window.location.replace("/");
            }).catch( () =>{
              console.log("Error");
            })
          }
        })
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: '¡Las contraseñas NO son iguales!'
      })
    }
  };

  return (
    <div className="container mt-7 mb-7 shadow-lg h-25">
      <div className="m-5 w-100 m-auto  mt-7">
        <div className="w-100 m-auto  mt-7 p-2 text-center">
          <h2 className="mt-5 mb-4   text-center font-weight-bold">Cambio de contraseña</h2>
          <p>Por favor ingrese su nueva contraseña.</p>
          <form onSubmit={noRecargar}
            className="container-sm mt-3"
            autoComplete="off">
            <input
              className="form-control w-50 m-auto mb-1 form-input-recuperar"
              name="clave"
              id="clave"
              onChange={Escribir}
              minLength="5"
              maxLength="40"
              required
              pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              type="password"
              placeholder="Nueva contraseña"
            /> <input
              className="form-control w-50  mb-1 m-auto form-input-recuperar"
              name="claveconfimar"
              id="confirmclave"
              onChange={Escribir}
              minLength="5"
              maxLength="40"
              required
              pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              type="password"
              placeholder="Confirmar contraseña"
            />

           < button
              variant="contained"
              type="submit"
              color="primary"
              name="submit"
              className="mt-4 mb-4 text-center"

            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};
export default Cambiarcontraseña;

