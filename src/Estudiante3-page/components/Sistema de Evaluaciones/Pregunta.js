import React from "react";

const Pregunta = ({ pregunta, numero }) => {
  return (
    <div className="p-md-5 p-2">
      <div>
        <h2 className="text-center font-chewy text-orange text-break">
          <strong> Evaluacion </strong>
        </h2>
      </div>
      <div className="m-auto">
        <h5>
          <strong>{numero}.</strong> {pregunta}
        </h5>
      </div>
    </div>
  );
};

export default Pregunta;
