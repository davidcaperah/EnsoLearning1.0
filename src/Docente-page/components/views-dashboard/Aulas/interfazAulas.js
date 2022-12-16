import React, { useState, useEffect } from 'react';
import URL from '../../../../URL.js';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const InterfazAulas = () => {

    const aulaSeleccionada = useSelector(state => state.aulaSeleccionada)
    const dispatch = useDispatch()
     //const [datosLibros, setdatosLibros] = useState([])

    const docente = useSelector(state => state.docente)
    console.log(docente)

    const [curso, setcurso] = useState({})
    const [libros, setLibros] = useState([])

    useEffect(() => {
        const TraerDatos = async () => {
            let idCurso = JSON.stringify(aulaSeleccionada.id_curso)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_curid.php', idCurso);
            setcurso(
                response.data
            )
        }
        const traerLibros = async () => {
            let infoEnviarL = JSON.stringify({
                Id_curso: aulaSeleccionada.id_curso,
                id_Pro: docente.id,
                id_Mat:aulaSeleccionada.id_materia,
                d: 7
            })

            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_docente.php', infoEnviarL);
            const data = response.data;

            setLibros(data)
        }
        TraerDatos()
        traerLibros()
        //eslint-disable-next-line
    }, []);
    console.log(libros.id)
    /*const eliminarLibro = (info) => {
        console.log(info)
        Swal.fire({
            title: '¿Quieres eliminar este libro del curso?',
            text: info.titulo,
            showDenyButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                let datosLibro = {
                    d: 8,
                    id_libro: 0,
                    id_Pro: docente.id,
                    Id_curso: aulaSeleccionada.id_curso
                }
                const datosEnviar = JSON.stringify(datosLibro)
                const api = axios.create({ baseURL: URL.servidor });
                const response = await api.post('/api-php-react/info_docente.php', datosEnviar);
                const data = response.data;
                if (data.estado) {
                    Swal.fire({
                        title: 'Se ha eliminado el libro',
                        icon: 'success'
                    })
                    const evaluas = libros.filter(data => data.id !== info.id)
                    setLibros(evaluas)
                } else {
                    Swal.fire({
                        title: 'No se ha podido eliminar este libro',
                        icon: 'warning'
                    })
                }
            }
        })
    }*/

    const Volver = (e) => {
        
        dispatch({
            type: "@uploadAulaSeleccionada",
            aulaSeleccionada: {}
        })
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: 0
        })
    }


    const cambiarInterfaz = (num) => {
        console.log("entraaa")
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: num
        })
        dispatch({
            type: "@updateplanillasCurso",
            planillasCurso: curso
        })

    }
    console.log(curso)
    console.log(libros.length);
    console.log(libros);
    console.log(aulaSeleccionada)
    return (
        <div>
            <div className='cont-header-curso'>
                <div className='row'>
                    <div className='cuadrado-header-curso'>  
                    
                    <div  className='obalo-header-curso'> 
                        <h2 onClick={Volver} >{`Mis cursos >`}</h2>  
                    </div>
                    <div className="obalo-rosado" >
                        <h2>Curso {curso.Curso_Nu}</h2>
                    </div>
                    <div className="obalo-rosado1" ></div>

                    </div> 
                </div>
                <div className='row' >
                    <div className='cont-opciones-header'> 
                        <div>
                            <img onClick={() => cambiarInterfaz(4)} alt='planillaAcademica' src={`${URL.servidor}Archivos_u/iconos/user6.svg`}/>
                            <p>planillas academica</p>
                        </div>
                        <div >
                            <img onClick={() => cambiarInterfaz(5)}  alt='librosAsignados' src={`${URL.servidor}Archivos_u/iconos/libro-abierto 1.svg`}/>
                            <p>Libros asignados</p>
                        </div>
                        <div>
                            <img onClick={() => cambiarInterfaz(2)}  alt='evaluaciones' src={`${URL.servidor}Archivos_u/iconos/evaluacion1.svg`}/>
                            <p>Evaluaciones</p>
                        </div>
                        <div>
                            <img onClick={() => cambiarInterfaz(3)} alt='actividades' src={`${URL.servidor}Archivos_u/iconos/actividades-ico.svg`}/>
                            <p>Actividades</p>
                        </div>
                    </div>
                    <div className='cont-info-jornada'>
                        <div>
                            <p>
                                <strong>Jornada</strong>
                                <br/>
                                mañana
                            </p>
                        </div>
                        <div className='separador-misAulas'></div>
                        <div>
                            <p>
                                <strong>Director de grupo</strong>
                                <br/>
                                {`${curso.Nombres} ${curso.Apellidos}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="cont-opciones" > 

                    <div className="cont-img-opciones" id="planilla" onClick={() => cambiarInterfaz(4)} >
                        <p> Consulta y edita tus planillas academicas en tiempo real. </p>
                        <h5 > <strong> Planillas Academicas </strong> </h5>
                        
                    </div>
                
                    
                    <div className="cont-img-opciones" id="evaluaciones" onClick={() => cambiarInterfaz(2)}  >
                        <p> Crea o elije evaluaciones para tus estudiantes. </p>
                        <h5 > <strong> Evaluaciones </strong> </h5>   
                    </div>
                 
                    <div className="cont-img-opciones" id="actividades" onClick={() => cambiarInterfaz(3)}  >
                         <p> Crea o elije actividades para tus estudiantes. </p>  
                        <h5 > <strong> Actividades </strong> </h5>   
                    </div>
                    
                    
                    <div className="cont-img-opciones" id="libros" onClick={() => cambiarInterfaz(5)}  >
                        <p> Elije el libro que desees que tus estudiantes lean. </p>
                        <h5 > <strong> Libros </strong> </h5>   
                    </div>
                </div> 
            </div>
        </div>
    );
}


       /*     <div>
            <div className="d-flex justify-content-start mt-2 " >
                <div className="shadow pointer rounded-circle p-3 bg-white" onClick={Volver} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </div>
            </div>

            <div className={`bg-${curso.ciclos} rounded w-100 p-3 m-2 mt-3`}>
                <div className="row" >

                    <div className="col-md-2" >
                        <div className="d-flex justify-content-center mt-1" >
                            <div className="shadow p-3 m-2 rounded-circle" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-x-diamond" viewBox="0 0 16 16">
                                    <path d="M7.987 16a1.526 1.526 0 0 1-1.07-.448L.45 9.082a1.531 1.531 0 0 1 0-2.165L6.917.45a1.531 1.531 0 0 1 2.166 0l6.469 6.468A1.526 1.526 0 0 1 16 8.013a1.526 1.526 0 0 1-.448 1.07l-6.47 6.469A1.526 1.526 0 0 1 7.988 16zM7.639 1.17 4.766 4.044 8 7.278l3.234-3.234L8.361 1.17a.51.51 0 0 0-.722 0zM8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873L8.722 8zM8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873L8 8.722zM7.278 8 4.044 4.766 1.17 7.639a.511.511 0 0 0 0 .722l2.874 2.873L7.278 8z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-white text-center" >{curso.Curso_Nu} </h6>
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="d-flex justify-content-center mt-1" >
                            <div className="shadow p-3 m-2 rounded-circle" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-people" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-white text-center" >{curso.Can_Est} </h6>
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="d-flex justify-content-center mt-1" >
                            <div className="shadow p-3 m-2 rounded-circle" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-percent" viewBox="0 0 16 16">
                                    <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-white text-center" >{curso.promedio}  </h6>
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="d-flex justify-content-center mt-1" >
                            <div className="shadow p-3 m-2 rounded-circle" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-journals" viewBox="0 0 16 16">
                                    <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                                    <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-white text-center" >{curso.materias}  </h6>
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="d-flex justify-content-center mt-1" >
                            <div className="shadow p-3 m-2 rounded-circle" >
                                {parseInt(curso.jornada) === 1 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-cloud-sun" viewBox="0 0 16 16">
                                        <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
                                        <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                    </svg>
                                    : null}

                                {parseInt(curso.jornada)=== 2 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-brightness-high" viewBox="0 0 16 16">
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg>
                                    : null}

                                {parseInt(curso.jornada) === 3 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-moon" viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                                    </svg>
                                    : null}
                            </div>
                        </div>
                        <div>
                            {parseInt(curso.jornada) === 1 ? <h6 className="text-white text-center" > Mañana </h6> : null}
                            {parseInt(curso.jornada) === 2 ? <h6 className="text-white text-center" > Tarde  </h6> : null}
                            {parseInt(curso.jornada) === 3 ? <h6 className="text-white text-center" > Noche  </h6> : null}
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="d-flex justify-content-center mt-1" >
                            <div className="shadow p-3 m-2 rounded-circle" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            {curso.Nombres && curso.Apellidos
                                ?
                                <h6 className="text-white text-center" >{curso.Nombres} {curso.Apellidos}  </h6>
                                :
                                <h6 className="text-white text-center" > N/A </h6>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="text-center mt-3 font-weight-bolder text-white" > Libros agregados al curso </h3>
            {libros.length === 0 ?
                <div>
                    <p className="text-center p-2 text-warning">No tienes libros agregados.</p>
                </div>
                :
                <div className="row d-flex justify-content-center m-2" >
                    {libros.map(data =>
                        <div className="row col-md-4 pointer " key={data.id}>
                            <div className=" shadow p-3 tarjetas-libros-interfaz bg-gris-whi rounded m-2">
                                <div onClick={() => cambiarInterfaz(8)}>
                                    <div className="d-flex justify-content-center" >
                                        <img className="w-75 " onClick={() => cambiarInterfaz(8)} alt={"Enso Learning " + data.titulo} src={data.portada} />
                                    </div>

                                    <h6 className="text-center mt-3 font-weight-bolder d-flex justify-content-center" > {data.Nombre} </h6>
                                    <h6 className="text-center mt-3 d-flex justify-content-center" > {data.rese} </h6>
                                </div>
                                <div className="d-flex justify-content-center ml-2 " onClick={() => eliminarLibro(data)} >
                                    <div className="bg-danger rounded-circle pointer p-3  shadow-lg ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </div>

                    )}
                </div>
            }

            <div className="row" >
                <div className="col-md-6" >
                    <div className="p-3 m-2 shadow Areas pointer bg-white rounded" onClick={() => cambiarInterfaz(4)} >
                        <h5 className="text-warning"> <strong> Planillas Academicas </strong> </h5>
                        <p> Consulta y edita tus planillas academicas en tiempo real de este curso. </p>
                        <div>
                            <img className="img-aulas rounded" src="https://thumbs.dreamstime.com/b/qualification-skill-test-employment-vector-illustrator-concept-96887555.jpg" alt={"Enso Learning plantillas academicas"} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="p-3 m-2 shadow Areas pointer bg-white rounded" onClick={() => cambiarInterfaz(2)}  >
                        <h5 className="text-warning"> <strong> Evaluaciones </strong> </h5>
                        <p> Crea o elije evaluaciones para tus estudiantes. </p>
                        <div>
                            <img className="img-aulas rounded" src="https://img.freepik.com/free-vector/employer-meeting-job-applicant-pre-employment-assessment-employee-evaluation-assessment-form-report-performance-review-concept-illustration_335657-2058.jpg?size=626&ext=jpg" alt="enso learning evaluaciones" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="p-3 m-2 shadow Areas pointer bg-white rounded" onClick={() => cambiarInterfaz(3)}  >
                        <h5 className="text-warning"> <strong> Actividades </strong> </h5>
                        <p> Crea o elije actividades para tus estudiantes. </p>
                        <div>
                            <img className="img-aulas rounded" src="https://img.freepik.com/free-vector/worker-rating-illustration_1893-2212.jpg?size=626&ext=jpg" alt="enso learning actividades" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="p-3 m-2 shadow Areas pointer bg-white rounded" onClick={() => cambiarInterfaz(5)}  >
                        <h5 className="text-warning"> <strong> Libros </strong> </h5>
                        <p> Elije el libro que desees que tus estudiantes lean. </p>
                        <div>
                            <img className="img-aulas rounded" src="https://img.freepik.com/free-vector/people-library-flat-vector-illustration_74855-6607.jpg?size=626&ext=jpg" alt="Enso Learning aulas" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
*/ 
export default InterfazAulas;