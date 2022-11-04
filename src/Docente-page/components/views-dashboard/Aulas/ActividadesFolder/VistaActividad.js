import React,{useState} from 'react';
import URL from '../../../../../URL.js';
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core';
import Cookies from 'universal-cookie/es6';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { json } from 'react-router-dom';

const ElegirActividades = (vista) => {
    const cookies = new Cookies()
    let CryptoJS = require("crypto-js")
    const Desencriptar = (Nombre , key ) => {
        let IdEncriptado =  cookies.get(Nombre)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, key)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
    let iduser = Desencriptar('iduser' , 'A')
    let idcol = Desencriptar('idcol' , 'A')
    const subirActividad = useSelector(state => state.CrearActividadDocente)
    const [datos, setdatos] = useState(vista.ver)
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const agregarActividad = () => {
        Swal.fire({
            title: '¿Esta seguro de utilizar esta actividad?',
            showDenyButton: true,   
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
                agregarActividadServidor(datos)
            } 
          })

    }
    const agregarActividadServidor = async (data) =>{
        let DatosJson = JSON.stringify(subirActividad)
        const consulta = await axios({
           method : "post",
           url : `${URL.servidor}/api-php-react/info_actividad_maestro.php`,
           data : DatosJson
       })   
        let maestra = consulta.data
        let idActividad = 0
        let datos = {
            maestra : maestra ,
            acti : data.id,
            d : 0,
            iduser:iduser,
            idcol:idcol,
            idcurso:0
        }
        let DatosJson1 = JSON.stringify(datos)
        console.log(DatosJson1)

        const Consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_actividad_maestro.php`,
            data:DatosJson1
        })

        let datosRecibidos = Consulta.data

        if(datosRecibidos === true){
            Swal.fire({
                text : "Se ha agregado correctamente la actividad. Se notificará a los estudiantes.",
                icon : "success"
            })
            // window.location.replace("/DocenteActividades")
        }

        /*try {
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson1
            }
            let res = await fetch(`${URL.servidor}/api-php-react/info_actividad_maestro.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()a
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
    let H = JSON.parse(datos.puntos);
    console.log(datos);
    let contar = 0;
    console.log(H)
    return (
        <div className="m-2" >
            <div className='container'>
            <h5 className="m-2 text-white" >Nombre:</h5>
                <h6 className="m-2 " > {datos.Nombre}</h6>
                <h5 className="m-2 " >Objetivo:</h5>
                <h6 className="m-2 " > {datos.objetivo}</h6>
                <h5 className="m-2 " >Materia:</h5>
                <h6 className="m-2 " > {datos.N_Materia}</h6>
                <h5 className="m-2 " >Tipo:</h5>
                <h6 className="m-2 " > {datos.Tipo}</h6>
                <h5 className="m-2 " >Sub-tipo:</h5>
                <h6 className="m-2 " > {datos.tipo_s === 1? "Opción multiple": datos.tipo_s === 2? "Unión" :datos.tipo_s === 3? "Preguntas Abietas" :null}</h6>
                <h5 className="m-2 " >Puntos:</h5>
                {datos.tipo_s === 3? 
                <div>
                {H.map(puntos=>
                    <div  className="shadow p-3 mb-5 bg-body rounded">
                    <h6 className="m-2 "> {puntos}</h6>
                    </div>
                    )}
                </div>
                :
                                null
                }
                {datos.tipo_s === 1? 
                <div>
                {H.map(puntos=>
                    <div className="shadow p-3 mb-5 bg-body rounded">
                    <h6 className="m-2 "> {puntos.pregunta} </h6>
                    <h6 className="m-2 "> A. {puntos.a} </h6>
                    <h6 className="m-2 "> B. {puntos.b} </h6>
                    <h6 className="m-2 "> C. {puntos.c} </h6>
                    <h6 className="m-2 "> D. {puntos.d} </h6>
                    </div>
                    )}
                </div>
                :
                                null
                }
                
                <Button variant="contained" color="secondary" className="m-3" type="button" onClick={()=> agregarActividad()}>
                                            agregar
                                </Button>
            </div>

        </div>
    );
}
 
export default ElegirActividades;