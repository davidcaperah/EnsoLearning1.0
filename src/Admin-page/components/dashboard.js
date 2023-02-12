import React, { useState } from "react";
import Menu from "./menu";
import Rutas from "./rutas";
import Header from "./header";
import "../css/index.css";
import "../css/docente.css";
const Dashboard = () => {
  const [isHover, setIsHover] = useState(false);

  const widthContainer = isHover ? "90%" : "100%";

  const handleHoverEnter = () => {
    setIsHover(true);
  };
  const handleHoverLeave = () => {
    setIsHover(false);
  };
  return (
    <div className="Contenedor">
      <div className="">
        <Header />
        <div className="contenedor-pri-coordinator">
          <Menu onMouseEnter={handleHoverEnter} onMouseOut={handleHoverLeave} />
          <div
            className="contenedor-info-pri-coordinator"
            style={{ width: widthContainer }}
          >
            <Rutas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
