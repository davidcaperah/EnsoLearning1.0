import React, {useState} from "react";
import URL from "../../../../../URL";

function GradeComponent() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenCard = ()=>{
        setIsOpen(!isOpen);
    }
  return (
    <div className="grados">
      <p>Grado 4</p>
      <div className="cont-imagen-info1">
        <img
          className={`imagen-info1`}
          src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}
          alt="arrow"
          style={isOpen?{rotate:"180deg"}:{}}
          onClick={handleOpenCard}
        />
      </div>
    </div>
  );
}

export default GradeComponent;
