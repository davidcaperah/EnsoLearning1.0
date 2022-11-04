import React, { useState } from "react";
import imagen from './../../img/imagen-office.jpg'
import Somos from './componentes_nosotros/quienes_somos';
import Nosotros from './componentes_nosotros/nosotros_page';
import Vision from './componentes_nosotros/vision';
import Mision from './componentes_nosotros/mision';
import BannerNostros from './../BannerNostros'

function Nosotross() {

    const [ventana, setVentana] = useState(0)

    const vistas = (valorvista) => {
        setVentana(valorvista)
    }
    return (
        <div>
            <BannerNostros imagen={imagen} titulo="Somos tu mejor opcion, fomentamos el desarrollo en los estudiantes." texto="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" />
            <div className="col-lg-5">
                <div className=" d-flex justify-content-center mt-4 align-self-center row" >
                    <button className="btn  m-2" onClick={() => vistas(1)} > ¿Quienes somos? </button>
                    <button className="btn  m-2" onClick={() => vistas(2)} > Nosotros </button>
                    <button className="btn  m-2" onClick={() => vistas(3)} > Visión </button>
                    <button className="btn  m-2" onClick={() => vistas(4)} > Misíon </button>
                </div>
                <hr></hr>
            </div>
            <div className="d-flex justify-content-center mt-1">
            {ventana === 1 ? <Somos /> : null}
            {ventana === 2 ? <Nosotros /> : null}
            {ventana === 3 ? <Vision /> : null}
            {ventana === 4 ? <Mision /> : null}
            </div>
        </div>
    )
}

export default Nosotross;
