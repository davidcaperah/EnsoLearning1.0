import React, { useState, useEffect } from 'react';
// import Banner from './Banner';
import Button from '@material-ui/core/Button';
import Evaluacion from './Evaluacion';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import BannerPage from './Banner';
import Page from './Sistema de Evaluaciones/Page';
import URL from './../../URL';
import Calendario from '../../components/calendario'
import '../css/evaluaciones.css'
const Evaluaciones = () => {

    const numberInterfazEstudiantes = useSelector(state => state.numberInterfazEstudiantes)
    const dispatch = useDispatch()

    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();


    const Desencriptar = (NombreCookie, Llave) => {
        let IdEncriptado = cookies.get(NombreCookie)
        let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let idCurso = Desencriptar("idCurso", "A")
    let iduser = Desencriptar("iduser", "A")

    const [ArregloDeActividades, setArregloDeActividades] = useState([])
    const [idEvaluacion, setidEvaluacion] = useState(0)

    const mostrarEvaluaciones = (Acti, num) => {
        dispatch({
            type: "@updatenumberInterfazEstudiantes",
            numberInterfazEstudiantes: num
        })
        setidEvaluacion(Acti)
    }

    const cargarEvaluaciones = async () => {
        const consulta = await axios({
            method: "post",
            url: `${URL.servidor}/api-php-react/Cargar_evaluacion_m.php`,
            data: {
                d: 1,
                id_curso: idCurso
            }
        })
        setArregloDeActividades(consulta.data)
    }

    useEffect(() => {
        cargarEvaluaciones()
    }, [])

    console.log(ArregloDeActividades)
    return (
        <div>
            {numberInterfazEstudiantes === 0 ?
            <div>
                <div className='con-info-aulas2'>
                    <div>
                        <h4 className='titu-estu2-evalu'>Bienvenido a tus Evaluaciones</h4>
                        <p className='con-descri-evaluaciones-estu2'>
                            Aquí podrás encontrar todas las evaluaciones disponibles para desarrollar en este periodo...
                        </p>
                    </div>
                </div>
                <div className='evaluaciones-titulo-estu2'>
                    <div className='evaluacio-estu-1'>
                        <h4>Evaluaciones pendientes por realizar</h4>
                    </div>
                </div>
                
                <div className='cont-evaluaciones-estu1'>
                    <div className='cont-cards-evaluaciones-estu1'>
                    {ArregloDeActividades.map(Acti =>
                        <div key={Acti.id} className='cont-card-evaluaciones-estu2'>
                            <div className=''>
                                <img src={`${URL.servidor}Archivos_u/iconos/placa-tornillo.svg`}/>
                            </div>
                            <div className='datos-card-evaluacion-estu2'>
                                <div className='datos-info-estu1'>
                                
                                    <div>
                                        <h5>
                                            <strong>Suma de tres cifras</strong> <br/>
                                            Aula de matematicas
                                        </h5>
                                        <p>
                                            Fecha max de entrega <br/>
                                            2022-08-25<br/>
                                            cantidad de preguntas : 10 <br/>
                                            Tiempo estimado : 30 min
                                            
                                        </p>
                                        
                                    </div>
                                </div>
                                <div>
                                    <div className='deco-img-card-estu3'>
                                        <img id="img-card-evalu-estu2" src={`${URL.servidor}Archivos_u/iconos/matematicasImg.svg`}/>
                                        <div onClick={() => mostrarEvaluaciones(Acti, 1)}>Iniciar evaluacion</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                    <div className='cont-calentadrio-estu-evalua'>
                        <Calendario contenedor={`cont-calendario-home3`} diasCale={`dias-calendario-home`} colorLetra={'mes-calendario2'} />
                    </div>
                </div>
            </div>: null}
            {numberInterfazEstudiantes === 1 ?
                <div className="container mt-4">
                    <div className="p-3 m-2 shadow" >
                        <div className="d-flex justify-content-start" >
                            <div className="pointer rounded-circle shadow  p-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" onClick={() => mostrarEvaluaciones({}, 0)} className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </div>
                        </div>
                        <Evaluacion idEvaluacion={idEvaluacion} iduser={iduser} />
                    </div>
                </div>
                : null}

            {numberInterfazEstudiantes === 2 ? <Page /> : null}
        </div>
    );
}

/*
     <div className="bg-light pb-5" >
            {numberInterfazEstudiantes === 0 ?
                <div>
                    <BannerPage img="hola" welcome="Bienvenido, aquí podrás ver todas tus actividades pendientes." text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?" />
                    <div className="container pt-3" >
                        <div className="row m-3  rounded"  >
                            {ArregloDeActividades.map(Acti =>
                                <div className="col-md-6 " key={Acti.id} >
                                    <div className="m-1 p-3 bg-light rounded shadow" >
                                        <h4> {Acti.Titulo} </h4>
                                        <p> <span className="h6" > Materia: </span>  Sociales </p>
                                        <p> <span className="h6" > Objetivo: </span> {Acti.texto} </p>
                                        <p> <span className="h6" > Fecha de entrega:</span> {Acti.fecha_max} </p>
                                        <p> <span className="h6" > Tiempo para la Evaluación:</span> {Acti.tiempo} Minutos </p>
                                        <p> <span className="h6" > Número de preguntas:</span> {Acti.preguntas} </p>
                                        {Acti.estado === "1" &&
                                            <div>
                                                <div className="d-block">
                                                    <div className="alert alert-success w-100 text-center p-2" > Activo </div>
                                                </div>
                                                <Button variant="contained" color="primary" className="d-block" onClick={() => mostrarEvaluaciones(Acti, 1)} >
                                                    Desarrollar evaluacion
                                                </Button>
                                            </div>
                                        }
                                        {Acti.estado === "2" &&
                                        <div>
                                            <div className="d-block">
                                                <div className="alert alert-warning w-100 text-center p-2" > Inactivo </div>
                                            </div>
                                            <Button variant="contained" color="primary" className=" m-auto d-block" onClick={() => mostrarEvaluaciones(Acti, 1)} >
                                                Ver nota
                                            </Button>
                                        </div>
                                        }
                                        {Acti.estado === "0" &&
                                        <div>
                                            <div className="d-block">
                                                <div className="alert alert-warning w-100 text-center p-2" > Inactivo </div>
                                            </div>
                                            <Button variant="contained" color="primary" className=" m-auto d-block" onClick={() => mostrarEvaluaciones(Acti, 1)} >
                                                Ver nota
                                            </Button>
                                        </div>
                                        }
                                    </div>
                                </div>
                            )}{ArregloDeActividades.length === 0 &&
                                <div className="shadow p-3 m-2 w-50 m-auto" >
                                    <h6 className="text-center"> <strong>¡Felicidades!</strong>, en el momento no cuentas con evaluaciones pendientes! </h6>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : null}

            {numberInterfazEstudiantes === 1 ?
                <div className="container mt-4">
                    <div className="p-3 m-2 shadow" >
                        <div className="d-flex justify-content-start" >
                            <div className="pointer rounded-circle shadow  p-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" onClick={() => mostrarEvaluaciones({}, 0)} className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </div>
                        </div>
                        <Evaluacion idEvaluacion={idEvaluacion} iduser={iduser} />
                    </div>
                </div>
                : null}

            {numberInterfazEstudiantes === 2 ? <Page /> : null}
        </div>

*/
export default Evaluaciones;