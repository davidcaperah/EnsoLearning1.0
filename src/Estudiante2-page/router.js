import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import App from './App';
import Aula from './components/Aula';
import Curso from './components/Curso';
import Actividades from './components/actividades'
import Evaluaciones from './components/Evaluaciones'
import User from './components/user';
import Configuracion from './components/Configuracion';
import EventosPage from './components/Eventos';
import Lecturas from './components/Lecturas';
import Perfil from './components/miPerfil';

const Rutas = () => {
    return (
        <Router>
            <Route path="/EstudianteTwoHome" component={App} />
            <Route path="/EstudianteTwoAula" component={Aula} />
            <Route path="/EstudianteTwoCurso" component={Curso} />
            <Route path="/EstudianteTwoActividades" component={Actividades} />
            <Route path="/EstudianteTwoEvaluaciones" component={Evaluaciones} />
            <Route path="/EstudianteTwoUser" component={User} />
            <Route path="/EstudianteTwoConfiguracion" component={Configuracion} />
            <Route path="/EstudianteTwoEventos" component={EventosPage} />
            <Route path="/EstudianteTwoLecturas" component={Lecturas} />
            <Route path="/EstudianteTwoMiPerfil" component={Perfil} />

        </Router>
    );
}
 
export default Rutas;