import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../URL";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import Evaluacion from "./Evaluacion";
import Page from "./Sistema de Evaluaciones/Page";
import Calendario from "../../components/calendario";
import EvalCard from "../../components/EvalCard";
import "../css/evaluaciones.css";
function Evaluaciones() {
  const numberInterfazEstudiantes = useSelector(
    (state) => state.numberInterfazEstudiantes
  );
  const dispatch = useDispatch();

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  const Desencriptar = (NombreCookie, Llave) => {
    let IdEncriptado = cookies.get(NombreCookie);
    let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave);
    let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return Datos;
  };

  let idCurso = Desencriptar("idCurso", "A");
  let iduser = Desencriptar("iduser", "A");

  const [ArregloDeActividades, setArregloDeActividades] = useState([]);
  const [idEvaluacion, setidEvaluacion] = useState(0);

  const mostrarEvaluaciones = (Acti, num) => {
    dispatch({
      type: "@updatenumberInterfazEstudiantes",
      numberInterfazEstudiantes: num,
    });
    setidEvaluacion(Acti);
  };

  const cargarEvaluaciones = async () => {
    const consulta = await axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/Cargar_evaluacion_m.php`,
      data: {
        d: 1,
        id_curso: idCurso,
      },
    });
    setArregloDeActividades(consulta.data);
  };

  useEffect(() => {
    cargarEvaluaciones();
  }, []);

  useEffect(() => {
    let circulo = document.getElementById("circulo1-aulas-estu1");
    let circulo2 = document.getElementById("circulo2-aulas-estu1");
    circulo.addEventListener("animationend", (e) => {
      circulo.style.top = "176px";
      circulo.style.left = "318px";
      circulo2.style.top = "375px";
      circulo2.style.left = "96px";
      console.log(circulo2);
    });
  }, []);

  console.log(ArregloDeActividades);
  return (
    <div>
      {numberInterfazEstudiantes === 0 ? (
        <div>
          <div className="cont-info-evaluaciones-estudiantes">
            <div className="cont-img-estu1-aulas d-flex justify-content-center aling-items-center">
              <img
                alt="robot-ciclo1"
                src={`${URL.servidor}Archivos_u/iconos/cientifica.svg`}
              />
            </div>
            <div
              id="circulo1-aulas-estu1"
              className="circulo-evaluaciones-estu1"
            ></div>
            <div
              id="circulo2-aulas-estu1"
              className="circulo1-evaluaciones-estu1"
            ></div>

            <div className="informacion-evaluaciones-estu1">
              <h4>Bienvenido a tus evaluaciones</h4>
              <p>
                Aqui podras encontrar todas las evaluaciones disponibles para
                desarrollar en este periodo.
              </p>
            </div>
          </div>
          <div className="evaluacio-estu-1">
            <h4>Evaluaciones pendientes por realizar</h4>
          </div>
          <div className="cont-evaluaciones-estu1">
            <div className="cont-cards-evaluaciones-estu1">
              {ArregloDeActividades.map((Acti) => (
                <EvalCard
                  key={Acti.id}
                  eva={Acti}
                  onClick={mostrarEvaluaciones}
                />
              ))}
            </div>
            <div className="cont-calentadrio-estu-evalua">
              <Calendario
                contenedor={`cont-calendario-home1`}
                diasCale={`dias-calendario-home`}
                colorLetra={"mes-calendario2"}
              />
            </div>
          </div>
        </div>
      ) : null}
      {numberInterfazEstudiantes === 1 ? (
        <div className="container mt-4">
          <div className="p-3 m-2 shadow">
            <div className="d-flex justify-content-start">
              <div className="pointer rounded-circle shadow  p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  onClick={() => mostrarEvaluaciones({}, 0)}
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </div>
            </div>
            <Evaluacion idEvaluacion={idEvaluacion} iduser={iduser} />
          </div>
        </div>
      ) : null}

      {numberInterfazEstudiantes === 2 ? <Page /> : null}
    </div>
  );
}

export default Evaluaciones;
