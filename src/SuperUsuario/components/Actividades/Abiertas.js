import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
import URL from '../../../URL.js';

const FinalActividad = () => {

    const dispatch = useDispatch()
    const [Validacion, setValidacion] = useState(false)
    const [points, setpoints] = useState([])
    const [materias, setmaterias] = useState([]);
    const Datos_acti = useSelector(state => state.CrearActividadDatos)
    const recurso = useSelector(state => state.subirActividad)

    const addActivity = async (e) => {
        e.preventDefault()
        const name = document.getElementById("nombreActividad").value
        const objetivo = document.getElementById("objetivoActividad").value
        const materias = document.getElementById("materias").value
        const Cantidad_p = points.length
        var urls = Object();
        if(Datos_acti.tipo_p === 2){
            urls.recurso = recurso
        }else{  
            urls.recurso = null
        }
        if(name === ""){
            Swal.fire({
                icon:'error',
                title:"El campo Nombre actividad esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("nombreActividad").focus();
                }
            })
        }else if (objetivo === ""){
            Swal.fire({
                icon:'error',
                title:"El campo objetivo actividad esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("objetivoActividad").focus();
                }
            })
        }else if(materias === ""){
            Swal.fire({
                icon:'error',
                title:"El campo materias actividad esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("materias").focus();
                }
            })
        }else{
            let datos = JSON.stringify({d : 14,Puntos:points,Nombre_a:name,Des_A:objetivo,materias:materias,Cantidad_p:Cantidad_p,tipo_p:Datos_acti.tipo_p,tipo_s:Datos_acti.tipo_s,recurso:urls})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', datos);
            const data = response.data
            console.log(data)
            if(data === true){
                Swal.fire({
                    icon:'success',
                    title:"La actividad se a puesto el linea.",
                    text:'Se a publicado una nueva actividad de tipo selección'
                }).then((resultado)=>{
                    if(resultado.isConfirmed){
                        window.location.reload();
                    }
                })
            }else{
                Swal.fire({
                    icon:'error',
                    title:"Error al subir la actividad.",
                    text:data
                }).then((resultado)=>{
                    if(resultado.isConfirmed){
                        // window.location.reload();
                    }
                })
            }
        }
    }
    const addPoints = (e) => {
        e.preventDefault()
        const campo = document.getElementById("points").value
        if(campo !== ""){
            setpoints([
                ...points,
                campo
            ])
            setValidacion(false)
            document.getElementById("points").value = ""
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacios"
            })
        }
    }
    useEffect(() => {
        const Cargar_m = async () =>{
            let datos = JSON.stringify({d : 13})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', datos);
            const data = response.data
            console.log(data)
            setmaterias(data)
        }
        Cargar_m();
      }, []);
    return (
        <div>
            <div className="d-flex justify-content-start">
                <div className="shadow p-3 m-2 rounded-circle pointer" onClick={()=> dispatch({type : "numberInterfazActividades", numberInterfazActividades : 5})} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>
            </div>
            <div className="row" >
                <div className="col-md-6" >
                    <div className="m-2 p-3" >
                        <h4 className="m-2" >Agrega los ultimos detalles a tu actividad.</h4>
                        <form onSubmit={addActivity} >
                            <input type="text" id="nombreActividad" className="form-control m-2" placeholder="Nombre de la actividad" />
                            <input type="text" id="objetivoActividad" className="form-control m-2" placeholder="Objetivo de la actividad" />
                            <select className="form-control" name="Estado" id="materias">
                                <option unselectable="true" > ¿Materia? </option>
                                {materias.map(data =>
                                    <option key={data.id} value={data.id} > {data.N_Materia} </option>
                                )
                                }
                            </select>
                            {points.length >= 1 ?<button className="btn btn-outline-dark m-2"> Subir Actividad </button>:null}
                        </form>
                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="m-2 p-3" >
                        <h4 className="m-2"> Agrega los puntos de tu actividad </h4>
                        {points.map(data => 
                            <div key={Math.random()} className="shadow p-3" >
                                <h6 className="h3" > {data} </h6>
                            </div>    
                        )}
                        {Validacion ? 
                            <div className="p-3 m-2" >
                                <form onSubmit={addPoints} > 
                                    <h5> Agrega puntos que deben desarrollar los estudiantes en esta Actividad.</h5>
                                    <h6> Estos puntos serán desarrollados teniendo en cuenta el material que subiste anteriormente. </h6>
                                    <input type="text" id="points" className="form-control mt-2"  placeholder="Ej: Dibujar el planeta tierra teniendo en cuenta el video." />
                                    <button className="btn btn-outline-dark mt-2" > Agregar </button>
                                </form>
                            </div>
                        :null}
                        <div className="shadow p-3 Areas pointer" onClick={()=> setValidacion(true) } >
                            <h3 className="text-center" > + </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default FinalActividad;