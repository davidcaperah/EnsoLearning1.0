import React from "react";
import "../../../css/curso.css";

function CoursesView() {
  return (
    <div>
      <div className="cont-header-usuario-coor">
        <div>
          <h4>Mis cursos </h4>
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
          <div className="btn-crear-use-cordi">+ Crear curso</div>
        </div>
      </div>
      <div className="cont-filtos-crear-aula-coord1">
        <div>
          <h4>Grado</h4>
          <select>
            <option>Seleccionar el grado</option>
          </select>
        </div>
        <div>
          <h4>Curso</h4>
          <select>
            <option>Seleccionar el curso</option>
          </select>
        </div>
      </div>

      <div>
        <div className="tabla-docentes-coordi">
          <div className="titulo-tabla-docentes-coordi2">
            <div>Nombre del Estudiante</div>
            <div>Correo electronico</div>
            <div>Grado</div>
            <div>Curso</div>
            <div>Director de grupo</div>
          </div>

          <div className="datos-docente-coordi2">
            <div>docente.Nombre </div>
            <div>docente.Documento</div>
            <div>2</div>
            <div>201</div>
            <div>director grupo</div>
            <div className="btn-tabla-modifi-curso-coord">Modificar curso</div>
          </div>

          <div className="datos-docente-coordi2">
            <div>docente.Nombre </div>
            <div>docente.Documento</div>
            <div>2</div>
            <div>201</div>
            <div>director grupo</div>
            <div className="btn-tabla-modifi-curso-coord">Modificar curso</div>
          </div>

          <div className="datos-docente-coordi2">
            <div>docente.Nombre </div>
            <div>docente.Documento</div>
            <div>2</div>
            <div>201</div>
            <div>director grupo</div>
            <div className="btn-tabla-modifi-curso-coord">Modificar curso</div>
          </div>

          <div className="datos-docente-coordi2">
            <div>docente.Nombre </div>
            <div>docente.Documento</div>
            <div>2</div>
            <div>201</div>
            <div>director grupo</div>
            <div className="btn-tabla-modifi-curso-coord">Modificar curso</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesView;
