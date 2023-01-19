import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import URL from "../../URL.js";
import Actividad from "./Actividad.js";
import Calendario from "../../components/calendario.js";
import ActivCard from "../../components/ActivCard";
import "../css/aulas.css";
import "../css/actividad.css";

function Actividades() {
  const [Validacion, setValidacion] = useState(true);
  const [Id, setId] = useState(0);
  const [ArregloDeActividades, setArregloDeActividades] = useState([]);

  const DesarrollarActividad = (Acti) => {
    setValidacion(false);
    setId(Acti);
  };

  const Volver = () => {
    setValidacion(true);
    setId(0);
  };

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  let IdEncriptado = cookies.get("idCurso");
  let bytes = CryptoJS.AES.decrypt(IdEncriptado, "A");
  let Idcurso = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const Datos = {
    id: Idcurso,
  };

  useEffect(() => {
    const TraerDatos = async () => {
      let idCurso = JSON.stringify({ curso: Datos.id, d: 1 });
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/info_estudiante.php",
        idCurso
      );
      const data = response.data;
      console.log(data);
      if (data.length > 0) {
        setArregloDeActividades(data);
      } else {
        setArregloDeActividades([]);
      }
    };
    TraerDatos();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let circulo = document.getElementById("circulo1-aulas-estu1");
    let circulo2 = document.getElementById("circulo2-aulas-estu1");
    circulo.addEventListener("animationend", (e) => {
      circulo.style.top = "196px";
      circulo.style.left = "308px";
      circulo2.style.top = "425px";
      circulo2.style.left = "106px";
      console.log(circulo2);
    });
  }, []);
  console.log(ArregloDeActividades);

  return (
    <div>
      {Validacion ? (
        <div>
          <div className="cont-info-evaluaciones-estudiantes">
            <div className="my-5">
              <div className="cont-img-estu1-aulas d-flex justify-content-center aling-items-center">
                <img
                  alt="robot-ciclo1"
                  src={`${URL.servidor}Archivos_u/iconos/astronauta.svg`}
                />
              </div>
              <div
                id="circulo1-aulas-estu1"
                className="circulo-Actividades-estu1"
              ></div>
              <div
                id="circulo2-aulas-estu1"
                className="circulo1-Actividades-estu1"
              ></div>
            </div>
            <div className="informacion-evaluaciones-estu1">
              <h4>Bienvenido a tus actividades</h4>
              <p>
                en este espacio podras encontrar todas las actividades asignadas
                por tus docentes para poner en practica tus conociminetos y
                adicionalemente encontraras tus lecturas asignadas.
              </p>
            </div>
          </div>
          <div className="evaluacio-estu-1">
            <h4>Lecturas asignadas</h4>
          </div>
          <div className="cont-actividades-estu1">
            <div>
              <div className="iconos-libro-acti-estu">
                <img
                  className="ico-selecio-libro-estu1"
                  src={`${URL.servidor}Archivos_u/iconos/categorias.svg`}
                  alt="Icono de categorias"
                />
                <img
                  src={`${URL.servidor}Archivos_u/iconos/menuHabu.svg`}
                  alt="imagen del libro"
                />
              </div>
              <div className="cont-libro-actividad-estu1">
                <div>
                  <img src={`${URL.servidor}Archivos_u/iconos/principe.svg`} />
                </div>
                <div className="info-libro-actividades-estu1">
                  <h5>Libro principito-Capitulo 1</h5>
                  <p>
                    El explorador traza su primer dibujo, el cual no era
                    entendido por los adultos, por que creian que era un
                    sombrero y no veian lo que habia en su interior. la
                    enseñanza que deja es que no hay que ver en su exterior de
                    una persona, si no que hay que ver lo bueno que hay en el
                    interior de ella.
                  </p>
                  <img
                    src={`${URL.servidor}Archivos_u/iconos/flecha-derecha.svg`}
                  />
                </div>
                <div className="btn-libros-acti-estu1">
                  <div className="btn-acti-lectura">Ver lectura</div>
                  <div className="btn-acti-biblioteca">ir a la biblioteca</div>
                </div>
              </div>
            </div>
            <div className="cont-calendario-acti-estu1">
              <Calendario
                contenedor={`cont-calendario-home1`}
                diasCale={`dias-calendario-home`}
                colorLetra={"mes-calendario2"}
              />
            </div>
          </div>
          <div className="evaluacio-estu-1">
            <h4>Actividades pendientes por realizar</h4>
          </div>
          <div className="cont-acti-estu-1">
            {ArregloDeActividades.map((Acti) => (
              <ActivCard
                key={Acti.id}
                acti={Acti}
                onClick={DesarrollarActividad}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="p-3 m-2 shadow">
            <div className="d-flex justify-content-start">
              <div className="pointer rounded-circle  p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  onClick={Volver}
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
            <Actividad idActividad={Id} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Actividades;
