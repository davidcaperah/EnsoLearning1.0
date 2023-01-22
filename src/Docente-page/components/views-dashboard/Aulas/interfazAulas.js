/**
 * ==================================================
 * Sistema de planeación de recursos empresariales
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
 */
import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import URL from "../../../../URL.js";
import axios from "axios";
import NoteModal from "./components/NoteModal";

const InterfazAulas = () => {
  const aulaSeleccionada = useSelector((state) => state.aulaSeleccionada);
  const dispatch = useDispatch();
  //const [datosLibros, setdatosLibros] = useState([])

  const docente = useSelector((state) => state.docente);

  const [curso, setcurso] = useState({});
  const [libros, setLibros] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const TraerDatos = async () => {
      let idCurso = JSON.stringify(aulaSeleccionada.id_curso);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_curid.php",
        idCurso
      );
      setcurso(response.data);
    };
    const traerLibros = async () => {
      let infoEnviarL = JSON.stringify({
        Id_curso: aulaSeleccionada.id_curso,
        id_Pro: docente.id,
        id_Mat: aulaSeleccionada.id_materia,
        d: 7,
      });

      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/info_docente.php",
        infoEnviarL
      );
      const data = response.data;

      setLibros(data);
    };
    TraerDatos();
    traerLibros();
    //eslint-disable-next-line
  }, []);
  const Volver = (e) => {
    dispatch({
      type: "@uploadAulaSeleccionada",
      aulaSeleccionada: {},
    });
    dispatch({
      type: "@updateNumberInterfazAula",
      numberInterfazAula: 0,
    });
  };

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

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <div>
      {isOpenModal &&
        ReactDOM.createPortal(
          <NoteModal handleStateModal={handleModal} />,
          document.getElementById("modal-container-render")
        )}
      <div className="cont-header-curso">
        <div className="row">
          <div className="cuadrado-header-curso">
            <div className="obalo-header-curso">
              <h2 onClick={Volver}>{`Mis aulas > aula ${curso.Curso_Nu}`}</h2>
            </div>
            <div className="obalo-rosado">
              <h2>Aula {curso.Curso_Nu}</h2>
            </div>
            <div className="obalo-rosado1"></div>
          </div>
        </div>
        <div className="row">
          <div className="cont-opciones-header">
            <div>
              <img
                onClick={() => cambiarInterfaz(4)}
                alt="planillaAcademica"
                src={`${URL.servidor}Archivos_u/iconos/user6.svg`}
              />
              <p>planillas academica</p>
            </div>
            <div>
              <img
                onClick={() => cambiarInterfaz(5)}
                alt="librosAsignados"
                src={`${URL.servidor}Archivos_u/iconos/libro-abierto 1.svg`}
              />
              <p>Libros asignados</p>
            </div>
            <div>
              <img
                onClick={() => cambiarInterfaz(2)}
                alt="evaluaciones"
                src={`${URL.servidor}Archivos_u/iconos/evaluacion1.svg`}
              />
              <p>Evaluaciones</p>
            </div>
            <div>
              <img
                onClick={() => cambiarInterfaz(3)}
                alt="actividades"
                src={`${URL.servidor}Archivos_u/iconos/actividades-ico.svg`}
              />
              <p>Actividades</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#fff"
                className="bi bi-card-text"
                viewBox="0 0 16 16"
                onClick={handleModal}
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
              <p>Notas</p>
            </div>
          </div>
          <div className="cont-info-jornada">
            <div>
              <p>
                <strong>Jornada</strong>
                <br />
                mañana
              </p>
            </div>
            <div className="separador-misAulas"></div>
            <div>
              <p>
                <strong>Director de grupo</strong>
                <br />
                {`${curso.Nombres} ${curso.Apellidos}`}
              </p>
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
export default InterfazAulas;
