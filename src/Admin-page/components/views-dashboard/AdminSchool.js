import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Calendario from "../../../components/calendario.js";
import decode from "utils/decode.js";

const AdminSchool = () => {
  const dispatch = useDispatch();
  const idUser = decode("iduser", "A");
  const [currSchool, setCurrSchool] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="cont-princi-docentes">
      <div className="cont-imagen-docentes1">
        <div className="titulo-Vista">
          Bienvenido coordinador o administrativo
        </div>
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
