import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../../../URL.js';
import { useSelector, useDispatch } from 'react-redux';
import  '../../../css/misAulas.css'
import matematicas from './../../../img/matematicas.jpg'
import ingles from './../../../img/ingles.jpg'
import ciencias from './../../../img/ciencias.jpg'
import religion from './../../../img/religion.jpeg'
import politica from './../../../img/politica.jpg'
import espanol from './../../../img/español.jpg'




const ViewAulas = () => {

    const [ValidacionCursos, setValidacionCursos] = useState(false)
    const [CodMateria, setCodMateria] = useState([])

    const docente = useSelector(state => state.docente)
    const dispatch = useDispatch()
    console.log(docente)
    console.log(CodMateria);
    // const probar = () =>{
    //     CodMateria.map(e => {
    //         console.log(e)
    //     })
    // }
    useEffect(() => {
        const EnviarDocente = async () => {
            const idDocente = JSON.stringify({ id: docente.id })
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_Curaula.php', idDocente);
            if (!response.data) {
                setValidacionCursos(true)
            } else {
                setCodMateria(
                    response.data
                )
            }
        }
        EnviarDocente()
        // probar()
        //eslint-disable-next-line
    }, []);

    const RetornarComponente = (curso) => {
        dispatch({
            type: "@uploadAulaSeleccionada",
            aulaSeleccionada: curso
        })
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: 1000
        })
    }

   console.log(CodMateria)

    return (
        <div >
            <div className='cont-titulo'>
                <div>
                    <div className='titulo-principal'>
                        <p>{`Mis aulas >`}</p>
                    </div>
                    <div className='titulo-secunda'>
                        <h2>Mis aulas</h2>
                    </div>
                </div>
                <div className='cont-descrip-vista'>
                    <h4>En este espacio podras encontrar tus cursos activos en la institucion,
                        informacion general, horarios,plantillas, agendas, observadores y mucho mas... 
                    </h4>
                </div>
            </div>
            <div className='cont-cursos'>
                    
                {ValidacionCursos ?
                    <div className="col-md-6" >
                        <h2> ¡No tienes cursos a cargo! </h2>
                    </div>
                    : null}

                {CodMateria.map(curso =>
                    <div className="curso" key={curso.id} onClick={() => RetornarComponente(curso)}>
                        <div >    
                            {parseInt(curso.id_materia) === 6 ?
                                <div >
                                    <img className="img-tarjeta" src={politica} alt="Enso learning area de matematicas" />
                                    <div className="cont-texto-card">
                                        <h2 >
                                            Aula {curso.Curso_Nu} Politica    
                                        </h2>
                                    </div>  
                                </div>
                                : null}
                            {parseInt(curso.id_materia) === 5 ?
                                <div >
                                    <img className="img-tarjeta" src={ciencias} alt="Enso learning area de matematicas" />
                                    <div className="cont-texto-card">
                                        <h2 >
                                            Aula {curso.Curso_Nu} Ciencias    
                                        </h2>
                                    </div>  
                                </div>
                                : null}
                            {parseInt(curso.id_materia) === 4 ?
                                <div >
                                    <img className="img-tarjeta" src={religion} alt="Enso learning area de matematicas" />
                                    <div className="cont-texto-card">
                                        <h2 >
                                            Aula {curso.Curso_Nu} Religion    
                                        </h2>
                                    </div>  
                                </div>
                                : null}
                            {parseInt(curso.id_materia) === 3 ?
                                <div >
                                    <img className="img-tarjeta" src={espanol} alt="Enso learning area de matematicas" />
                                    <div className="cont-texto-card">
                                        <h2 >
                                            Aula {curso.Curso_Nu} Español    
                                        </h2>
                                    </div>  
                                </div>
                                : null}
                            {parseInt(curso.id_materia) === 2 ?
                                <div >
                                    <img className="img-tarjeta" src={ingles} alt="Enso learning area de matematicas" />
                                    <div className="cont-texto-card">
                                        <h2 >
                                            Aula {curso.Curso_Nu} ingles    
                                         </h2>
                                </div>  
                            </div>
                                : null}
                            {parseInt(curso.id_materia) === 1 ?
                                <div >
                                    <img className="img-tarjeta" src={matematicas} alt="Enso learning area de matematicas" />
                                    <div className="cont-texto-card">
                                         <h2 >
                                             Aula {curso.Curso_Nu} Matematicas    
                                         </h2>
                                    </div>  
                                </div>
                                : null}
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



export default ViewAulas;