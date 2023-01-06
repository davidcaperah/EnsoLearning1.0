import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendario from "../../../../components/calendario";
import axios from "axios";
import URL from "../../../../URL";

const Crear = () => {
  const [evalue, setEvalue] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isDefeated, setIsDefeated] = useState(false);
  const currentCurse = useSelector((state) => state.aulaSeleccionada);
  const dispatch = useDispatch();
  const volver = (e) => {
    dispatch({
      type: "@updateNumberInterfazAula",
      numberInterfazAula: 1,
    });
  };

  useEffect(() => {
    const data = {
      d: 19,
      id_curso: currentCurse.id_curso,
    };
    const dataJSON = JSON.stringify(data);
    axios
      .post(`${URL.servidor}/api-php-react/info_docente.php`, dataJSON)
      .then((res) => {
        setEvalue(res.data);
      });
  }, [currentCurse.id_curso]);

  const handleActive = () => {
    setIsActive(!isActive);
    setIsDefeated(!isDefeated);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3 header-evaluacion">
          <p style={{ marginTop: "20px", marginLeft: "10px" }}>
            {"Evaluacion"}
          </p>
          <h3 style={{ marginTop: "10px" }}>Estado evaluaciones</h3>
          <svg width="430" height="310" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#ffe051"
              stroke="#000"
              opacity="undefined"
              d="m142.31161,201.31344c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 124.11448,79.06179 92.53753,125.09326c-31.57695,46.03147 -65.69122,60.41077 -127.09997,30.53378l0,0.00001z"
              id="svg_1"
              transform="rotate(42.3141, 142.34, 128.318)"
              strokeWidth="0"
            />
            <path
              fill="#ffe051"
              stroke="#000"
              opacity="undefined"
              d="m85.67218,274.0409c-54.73653,-1.12407 -146.407,-21.18349 -148.99923,-101.90566c-2.59222,-80.72218 113.33626,-73.67283 187.65755,2.46831c74.32129,76.14114 181.97181,20.27043 105.87094,59.48369c-76.10086,39.21326 -89.79273,41.07773 -144.52927,39.95366l0.00001,0z"
              id="svg_6"
              transform="rotate(3.44996, 96.437, 194.375)"
              strokeWidth="0"
            />
            <path
              fill="rgba(255,175,141,.9)"
              stroke="#000"
              strokeWidth="0"
              opacity="undefined"
              d="m255.52083,241.45521c-61.03073,-2.63906 -111.62908,103.06236 -118.83419,-14.73957c-7.20511,-117.80193 45.83233,-160.23607 106.42882,-154.20696c60.59649,6.02912 151.8411,42.24113 152.56132,106.81053c0.72022,64.5694 -79.12522,64.77504 -140.15595,62.13599z"
              id="svg_7"
              transform="rotate(24.6954, 265.855, 177.239)"
            />
          </svg>
        </div>
        <div
          className="volver-actividadCurso d-flex justify-center items-center"
          style={{ zIndex: 1000 }}
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
        <div className="col-8 d-flex justify-content-center align-items-end con-descri-crearEvaluacion">
          <h6>
            En este espacio podras Gestionar las evaluaciones de los estudiantes
            y generar un exportable con las notas de los estudiantes.
          </h6>
        </div>
      </div>
      <div className="row">
        <div
          className="col-md-3 col-xl-4 d-flex  justify-content-center ml-5"
          style={{ margimBotton: "20px", marginLeft: "10px" }}
        >
          <Calendario
            contenedor={`cont-calendario`}
            diasCale={`dias-calendario`}
          />
        </div>
        <div style={{ width: "50%" }}>
          <div
            className="d-flex justify-around"
            style={{ width: "100%", justifyContent: "space-around" }}
          >
            <div>
              <h5
                style={
                  !isActive
                    ? { color: "#9D9D9D" }
                    : {
                        color: "#FFAF8D",
                        borderColor: "#FFAF8D",
                        borderBottom: "2px solid",
                      }
                }
                onClick={handleActive}
              >
                Evaluaciones activas
              </h5>
            </div>
            <div>
              <h5
                style={
                  !isDefeated
                    ? { color: "#9D9D9D" }
                    : {
                        color: "#FFAF8D",
                        borderColor: "#FFAF8D",
                        borderBottom: "2px solid",
                      }
                }
                onClick={handleActive}
              >
                Evaluaciones vencidas
              </h5>
            </div>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", overflowX: "scroll" }}
          >
            {
              isDefeated?evalue.map((e) => {
                return e.estado===2&&(
                  <div className="cont-card-evaluacion col-3 " key={e.id}>
                    <div className="d-flex flex-row">
                      <div className="estado-evaluaciones-vencida">Estado: Vencida </div>
                      <div className=""></div>
                    </div>
                    <div className="cont-datos-evaluaciones">
                      <div>
                        <h2>{e.Titulo} </h2>
                        <h4 className="overflow">Descripcion: {e.texto} </h4>
                      </div>
                      <div>
                        <p>
                          Fecha de creacion: {e.fecha_c} <br />
                          <br />
                          Fecha max de entrega: {e.fecha_max} <br />
                          <br />
                          cantidad de preguntas : {e.preguntas}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }):evalue.map((e) => {
                return e.estado===1&&(
                  <div className="cont-card-evaluacion col-3 " key={e.id}>
                    <div className="d-flex flex-row">
                      <div className="estado-evaluaciones">Estado:Activo </div>
                      <div className=""></div>
                    </div>
                    <div className="cont-datos-evaluaciones">
                      <div>
                        <h2>{e.Titulo} </h2>
                        <h4 className="overflow">Descripcion: {e.texto} </h4>
                      </div>
                      <div>
                        <p>
                          Fecha de creacion: {e.fecha_c} <br />
                          <br />
                          Fecha max de entrega: {e.fecha_max} <br />
                          <br />
                          cantidad de preguntas : {e.preguntas}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Crear;
