import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import URL from '../../../../../URL';

const Seleccion = () => {
    const Datos_acti = useSelector(state => state.CrearActividadDatos)
    const DatosArch = useSelector(state => state.RecursosImagen)
    const [Points, setPoints] = useState([]);
    const [materias, setmaterias] = useState([]);
    const recurso = useSelector(state => state.subirActividad)
    const docente = useSelector(state => state.docente)

    const dispatch = useDispatch()
    const volverActividades = () => {
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula : 11
          })
      }
      
    const addPoints = (e) => {
        e.preventDefault()
        const pregunta = document.getElementById("pregunta").value
        const A = document.getElementById("A").value
        const B = document.getElementById("B").value
        const C = document.getElementById("C").value
        const D = document.getElementById("D").value
        if(pregunta === ""){
            Swal.fire({
                icon:'error',
                title:"El campo preguntas esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("pregunta").focus();
                }
            })
            
        }else if(A === ""){
            Swal.fire({
                icon:'error',
                title:"El campo A esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("A").focus();
                }
            })
            
        }else if(B === ""){
            Swal.fire({
                icon:'error',
                title:"El campo B esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("B").focus();
                }
            })
            
        }else if(C === ""){
            Swal.fire({
                icon:'error',
                title:"El campo C esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("C").focus();
                }
            })
            
        }else if(D === ""){
            Swal.fire({
                icon:'error',
                title:"El campo D esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("D").focus();
                }
            })
            
        }else{

            const datos = ({
                pregunta:pregunta,
                a:A,
                b:B,
                c:C,
                d:D
            })
            setPoints([
                ...Points,
                datos
            ])
        document.getElementById("pregunta").value = ""
        document.getElementById("A").value = ""
        document.getElementById("B").value = ""
        document.getElementById("C").value = ""
        document.getElementById("D").value = ""
        }
    }
    const Enviar_datos = async () =>{
        const Nombre_a = document.getElementById('Nombre_A').value
        const Des_A = document.getElementById('Des_A').value
        const materias = document.getElementById('materias').value
        const Cantidad_p = Points.length
        var urls = Object();
        if(Datos_acti.tipo_p === 2){
            urls.recurso = recurso
        }else{  
            urls.recurso = null
        }
        if(Nombre_a === ""){
            Swal.fire({
                icon:'error',
                title:"El campo Nombre actividad esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("Nombre_A").focus();
                }
            })
        }else if(Des_A === ""){
            Swal.fire({
                icon:'error',
                title:"El campo Descripción esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("Des_A").focus();
                }
            })
        }else if(materias === "¿Materia?"){
            Swal.fire({
                icon:'error',
                title:"El campo materias esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("materias").focus();
                }
            })
        }else{

            // la variable recurso del objeto datos debe cambiar para recibit los datos que se guarden por parametro
            let datos = JSON.stringify({d :12,
                                    Puntos:Points,
                                    Nombre_a:Nombre_a,
                                    Des_A:Des_A,
                                    materias:materias,
                                    Cantidad_p:Cantidad_p,
                                    tipo_p:Datos_acti.tipo_p,
                                    tipo_s:Datos_acti.tipo_s,
                                    recurso:urls,
                                    id_profesor:docente.id})

            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_docente.php', datos);
            const data = response.data
            console.log(data)
            console.log(datos)
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
                        window.location.reload();
                    }
                })
            }
        }
    }
    useEffect(() => {
        const Cargar_m = async () =>{
            let datos = JSON.stringify({d : 13})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', datos);
            const data = response.data
            console.log(response)
            console.log(data)
    
            console.log(docente)
            setmaterias(data)
        }
        Cargar_m();
      }, []);
    console.log(Points.length)
    console.log(materias)
    return(
      <div>
        <div>
          <div className="d-flex justify-content-start" >
            <div className="shadow p-3 m-2 rounded-circle pointer" onClick={volverActividades} >
                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
            </div>
          </div>

          <div className="row" >

            <div className="col-md-6" >
                { DatosArch.datos === undefined?null:
                    DatosArch.datos.length === 0  || DatosArch.datos === undefined?
                        null:
                    <div>
                        <h6>Recurso:</h6>
                        {
                            DatosArch.tipo === "image/jpeg" || DatosArch.tipo === "image/png" ?
                            <img alt="recurso" src={DatosArch.datos} style={{width:"100px", heigth:"100px"}}/>:null
                        
                        }
                        {
                            DatosArch.tipo === "application/pdf" ?
                            <a href={DatosArch.datos} download>
                               { DatosArch.datos}
                            </a>:null
                        
                        }
                        {
                            DatosArch.tipo === "Video" ?
                            <a href={DatosArch.datos}>
                               { DatosArch.datos}
                            </a>:null
                        }
                        
                        
                    </div>
                }
                

                 <h6> Nombre Actividad: </h6>
                <input type="text" id="Nombre_A" className="form-control mt-2"  placeholder="Ej:Que tanto sabes de colombia" />
                <h6> Descripción de la actividad: </h6>
                <textarea type="text" id="Des_A" className="form-control mt-2"  placeholder="Ej:Conocer cuanto conoce de colombia cada estudiante" />
                <h6> Materia: </h6>
                <select className="form-control" name="Estado" id="materias">
                    <option unselectable="true" > ¿Materia? </option>
                    {materias.map(data =>
                        <option key={data.id} value={data.id} > {data.N_Materia} </option>
                    )
                    }
                  </select>
                <h4>Numero de preguntas:{Points.length}</h4>
            <form onSubmit={addPoints} > 
                    <h6> pregunta: </h6>
                    <input type="text" id="pregunta" className="form-control mt-2"  placeholder="Ej:¿Capital de colombia?" />
                    <h6> A: </h6>
                    <input type="text" id="A" className="form-control mt-2"  placeholder="Ej: Medellin" />
                    <h6> B: </h6>
                    <input type="text" id="B" className="form-control mt-2"  placeholder="Ej: Bogota" />
                    <h6> C: </h6>
                    <input type="text" id="C" className="form-control mt-2"  placeholder="Ej: Amazonas" />
                    <h6> D: </h6>
                    <input type="text" id="D" className="form-control mt-2"  placeholder="Ej: Cali" />
                    <button className="btn mt-2" > Agregar </button>
             </form>
             {Points.length >= 1? <button className="btn mt-3" onClick={Enviar_datos} > Enviar </button>:null}
            </div>
            <div className="col-md-6" >
                <div className='accordion'>
                    {Points.map(data => 
                    <div key={Math.random()} className="shadow p-3 " >
                        <h6> pregunta: </h6>
                        <h5>{data.pregunta}</h5>
                        <h6> A: </h6>
                        <h5>{data.a}</h5>
                        <h6> B: </h6>
                        <h5>{data.b}</h5>
                        <h6> C: </h6>
                        <h5>{data.c}</h5>
                        <h6> D: </h6>
                        <h5>{data.d}</h5>
                    </div>
                    )}
                </div>
            </div>
          </div>
      </div>
      </div>
    )
}
 
export default Seleccion;