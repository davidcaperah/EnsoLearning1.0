import React from "react";
import URL from "../../URL.js";
import "../css/docente.css";

const Menu = () => {
  return (
    <div className="menu-coordinador">
      <div className="list-group">
        <li className="btn-menu">
          <img src={`${URL.servidor}Archivos_u/iconos/menu1.svg`} />
        </li>
        <li className="alert-primary-mio   btn-menu ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="40px"
            height="40px"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              imageRendering: "optimizeQuality",
              fillRule: "evenodd",
              clipRule: "evenodd",
            }}
          >
            <path
              style={{ opacity: "0.903" }}
              fill="#afafaf"
              d="M 15.5,1.5 C 15.5,4.16667 15.5,6.83333 15.5,9.5C 11.5,12.5 7.5,15.5 3.5,18.5C 1.93819,18.2671 0.60486,17.6005 -0.5,16.5C -0.5,15.5 -0.5,14.5 -0.5,13.5C 4.83333,9.5 10.1667,5.5 15.5,1.5 Z"
            />
            <path
              style={{ opacity: "0.96" }}
              fill="#777777"
              d="M 15.5,1.5 C 17.3925,2.70166 19.2258,4.03499 21,5.5C 23.0408,4.57692 25.2075,4.24358 27.5,4.5C 26.659,8.57488 27.9924,11.5749 31.5,13.5C 31.5,14.5 31.5,15.5 31.5,16.5C 30.3951,17.6005 29.0618,18.2671 27.5,18.5C 23.8578,15.0134 19.8578,12.0134 15.5,9.5C 15.5,6.83333 15.5,4.16667 15.5,1.5 Z"
            />
            <path
              style={{ opacity: "0.959" }}
              fill="#d6d6d6"
              d="M 15.5,9.5 C 15.5,13.5 15.5,17.5 15.5,21.5C 13.631,23.6353 12.9644,26.3019 13.5,29.5C 10.1667,29.5 6.83333,29.5 3.5,29.5C 3.5,25.8333 3.5,22.1667 3.5,18.5C 7.5,15.5 11.5,12.5 15.5,9.5 Z"
            />
            <path
              style={{ opacity: "0.885" }}
              fill="#afafaf"
              d="M 15.5,9.5 C 19.8578,12.0134 23.8578,15.0134 27.5,18.5C 27.5,22.1667 27.5,25.8333 27.5,29.5C 24.1667,29.5 20.8333,29.5 17.5,29.5C 18.0356,26.3019 17.369,23.6353 15.5,21.5C 15.5,17.5 15.5,13.5 15.5,9.5 Z"
            />
          </svg>
          <a className="h6 alert-link-mio" href="/AdminSchool">
            {" "}
            Home{" "}
          </a>
        </li>

        {/* <li className="alert-primary-mio   btn-menu ">
          <img src={`${URL.servidor}Archivos_u/iconos/icon-docentes.svg`} />
          <a className="h6 alert-link-mio" href="/AdminTeacher">
            {" "}
            Usuario{" "}
          </a>
        </li> */}

        <li className="alert-primary-mio btn-menu ">
          <img src={`${URL.servidor}Archivos_u/iconos/icon-misaulas.svg`} />
          <a className="h6 alert-link-mio" href="/AdminStudent">
            Comunicaciones
          </a>
        </li>

        <li className="alert-primary-mio btn-menu ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-stack mr-2"
            viewBox="0 0 16 16"
          >
            <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
            <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
          </svg>

          <a className="h6 alert-link-mio" href="/AdminLearn">
            {" "}
            Cursos{" "}
          </a>
        </li>

        {/* <li className="alert-primary-mio  btn-menu  ">
          <img src={`${URL.servidor}Archivos_u/iconos/icon-estadisticas.svg`} />
          <a className="h6 alert-link-mio" href="/AdminStatistics">
            Estadísticas
          </a>
        </li> */}

        <li className="alert-primary-mio  btn-menu  ">
          <img src={`${URL.servidor}Archivos_u/iconos/icon-evaluaciones.svg`} />
          <a className="h6 alert-link-mio" href="/AdminAnuncios">
            Anuncios
          </a>
        </li>
      </div>
    </div>
  );
};

export default Menu;
