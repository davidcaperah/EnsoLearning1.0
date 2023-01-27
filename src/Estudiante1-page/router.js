import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aula from "./components/Aula";
import Curso from "./components/Curso";
import Actividades from "./components/actividades";
import Page from "./components/Page/Page";
import Evaluaciones from "./components/Evaluaciones";
import Config from "./components/Configuracion";
import Eventos from "./components/Eventos";
import Lecturas from "./components/Lecturas";
import Perfil from "./components/miperfil";
import Construccion from "./components/Construccion";

const Rutas = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EstudianteOnePage" element={<Page />} />
        <Route path="/EstudianteOneAula" element={<Aula />} />
        <Route path="/EstudianteOneCurso" element={<Curso />} />
        <Route path="/EstudianteOneActividades" element={<Actividades />} />
        <Route path="/EstudianteOneEvaluaciones" element={<Evaluaciones />} />
        <Route path="/EstudianteOneConfig" element={<Config />} />
        <Route path="/EstudianteOneEventos" element={<Eventos />} />
        <Route path="/EstudianteOneLecturas" element={<Lecturas />} />
        <Route path="/EstudianteMiPerfil" element={<Perfil />} />
        <Route path="/EstudianteConstruccion" element={<Construccion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
