/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React , { useState } from 'react';
import AsignarActividad from './AsignarActividad'
const DocenteActividades = (actividad) => {

    let datos = actividad.actividad;
    let puntos = JSON.parse(datos.puntos);
    const [Vista, setVista] = useState(0)
    const vista = (e) =>{
        setVista(e)
    }
    return (
    <div>
        {Vista === 0 ?
        <div className="card">
        <h5 className="card-header">Ver actividad</h5>
        <div className="card-body">
            <h5 className="card-title">{datos.Nombre}</h5>
            <p className="card-text">{datos.objetivo}</p>
            <div className='row'>
                <div className='col-md-6'>
                enlace: <a href={datos.link}>link</a>
                </div>
                <div className='col-md-6'>
                    materia : {datos.N_Materia}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                Curso: {datos.Curso}°
                </div>
                <div className='col-md-6'>
                Docente: {datos.Nprofesor} {datos.apellido}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                Tipo: {datos.tipo_s === 1 ? "Opción multiple":datos.tipo_s === 3? "Preguntas Abietas": null }
                </div>
            </div>
            <h5 className='text-center'>Puntos/preguntas</h5>
            <ul className="list-group list-group-flush">
                {puntos.map(punto =>
                    <li className="list-group-item">{punto.pregunta}</li>
                )

                }
            </ul>
            <button onClick={()=>vista(1)} className='btn btn-primary' >asignar curso</button>
        </div>
        </div>
        :
        Vista === 1 ? 
        <AsignarActividad actividad={datos}/>
        :
        null
        }

    </div>
    )
    }
export default DocenteActividades;