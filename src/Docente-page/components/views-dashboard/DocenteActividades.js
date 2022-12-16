import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../URL.js';
import EditAnuncios from './editActividad';
import Swal from 'sweetalert2';
import Calificar from './Calificar.js';
import '../../css/actividades.css'
import CrearActividad from './DocenteActividadesCrear'
import Calendario from '../../calendario'
import Cactividad from './Actividades/CrearActividad'
import VerActividad from './Actividades/VerActividad'
import AsignarActividad from './Actividades/AsignarActividad'
import CambiarEstado from './Actividades/CambiarEstado'

const DocenteActividades = () => {

    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [DatosRecibidosasig, setDatosRecibidosasig] = useState([])
    const [datosEnviar, setdatosEnviar] = useState({})
    const [estadoA, setestadoA] = useState(0)
    const [Veractividad, setVeractividad] = useState({})


    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();

    const CambiarEA = (e,actividad) =>{
        setestadoA(e)
        setVeractividad(actividad)
    }

    const Desencriptar = (NombreCookie, Llave) => {
        let IdEncriptado = cookies.get(NombreCookie)
        let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let iduser = Desencriptar("iduser", "A")


    const Datos = {
        idP: iduser,
        d: 7
    }
    const Datosasig = {
        idP: iduser,
        d: 3
    }
    console.log(Datos);
    const deleteAct = (act) => {
        Swal.fire({
            title: '¿Quieres eliminar esta actividad?',
            showDenyButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const DatosJson = JSON.stringify({
                    d: 6,
                    id: act.id
                    // id_Pro : Datos.idP, Guardar libro.
                    // Id_curso : DatosRecibidos.id_curso
                })
                const api = axios.create({ baseURL: URL.servidor });
                const respuesta = await api.post('/api-php-react/info_actividad_maestro.php', DatosJson);
                const resBackend = respuesta.data;
                if (resBackend === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha eliminado la actividad',
                        text: act.Nombre,
                        timer: 1000
                    })
                    const newDatos = DatosRecibidos.filter(data => data.id !== act.id)
                    setDatosRecibidos(newDatos)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar',
                        text: 'Por favor comunicarse con soporte'
                    })
                }
            }
        })
    }

    useEffect(() => {
        const sendData = async () => {
            const DatosJson = JSON.stringify(Datos)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_actividad_maestro.php', DatosJson);
            const data = response.data
            setDatosRecibidos(
                ...DatosRecibidos,
                data
            )
        }
        const sendDataasig = async () => {
            const DatosJson = JSON.stringify(Datosasig)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_actividad_maestro.php', DatosJson);
            const data = response.data
            setDatosRecibidosasig(
                ...DatosRecibidosasig,
                data
            )
        }
        sendData();
        sendDataasig();
        //eslint-disable-next-line
    }, []);
    const Cambiarintefaz = (inter,eva) =>{
        setnumeroInterfaz(inter)
        if(eva !== 0){
            setdatosEnviar(eva)
        }
        
    }

    console.log(Veractividad)
    console.log(DatosRecibidosasig)
    return (
        <div className='container-flex'>
        {numeroInterfaz === 0 ?
        <div>
            <div className='row contenedor-ecaluacion'>
                <div className='col-md-4 col-xs-3 header-evaluacion'>
                    <p>{`Evaluaciones`}</p>
                    <h3>Actividad</h3>    
                    <svg width="430" height="290" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth="0" transform="rotate(42.3141, 142.34, 128.318)" id="svg_1" d="m142.31161,201.31344c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 124.11448,79.06179 92.53753,125.09326c-31.57695,46.03147 -65.69122,60.41077 -127.09997,30.53378l0,0.00001z" opacity="undefined" stroke="#000" fill="#ffe051"/>
                        <path strokeWidth="0" transform="rotate(3.44996, 96.437, 194.375)" id="svg_6" d="m85.67218,274.0409c-54.73653,-1.12407 -146.407,-21.18349 -148.99923,-101.90566c-2.59222,-80.72218 113.33626,-73.67283 187.65755,2.46831c74.32129,76.14114 181.97181,20.27043 105.87094,59.48369c-76.10086,39.21326 -89.79273,41.07773 -144.52927,39.95366z" opacity="undefined" stroke="#000" fill="#ffe051"/>
                        <path transform="rotate(8.65267, 264.951, 169.881)" id="svg_7" d="m255.64946,237.14642c-56.53371,-2.38947 -102.74717,73.20136 -110.27689,-20.95875c-7.52972,-94.1601 42.4552,-145.08178 98.58667,-139.62287c56.13147,5.45892 140.65277,38.24618 141.31992,96.70895c0.66715,58.46276 -73.09599,66.26213 -129.6297,63.87267z" opacity="undefined" strokeWidth="0" stroke="#000" fill="rgba(255,175,141,.9)"/>
                    </svg> 
                </div>
                <div className='col-md-6 col-xs-8  flex-column d-flex justify-content-end '>
                    <div className="d-flex flex-row h-100 align-items-center justify-content-end mr-3 pr-5 mt-5 pt-5 ">
                    <div className='boton-evaluacion ' onClick={()=>Cambiarintefaz(1,0)} >Ver Actividades</div> 
                        <div className='boton-evaluacion offset-md-2' onClick={()=>Cambiarintefaz(2,0)} >+ Crear Actividad</div> 
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        <div className='col-sm-12 col-md-4 col-xl-4 p-2 px-3 py-5 '>
                            <h5 className={`opciones-evaluaciones ${estadoA ===0?"opcio-evalu-activa":"opcio-evalu-desacti"}`} onClick={()=>CambiarEA(0,0)} >Actividades Creadas</h5>
                        </div>
                        <div className='col-sm-12 col-md-4 col-xl-4 p-2 px-3 py-5   '>
                            <h5 className={`opciones-evaluaciones ${estadoA ===1?"opcio-evalu-activa":"opcio-evalu-desacti"}`} onClick={()=>CambiarEA(1,0)} >Actividades Activas</h5>
                        </div>
                        <div className='col-sm-12 col-md-4 col-xl-4 p-2 px-3 py-5  '>
                            <h5 className={`opciones-evaluaciones ${estadoA ===2?"opcio-evalu-activa":"opcio-evalu-desacti"}`} onClick={()=>CambiarEA(2,0)}>Actividades vencidas</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row contenedor-ecaluacion'>
                <div className='col-md-3 col-xl-3 d-flex  justify-content-center ml-5'>
                   <Calendario contenedor={`cont-calendario`} diasCale={`dias-calendario`}/>
                </div>
                <div className='col-md-8 col-xl-8'>

                    <div className='row'>
                            {
                            estadoA === 0 ?
                            DatosRecibidos.map(actividad =>
                                <div className='cont-card-evaluacion col-3 ' key={actividad.id}>
                                    <div className='cont-datos-evaluaciones'>
                                        <div>
                                            <h4>{actividad.Nombre} </h4>

                                        </div>
                                        <div>
                                            <p>
                                                Cantidad de puntos: <br/>
                                                {actividad.C_puntos} <br/>
                                                materia : {actividad.N_Materia} <br/>
                                                curso : {actividad.Curso ? actividad.Curso : "NA" }°
                                            </p>
                                        </div>
                                        <div>
                                            <div onClick={()=>CambiarEA(4,actividad)} className='btn-estado-evaluacion'>
                                                ver
                                            </div> 
                                        </div> 
                                    </div>
                                    
                                </div>
                            
                            ):null}
                            {
                            estadoA === 1 ?
                            DatosRecibidosasig.map(actividad =>
                                actividad.estado_d == 1 ?
                                <div className='cont-card-evaluacion col-3 ' key={actividad.id}>
                                    <div className='d-flex flex-row'>
                                        <div className='estado-evaluaciones'>Estado:activa </div>
                                        <div className=''></div>
                                    </div>
                                    <div className='cont-datos-evaluaciones'>
                                        <div>
                                            <h2> {actividad.Titulo}</h2>
                                        </div>
                                        <div>
                                            <p>
                                                Fecha de creacion <br/>
                                                {actividad.fecha_c}<br/>
                                                Fecha max de entrega: <br/>
                                                {actividad.fecha_MAX} <br/>
                                                Periodo : {actividad.periodo}
                                            </p>
                                        </div>
                                        <div>
                                            <div className='btn-estado-evaluacion' onClick={()=>CambiarEA(3,actividad)}>
                                                estado
                                            </div> 
                                        </div> 
                                    </div>
                                    
                                </div>
                                : null
                            
                            ):null}
                                                        {
                            estadoA === 2  ?
                            DatosRecibidosasig.map(actividad =>
                                parseInt(actividad.estado_d) === 2 ?
                                <div className='cont-card-evaluacion col-3 ' key={actividad.id}>
                                    <div className='d-flex flex-row'>
                                        <div className='estado-evaluaciones-vencida'>Estado:vencidas </div>
                                        <div className=''></div>
                                    </div>
                                    <div className='cont-datos-evaluaciones'>
                                        <div>
                                            <h2> {actividad.Nombre}</h2>
                                        </div>
                                        <div>
                                            <p>
                                                Fecha de creacion <br/>
                                                {actividad.fecha_c}<br/>
                                                Fecha max de entrega: <br/>
                                                {actividad.fecha_MAX} <br/>
                                                Periodo : {actividad.periodo}
                                            </p>
                                        </div>
                                        <div>
                                            <div className='btn-estado-evaluacion' onClick={()=>CambiarEA(3,actividad)}>
                                                estado
                                            </div> 
                                        </div> 
                                    </div>
                                    
                                </div>:null
                            
                            ):null}
                            {
                            estadoA === 3 ?
                           <div className='col-md-12'>
                        <CambiarEstado actividad={Veractividad} />
                           </div>
                           :null}
                            {
                            estadoA === 4 ?
                           <div className='col-md-12'>
                        <VerActividad actividad={Veractividad} volver={()=>CambiarEA(5,0)}/>
                           </div>
                           :null}
                                                       {
                            estadoA === 5 ?
                           <div className='col-md-12'>
                        <AsignarActividad actividad={Veractividad} volver={()=>CambiarEA(4,0)} />
                           </div>
                           :null}
                            

                    </div>

                </div>
            </div>
        </div> :
        null
        }
        {
            numeroInterfaz === 1? 
            <div>
                <CrearActividad/>
            </div>
             :
            null
        }
        {
            numeroInterfaz === 2?
            <div>
                <Cactividad volver={()=>Cambiarintefaz(0,0)}/>
            </div>:
            null
        }
        </div> 
    );
}


