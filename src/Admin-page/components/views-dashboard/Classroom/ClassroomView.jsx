import React from "react";
import URL from "URL.js";
import "../../../css/curso.css";

function ClassroomView() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "30%",
      }}
    >
      <div className="cont-header-usuario-coor">
        <div>
          <h4>Mis aulas </h4>
          <svg
            width="473"
            height="412"
            viewBox="0 0 473 412"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M217.392 289.071C146.236 222.559 147.325 361.617 76.5106 297.795C39.8429 205.118 71.3377 105.766 146.856 75.8871C222.375 46.0084 313.32 96.9171 349.988 189.595C386.655 282.273 318.48 383.563 217.392 289.071Z"
              fill="#00639A"
              fillOpacity="0.9"
            />
            <path
              d="M282.878 275.356C253.463 247.189 227.833 198.048 261.714 171.381C295.595 144.713 380.526 143.015 407.194 176.897C433.861 210.778 428.013 259.862 394.132 286.53C360.251 313.197 309.545 309.237 282.878 275.356Z"
              fill="#FFBB5E"
              fillOpacity="0.9"
            />
          </svg>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="btn-crear-use-cordi">+ Crear aula</div>
        </div>
      </div>
      <div className="cont-cursos-coord-v1">
        <div className="cont-cursos-coord-v2">
          <div>
            <div className="card-aula">
              <img
                src={`${URL.servidor}Archivos_u/iconos/aulaMatematicas.svg`}
              />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
          <div>
            <div className="card-aula">
              <img
                src={`${URL.servidor}Archivos_u/iconos/aulaMatematicas.svg`}
              />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
          <div>
            <div className="card-aula">
              <img
                src={`${URL.servidor}Archivos_u/iconos/aulaMatematicas.svg`}
              />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
          <div>
            <div className="card-aula">
              <img src={`${URL.servidor}Archivos_u/iconos/aula-ciencias.svg`} />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
          <div>
            <div className="card-aula">
              <img src={`${URL.servidor}Archivos_u/iconos/aulaGeometria.svg`} />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
          <div>
            <div className="card-aula">
              <img src={`${URL.servidor}Archivos_u/iconos/aulaGeometria.svg`} />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
          <div>
            <div className="card-aula">
              <img src={`${URL.servidor}Archivos_u/iconos/aulaGeometria.svg`} />
              <h5>Matematicas</h5>
              <h6>Curso 103</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassroomView;
