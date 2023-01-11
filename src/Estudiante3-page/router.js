import React from "react";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import Configuracion from "./components/Configuracion";
import Actividades from "./components/Actividades";
import Aulas from "./components/Aulas";
import Curso from "./components/Curso";
import Evaluaciones from "./components/Evaluaciones";
import Page from "./components/Page";
import User from "./components/User";
import Eventos from "./components/Eventos";
import Lecturas from "./components/Lecturas";
import Perfil from "./components/miPerfil";
import InConstruction from "./components/inConstruction";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EstudianteThreePageHome" element={<Page />} />
        <Route path="/EstudianteThreeAulas" element={<Aulas />} />
        <Route path="/EstudianteThreeEvaluaciones" element={<Evaluaciones/>} />
        <Route path="/EstudianteThreeActividades" element={<Actividades/>} />
        <Route path="/EstudianteThreeCurso" element={<Curso/>} />
        <Route path="/EstudianteThreeConfiguracion" element={<Configuracion/>} />
        <Route path="/EstudianteThreeUser" element={<User/>} />
        <Route path="/EstudianteThreeEventos" element={<Eventos/>} />
        <Route path="/EstudianteThreeLecturas" element={<Lecturas/>} />
        <Route path="/EstudianteThreeMiPerfil" element={<Perfil/>} />
        <Route path="/EnConstruccion" element={<InConstruction/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
