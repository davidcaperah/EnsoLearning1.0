import React from "react";
import URL from "../../URL";
import "./style.css";

function Index({ acti, onClick }) {
  return (
    <div className="card-actividades-estu1">
      <div>
        <div className="cont-titu-card-actividades">
          <h5>{acti.Nombre}</h5>
          <h6>Area de {acti.materia_name} 202</h6>
        </div>
        <div>
          <p>
            Vencimiento <br />
            {acti.fecha_MAX}
          </p>
        </div>
        <div className="progres-bar-actividadesa"></div>
      </div>
      <div className="card-cont-img-actividades">
        <img
          src={`${URL.servidor}Archivos_u/iconos/` + acti.imagen}
          alt="imagen de la actividad"
        />
      </div>
      <div className="btn-iniciar-acti-estu-1" onClick={() => onClick(acti)}>
        Iniciar actividad
      </div>
    </div>
  );
}

export default Index;
