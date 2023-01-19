import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Aula from "./components/Aula";
import Curso from "./components/Curso";
import Actividades from "./components/actividades";
import Evaluaciones from "./components/Evaluaciones";
import User from "./components/user";
import Configuracion from "./components/Configuracion";
import EventosPage from "./components/Eventos";
import Lecturas from "./components/Lecturas";
import Perfil from "./components/miPerfil";
import Construction from "./components/Construction";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EstudianteTwoHome" element={<App />} />
        <Route path="/EstudianteTwoAula" element={<Aula />} />
        <Route path="/EstudianteTwoCurso" element={<Curso />} />
        <Route path="/EstudianteTwoActividades" element={<Actividades />} />
        <Route path="/EstudianteTwoEvaluaciones" element={<Evaluaciones />} />
        <Route path="/EstudianteTwoUser" element={<User />} />
        <Route path="/EstudianteTwoConfiguracion" element={<Configuracion />} />
        <Route path="/EstudianteTwoEventos" element={<EventosPage />} />
        <Route path="/EstudianteTwoLecturas" element={<Lecturas />} />
        <Route path="/EstudianteTwoMiPerfil" element={<Perfil />} />
        <Route path="/EnConstruccion" element={<Construction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
