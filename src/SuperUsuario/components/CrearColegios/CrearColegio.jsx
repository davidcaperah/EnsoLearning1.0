/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React, { useState} from 'react';
const CrearColegio = () => {
    const [estado, setestado] = useState(0)
    console.log("🚀 ~ file: CrearColegio.jsx:12 ~ CrearColegio ~ estado", estado)
    
    return (
        <div className="col-md-12">
            <div className="row center">
                <div className="col-md-6">
                    <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> setestado(1) }>Crear QR's</p>
                </div>
                <div className="col-md-6">
                     <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> setestado(2) }>Consultar QR's</p>
                </div>            
            </div>
        </div>
    )
    }
export default CrearColegio;