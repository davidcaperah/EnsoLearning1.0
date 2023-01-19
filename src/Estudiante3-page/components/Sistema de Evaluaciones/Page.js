import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cronometro from "./Cronometro";
import Pregunta from "./Pregunta";
import Preguntas from "./Preguntas";
import URL from "../../../URL";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const Page = () => {
  const datosEvaluacionEstudiantes = useSelector(
    (state) => state.datosEvaluacionEstudiantes
  );
  const [valorPregunta, setValor] = useState(1);
  const [preguntass, setPreguntass] = useState({});
  const [preguntaUnitaria, setUnitaria] = useState({});
  const [iniciarr, setIniciar] = useState(false);
  const respuestaEvaluacion = useSelector((state) => state.respuestaEvaluacion);
  const tiempoSalioEva = useSelector((state) => state.tiempoSalioEva);
  const horasEvaluacion = useSelector((state) => state.horasEvaluacion);
  const SegundosEvaluacion = useSelector((state) => state.SegundosEvaluacion);
  const MinutosEvaluacion = useSelector((state) => state.MinutosEvaluacion);

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  const Desencriptar = (NombreCookie, Llave) => {
    let IdEncriptado = cookies.get(NombreCookie);
    let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave);
    let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return Datos;
  };

  let idCurso = Desencriptar("idCurso", "A");

  const siguiente = (n) => {
    const valor = valorPregunta + n;
    console.log(valor);
    setValor(valor);
    setUnitaria(preguntass[valorPregunta]);
  };

  const enviarExamen = async () => {
    const DatosJson = JSON.stringify({
      d: 3,
      respuesta: respuestaEvaluacion,
      id_eva: datosEvaluacionEstudiantes.evaluacion.id,
      horas: horasEvaluacion,
      minutos: MinutosEvaluacion,
      segundos: SegundosEvaluacion,
      tiempoSalio: tiempoSalioEva,
      id_estu: datosEvaluacionEstudiantes.estudiante,
      id_curso: idCurso,
    });
    console.log(DatosJson);
    const api = axios.create({ baseURL: URL.servidor });
    const response = await api.post(
      "/api-php-react/Cargar_evaluacion_m.php",
      DatosJson
    );
    const data = response.data;
    if (data !== "") {
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Se ha enviado la respuestas de la evaluacion",
          text: "Su evaluación ha sido guardada y enviada con el id: " + data,
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.replace("/EstudianteTwoEvaluaciones");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error",
        });
      }
    }
  };

  const iniciar = () => {
    setIniciar(true);
    setValor(1);
    setUnitaria(preguntass[0]);
  };
  useEffect(() => {
    const traerPreguntas = async () => {
      const datos = {
        d: 2,
        idm: datosEvaluacionEstudiantes.evaluacion.id,
      };
      const datosEstu = JSON.stringify(datos);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_evaluacion_m.php",
        datosEstu
      );
      const data = response.data;
      setPreguntass(data);
    };
    traerPreguntas();
  }, [datosEvaluacionEstudiantes]);
  return (
    <div className="p-md-5 col-sm-12" id="validar">
      <div className="mx-5 pb-4 pt-4 bg-dark col-md-9 col-sm-12 m-auto">
        {iniciarr ? (
          <div>
            <Cronometro
              minutosx={datosEvaluacionEstudiantes.evaluacion.tiempo}
            />
            <div className="row shadow bg-light">
              <div className="col-md-12">
                <div className="col text-center p-4"></div>
                {preguntaUnitaria === undefined && <p>sin preguntas.</p>}
                {preguntaUnitaria !== undefined && (
                  <div>
                    <Pregunta
                      pregunta={preguntaUnitaria.pregunta}
                      numero={valorPregunta}
                      id={datosEvaluacionEstudiantes.evaluacion.id}
                    />
                  </div>
                )}
                <Preguntas
                  opciones={preguntaUnitaria}
                  numero={valorPregunta}
                  id={datosEvaluacionEstudiantes.evaluacion.id}
                />
              </div>
            </div>

            {valorPregunta < preguntass.length && (
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="d-flex jjustify-content-evenly"
                  onClick={() => siguiente(1)}
                >
                  <div className="rounded-circle pointer p-3  text-center text-white shadow-lg  Areas">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-arrow-right-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {/* } */}

            {valorPregunta === preguntass.length && (
              <div className="col text-center p-4">
                <button
                  className="btn btn-info mt-3"
                  onClick={() => enviarExamen()}
                >
                  Enviar evaluación
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="col-md-12">
            <div className="col text-center p-4">
              <button
                className="btn btn-warning"
                type="submit"
                onClick={() => iniciar()}
              >
                {" "}
                INICIAR{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
