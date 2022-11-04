import React,{useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import URL from '../../../URL.js';
import Swal from 'sweetalert2';

const GetActividades = () => {

    const dispatch = useDispatch()
    const [Actividades, setActividades] = useState([])

    const cargarActividades = async () => {
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/info_admin.php`,
            data : {d : 9}
        })
        setActividades(consulta.data)
    }

    useEffect(() => {
        cargarActividades()
    }, [])




    const crearActividad = () => {
        dispatch({
            type : "numberInterfazActividades",
            numberInterfazActividades : 4
        })
    }
    const Cambiar_Curso = async (e) => {
        console.log(e.target.id)
        let curso = e.target.value
        let id = e.target.id
        const consulta = await axios({
            method : "POST",
            url : `${URL.servidor}/api-php-react/info_admin.php`,
            data : {
                d : 15,
                id : id,
                curso:curso
            }
        })
    }

    const eliminarActividad = (acti) => {
        Swal.fire({
            title: '¿Quieres eliminar esta actividad?',
            text : "¡Se quitará de todos los subtemas en los que este agregado!",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
            }).then(async  (result) => {
            if (result.isConfirmed) {
                const consulta = await axios({
                    method : "POST",
                    url : `${URL.servidor}/api-php-react/info_admin.php`,
                    data : {
                        d : 10,
                        id : acti.id
                    }
                })
                if(consulta.data){
                    const newActividades = Actividades.filter(data => data.id !== acti.id)
                    setActividades(newActividades)
                }
            }
        })
    }
    console.log(Actividades)
    return (
        <div className="row" >
            {Actividades.map(data=>
                <div className="col-md-4"  key={data.id} >
                    <div className="shadow p-3 m-2 Areas pointer d-flex justify-content-between" >
                        <div>
                            <h4>{data.Nombre} </h4>
                            <h5>Objetivo: </h5>
                            <h6>{data.objetivo} </h6>
                            <h5>tipo: </h5>
                            {parseInt(data.Tipo) === 1 ?<h6>sin recurso</h6>:null}
                            {parseInt(data.Tipo) === 2 ?<h6>con recurso</h6>:null}
                            <h5>Sub-tipo: </h5>
                            {parseInt(data.tipo_s) === 1 ?<h6>Seleción</h6>:null}
                            {parseInt(data.tipo_s) === 2 ?<h6>Grupos</h6>:null}
                            {parseInt(data.tipo_s) === 3 ?<h6>abiertas</h6>:null}
                            <select onChange={Cambiar_Curso} id={data.id}>
                                <option value="1">1°</option>
                                <option value="2">2°</option>
                                <option value="3">3°</option>
                                <option value="4">4°</option>
                                <option value="5">5°</option>
                                <option value="6">6°</option>
                                <option value="7">7°</option>
                                <option value="8">8°</option>
                                <option value="9">9°</option>
                                <option value="10">10°</option>
                                <option value="11">11°</option>
                                <option value="12">12°</option>
                            </select>
                        </div>
                        <div className="pointer" onClick={()=> eliminarActividad(data) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            <div className="col-md-4" >
                <div className="shadow p-3 m-2 pointer" onClick={crearActividad} >
                    <h2 className="text-center" > + </h2>
                </div>
            </div>
        </div>
    );
}
 
export default GetActividades;