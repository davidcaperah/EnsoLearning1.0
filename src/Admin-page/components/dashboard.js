import React from "react";
import Menu from "./menu";
import "../css/index.css";
import "../css/docente.css";
import Rutas from "./rutas";
import Header from "./header";
const Dashboard = () => {
  return (
    <div className="Contenedor">
      <div className="">
        <Header />
        <div className="contenedor-pri">
          <Menu />
          <div className="contenedor-info-pri">
            <Rutas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
