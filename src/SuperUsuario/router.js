import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Malla from './components/Malla';
import AdminMallas from "./components/VerMallas/AdminMallas";
import Icfes from './components/views-dashboard/Icfes';
import Usuarios from "./components/views-dashboard/Usuarios";
import Colegio from './components/views-dashboard/Colegio';
import Añadir from "./components/views-dashboard/Añadir";
import Libros from "./components/views-dashboard/Libros";
import Actividades from "./components/Actividades/Actividades";
import CodigosLibros from "./components/views-dashboard/CodigosLibros";
import AddEventos from "./components/views-dashboard/addEventos";
import QR from "./components/QRCODE/index";
import Config from "./components/configurar/index"
import CrearColegio from "./components/CrearColegios/CrearColegio";

const Rutas = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/AdminInicio" element={<Malla/>} />
            <Route exact path="/AdminMallas" element={<AdminMallas/>} />
            <Route exact path="/AdminIcfes" element={<Icfes/>} />
            <Route exact path="/AdminUsuarios" element={<Usuarios/>} />
            <Route exact path="/AdminColegios" element={<Colegio/>} />
            <Route path="/Adminadd" element={<Añadir/>} />
            <Route exact path="/AdminLibros" element={<Libros/>} />
            <Route exact path="/AdminActividades" element={<Actividades/>} />
            <Route exact path="/CodigosLibros" element={<CodigosLibros/>} />
            <Route exact path="/AdminEventos" element={<AddEventos/>} />
            <Route exact path="/QR" element={<QR/>} />
            <Route exact path="/config" element={<Config/>} />
            {/* reseller */}
            <Route exact path="/CrearColegio" element={<CrearColegio/>} />
        </Routes>
</BrowserRouter>
    );
}
 
export default Rutas;