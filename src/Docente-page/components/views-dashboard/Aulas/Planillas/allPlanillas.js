/**
 * ==================================================
 * Sistema de planeación de recursos empresariales
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Volver from "../volver";
import URL from "../../../../../URL";
import { useSelector, useDispatch } from "react-redux";

import Agenda from "./Agenda";
import Notas from "./Notas";
const AllPlanillas = () => {
  const dispatch = useDispatch();
  const [Estudiantes, setEstudiantes] = useState([]);
  const [CambiarInterfazModal, setCambiarInterfazModal] = useState(0);
  const [letraFiltro, setLetraFiltro] = useState("*");
  const planillasCurso = useSelector((state) => state.planillasCurso);
  const infoCurso = useSelector((state) => state.aulaSeleccionada);
  const letras = [
    "A",
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let promGene = 0;

  useEffect(() => {
    axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/info_estudiante.php`,
      data: {
        d: 9,
        Curso: planillasCurso.id,
      },
    }).then((res) => setEstudiantes(res.data));
  }, [planillasCurso.id]);

  const filtrarLetra = (e) => {
    let letra = e.target;
    let letraAbe = letra.textContent.trim();
    setLetraFiltro(letraAbe);
  };

  const cambiarInterfaz = (num, estudiante) => {
    setCambiarInterfazModal(num);

    /*dispatch({
            type : "@updateNumberInterfazAula",
            numberInterfazAula : num
        })*/
    dispatch({
      type: "@updateplanillasEstudiante",
      planillasEstudiante: estudiante,
    });
  };

  Estudiantes.map((el) => {
    promGene = promGene + el.promedio;
  });

  const retoceder = () => {
    setCambiarInterfazModal(0);
  };
  return (
    <div>
      <div className="row">
        <div className="col-4 header-evaluacion">
          <p
            style={{ marginTop: "-10px" }}
          >{`Mis cursos > curso ${infoCurso.Curso_Nu} > Planilla academica`}</p>
          <svg width="450" height="329" xmlns="http://www.w3.org/2000/svg">
            <g>
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
              <path
                id="svg_1"
                d="m-62.73355,95.39714c0,-18.47489 15.52511,-34 34,-34l198.15189,-0.74845c18.47489,0 21.98169,16.27356 21.98169,34.74845l0,140.10437c0,18.47489 -15.52511,34 -34,34l-186.13358,0c-18.47489,0 -34,-15.52511 -34,-34l0,-140.10437z"
                transform="rotate(-38.07, 64.3332, 165.075)"
                opacity="undefined"
                strokeWidth="0"
                stroke="#000"
                fill="#1a9de6"
              />
              <path
                id="svg_4"
                d="m173.72947,288.66466c-58.18398,0 -105.31301,-66.99734 -105.31301,-149.71011c0,-82.71277 47.12902,-149.71011 105.31301,-149.71011c58.18398,0 105.31301,66.99734 105.31301,149.71011c0,82.71277 -47.12902,149.71011 -105.31301,149.71011z"
                transform="rotate(-39.4198, 173.729, 138.955)"
                opacity="undefined"
                strokeWidth="0"
                stroke="#000"
                fill="#1a9de6"
              />
              <path
                transform="rotate(5.35963, 292.176, 133.786)"
                id="svg_5"
                d="m274.4103,235.03182c-34.58399,-2.57567 -102.49867,-32.07525 -101.12153,-108.44843c1.37714,-76.37317 56.78618,-94.49819 114.99135,-94.49819c58.20517,0 129.22522,75.64336 122.33951,137.27213c-6.88571,61.62877 -101.62535,68.25016 -136.20934,65.67449z"
                opacity="undefined"
                strokeWidth="0"
                stroke="#000"
                fill="rgba(255,175,141,.9)"
              />
            </g>
          </svg>
        </div>
        <div className="col-5 d-flex justify-content-start align-items-center">
          <div>
            <Volver />
          </div>
          <div className="cont-title-planilla">Planillas academicas</div>
        </div>
        <div className="col-3 d-flex align-items-end justify-content-start cont-estu-promedio-planilla">
          <p>
            Total estudiantes <strong> {Estudiantes.length} </strong> <br />
            Promedio General <strong> {promGene}</strong>
          </p>
        </div>
      </div>
      <div className="row cont-estudiantes-planilla">
        {CambiarInterfazModal === 7 ? (
          <Agenda cerrarAgenda={retoceder} />
        ) : null}
        {CambiarInterfazModal === 6 ? <Notas cerrarNota={retoceder} /> : null}
        {Estudiantes.length === 0 && (
          <div className="shadow p-3 m-2 bg-white m-auto rounded">
            <h6>
              {" "}
              Este curso no cuenta actualmente con estudiantes asignados.{" "}
            </h6>
          </div>
        )}

        {Estudiantes.map((data) =>
          letraFiltro === data.Apellido.charAt(0).toUpperCase() ||
          letraFiltro === "*" ? (
            <div className="col-3 card-planilla-academica2 px-0" key={data.id}>
              <div className="d-flex justify-content-center align-items-center px-3">
                <img
                  className="rounded-circle "
                  width="150px"
                  height="150px"
                  src={`${URL.servidor}${data.imagen}`}
                  alt={"Enso Learning " + data.nombre + data.Apellido}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center nombre-card-planilla">
                {data.Apellido} {data.Nombre}
              </div>
              <div className="d-flex flex-row justify-content-center cont-btn-planilla">
                <div
                  className="enviarMensaje-planilla"
                  onClick={() => cambiarInterfaz(7, data)}
                >
                  <img
                    src={`${URL.servidor}Archivos_u/iconos/mensajes.svg`}
                    alt="student"
                  />
                  <div>Enviar mensaje</div>
                </div>
                <div
                  className="enviarNotas-planilla"
                  onClick={() => cambiarInterfaz(6, data)}
                >
                  <img
                    src={`${URL.servidor}Archivos_u/iconos/icon-misaulas.svg`}
                    alt="data"
                  />
                  <div>Notas</div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="cont-letras-planilla">
        <ul onClick={filtrarLetra}>*</ul>
        {letras.map((el) => (
          <ul onClick={filtrarLetra} key={el}>
            {el}{" "}
          </ul>
        ))}
      </div>
    </div>
  );
};
export default AllPlanillas;
