import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/curso.css";

const AdminLearn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="header-curso-coord">
          <div>
            <svg
              width="473"
              height="398"
              viewBox="0 0 473 398"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M217.392 275.071C146.236 208.559 147.325 347.617 76.5106 283.795C39.8429 191.118 71.3377 91.7659 146.856 61.8871C222.375 32.0084 313.32 82.9171 349.988 175.595C386.655 268.273 318.48 369.563 217.392 275.071Z"
                fill="#00639A"
                fillOpacity="0.9"
              />
              <path
                d="M282.878 261.356C253.463 233.189 227.833 184.048 261.714 157.381C295.595 130.713 380.526 129.015 407.194 162.897C433.861 196.778 428.013 245.862 394.132 272.529C360.251 299.197 309.545 295.237 282.878 261.356Z"
                fill="#FFBB5E"
                fillOpacity="0.9"
              />
            </svg>
            <h4>Cursos</h4>
          </div>
          <div className="descri-curso-coord-header">
            <p>
              En este espacio podras crear las aulas, y/o cursos para facilitar
              la asignacion de sus integrantes en la institucion.
            </p>
          </div>
        </div>
        <div className="btn-curso-coord">
          <div
            id="aulas-curso-coord"
            onClick={() => {
              navigate("/AdminSchool/classroom");
            }}
          >
            <h5>Mis aulas</h5>
            <p>Crea y consulta las aulas para tus docentes</p>
          </div>
          <div
            id="misCursos-curso-coord"
            onClick={() => {
              navigate("/AdminSchool/courses");
            }}
          >
            <h5>Mis cursos</h5>
            <p>Crea cursos y elije la asignacion para tus estudiantes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLearn;
