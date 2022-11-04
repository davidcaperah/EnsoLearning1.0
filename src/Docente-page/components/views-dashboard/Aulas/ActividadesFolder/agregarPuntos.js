import React, {useState} from 'react';
import CrearActividades from './crearActividades';
import ElegirActividades from './elegirActividades';
import { useSelector,useDispatch } from 'react-redux';
const AgregarPuntos = () => {

    const dispatch = useDispatch()
    const [CambioInterfaz, setCambioInterfaz] = useState(0)
    const [ValidacionBoton, setValidacionBoton] = useState(true)
    const data = useSelector(state => state.CrearActividadDocente)

    const cambiarInterfaz = (numero , estado) => {
        setValidacionBoton(estado)
        setCambioInterfaz(numero)
        if(numero === 1){
            console.log(data)
            dispatch({
                type : "CrearActividadDocente",
                CrearActividadDocente : data,
                actividad_hyg : true
            })
        }else{
            dispatch({
                type : "CrearActividadDocente",
                CrearActividadDocente : data,
                actividad_hyg : false
            })
        }
    }

    const crearActividad = () => {
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: 9
        })
        console.log(data)
        dispatch({
            type : "CrearActividadDocente",
            CrearActividadDocente : data,
            actividad_hyg : false
        })
        
    }


    return (
        <div>
            { ValidacionBoton?
                <div className="row p-2" >
                    <div className="col-md-6" >
                        <h6 className="m-2 text-white" > Elije actividades de nuestra plataforma. </h6>
                        <div className="shadow p-3 m-2 pointer Areas" onClick={() => cambiarInterfaz(1,false)} >
                            <h2 className="text-center text-white" > + </h2>
                        </div>
                    </div>
                    <div className="col-md-6" >
                        <h6 className="m-2 text-white" > Agrega tus propias actividades. </h6>
                        <div className="shadow p-3 m-2 pointer Areas" onClick={() => crearActividad()} >
                            <h2 className="text-center text-white" > + </h2>
                        </div>
                    </div>
                </div>
                
            : 
                <div>
                    <div className="d-flex justify-content-start p-3" > 
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className=" bi bi-arrow-left pointer" onClick={() => cambiarInterfaz(0 , true)}  viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>
                    { CambioInterfaz === 1?  <ElegirActividades /> : null }
                    { CambioInterfaz === 2?  <CrearActividades/> : null }
                </div>
            }

        </div>
    );
}
 
export default AgregarPuntos;