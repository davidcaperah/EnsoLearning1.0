import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const ListaActividades = () => {

    const subirActividad = useSelector(state => state.CrearActividadDocente)
    const dispatch = useDispatch()

    const agregarActividad = async () => {
        const urlPDF = await subirPDF()
        const urlIMG = await subirIMG()

        console.log(urlIMG, urlPDF);
        const Datos = {
            pdf : urlPDF,
            imagen : urlIMG,
            video : subirActividad.video !== undefined? subirActividad.video  : "NULL"
        }

        console.log(Datos);
        dispatch({
            type : "@updateActividadFinal",
            datosActividadFinal : Datos
        })
        dispatch({
            type : "numberInterfazActividades",
            numberInterfazActividades : 5
        })

    }

    const subirPDF = async () => {
        if(subirActividad.nombrePDF){
            console.log(subirActividad.PDF+" "+subirActividad.nombrePDF)
            return subirActividad.PDF
        }else{
            return "NULL"
        }
    }

    
    const subirIMG = async () => {
        if(subirActividad.nombreIMG){
            console.log(subirActividad.IMG+" "+subirActividad.nombreIMG)
            return subirActividad.IMG
        }else{
            return "NULL"
        }
    }


    return (
        <div>
            {subirActividad.nombreIMG ? 
                <div className="shadow p-3 m-2 rounded" >
                    {subirActividad.nombreIMG}
                </div>  
            :null}

            {subirActividad.nombrePDF ? 
                <div className="shadow p-3 m-2 rounded" >
                    {subirActividad.nombrePDF}
                </div>  
            :null}

            {subirActividad.video ? 
                <div className="shadow p-3 m-2 rounded" >
                    {subirActividad.video}
                </div>  
            :null}

            {JSON.stringify(subirActividad)!== '{}' ? 
                <div>
                    <button className="btn btn-outline-dark m-2" onClick={agregarActividad} > Agregar Actividad </button>
                </div>
            :null }

        </div>
    );
}
 
export default ListaActividades;