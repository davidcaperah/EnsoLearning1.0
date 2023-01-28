import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import Calendario from "components/calendario";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "URL";

const Crear = () => {
  const docente = useSelector((state) => state.docente);
  const aulaSeleccionada = useSelector((state) => state.aulaSeleccionada);
  let idMateria = aulaSeleccionada.id_materia;
  const [vista, setvista] = useState(0);
  const [evaluaciones, setevaluaciones] = useState([]);
  const [respuestas, setrespuestas] = useState([]);
  const [curso, setcurso] = useState(0);
  const [respuesta, setrespuesta] = useState([]);
  const [pregutares, setpregutares] = useState([]);
  const [preguntas, setpreguntas] = useState([]);
  const [comentario, setcomentario] = useState();
  const currentCurse = useSelector((state) => state.aulaSeleccionada);

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();
  const Desencriptar = (NombreCookie, Llave) => {
    let IdEncriptado = cookies.get(NombreCookie);
    let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave);
    let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return Datos;
  };

  let iduser = Desencriptar("iduser", "A");
  let idcol = Desencriptar("idcol", "A");
  function cargar(e, r) {
    setvista(e);
    setcurso(r);
  }
  const onChange = (e) => {
    setcomentario({ ...comentario, [e.target.name]: e.target.value });
  };
  const calificar = (respt) => {
    if (comentario) {
      if (comentario.comentario) {
        if (comentario.periodo > 0) {
          Swal.fire({
            title: "Ingrese la nota del estudiante",
            text: "nota del 1 al 100",
            input: "number",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Guardar",
            showLoaderOnConfirm: true,
            preConfirm: (nota) => {
              const DatosJson = JSON.stringify({
                d: 0,
                id_estu: respt.id_estu,
                id_docente: iduser,
                id_colegio: idcol,
                id_curso: respt.id_curso,
                id_materia: idMateria,
                id_actividad: respt.id_eva,
                id_solucion: respt.id,
                id_nota: nota,
                comentario: comentario.comentario,
                tipo: 2,
                periodo: comentario.periodo,
              });
              const api = axios.create({ baseURL: URL.servidor });
              const response = api.post(
                "/api-php-react/Crear_Notas.php",
                DatosJson
              );
              const data = response.data;
              return data;
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                title: `${result.value}'actividad calificada`,
              });
            }
            setvista(0);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hace falta el campo periodo",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hace falta el campo comentario",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "hacen falta campos por llenar",
      });
    }
  };
  function cargar_respuesta(e, r) {
    setvista(e);
    setrespuesta(r);
  }
  useEffect(() => {
    const data = {
      d: 19,
      id_curso: currentCurse.id_curso,
    };
    const dataJSON = JSON.stringify(data);
    axios
      .post(`${URL.servidor}/api-php-react/info_docente.php`, dataJSON)
      .then((res) => {
        setevaluaciones(res.data);
      });
  }, [vista]);
  useEffect(() => {
    const data = {
      d: 21,
      id: curso.id,
    };
    const dataJSON = JSON.stringify(data);
    axios
      .post(`${URL.servidor}/api-php-react/info_docente.php`, dataJSON)
      .then((res) => {
        res = res.data;
        setrespuestas(res);
        var resultado = JSON.parse(res[0].resultado);
        setpregutares(resultado);
      });
  }, [curso]);
  useEffect(() => {
    const data1 = {
      d: 2,
      idm: respuesta.id_eva,
    };
    const dataJSON1 = JSON.stringify(data1);
    axios
      .post(`${URL.servidor}/api-php-react/Cargar_evaluacion_m.php`, dataJSON1)
      .then((res) => {
        res = res.data;
        let datos = [];
        for (let llave in res) {
          let elemento = res[llave];
          if (elemento.Tipo === 2) {
            for (const key in pregutares) {
              const element = pregutares[key];
              if (element[0] === elemento.id) {
                datos = [
                  ...datos,
                  {
                    pregunta: elemento.pregunta,
                    respuesta: element[1],
                    id: elemento.id,
                  },
                ];
              }
            }
          }
          setpreguntas(datos);
        }
      });
  }, [respuesta]);

  return (
    <div className="container-flex">
      <div>
        <div className="row contenedor-ecaluacion">
          <div className="col-md-3 col-xs-3 header-evaluacion">
            <p>{`Evaluaciones`}</p>
            <h3>Calificar Evaluaciones</h3>
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
            <div className="d-flex flex-row justify-content-center">
              <div className="col-sm-12 col-md-3 col-xl-4 p-2 px-3 py-5 ">
                <h5
                  className={`opciones-evaluaciones ${
                    vista === 0 ? "opcio-evalu-activa" : "opcio-evalu-desacti"
                  }`}
                  onClick={() => setvista(0)}
                >
                  Evaluaciones Activas
                </h5>
              </div>
              <div className="col-sm-12 col-md-3 col-xl-4 p-2 px-3 py-5  ">
                <h5
                  className={`opciones-evaluaciones ${
                    vista === 1 ? "opcio-evalu-activa" : "opcio-evalu-desacti"
                  }`}
                  onClick={() => setvista(1)}
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
              {vista === 0 && evaluaciones
                ? evaluaciones.map((evaluacion) =>
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
                          <button
                            onClick={() => cargar(2, evaluacion)}
                            className="btn btn-primary"
                          >
                            Calificar
                          </button>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    ) : null
                  )
                : null}

              {vista === 1
                ? evaluaciones.map((evaluacion) =>
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
                          <div className="con-ico-card-evaluaciones"></div>
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
                          <div></div>
                        </div>
                      </div>
                    ) : null
                  )
                : null}
              {vista === 2 ? (
                <div className="col-md-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Estudiante</th>
                        <th scope="col">Respuesta</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {respuestas ? (
                        respuestas.map((item) => (
                          <tr>
                            <th scope="row">
                              {item.Nombree} {item.Apellidoe}
                            </th>
                            <td>
                              <span
                                className="text-center pointer"
                                title="Abrir Respuesta"
                                onClick={() => cargar_respuesta(3, item)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  className="bi bi-file-earmark-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
                                </svg>
                              </span>
                            </td>
                            <td>{item.n_estado}</td>
                            <td>{item.fecha}</td>
                            <td>
                              <div className="row">
                                <div className="col-md-6">
                                  <span title="Calificar" className="calificar">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="currentColor"
                                      className="bi bi-check-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                                    </svg>
                                  </span>
                                </div>
                                <div className="col-md-6">
                                  <span title="Eliminar" className="eliminar">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>Ningún estudiante a respondido la evaluación</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {vista === 3 ? (
                <div className="col-md-12">
                  <div className="card">
                    <h5 className="card-header">Ver Respuesta Evaluacion</h5>
                    <div className="card-body">
                      <h5 className="card-title">
                        {respuesta.Nombree} {respuesta.Apellidoe}
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <strong>Curso:</strong> {respuesta.curso_nombre}°
                        </div>
                        <div className="col-md-6">
                          <strong>fecha entrega :</strong> {respuesta.fecha}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <strong> Preguntas Selección multiple: </strong>{" "}
                          {respuesta.correctas} / {respuesta.calificadas}
                        </div>
                        <div className="col-md-6">
                          <strong> Preguntas Abiertas: </strong>{" "}
                          {respuesta.abiertas} En total
                        </div>
                      </div>
                      <div className="row">
                        {!respuesta.n_estado === "Calificado" && (
                          <div className="col-md-6">
                            <strong> periodo: </strong>
                            <select
                              className="form-select"
                              name="periodo"
                              onChange={onChange}
                            >
                              <option value=" " selected>
                                Seleccione
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <br />
                      <h5 className="text-center">
                        <strong>Respuestas de preguntas abiertas</strong>
                      </h5>
                      {preguntas ? (
                        preguntas.map((pre) => (
                          <ul className="list-group list-group-flush">
                            <strong>{pre.pregunta}</strong>
                            R//
                            <p>{pre.respuesta}</p>
                          </ul>
                        ))
                      ) : (
                        <h5>error al cargar preguntas</h5>
                      )}
                      {respuesta.nota > 0 ? (
                        <ul className="list-group list-group-flush text-center">
                          Ya se encuentra calificado la nota es
                          <strong>{respuesta.nota}</strong>
                        </ul>
                      ) : (
                        <ul className="list-group list-group-flush">
                          <h2>Comentario</h2>
                          <textarea
                            name="comentario"
                            rows="5"
                            cols="50"
                            onChange={onChange}
                          ></textarea>
                          <br />
                          <button
                            className="btn btn-primary"
                            onClick={() => calificar(respuesta)}
                          >
                            Calificar
                          </button>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Crear;
