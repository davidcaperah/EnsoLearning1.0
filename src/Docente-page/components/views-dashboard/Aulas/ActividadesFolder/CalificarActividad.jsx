/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import URL from '../../../../../URL'
import Swal from 'sweetalert2';
import { useSelector} from 'react-redux';
const DocenteActividades = (prop) => {
    const docente = useSelector(state => state.docente)
    const aulaSeleccionada = useSelector(state => state.aulaSeleccionada)
    let idMateria = aulaSeleccionada.id_materia
    let iduser = docente.id
    let idCol = docente.colegio
    const [actividades, setactividades] = useState([])
    const [vista, setvista] = useState(1)
    const [respuesta, setrespuesta] = useState([])
    const [res, setres] = useState([])
    const [rest, setrest] = useState([])
    const [Campos, setCampos] = useState({})
    const [nota, setnota] = useState([])

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name]: e.target.value.trim()
        });
    }
    const C_vista = (vista,dato) => {
        let restp = JSON.parse(dato.puntos);
        let rest = JSON.parse(dato.respuestas);
        console.log(rest);
        let i = 1;
        let vart = []
        setvista(vista)
        setrespuesta(dato)
        restp.forEach(element => {
            let est = {};
            est.pregunta = element.pregunta 
            est.respuesta = rest[i]
            i++
            vart = [...vart, est ]
        });
        setres(vart)
        TraerNota(dato);
    }
    const TraerNota = async (dato) => {
        const DatosJson = JSON.stringify({d:17,materia:idMateria,estudiante:dato.id_estu,maestra:dato.id_maestra})
        console.log("esto se envia");
        console.log(DatosJson)
        const api = axios.create({ baseURL: URL.servidor });
        const response = await api.post('/api-php-react/info_docente.php', DatosJson);
        const data = response.data
        setnota(data)
        
    }
    const calificar = (respt) =>{
        Swal.fire({
            title: 'Ingrese la nota del estudiante',
            text:'nota del 1 al 100',
            input: 'number',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
            preConfirm: (login)  => {
                console.log("🚀 ~ file: CalificarActividad.jsx:76 ~ calificar ~ respt", respt)
                let comentario = Campos.comentario ? Campos.comentario : "Sin comentario"; 
                const DatosJson = JSON.stringify({d:0, 
                    id_estu: respt.id_estu,
                    id_docente: iduser,
                    id_colegio: idCol,
                    id_curso: respt.id_curso,
                    id_materia: idMateria,
                    id_actividad: respt.id_maestra,
                    id_solucion : respt.id,
                    id_nota: login,
                    comentario: comentario,
                    tipo: 1,
                    periodo:respt.periodo
                })
                const api = axios.create({ baseURL: URL.servidor });
                const response =  api.post('/api-php-react/Crear_Notas.php', DatosJson);
                const data = response.data
                return data;
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            console.log("🚀 ~ file: CalificarActividad.jsx:96 ~ calificar ~ result", result)
            if (result.value) {
              Swal.fire({
                title: `${result.value}'actividad calificada`,
              })
            }
          })
    }
    useEffect(() => {
        const TraerSolucion = async () => {
            const DatosJson = JSON.stringify({ id:  prop.actividad.id, d: 5})
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_docente.php', DatosJson);
            const data = response.data
            console.log("🚀 ~ file: CalificarActividad.jsx:110 ~ TraerSolucion ~ data", data)
            setactividades(data)
            setrest(JSON.parse(data[0].puntos))
            
        }
        TraerSolucion();
        //eslint-disable-next-line
    }, []);
    return (
    <div className="container">
        <div className='col-md-12'>
            <h5>Calificar actividad</h5>
            <p>la actividad <strong>{prop.actividad.Nombre}</strong> la cual tiene fecha limite el dia <strong>{prop.actividad.fecha_MAX}</strong></p>
            <p>Tiene como Objetivo: <br />
            {prop.actividad.descri}
            </p>
        </div>
        {vista === 1 ?
        <div className="row">
                <div className='col-md-12'>
                <table className="table table-striped">
                <thead>
                <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Respuesta</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Opciones</th>
                </tr>
                </thead>
                <tbody>
                {actividades ? actividades.map( item =>
                            <tr>
                            <th scope="row">{item.Nombree} {item.Apellidoe}</th>
                            <td >
                            <span className='text-center pointer' title='Abrir Respuesta' onClick={()=>C_vista(2,item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-earmark-fill" viewBox="0 0 16 16">
                                <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
                                </svg>
                            </span>
                            </td>
                            <td>{item.n_estado}</td>
                            <td>{item.fecha_entrega}</td>
                            <td>
                                <div className='row'>
                                    <div className="col-md-6">
                                        <span title='Calificar' className='calificar'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                                        </svg>
                                        </span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span title='Eliminar' className='eliminar'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </span>                                   
                                    </div>
                                </div>
                            </td>
                            </tr>
                
                ):null}
                </tbody>
                </table>
                </div>
        </div>
        : null }
        {vista === 2 ?
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <h5 className="card-header">Ver Respuesta actividad</h5>
                    <div className="card-body">
                        <h5 className="card-title">{respuesta.Nombree} {respuesta.Apellidoe}</h5>
                        <p className="card-text">{respuesta.comentario ===  0 ? respuesta.comentario:'No aplica' }</p>
                        <div className='row'>
                            <div className='col-md-6'>
                            {respuesta.evidencia > 0 ? <div> Evidencia: <a href={respuesta.evidencia }>link</a></div> : "No aplica" }
                            
                            </div>
                            <div className='col-md-6'>
                                fecha entrega : {respuesta.fecha_entrega}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                            Curso: {respuesta.n_curso}°
                            </div>
                        </div>
                        <h5 className='text-center'>Puntos/preguntas</h5>
                        <ul className="list-group list-group-flush">
                            {res.map(punto =>
                                <li className="list-group-item">{punto.pregunta} <br/>
                                R//<br/>
                                <strong>{punto.respuesta}</strong>
                                </li>
                            )

                            }
                        </ul>
                        {nota ?
                        <ul className="list-group list-group-flush">
                            Ya se encuentra calificado la nota es <strong>{nota.id_nota}</strong>
                        </ul>:
                        <ul className="list-group list-group-flush">
                        <h2>Comentario</h2>
                        <textarea name='comentario' rows="5" cols="50" onChange={onChange}></textarea>
                        <br />
                        <button onClick={()=>calificar(respuesta)} className='btn btn-primary' >Calificar</button>
                        </ul>
                        }
                    </div>
                </div>
            </div>
        </div>:null
        }

    </div>
    )
    }
export default DocenteActividades;