/*<div className="p-4" >
            {numeroInterfaz === 0 ?
                <div>
                    {DatosRecibidos.length === 0 ?
                        <div className="shadow bg-white p-3 m-5 w-50 m-auto" >
                            <h6 className="text-center"> <strong>No haz realizado ninguna actividad!</strong> </h6>
                        </div>
                        :
                        <div className="row" >
                            {DatosRecibidos.map(evaluacion =>
                                <div className="col-md-6" key={evaluacion.id}>
                                    <div className="shadow rounded   bg-light p-3 m-2 ">
                                        <div onClick={() => editAct(evaluacion, 3)} className="pointer">
                                            <h3> {evaluacion.Nombre} </h3>
                                            <p>  Fecha de creación : {evaluacion.fecha_c} </p>
                                            <p> Fecha máxima de entrega : {evaluacion.fecha_MAX} </p>
                                            <p> Periodo : {evaluacion.periodo} </p></div>
                                        {evaluacion.estado_d === "1" ? <div className="alert-success p-2" > <p> Estado : Activo </p>  </div> : null}
                                        {evaluacion.estado_d === "0" ? <div className="alert-warning p-2" > <p> Estado : Inactiva </p>  </div> : null}
                                        {evaluacion.estado_d === "2" ? <div className="alert-warning p-2" > <p> Estado : Inactiva </p>  </div> : null}

                                        <div className="d-flex mt-2 justify-content-center" >
                                            <div>
                                                <div className="d-flex justify-content-center" >
                                                    <div className="bg-warning rounded-circle pointer p-3  shadow-lg" onClick={() => editAct(evaluacion, 2)} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="d-flex justify-content-center ml-2" >
                                                    <div className="bg-danger rounded-circle pointer p-3  shadow-lg" onClick={() => deleteAct(evaluacion, 4)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
                : null}

            {numeroInterfaz !== 0 ?
                <div>
                    <div className="d-flex justify-content-start mt-2" >
                        <div className="shadow pointer bg-white rounded-circle p-3" onClick={() => setnumeroInterfaz(0)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </div>
                    </div>
                    {numeroInterfaz === 2 ? <EditAnuncios datosEnviar={datosEnviar} /> : null}
                    {numeroInterfaz === 3 ? <Calificar Datos={datosEnviar} /> : null}
                </div>
                : null}
        </div>*/
export default DocenteActividades;