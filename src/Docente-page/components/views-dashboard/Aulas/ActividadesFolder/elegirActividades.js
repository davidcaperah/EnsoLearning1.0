import React,{useState} from 'react';
import URL from '../../../../../URL.js';
import Swal from 'sweetalert2'

import {useDispatch,useSelector} from 'react-redux';
import VistaActividades from '../ActividadesFolder/VistaActividad';
import axios from "axios"

const ElegirActividades = () => {
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [Validacion, setValidacion] = useState(false)
    const [Mensaje, setMensaje] = useState({mensaje : "Esperando busqueda" , tipo : "2"})
    const [select, setselect] = useState(false)
    const [datos, setdatos] = useState()
    
    const onChange = async  (e) => {
        let datos= {
            d : 1,
            nombre : document.getElementById("nombre").value
        }
        let DatosJson = JSON.stringify(datos)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react//info_actividad_maestro.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.mensaje){
            setDatosRecibidos([])
            setValidacion(false)
            setMensaje(datosRecibidos)
        }else if(datosRecibidos.length > 0){
            setValidacion(true)
            setDatosRecibidos(
                datosRecibidos
            )
        }

        /*try {
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            let res = await fetch(`${URL.servidor}/api-php-react/info_actividad_maestro.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()
            console.log(json);
            if(json.mensaje){
                setDatosRecibidos([])
                setValidacion(false)
                setMensaje(json)
            }else if(json.length > 0){
                setValidacion(true)
                setDatosRecibidos(
                    json
                )
            }

        } catch (error) {
            console.log(error)
        }*/
    }

    const agregarActividad = (data) => {
        setselect(true)
        setdatos(data)

    }


    const agregarActividadServidor = async (data) =>{
        let idActividad = 0
        let datos = {
            maestra : idActividad ,
            acti : data.id,
            d : 2
        }
        let DatosJson = JSON.stringify(datos)
        console.log(DatosJson)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_actividad_maestro.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos === true){
            Swal.fire({
                text : "Se ha agregado correctamente la actividad. Se notificará a los estudiantes.",
                icon : "success"
            })
            window.location.replace("/DocenteActividades")
        }

        /*try {
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            let res = await fetch(`${URL.servidor}/api-php-react/info_actividad_maestro.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()
            if(json === true){
                Swal.fire({
                    text : "Se ha agregado correctamente la actividad. Se notificará a los estudiantes.",
                    icon : "success"
                })
                window.location.replace("/DocenteActividades")
            }
            
        } catch (error) {
            console.log(error);
        }*/
    }
    console.log(DatosRecibidos)
    return (
        <div className="m-2" >
            {select === false ?
                <div>
                      <div>
                        <h6 className="m-2 text-white" > Busca y elige la actividad que desees agregar. </h6>
                        <input id="nombre" onChange={onChange} type="text" name="nombre" className="form-control m-2 col-md-4" placeholder="Nombre" />
                    </div>
        
                    {Validacion ? 
                        <div className="row mt-4" >
                            {DatosRecibidos.map(data => 
                            <div className="col-md-6 Areas pointer" key={data.id}>
                                <div className="shadow p-3 m-2">
                                    <p className="text-white"> <span className="h6" > Nombre: </span> {data.Nombre} </p>
                                    <p className="text-white">  <span className="h6" > Objetivo: </span> {data.objetivo} </p>
                                    <button variant="contained" color="secondary" className="m-3" type="button" onClick={()=> agregarActividad(data)}>
                                            ver
                                </button>
                                </div>
                            </div>  
                            )}
                        </div>
                    :   
                        <div>
                            {Mensaje.tipo === "1" ? <div className="alert alert-danger  m-3" > {Mensaje.mensaje} </div> : null}
                            {Mensaje.tipo === "2" ? <div className="alert alert-warning m-3" > {Mensaje.mensaje} </div> : null}
                        </div>
                    }
                </div>    
                :
                <div>
                    <VistaActividades ver={datos}/>
                </div>
            }
        </div>
    );
}
 
export default ElegirActividades;