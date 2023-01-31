import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import URL from "../../../URL.js";
import EditColegio from "./editColegio";
import { useDispatch } from "react-redux";
import Calendario from "../../../components/calendario.js";

const AdminSchool = () => {
  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();
  const dispatch = useDispatch();
  let IdAdminEncriptado = cookies.get("iduser");
  let bytesadmin = CryptoJS.AES.decrypt(IdAdminEncriptado, "A");
  let IdAdmin = JSON.parse(bytesadmin.toString(CryptoJS.enc.Utf8));

  const Datos = {
    id: IdAdmin,
  };

  const [DatosRecibidos, setDatosRecibidos] = useState({});
  const [Validacion, setValidacion] = useState(0);

  useEffect(() => {
    const sendData = async () => {
      let DatosJson = JSON.stringify(Datos);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_col.php",
        DatosJson
      );
      setDatosRecibidos(response.data);
      console.log(DatosRecibidos);
      let CryptoJS = require("crypto-js");
      const cookies = new Cookies();
      cookies.remove("idcol");

      let idEncriptado = CryptoJS.AES.encrypt(
        JSON.stringify(response.data.id),
        "A"
      ).toString();
      cookies.set("colid", idEncriptado, {
        path: "/",
        expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
      });
    };
    sendData();
    //eslint-disable-next-line
  }, []);

  const editarCole = (num) => {
    setValidacion(num);
    dispatch({
      type: "@updateInfoCoordi",
      infoCoordi: DatosRecibidos,
    });
  };

  return (
    <div className="cont-princi-docentes">
      <div className="cont-imagen-docentes1">
        <div className="titulo-Vista">Bienvenido docentes</div>
        <div className="titulo-Vista1"> I.E.D Gonzalo Arango </div>
      </div>

      <div>
        <div className="cont-info-home1 container-event">
          <div className="backdrop-home backdrop-calendar">proximamente...</div>
          <div>
            <h4>Agenda</h4>
            <div className="cont-agenda-home">
              <div>
                <p>Reunion area de ciencia</p>
                <p>13-Enero-2021</p>
              </div>
              <div>
                <p>Reunion docentes con rector</p>
                <p>20-enero-2022</p>
              </div>
              <div>
                <p>Entrega de boletines 1 periodo</p>
                <p> 02-febrero-2021</p>
              </div>
              <div className="d-flex justify-content-end ver-mas-agenda">{`Ver mas >`}</div>
            </div>
          </div>

          <div>
            <Calendario
              contenedor={`cont-calendario-home`}
              diasCale={`dias-calendario-home`}
              colorLetra={"mes-calendario-contenido"}
            />
          </div>

          <div className="container-event">
            <div className="backdrop-home backdrop-event">proximamente...</div>
            <h4>Proximos eventos intitucionales</h4>
            <ul>
              <li>Dia del idioma</li>
              <li>Dia de la tierra</li>
              <li>Semana de la ciencia</li>
              <li>Integracion halloween</li>
            </ul>
          </div>
          <div className="cont-circulares-home container-event">
            <div className="backdrop-home backdrop-circulars">
              proximamente...
            </div>
            <h4>Criculares</h4>
            <div>
              <p>
                <strong>Circular 122 de 2021</strong> <br />
                Acuerdos de convivencia institucional
              </p>
            </div>
            <div>
              <p>
                <strong>Circular 121 de 2021</strong> <br />
                Actualizacion medidad de bioseguridad
              </p>
            </div>
            <div>
              <p>
                <strong>Circular 122 de 2021</strong> <br />
                Proceso electoral estudiantil 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSchool;
