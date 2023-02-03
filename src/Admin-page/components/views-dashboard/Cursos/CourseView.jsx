import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "services/courses";
import "../../../css/curso.css";

function CourseView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getById({ d: 0, id }).then((res) => {
      setCourse(res.data[0]);
    });
  }, [id]);
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
      <div style={{ width: "91.333%" }}>
        <div
          onClick={() => navigate("/AdminLearn/courses")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px",
            border: "2px solid #000",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
          }}
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
      </div>
      <div className="cont-header-usuario-coor">
        <div style={{ height: "400px" }}>
          <h4>Información del curso {course.Curso_Nu}</h4>
          <svg
            width="450"
            height="450"
            viewBox="0 0 450 412"
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0px",
          width: "91.333%",
        }}
      >
        <div>
          <h3>Docente acargo:</h3>
          <h4>{`${course.Nombres} ${course.Apellidos}`}</h4>
        </div>
        <div>
          <h3>Cupos:</h3>
          <h4>{course.Can_Est}</h4>
        </div>
        <div>
          <h3>Cantidad de materias:</h3>
          <h4>{course.materias}</h4>
        </div>
        <div>
          <h3>Promedio:</h3>
          <h4>{course.promedio === null ? 0 : course.promedio}</h4>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", width: "91.3333%" }}
      >
        <div className="tabla-docentes-coordi" style={{ width: "100%" }}>
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

export default CourseView;
