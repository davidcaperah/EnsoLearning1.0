import React, { useState } from "react";
import SeguridadPage from './configuracion_perfil/seguridad';
import MyInfoPage from "./configuracion_perfil/myinfo";
import PrivacidadPage from "./configuracion_perfil/privacidad"
import AyudaPage from "./configuracion_perfil/ayuda";



const Configuracion = () => {
    const [ventana, setVentana] = useState(0)

    const vistas = (valorvista) => {
        setVentana(valorvista)
    }
    return (
        <div className="bg-pink pb-5" >

            <div className="dashboard pt-5" >
                <div className="row" >
                    <div className="col-md-4" >
                        <div className="shadow m-2 p-3 bg-light" >
                            <p className="p-3 shadow-sm pointer bg-dark text-white" > Configuración </p>
                            <p className="p-3 shadow-sm pointer opciones" onClick={() => vistas(1)}> Seguridad  </p>
                            <p className="p-3 shadow-sm pointer opciones" onClick={() => vistas(2)}> Mi información </p>
                            <p className="p-3 shadow-sm pointer opciones" onClick={() => vistas(3)}> Privacidad </p>
                            <p className="p-3 shadow-sm pointer opciones" onClick={() => vistas(4)}> Ayuda </p>
                        </div>
                    </div>
                    {ventana === 0 &&
                        <div className="col-md-8" >
                            <div className="shadow m-2 p-3 bg-light " >
                                <h2 className="font-chewy text-orange p-2 link-formateado text-center">¡Bienvenido a configuraciones!</h2>
                                <p className="text-center">Aqui podras realizar todo lo relacionado a tu cuenta.</p>
                            </div>
                        </div>
                    }
                    {ventana === 1 ? <SeguridadPage /> : null}
                    {ventana === 2 ? <MyInfoPage /> : null}
                    {ventana === 3 ? <PrivacidadPage /> : null}
                    {ventana === 4 ? <AyudaPage /> : null}

                </div>
            </div>
        </div>
    );
}

export default Configuracion;