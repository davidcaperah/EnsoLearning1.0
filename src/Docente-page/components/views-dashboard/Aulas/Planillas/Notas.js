/**
 * ==================================================
 * Sistema de planeación de recursos empresariales
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "URL";
import { useSelector } from "react-redux";
import "../../../../css/planillaAcademica.css";
import { TableBody, TableHead } from "@material-ui/core";

const Notas = (props) => {
  const data = useSelector((state) => state.planillasEstudiante);
  const planillaCurso = useSelector((state) => state.planillasCurso);
  const aulaSelect = useSelector((state) => state.aulaSeleccionada);

  const [promedios, setPromedios] = useState([]);
  // const [materianame, setmaterianame] = useState({});
  // const [estado, setestado] = useState(false);

  // let Datos = {
  //   d: 11,
  //   id: data.id,
  // };

  useEffect(() => {
    const parserJson = JSON.stringify({
      d: 20,
      id_col: planillaCurso.IdCol,
      id_estudiante: data.id,
      id_materia: aulaSelect.id_materia,
    });
    const api = axios.create({ baseURL: URL.servidor });
    api.post("/api-php-react/info_docente.php", parserJson).then((res) => {
      setPromedios(res.data);
    });
  }, [data.id, planillaCurso.IdCol]);

  return (
    <div className="d-flex position-fixed justify-content-center aling-items-center modal-agenda">
      <div>
        <div className="cont-modal-info">
          <div className="d-flex flex-colum ">
            <div className="col-6 modal-name-agenda ">Notas estudiante</div>
            <div className="col-6 d-flex justify-content-end aling-items-center cerrar-modal-agenda">
              <p onClick={props.cerrarNota}>X</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 d-flex justify-content-center aling-items-center my-5 ">
              <div className="card-notas-info">
                <div className="card-img-info">
                  <img
                    className="foto-notas"
                    src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`}
                    alt="foto de perfil del estudiante"
                  />
                </div>
                <div className="card-nom-notas">
                  {data.Nombre} {data.Apellido}
                </div>
                <div className="card-parrafo-notas">
                  <p>
                    Ciclo {data.Ciclo === 5 && "1"} {data.Ciclo === 6 && "2"}{" "}
                    {data.Ciclo === 7 && "3"} <br />
                    Promedio materia: {data.promedio} <br />
                    Total puntos: {data.Puntos} <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-5 d-flex flex-column mx-3 mt-5">
              <div className="titulo-materias-notas">
                <h6>Materia {aulaSelect.N_Materia}</h6>
              </div>
              <table>
                <TableHead className="notas-perido-notas">
                  <tr>
                    <td>Periodo</td>
                    <td>notas</td>
                  </tr>
                </TableHead>
                <TableBody className="notas-perido-nota">
                  {promedios.length === 0 ? (
                    <span>
                      Este estudiante no tiene notas en ningún periodo
                    </span>
                  ) : (
                    promedios.map((promedio) => (
                      <tr key={promedio.id}>
                        <td>{promedio.periodo} periodo</td>
                        <td>{promedio.promedio}</td>
                      </tr>
                    ))
                  )}
                </TableBody>
              </table>
              {promedios.length !== 0 && (
                <div className="nota-f-notas">
                  Nota final{" "}
                  {Math.round(
                    promedios.reduce((a, b) => {
                      return a + b.promedio;
                    }, 0) / promedios.length
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notas;
