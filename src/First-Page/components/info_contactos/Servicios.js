import React, { useState } from "react";
import imagen from './../../img/servicios.png'
import Seguridad from './serviciosEnso/seguridad';
import Interactivo from './serviciosEnso/interactivo';
import Acudientes from './serviciosEnso/acudientes';
import Educativo from './serviciosEnso/educativo';
import BannerNostros from './../BannerNostros'

function Servicios() {
    const [ventana, setVentana] = useState(0)

    const vistas = (valorvista) => {
        setVentana(valorvista)
    }
    return (
        <div>
            <BannerNostros imagen={imagen} titulo="Trabajos contigo y para ti" texto="Aliados de tus estudiantes y docentes." />
            <div className="col-lg-5">
                <div className="d-flex justify-content-center m-4 row" >
                    <button className="btn  m-2" onClick={() => vistas(1)} > Seguridad </button>
                    <button className="btn  m-2" onClick={() => vistas(2)} > Educativo </button>
                    <button className="btn  m-2" onClick={() => vistas(3)} > Acudientes </button>
                    <button className="btn  m-2" onClick={() => vistas(4)} > Interactivo </button>
                </div>
                <hr></hr>
            </div>
            
            {ventana === 1 ? <Seguridad /> : null}
            {ventana === 2 ? <Interactivo /> : null}
            {ventana === 3 ? <Acudientes /> : null}
            {ventana === 4 ? <Educativo /> : null}
        </div>
    )
}

export default Servicios
