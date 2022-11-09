import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../../../URL.js';
import { useSelector, useDispatch } from 'react-redux';
import  '../../../css/misAulas.css'




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
                    
                    <div className='titulo-secunda'>
                        <h2>Mis aulas</h2>
                    </div>
                    </div>
                </div>
                <div className='cont-descrip-vista'>
                    <h4>En este espacio podras encontrar tus cursos activos en la institucion,
                        informacion general, horarios,plantillas, agendas, observadores y mucho mas... 
                    </h4>
                </div>
            </div>
            <div className='row'>
                    {ValidacionCursos ?
                        <div className="col-md-12" >
                            <h2> ¡No tienes cursos a cargo! </h2>
                        </div>
                        : null}
    
                    {CodMateria.map(curso =>
                        <div className="col-md-3 curso" key={curso.id} onClick={() => RetornarComponente(curso)}>
                            <div >
                                <img className="img-tarjeta" src={URL.servidor+"/Archivos_u/iconos/"+curso.imagen} alt="Enso learning area de matematicas" />
                                <div className="cont-texto-card">
                                    <h2 >Aula</h2>
                                    <h2>{curso.Curso_Nu}</h2>
                                    <h2>{curso.N_Materia}</h2>
                                </div>  
                            </div>
                        </div>

                    )}
                    <div className="col-md-3 curso"  onClick={() => RetornarComponente()}>
                            <div >
                                <img className="img-tarjeta" src={URL.servidor+"/Archivos_u/iconos/"} alt="Enso learning area de matematicas" />
                                <div className="cont-texto-card">
                                    <h2 >
                                        Aula  Politica    
                                    </h2>
                                </div>  
                            </div>
                        </div>
                </div>
        </div>
    );
}



export default ViewAulas;