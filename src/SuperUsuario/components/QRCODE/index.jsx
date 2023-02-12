import React, { useState } from 'react';
import Crear from './CrearQR';
import Consultar from './ConsultarQR';
import Editar from './Editar_QR'

const Index = () =>{
    const [Ventana, setVentana] = useState(0);
    const [qr, setqr] = useState([])
    const Estado = (tipo) =>{
        setVentana(tipo)
    }

    return(
        <div className="col-md-12">
            <div className="row center">
                <div className="col-md-6">
                    <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> Estado(2) }>Crear QR's</p>
                </div>
                <div className="col-md-6">
                     <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> Estado(1) }>Consultar QR's</p>
                </div>            
            </div>
            {Ventana === 2 ? 
            <Crear vista={setVentana} />
            :null }
            {Ventana === 1 ? 
            <Consultar estado={Estado} qr={setqr} />
            :null }
            {Ventana === 3 ? 
            <Editar datos={qr} vista={Estado} />
            : null
            }
         
        </div>
    )
}
export default Index;