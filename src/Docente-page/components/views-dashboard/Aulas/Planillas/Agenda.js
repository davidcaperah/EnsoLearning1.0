import React,{useEffect, useState} from 'react'
import Volver from '../volver';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import URL from '../../../../../URL';
import Swal from 'sweetalert2';
import "../../../../css/planillaAcademica.css"
const Agenda = (props) => {

    const [Mensajes, setMensajes] = useState([])
    const [Mensaje, setMensaje] = useState("")
    const [Nota, setNota] = useState("")
    const planillasEstudiante = useSelector(state => state.planillasEstudiante)
    const docente = useSelector(state => state.docente)
    const dispatch = useDispatch()
    
    const cargarMensajesAgenda = async () => {
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/CRUD_agenda.php`,
            data : {
                d : 0,
                id : planillasEstudiante.id
            }
        })
        console.log(planillasEstudiante)
        console.log(consulta)
        console.log(docente)
        setMensajes(consulta.data.reverse())
    }

    useEffect(() => {
        cargarMensajesAgenda()
    }, [])

    const enviarMensaje = async (e) => {
        e.preventDefault()
        if(Mensaje !== "" && Nota !== ""){
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_agenda.php`,
                data : {
                    d : 1,
                    id_estu : planillasEstudiante.id,
                    titulo : Mensaje,
                    nota : Nota,
                    id_docente : docente.id
                }
                //
            })
            //console.log(consulta)
            consulta ? window.location.reload() : Swal.fire({icon : "error", title : "Ocurrió un error"})
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos"
            })
        }
    }

    const eliminarMensaje = async (mensaje) => {
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/CRUD_agenda.php`,
            data : {
                d : 2,
                id : mensaje.id
            }
        })
        if(consulta.data){
            const newMensajes = Mensajes.filter(data => data.id !== mensaje.id)
            setMensajes(newMensajes)
        }
    }

    return (
        <div id="cont-pri" className='d-flex position-fixed justify-content-center aling-items-center modal-agenda'>
            
            <div >
                
                <div className="cont-modal-info">
                    <div className='d-flex flex-colum '>
                        <div className='col-6 modal-name-agenda '>Enviar mensaje a Angie Cortes</div>
                        <div className='col-6 d-flex justify-content-end aling-items-center cerrar-modal-agenda'>
                           <p onClick={props.cerrarAgenda}>X</p>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={enviarMensaje}>
                        <div className='d-flex  justify-content-center titulo-mensaje-modal-input'>
                            <input type="text" placeholder='Agrega aqui un titulo para tu mensaje' onChange={(e)=> setMensaje(e.target.value)} />
                        </div>
                        <div className='d-flex  justify-content-center descri-mensaje-modal-input ' >
                            <textarea  placeholder='Agregar contenido de tu mensaje' onChange={(e)=> setNota(e.target.value)} />
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className="boton-modal-agenda"> Enviar Mensaje </button>
                        </div>
                        </form>                           
                    </div>
                </div>
            </div>
        </div>
        
    );
}
 

/* 
    <div>
            <Volver num={4} />
            <div className="row" >
                <div className="col-md-6" >
                    <div className="shadow p-3 m-2 rounded w-100" >
                        <h4 className="text-white"> <strong>  {planillasEstudiante.Nombre} {planillasEstudiante.Apellido} </strong> </h4>
                        <div>
                            <form onSubmit={enviarMensaje} className="mt-3" >
                                <h6 className="text-white"> ¿Quieres agregar un Mensaje? </h6>
                                <input type="text" className="form-control m-2" placeholder="Agrega un Titulo" onChange={(e)=> setMensaje(e.target.value)} />
                                <input type="text" className="form-control m-2" placeholder="Agrega un Mensaje" onChange={(e)=> setNota(  e.target.value)} />
                                <button className="btn btn-outline-dark m-2 text-white"> Enviar Mensaje </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="scroll" >
                        {Mensajes.map(data =>
                        <div className="row rounded shadow" key={data.id} >
                            <div className="col-md-10" >
                                <div className="w-100 p-3 m-2"  >
                                    <h5 className="text-white"> {data.titulo} </h5>
                                    <h6 className="text-white"> {data.nota} </h6>
                                    <p className="text-secondary" >  {data.fecha} </p>
                                </div>
                            </div>
                            <div className="col-md-2" >
                                <div className="p-3 d-flex justify-content-center mt-5 pointer" onClick={()=> eliminarMensaje(data) } >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                            </div>
                        </div> 
                        )}
                    </div>
                </div>
            </div>

        </div>
*/
export default Agenda;