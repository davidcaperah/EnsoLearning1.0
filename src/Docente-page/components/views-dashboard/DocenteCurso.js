import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import URL from "../../../URL.js";
import "../../css/miCurso.css";

const DocenteCurso = () => {
  // const planillasEstudiante = useSelector(state => state.planillasEstudiante);
  const numberInterfazCurso = useSelector((state) => state.numberInterfazCurso);
  const dispatch = useDispatch();
  const CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  const IdEncriptado = cookies.get("iduser");
  const bytes = CryptoJS.AES.decrypt(IdEncriptado, "A");
  const Id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const [curso, setcurso] = useState([]);
  const [DatosRecibidos, setDatosRecibidos] = useState([]);

  let idCurso = JSON.stringify(Id);

  console.log(curso);
  const getEstudiantes = async () => {
    const api = axios.create({ baseURL: URL.servidor });
    const response = await api.post(
      "/api-php-react/Cargar_Curaula2.php",
      idCurso
    );
    console.log(response);
    if (!response.data.mensaje) {
      setDatosRecibidos(...DatosRecibidos, response.data);
    } else {
      setDatosRecibidos([]);
    }
  };

  const verEstadistica = (data, num) => {
    dispatch({
      type: "@updateplanillasEstudiante",
      planillasEstudiante: data,
    });
    dispatch({
      type: "@updateInterfazCurso",
      numberInterfazCurso: num,
    });
  };
  useEffect(() => {
    const sendData = async () => {
      const DatosJson = JSON.stringify({ id: Id });
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_curpro.php",
        DatosJson
      );
      const data = response.data;
      setcurso(...curso, data);
    };
    sendData();
    getEstudiantes();
    //eslint-disable-next-line
  }, []);

  const cambiarInterfaz = (num) => {
    dispatch({
      type: "@updateNumberInterfazAula",
      numberInterfazAula: num,
    });
    dispatch({
      type: "@updateplanillasCurso",
      planillasCurso: curso,
    });
  };

  console.log(DatosRecibidos);
  return (
    <div>
      <div className="cont-header-curso row">
        <div className="header-miscursos col-4">
          <p>{`Mis cursos >`}</p>
          <h2>Mis cursos</h2>
          <svg width="450" height="360" xmlns="http://www.w3.org/2000/svg">
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
              <path
                id="svg_12"
                d="m93.99357,-13.49195c-0.99729,13.33178 6.00582,55.66498 74.01192,68.99676c47.66993,9.6664 50.33765,6.33217 109.00812,33.99946c22.66778,12.66729 32.58493,34.08501 34.87671,56.00275c2.29178,21.91774 -0.04167,52.3359 -43.87716,92.00452l-4.0002,4.00019c-59.01394,34.01051 -136.01773,33.01046 -177.01974,20.00982c-20.50101,-6.50032 -141.17927,-41.25999 -144.12241,-106.01294c-2.94314,-64.75295 110.11942,47.50279 154.17858,52.75328l-52.04719,-59.75473c-25.50678,-26.99691 -29.00971,-79.9973 -16.13546,-101.62226c12.0418,-24.79252 29.08384,-58.58547 65.12682,-60.37686z"
                opacity="NaN"
                strokeWidth="0"
                stroke="#000"
                fill="rgba(0, 99, 154, 1)"
              />
              <path
                id="svg_13"
                d="m34.99067,134.01542"
                opacity="NaN"
                strokeWidth="4"
                stroke="#000"
                fill="none"
              />
              <path
                id="svg_14"
                d="m198.07348,187.24998c0.17209,-29.99847 12.87363,-65.20548 21.15343,-67.22762c8.2798,-2.02215 25.5517,41.81062 41.01688,46.41109c15.46518,4.60047 36.4569,-15.5002 67.96927,-14.41107c31.51237,1.08913 70.60064,15.84712 79.17164,31.80127c8.57101,15.95415 4.83575,94.82436 -81.82061,106.39346c-86.65636,11.5691 -113.3869,-44.8083 -117.52627,-51.41983c-4.13937,-6.61154 -10.13643,-21.54884 -9.96434,-51.5473z"
                opacity="NaN"
                strokeWidth="0"
                stroke="#000"
                fill="rgba(255, 210, 94, 0.9)"
              />
            </g>
          </svg>
        </div>
        <div className="col-8">
          <div className="d-flex flex-column justify-content-end ">
            <div className="cont-descri-mi-curso">
              En este espacio podras encontrar la informacion general que
              necesitaras como director de curso horarios, planillas, agendas,
              observadores y mucho mas...
            </div>
            <div className="datos-salon-mi-curso">
              <div>
                <h3></h3>
                <p>Jornada mañana</p>
              </div>
              <div>
                <h3>25</h3>
                <p>estudiantes</p>
              </div>
              <div>
                <h3>10</h3>
                <p>Total materia</p>
              </div>
              <div>
                <h3>8.5</h3>
                <p>Promedio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="cont-opciones">
          <div
            className="cont-img-opciones"
            id="planilla"
            onClick={() => cambiarInterfaz(4)}
          >
            <p> Consulta y edita tus planillas academicas en tiempo real. </p>
            <h5>
              {" "}
              <strong> Planillas Academicas </strong>{" "}
            </h5>
          </div>

          <div
            className="cont-img-opciones"
            id="evaluaciones"
            onClick={() => cambiarInterfaz(2)}
          >
            <p> Crea o elije evaluaciones para tus estudiantes. </p>
            <h5>
              {" "}
              <strong> Evaluaciones </strong>{" "}
            </h5>
          </div>

          <div
            className="cont-img-opciones"
            id="actividades"
            onClick={() => cambiarInterfaz(3)}
          >
            <p> Crea o elije actividades para tus estudiantes. </p>
            <h5>
              {" "}
              <strong> Actividades </strong>{" "}
            </h5>
          </div>

          <div
            className="cont-img-opciones"
            id="libros"
            onClick={() => cambiarInterfaz(5)}
          >
            <p> Elije el libro que desees que tus estudiantes lean. </p>
            <h5>
              {" "}
              <strong> Libros </strong>{" "}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
    <div>
            {
                numberInterfazCurso === 0 &&
                < div >
                    <Info curso={curso} />
                    <div className="row" >
                        <div className="col-md-6" >
                            <Estudiantes curso={curso} />
                        </div>
                        <div className="col-md-6" >
                            <Publicaciones />
                        </div>

                    </div>
                    <h2 className="text-center text-warning">Estudiantes inscritos en el curso</h2>
                    <div className="row p-5" >
                        {DatosRecibidos.length === 0 &&
                            <div className="shadow p-3 m-2 m-auto" >
                                <h6> Este curso no cuenta actualmente con estudiantes asignados. </h6>
                            </div>
                        }
                        {DatosRecibidos.map(data =>
                            <div key={data.id} className="col-md-3" >
                                <div className="shadow p-3 m-2 rounded shadow bg-white border-1-mio">
                                    <div className="d-flex justify-content-center" >
                                        <img className="rounded-circle" width="130px" height="130px" src={`${URL.servidor}${data.imagen}`} alt="" />
                                    </div>
                                    <hr></hr>
                                    <h6 className="mt-3 text-center" > <strong> {data.Apellido} {data.Nombre}  </strong></h6>
                                    <hr></hr>
                                    <div className="d-flex justify-content-center" >
                                        <div className="bg-dark p-3 m-2 rounded-circle pointer text-warning Areas" onClick={() => verEstadistica(data, 2)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clipboard-data" viewBox="0 0 16 16">
                                                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            }

            {
                numberInterfazCurso === 2 &&
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 rounded-circle bg-white pointer" onClick={() => verEstadistica("", 0)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </div>
                    </div>
                    <EstadisticasStud />
                </div>
            }

        </div >
*/
export default DocenteCurso;
