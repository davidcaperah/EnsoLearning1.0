import React from 'react';
import Menu from './Menu';
import Header from './header.js';
import '../css/index.css';
import '../css/docente.css';
import RutasDocente from './RutasDocente';

const DashBoard = () => {
    return (
        <div className="Contenedor" >
            <div className="" > 
                <Header />
                <div className="contenedor-pri">
                    <Menu  />
                    <div className="contenedor-info-pri" > 
                        <RutasDocente />
                    </div>
                </div>
            </div>
        </div>
        
    );
    /*<div className="shadow bg-img" >
            <div className="Interfaz" > 
                <div className="row pb-5" > 
                    <Menu />
                    <div className="col-md-10 bg-dark mt-5 rounded" > 
                        <RutasDocente />
                    </div>
                </div>
            </div>
        </div>*/
}
 
export default DashBoard;