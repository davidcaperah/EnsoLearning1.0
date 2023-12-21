import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import URL from "../../../URL.js";
import Swal from "sweetalert2";
import "../../css/evaluaciones.css";
import Evaluaciones from "./Aulas/Evaluaciones";
import Calendario from "../../../components/calendario.js";

const DocenteEvaluaciones = () => {
  const [CodMateria, setCodMateria] = useState([]);

  const [DatosRecibidos, setDatosRecibidos] = useState([]);
  const [select, setselect] = useState([]);
  const [curso, setcurso] = useState([]);
  // const [estado, setEstado] = useState({})
  const [numeroInterfaz, setnumeroInterfaz] = useState(0);
  const [datosEnviar, setdatosEnviar] = useState({});
  const [estadoEvalua, serEstadoEvalua] = useState(0);
  const [evafecha, setevafecha] = useState();
  const [mes, setMes] = useState(new Date().getMonth());
  let año = new Date().getFullYear();
  let ultiDiaMes = new Date(año, mes + 1, 0); // numero del ultimo dia del mes
  let fechaIni = new Date(año, mes, 1).toString(); // numero primer dia del mes
  let diaSemana = fechaIni.slice(0, 3); // que dia de la semana es lunes martes o miercoles etc  en el cual inicia la semana
  let fecha = ultiDiaMes.toString();
  let diasMes = parseInt(fecha.slice(8, 10)); //ultimo dia del mes como entero para el for
  let arregloDias = [];

  for (let i = 1; i <= diasMes; i++) {
    arregloDias.push(i);
  }

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  const Desencriptar = (NombreCookie, Llave) => {
    let IdEncriptado = cookies.get(NombreCookie);
    let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave);
    let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return Datos;
  };

  // let idCol = Desencriptar("idcol" , "A")
  let iduser = Desencriptar("iduser", "A");

  const Datos = {
    d: 0,
    idDoc: iduser,
  };
  const Data = {
    d: 13,
    id: iduser,
  };
  const de = {
    d: 14,
    curso: curso,
    id: 0,
  };
  const gdato = (e) => {
    setcurso(e.target.value);
  };
  const evaluaEstado = (e) => {
    if (e.target.textContent === "Evaluaciones Activas") {
      serEstadoEvalua(0);
    } else if (e.target.textContent === "Evaluaciones por asignar") {
      serEstadoEvalua(1);
    } else if (e.target.textContent === "Evaluaciones vencidas") {
      serEstadoEvalua(2);
    }
  };

  const cambiarEstado = async (id, eva) => {
    console.log("🚀 ~ file: DocenteEvaluaciones.jsx:74 ~ cambiarEstado ~ eva", eva)
    if (eva === 2) {
      eva = 1;
    } else {
      eva = 2;
    }
    const enviar = {
      id: id,
      estado: eva,
      d: 6,
      fecha: evafecha,
    };
    const datosEnviar = JSON.stringify(enviar);
    const api = axios.create({ baseURL: URL.servidor });
    const response = await api.post(
      "/api-php-react/Cargar_evaluacion_m.php",
      datosEnviar
    );
    const data = response.data;
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Se ha cambiado el estado",
      });
    }
    window.location.reload()
  };
  const asingar_curso = async (id) => {
    de.id = id;
    const DatosJson = JSON.stringify(de);
    const api = axios.create({ baseURL: URL.servidor });
    const response = await api.post(
      "/api-php-react/info_docente.php",
      DatosJson
    );
    const data = response.data;
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Curso asignado",
      });
      window.location.reload();
    }
  };
  const eliminarEva = (eva) => {
    Swal.fire({
      title: "¿Quieres eliminar esta evaluación?",
      showDenybutton: true,
      confirmbuttonText: `Si`,
      denybuttonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let datosEvalua = {
          d: 9,
          id: eva.id,
        };
        const datosEnviar = JSON.stringify(datosEvalua);
        const api = axios.create({ baseURL: URL.servidor });
        const response = await api.post(
          "/api-php-react/info_docente.php",
          datosEnviar
        );
        const data = response.data;
        console.log(data);
        const evaluas = DatosRecibidos.filter((data) => data.id !== eva.id);
        setDatosRecibidos(evaluas);
      }
    });
  };

  useEffect(() => {
    const sendData = async () => {
      const DatosJson = JSON.stringify(Datos);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_evaluacion_m.php",
        DatosJson
      );
      const data = response.data;
      setDatosRecibidos(...DatosRecibidos, data);
    };
    const Datase = async () => {
      const DatosJson = JSON.stringify(Data);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/info_docente.php",
        DatosJson
      );
      const data = response.data;
      setselect(...select, data);
    };
    sendData();
    Datase();
  }, []);

  useEffect(() => {
    const idDocente = JSON.stringify({ id: iduser });
    const api = axios.create({ baseURL: URL.servidor });
    api.post("/api-php-react/Cargar_Curaula.php", idDocente).then((res) => {
      setCodMateria(res.data);
    });
    // probar()
    //eslint-disable-next-line
  }, []);

  //esto es para calificar la actividad
  const editAct = (eva, n) => {
    setnumeroInterfaz(n);
    setdatosEnviar(eva);
  };
  const grabar = (e) => {
    console.log(e.target.value);
    setevafecha(e.target.value);
  };
  const crearEvaluacion = () => {
    setnumeroInterfaz(1);
  };
  const volver = () => {
    setnumeroInterfaz(0);
  };
  return (
    <div className="container-flex">
      {numeroInterfaz === 0 ? (
        <div>
          <div className="row contenedor-ecaluacion">
            <div className="col-md-3 col-xs-3 header-evaluacion">
              <p>{`Evaluaciones`}</p>
              <h3>Evaluaciones</h3>
              <svg width="430" height="290" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeWidth="0"
                  transform="rotate(42.3141, 142.34, 128.318)"
                  id="svg_1"
                  d="m142.31161,201.31344c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 124.11448,79.06179 92.53753,125.09326c-31.57695,46.03147 -65.69122,60.41077 -127.09997,30.53378l0,0.00001z"
                  opacity="undefined"
                  stroke="#000"
                  fill="#ffe051"
                />
                <path
                  strokeWidth="0"
                  transform="rotate(3.44996, 96.437, 194.375)"
                  id="svg_6"
                  d="m85.67218,274.0409c-54.73653,-1.12407 -146.407,-21.18349 -148.99923,-101.90566c-2.59222,-80.72218 113.33626,-73.67283 187.65755,2.46831c74.32129,76.14114 181.97181,20.27043 105.87094,59.48369c-76.10086,39.21326 -89.79273,41.07773 -144.52927,39.95366z"
                  opacity="undefined"
                  stroke="#000"
                  fill="#ffe051"
                />
                <path
                  transform="rotate(8.65267, 264.951, 169.881)"
                  id="svg_7"
                  d="m255.64946,237.14642c-56.53371,-2.38947 -102.74717,73.20136 -110.27689,-20.95875c-7.52972,-94.1601 42.4552,-145.08178 98.58667,-139.62287c56.13147,5.45892 140.65277,38.24618 141.31992,96.70895c0.66715,58.46276 -73.09599,66.26213 -129.6297,63.87267z"
                  opacity="undefined"
                  strokeWidth="0"
                  stroke="#000"
                  fill="rgba(255,175,141,.9)"
                />
              </svg>
            </div>
            <div className="col-md-8 col-xs-8  flex-column d-flex justify-content-end ">
              <div className="d-flex flex-row h-100 align-items-center justify-content-end mr-3 pr-5 mt-5 pt-5 ">
                <div className="boton-evaluacion" onClick={crearEvaluacion}>
                  + Crear evaluacion
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center">
                <div className="col-sm-12 col-md-3 col-xl-4 p-2 px-3 py-5 ">
                  <h5
                    className={`opciones-evaluaciones ${
                      estadoEvalua === 0
                        ? "opcio-evalu-activa"
                        : "opcio-evalu-desacti"
                    }`}
                    onClick={evaluaEstado}
                  >
                    Evaluaciones Activas
                  </h5>
                </div>
                <div className="col-sm-12 col-md-3 col-xl-4 p-2 px-3 py-5   ">
                  <h5
                    className={`opciones-evaluaciones ${
                      estadoEvalua === 1
                        ? "opcio-evalu-activa"
                        : "opcio-evalu-desacti"
                    }`}
                    onClick={evaluaEstado}
                  >
                    Evaluaciones por asignar
                  </h5>
                </div>
                <div className="col-sm-12 col-md-3 col-xl-4 p-2 px-3 py-5  ">
                  <h5
                    className={`opciones-evaluaciones ${
                      estadoEvalua === 2
                        ? "opcio-evalu-activa"
                        : "opcio-evalu-desacti"
                    }`}
                    onClick={evaluaEstado}
                  >
                    Evaluaciones vencidas
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row contenedor-ecaluacion">
            <div className="col-md-3 col-xl-3 d-flex  justify-content-center ml-5">
              <Calendario
                contenedor={`cont-calendario`}
                diasCale={`dias-calendario`}
              />
            </div>
            <div className="col-md-8 col-xl-8">
              <div className="row">
                {estadoEvalua === 0
                  ? DatosRecibidos.map((evaluacion) =>
                      parseInt(evaluacion.estado) === 1 &&
                      parseInt(evaluacion.id_curso) !== 0 ? (
                        <div
                          className="cont-card-evaluacion col-3 "
                          key={evaluacion.id}
                        >
                          <div className="d-flex flex-row">
                            <div className="estado-evaluaciones">
                              Estado:Activo{" "}
                            </div>
                            <div className=""></div>
                          </div>
                          <div className="cont-datos-evaluaciones">
                            <div>
                              <h2> {evaluacion.Titulo}</h2>
                              <h4 className="overflow">
                                Descripcion: {evaluacion.texto}{" "}
                              </h4>
                            </div>
                            <div>
                              <p>
                                Fecha de creacion <br />
                                {evaluacion.fecha_c}
                                <br />
                                Fecha max de entrega: <br />
                                {evaluacion.fecha_max} <br />
                                cantidad de preguntas : {evaluacion.preguntas}
                              </p>
                            </div>
                            <div>
                              {parseInt(evaluacion.estado) === 1 ? (
                                <div className="p-2">
                                  {" "}
                                  <p> Estado : Activo </p>{" "}
                                </div>
                              ) : parseInt(evaluacion.estado) === 2 ? (
                                <div className=" p-2">
                                  {" "}
                                  <p> Estado : Inactiva </p>{" "}
                                </div>
                              ) : parseInt(evaluacion.estado) === 0 ? (
                                <div className=" p-2">
                                  {" "}
                                  <p> Estado : Inactiva </p>{" "}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <div
                                className="btn-estado-evaluacion"
                                onClick={() => {
                                  cambiarEstado(
                                    evaluacion.id,
                                    evaluacion.estado
                                  );
                                }}
                              >
                                {parseInt(evaluacion.estado) === 1
                                  ? "Inactiva"
                                  : parseInt(evaluacion.estado) === 2
                                  ? "Activo"
                                  : parseInt(evaluacion.estado) === 0
                                  ? "Activo"
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )
                  : null}

                {estadoEvalua === 1
                  ? DatosRecibidos.map((evaluacion) =>
                      parseInt(evaluacion.estado) === 1 &&
                      parseInt(evaluacion.id_curso) === 0 ? (
                        <div
                          className="cont-card-evaluacion col-3 "
                          key={evaluacion.id}
                        >
                          <div className="d-flex flex-row">
                            <div className="estado-evaluaciones1">
                              Estado:Por asignar{" "}
                            </div>
                            <div className="con-ico-card-evaluaciones">
                              <div onClick={() => eliminarEva(evaluacion)}>
                                <img
                                  src={`${URL.servidor}Archivos_u/iconos/papelera-de-reciclaje.svg`}
                                  alt="trash"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="cont-datos-evaluaciones">
                            <div className="overflow">
                              <h2> {evaluacion.Titulo}</h2>
                              <h4>Descripcion: {evaluacion.texto} </h4>
                            </div>
                            <div>
                              <p>
                                Fecha de creacion <br />
                                {evaluacion.fecha_c}
                                <br />
                                Tiempo estimado <br />
                                {evaluacion.tiempo} min <br />
                                cantidad de preguntas : {evaluacion.preguntas}
                              </p>
                            </div>
                            <div>
                              <select
                                name="cursos"
                                id="cursos"
                                onChange={gdato}
                              >
                                <option value="">aula</option>
                                {CodMateria.map((curso) => (
                                  <option value={curso.id_curso}>
                                    {curso.Curso_Nu}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {
                              <div>
                                <div
                                  className="btn-estado-evaluacion"
                                  onClick={() => {
                                    asingar_curso(evaluacion.id);
                                  }}
                                >
                                  asignar
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      ) : null
                    )
                  : null}
                {estadoEvalua === 2
                  ? DatosRecibidos.map((evaluacion) =>
                      parseInt(evaluacion.estado) === 2 ? (
                        <div
                          className="cont-card-evaluacion col-3 "
                          key={evaluacion.id}
                        >
                          <div className="d-flex flex-row">
                            <div className="estado-evaluaciones1">
                              Estado:Por asignar{" "}
                            </div>
                            <div className="con-ico-card-evaluaciones">
                              <div onClick={() => eliminarEva(evaluacion)}>
                                <img
                                  src={`${URL.servidor}Archivos_u/iconos/papelera-de-reciclaje.svg`}
                                  alt="trash"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="cont-datos-evaluaciones">
                            <div className="overflow">
                              <h2> {evaluacion.Titulo}</h2>
                              <h4>Descripcion: {evaluacion.texto} </h4>
                            </div>
                            <div>
                              <p>
                                Fecha de creacion <br />
                                {evaluacion.fecha_c}
                                <br />
                                Tiempo estimado <br />
                                {evaluacion.tiempo} min <br />
                                cantidad de preguntas : {evaluacion.preguntas}
                              </p>
                            </div>
                            <div>
                              <input
                                type="date"
                                name="fecha"
                                id="fecha"
                                onChange={grabar}
                              />
                            </div>
                            {
                              <div>
                                <div
                                  className="btn-estado-evaluacion"
                                  onClick={() => {
                                    cambiarEstado(
                                      evaluacion.id,
                                      evaluacion.estado
                                    );
                                  }}
                                >
                                  {parseInt(evaluacion.estado) === 1
                                    ? "Inactiva"
                                    : parseInt(evaluacion.estado) === 2
                                    ? "Activar"
                                    : parseInt(evaluacion.estado) === 0
                                    ? "Activar"
                                    : null}
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      ) : null
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : numeroInterfaz === 1 ? (
        <Evaluaciones volver={volver} />
      ) : null}
    </div>
  );
};

export default DocenteEvaluaciones;
