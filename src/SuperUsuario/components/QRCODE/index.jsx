import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import Crear from './CrearQR';
import Consultar from './ConsultarQR';

const Index = () =>{
    const [Ventana, setVentana] = useState(0);

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
            <Crear/>
            :null }
            {Ventana === 1 ? 
            <Consultar/>
            :null }
         
        </div>
    )
}
export default Index;