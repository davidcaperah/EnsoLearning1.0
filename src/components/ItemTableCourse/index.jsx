import React from "react";
import "./style.css";

function Index({ note }) {
  return (
    <div className="cont-notas-tablero-estu2">
      <h6>Aula de {note.N_Materia}</h6>
      <p className="p-fecha-tablero-estu1">Enviado {note.fecha_crear}</p>
      <p className="p-nota-tablero-estu1">{note.nota}</p>
    </div>
  );
}

export default Index;
