import play from '../img/play.svg';
import Actividad from './Actividad';
import React,{useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import URL from '../../URL.js';
import BannerPage from './bannerPage';
import Calendario from '../../calendario'
import '../css/actividades.css'
const Actividades = () => {

    const [Validacion, setValidacion] = useState(true)
    const [Id, setId] = useState(0)
    const [ArregloDeActividades, setArregloDeActividades] = useState([])

    const DesarrollarActividad = (Acti) => {
        setValidacion(false)
        setId(Acti)
    }

    const Volver = () => {
        setValidacion(true)
        setId(0)
    }

    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    let IdEncriptado =  cookies.get('idCurso')
    let bytes  = CryptoJS.AES.decrypt(IdEncriptado, 'A')
    let Idcurso = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))


    const Datos = {
        id : Idcurso 
    }

    useEffect(()=>{
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify({curso : Datos.id , d : 1})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            const data = response.data
            console.log(data);
            if(data.length > 0){
                setArregloDeActividades(data)
            }else {
                setArregloDeActividades([])
            }
        }
        TraerDatos()
        //eslint-disable-next-line
    }, []);  
    
    console.log(ArregloDeActividades)
    return (
        
    <div>
        {Validacion ?
        <div>
            <div className='con-info-aulas2'>
                <div>
                    <h4 className='titu-estu2-evalu'>Bienvenido a tus actividades</h4>
                    <p className='con-descri-evaluaciones-estu2'>
                        En este espacio podrás encontrar todas las actividades asignadas por 
                        tus docentes para poner en practica tus conocimientos y adicionalmente 
                        encontraras tus lecturas asignadas
                    </p>
                </div>
            </div>
            <div className='evaluacio-estu-1'>
                <h4>Lecturas asignadas</h4>
            </div>
            <div className="cont-actividades-estu1" >
                <div >
                    <div className='iconos-libro-acti-estu'>
                        <img className="ico-selecio-libro-estu1" src={`${URL.servidor}Archivos_u/iconos/categorias.svg`}/>
                        <img src={`${URL.servidor}Archivos_u/iconos/menuHabu.svg`}/>
                    </div>
                    <div className='cont-libro-actividad-estu1'>
                        <div>
                            <img src={`${URL.servidor}Archivos_u/iconos/principe.svg`}/>
                        </div>
                        <div className='info-libro-actividades-estu1'>
                            <h5>Libro principito-Capitulo 1</h5>
                            <p>
                                El explorador traza su primer dibujo, el cual no era entendido
                                por los adultos, por que creian que era un sombrero y no veian
                                lo que habia en su interior. 
                                la enseñanza que deja es que no hay que ver en su exterior  de una 
                                persona, si no que hay que ver  lo bueno que hay en el interior de ella.    
                            </p>
                            <img src={`${URL.servidor}Archivos_u/iconos/flecha-derecha.svg`}/>
                        </div>
                        <div className='btn-libros-acti-estu1'>
                            <div className='btn-acti-lectura2'>Ver lectura</div>
                            <div className='btn-acti-biblioteca2'>ir a la biblioteca</div>
                        </div>
                    </div>
                </div>
                <div className='cont-calendario-acti-estu1'>
                    <Calendario contenedor={`cont-calendario-home2`} diasCale={`dias-calendario-home`} colorLetra={'mes-calendario2'} />
                </div>
            </div>
            <div className='evaluacio-estu-1'>
                <h4>Actividades pendientes por realizar</h4>
            </div>
            <div className='cont-acti-estu-1'>
            {ArregloDeActividades.map(Acti =>
                <div  key={Acti.id} className='card-actividades-estu2'>
                    <div className='cont-datos-evaluacion-estu2'>
                        <div className='cont-titu-card-actividades2'>
                            <h5>{Acti.Nombre}</h5>
                            <h6>Area de {Acti.materia_name} 202</h6>
                        </div>
                        <div>
                            <p>
                                Vencimiento <br/>
                                {Acti.fecha_MAX}
                            </p>
                        </div>
                        <div className='progres-bar-actividadesa2'></div>
                        <div className='btn-iniciar-acti-estu-2' onClick={()=> DesarrollarActividad(Acti) } >
                            Iniciar actividad
                        </div>
                    </div>
                    <div className='card-cont-img-actividades'>
                        <img src={`${URL.servidor}Archivos_u/iconos/matematicas.svg`}/>
                    </div>
                    
                </div>
            )}

            </div>
        </div>
        :
        <div className="container" > 
            <div className="p-3 m-2 shadow" >
                <div className="d-flex justify-content-start" > 
                    <div className="pointer rounded-circle  p-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" onClick={Volver} className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>
                </div>
                <Actividad idActividad={Id} />
            </div>
        </div>
    }
    </div>
    );
}



/* 
    <div className="bg-pink pb-5" >
            <BannerPage img={play} welcome="Bienvenido, aquí podrás ver todas tus actividades pendientes." text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?" />
            {Validacion ?
                <div className="container pt-3 " >
                    <div className="row m-3  rounded"  >
                    {ArregloDeActividades.map(Acti =>
                        <div className="col-md-6 " key={Acti.id} > 
                            <div className="m-1 p-3 shadow" >
                                <h4> {Acti.Nombre} </h4>
                                <p> <span className="h6" > Materia:   </span> {Acti.materia_name}</p>
                                <p> <span className="h6" > Objetivo:  </span> {Acti.descri} </p>
                                <p> <span className="h6" > Fecha de entrega: </span> {Acti.fecha_MAX} </p>
                                <p> <span className="h6" > Periodo: </span> {Acti.periodo} </p>
                                {Acti.estado_name === "Activo" ? <div className="alert alert-success" > Activo </div> :  <div className="alert alert-danger" > No Activo </div> }
                                <Button variant="contained" color="secondary" className="mt-3" onClick={()=> DesarrollarActividad(Acti) }  >
                                    Desarrollar Actividad
                                </Button>
                            </div>
                        </div>
                    )}{ArregloDeActividades.length === 0 &&
                        <div className="shadow p-3 m-2 w-50 m-auto" >
                            <h6 className="text-center"> <strong>¡Felicidades!</strong>, en el momento no cuentas con lecturas pendientes! </h6>
                        </div>
                    }
                    </div>

                </div>    

            :
                <div className="container" > 
                    <div className="p-3 m-2 shadow" >
                        <div className="d-flex justify-content-start" > 
                            <div className="pointer rounded-circle  p-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" onClick={Volver} className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </div>
                        </div>
                        <Actividad idActividad={Id} />
                    </div>
                </div>
            }
        </div>
*/
 
export default Actividades;