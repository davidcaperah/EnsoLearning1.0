import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import Configuracion from './components/Configuracion';
import Actividades from './components/Actividades';
import Aulas from './components/Aulas';
import Curso from './components/Curso';
import Evaluaciones from './components/Evaluaciones';
import Page from './components/Page';
import User from './components/User';
import Eventos from './components/Eventos';
import Lecturas from './components/Lecturas'
import Perfil from './components/miPerfil'

const Rutas = () => {
    return (
        <Router>
            <Route path="/EstudianteThreeHome" component={Page} />
            <Route path="/EstudianteThreeAulas" component={Aulas} />
            <Route path="/EstudianteThreeEvaluaciones" component={Evaluaciones} />
            <Route path="/EstudianteThreeActividades" component={Actividades} />
            <Route path="/EstudianteThreeCurso" component={Curso} />
            <Route path="/EstudianteThreeConfiguracion" component={Configuracion} />
            <Route path="/EstudianteThreeUser" component={User} />
            <Route path="/EstudianteThreeEventos" component={Eventos} />
            <Route path="/EstudianteThreeLecturas" component={Lecturas} />
            <Route path="/EstudianteThreeMiPerfil" component={Perfil} />r
            
        </Router>
    );
}
 
export default Rutas;