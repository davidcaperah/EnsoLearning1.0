/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import Calificar from "./ActividadesFolder/CalificarActividad";
import { useSelector, useDispatch } from "react-redux";
import "../../../css/actividadesCurso.css";
import URL from "../../../../URL";

const Actividades = () => {
  const dispatch = useDispatch();
  const [Campos, setCampos] = useState({});
  const [Actividades, setActividades] = useState([]);

  const [item, setitem] = useState({});
  const [vista, setvista] = useState(1);

  const aulaSeleccionada = useSelector((state) => state.aulaSeleccionada);
  const docente = useSelector((state) => state.docente);

  let idCurso = aulaSeleccionada.id_curso;
  let iduser = docente.id;

  const C_vista = (x, item) => {
    setvista(x);
    setitem(item);
  };
  const volver = () => {
    dispatch({
      type: "@updateNumberInterfazAula",
      numberInterfazAula: 1,
    });
  };
  useEffect(() => {
    const TraerActividades = async () => {
      const DatosJson = JSON.stringify({ idc: idCurso, idP: iduser, d: 16 });
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/info_docente.php",
        DatosJson
      );
      const data = response.data;
      setActividades(data);
    };
    TraerActividades();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="row header-curso-actividades">
        <div className="cont-titulo-actividades ">
          <p>{`Mis aulas > Matematicas > Actividades`}</p>
          <h2>Curso {aulaSeleccionada.Curso_Nu}</h2>
          <svg width="450" height="329" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title></title>
              <line
                id="svg_2"
                y2="358"
                x2="331"
                y1="358"
                x1="334"
                stroke="#000"
                fill="none"
              />
              <line
                id="svg_3"
                y2="360"
                x2="41"
                y1="360"
                x1="42"
                stroke="#000"
                fill="none"
              />
              <path
                id="svg_1"
                d="m179.15621,301.11035c-75.62227,0.6074 -102.23703,-70.99978 -102.23703,-158.65384c0,-87.65405 21.79559,-158.73124 102.23703,-158.65384c80.44144,0.0774 120.62617,69.6731 120.62617,157.32715c0,87.65405 -45.0039,159.37312 -120.62617,159.98052z"
                transform="rotate(-45.1808, 188.351, 142.458)"
                opacity="undefined"
                strokeWidth="0"
                stroke="#000"
                fill="rgba(0, 99, 154, 1)"
              />
              <path
                transform="rotate(46.0603, 92.3902, 159.346)"
                id="svg_5"
                d="m93.06925,298.70801c-119.53433,-3.72845 -111.15796,-2.91478 -107.51344,-139.81685c3.64452,-136.90207 -1.08732,-139.81685 107.51344,-139.81685c108.60076,0 107.51344,-2.67789 107.51344,139.81685c0,142.49474 12.02089,143.5453 -107.51344,139.81685z"
                opacity="undefined"
                strokeWidth="0"
                stroke="#000"
                fill="rgba(0, 99, 154, 1)"
              />
              <path
                transform="rotate(4.34329, 299.059, 146.214)"
                id="svg_6"
                d="m290.42141,247.52273c-60.51065,0 -115.78777,-32.06681 -105.519,-109.00642c10.26878,-76.93961 40.9609,-93.61161 101.47155,-93.61161c60.51065,0 141.92979,79.45468 126.07168,140.41148c-15.85811,60.95681 -61.51359,62.20655 -122.02423,62.20655z"
                opacity="undefined"
                strokeWidth="0"
                stroke="#000"
                fill=" rgba(254, 166, 128, 0.9)"
              />
            </g>
          </svg>
        </div>
        <div className="cont-titulo-retroceder-activCurso">
          <div
            className="volver-actividadCurso d-flex justify-center items-center"
            onClick={volver}
          >
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>Layer 1</title>
                <line
                  id="svg_2"
                  y2="358"
                  x2="331"
                  y1="358"
                  x1="334"
                  stroke="#000"
                  fill="none"
                />
                <line
                  id="svg_3"
                  y2="360"
                  x2="41"
                  y1="360"
                  x1="42"
                  stroke="#000"
                  fill="none"
                />
                <line
                  strokeLinecap="undefined"
                  strokeLinejoin="undefined"
                  id="svg_1"
                  y2="14.93243"
                  x2="7.29732"
                  y1="6.14868"
                  x1="14.86486"
                  stroke="#00639A"
                  fill="none"
                />
                <path
                  id="svg_4"
                  d="m16.75675,3.71625l-9.45943,11.21618"
                  opacity="undefined"
                  strokeLinecap="undefined"
                  strokeLinejoin="undefined"
                  strokeWidth="4"
                  stroke="#00639A"
                  fill="none"
                />
                <path
                  id="svg_6"
                  d="m7.02705,12.36487l9.3243,10.94591"
                  opacity="undefined"
                  strokeLinecap="undefined"
                  strokeLinejoin="undefined"
                  strokeWidth="4"
                  stroke="#00639A"
                  fill="none"
                />
              </g>
            </svg>
          </div>
          <div className="titulo-curso-actividades">Actividades</div>
        </div>
      </div>
      <div className="d-flex justify-content-center cont-titu-actividade-curso">
        <div
          className={`${
            vista === 1 ? "curso-actividades-acti" : "curso-actividades-desacti"
          }`}
          onClick={() => C_vista(1, 0)}
        >
          Actividades activas
        </div>
        <div
          className={`${
            vista === 2 ? "curso-actividades-acti" : "curso-actividades-desacti"
          }`}
          onClick={() => C_vista(2, 0)}
        >
          Actividades vencidas
        </div>
      </div>
      <div
        className={`${
          vista === 3 ? ".cont-cards-acti-calificar" : "cont-cards-acti-curso"
        }`}
      >
        {vista === 1
          ? Actividades.length>0&&Actividades.some(e=>e.estado_d===1)?Actividades.map((item) =>
              item.estado_d === 1 && (
                <div key={item.id} className="card-curso-actividades">
                  <div className="card-cont-img">
                    <img
                      alt="matematicas-actividad"
                      src={URL.servidor + "/Archivos_u/iconos/" + item.imagen}
                    ></img>
                  </div>
                  <div className="card-info-actiCurso">
                    <h3>
                      Curso de {item.N_Materia} <br />
                      <strong> {item.Nombre}</strong>
                    </h3>
                    <p>
                      Vencimiento <br />
                      {item.fecha_MAX}
                    </p>
                    <div></div>
                  </div>
                  <div
                    className="d-flex justify-content-center con-btn-actiCurso"
                    onClick={() => C_vista(3, item)}
                  >
                    <div className="cont-btn-actividadCurso">Calificar</div>
                  </div>
                </div>
              )
            ):(
              <h1>No hay actividades asignadas a esta aula</h1>
            ):null}
        {vista === 2
          ?Actividades.length>0&&Actividades.some(e=>e.estado_d===2)?Actividades.map((item) =>
              item.estado_d === 2 && (
                <div key={item.id} className="card-curso-actividades">
                  <div className="card-cont-img">
                    <img
                      alt="matematicas-actividad"
                      src={URL.servidor + "/Archivos_u/iconos/" + item.imagen}
                    ></img>
                  </div>
                  <div className="card-info-actiCurso">
                    <h3>
                      Curso de {item.N_Materia} <br />
                      <strong> {item.Nombre}</strong>
                    </h3>
                    <p>
                      Vencimiento <br />
                      {item.fecha_MAX}
                    </p>
                    <div></div>
                  </div>
                  <div
                    className="d-flex justify-content-center con-btn-actiCurso"
                    onClick={() => C_vista(3, item)}
                  >
                    <div className="cont-btn-actividadCurso">Calificar</div>
                  </div>
                </div>
              )
              ):(
                <h1>No hay actividades vencidades</h1>
              ):null}
        {vista === 3 ? (
          <div>
            <Calificar actividad={item} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Actividades;
