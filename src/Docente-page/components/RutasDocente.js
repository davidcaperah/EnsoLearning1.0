import React from 'react';
import {BrowserRouter, Route, Routes  } from 'react-router-dom';
import Estadisticas from './views-dashboard/Estadisticas';
import InfoDocente from  './views-dashboard/Info';
import MisDocentesDocente from  './views-dashboard/MisDocentes';
import MisAulas from     './views-dashboard/MisAulas';
import DocenteCurso from './views-dashboard/DocenteCurso';
import PlanillaEstudiante from './views-dashboard/PlanillaEstudiante';
import DocenteEvaluaciones from './views-dashboard/DocenteEvaluaciones';
import DocenteActividades from './views-dashboard/DocenteActividades';
import EditActividad from './views-dashboard/editActividad';
import HomeDocente from './views-dashboard/homeDocente'
const RutasDocente = () => (
    <BrowserRouter>
            <Routes >
                <Route path = "/DocenteEstadisticas"  element  = {<Estadisticas/>}/>
                <Route path = "/DocenteAulas"         element  = {<MisAulas/>}/>
                <Route path = "/DocenteDocentes"      element  = {<MisDocentesDocente/>}/>
                <Route path = "/DocenteInfo"          element  = {<InfoDocente/>}/>
                <Route path = "/DocenteCurso"         element  = {<DocenteCurso/>}/>
                <Route path = "/PlanillaEstudiante"   element  = {<PlanillaEstudiante/>}/>
                <Route path = "/DocenteEvaluaciones"  element  = {<DocenteEvaluaciones/>}/>
                <Route path = "/DocenteActividades"   element  = {<DocenteActividades/>}/>
                <Route path = "/EditActi"             element  = {<EditActividad/>}/>
                <Route path = "/HomeDocentes"         element  = {<HomeDocente/>}/>
            </Routes >
    </BrowserRouter>
);
 

export default RutasDocente;