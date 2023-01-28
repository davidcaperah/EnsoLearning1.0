import React from "react";
import URL from "../../URL";
import "./styles.css";

function Index({ eva, onClick }) {
  return (
    <div className="cont-card-evaluaciones-estu1">
      <div className="con-img-regla-evaluaciones">
        <img
          src={`${URL.servidor}Archivos_u/iconos/regla.svg`}
          alt="rule icon"
        />
      </div>
      <div className="datos-card-evaluacion-estu1">
        <div className="datos-info-estu1">
          <div>
            <h5>
              <strong>{eva.Titulo}</strong> <br />
              Aula de {eva.N_Materia}
              {eva.estado === 1 ? (
                <div class="alert alert-success" role="alert">
                  Activa
                </div>
              ) : (
                <div class="alert alert-danger" role="alert">
                  Finalizada
                </div>
              )}
            </h5>
            <p>
              Fecha Creación <br />
              {eva.fecha_c}
              <br />
              Fecha max de entrega <br />
              {eva.fecha_max}
              <br />
              cantidad de preguntas : {eva.preguntas} <br />
              Tiempo estimado : {eva.tiempo} min
            </p>
          </div>
        </div>
        <div>
          <div className="deco-img-card-estu1">
            <img
              src={`${URL.servidor}Archivos_u/iconos/matematicasImg.svg`}
              alt="imagen de la avaluación"
            />
            <div
              onClick={() => {
                onClick(eva, 1);
              }}
            >
              Iniciar evaluacion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
