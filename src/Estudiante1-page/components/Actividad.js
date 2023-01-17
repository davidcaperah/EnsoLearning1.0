import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import Icfes from './Icfes';
import URL from '../../URL.js';
import Cookies from 'universal-cookie';

const Actividad = ({idActividad}) => {

    const [Validacion, setValidacion] = useState(true)
    const [ValidacionActividad, setValidacionActividad] = useState(false)
    console.log("🚀 ~ file: Actividad.js:13 ~ Actividad ~ ValidacionActividad", ValidacionActividad)
    const [ArregloDeActividades, setArregloDeActividades] = useState([])
    console.log("🚀 ~ file: Actividad.js:14 ~ Actividad ~ ArregloDeActividades", ArregloDeActividades)
    const [Link, setLink] = useState("")
    const [puntos,setpuntos] = useState([]);
    const [respuntos,setrespuntos] = useState([]);

    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();


    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let iduser = Desencriptar("iduser" , "A")
    let idCurso = Desencriptar("idCurso" , "A")


    useEffect(()=>{
        const verificarActividad = async () =>{
            let idCurso = JSON.stringify({idm : idActividad.id , d : 4, iduser : iduser,id:idActividad.id_acti})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            const data = response.data
            console.log(data) 
            let estado = parseInt(data.cantidad) === 0 ? true : false ;
            console.log("🚀 ~ file: Actividad.js:43 ~ verificarActividad ~ estado", estado)
            setValidacionActividad(estado)
        }
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify({idm : idActividad.id , d : 2, iduser : iduser,id:idActividad.id_acti})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            const data = response.data
            if(data){
                setArregloDeActividades(data)
                const h = data[0]
                const l = h.puntos
                const json = JSON.parse(l)
                for(const ob in json){
                    let i = parseInt(ob) + 1;
                    json[ob].id = i;
                    json[ob].pos = ob;
                }
                setpuntos(json)
                let d = data[0]
                if(d.video !== null){
                    if(d.video !== "NULL"){
                        let com = d.video.substr(0,23)
                        let link = d.video.substr(32,100)
                        let linkfinal = `${com}/embed/${link}` 
                        setLink(linkfinal)
                        
                    }  
                }
                
            }else if(data.mensaje) {
                setArregloDeActividades([])
            }
                
        }
        TraerDatos();
        verificarActividad();
        //eslint-disable-next-line
    }, []);  
    console.log(puntos)
    console.log(ValidacionActividad)
    const Volver = () => {
        Swal.fire({
            title: '¿Seguro que quieres volver? perderás todas tus respuestas.',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `¡Si,volver!`,
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                setValidacion(true)
            }   
          })
    }
    const contestar = (pregunta,respuesta) =>{
        setrespuntos( {
            ...respuntos,
           [pregunta] : respuesta})
    }

    const EnviarTarea = async  (e) =>{
        e.preventDefault()
            let Archivo = document.getElementById("PDF").files[0]
            let data = ""; 
            if(Archivo && (Archivo.type === "application/pdf" || Archivo.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || Archivo.type === "application/msword" )){
                const formData = new FormData();
                formData.append('archivo', Archivo )
                let res = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_tarea.php`, formData,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                data = res.data 
            }
                    let comentario = document.getElementById("comentario").value ? document.getElementById("comentario").value : 0;
                    let url = data.url ? data.url : 0;
                    let datosEnviar = {
                        d : 3,
                        tarea : url,
                        comentario : comentario,
                        id_act : idActividad.id,
                        curso : idCurso,
                        iduser : iduser,
                        resjson : JSON.stringify(respuntos)                      
                    }
                   
                    let DatosJson = JSON.stringify(datosEnviar)

                    const consulta = await axios({
                        method : "post",
                        url:`${URL.servidor}/api-php-react/info_estudiante.php`,
                        data:DatosJson
                    })
                    let datosRecibidos = consulta.data

                    if(datosRecibidos.id_tarea){
                        Swal.fire({
                            icon : "success",
                            title : "Actividad enviada correctamente",
                            text : `tu actividad se registro con el id ${datosRecibidos.id_tarea}`
                        })
                        window.location.reload();
                    }

                    if(datosRecibidos === true){
                        Swal.fire({
                            icon: 'success',
                            title: 'Se ha creado correctamente',
                        })
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
                        let res = await fetch( `${URL.servidor}/api-php-react/info_estudiante.php`, Configuracion)
                        let json = await res.json()
                        // let json = await res.text()
                        console.log(res)
                        console.log(json)
                        if(json.id_tarea){
                            Swal.fire({
                                icon : "success",
                                title : "Actividad enviada correctamente",
                                text : `tu actividad se registro con el id ${json.id_tarea}`
                            })
                            window.location.replace("EstudianteOneActividades")
                        }
    
                        if(json === true){
                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha creado correctamente',
                            })
                        }
                      } catch (error) {
                          console.log(error)
                      }*/
    }
    return (
        <div>
            {ValidacionActividad ? 
                    <div>
                        <div>
                            {ArregloDeActividades.map(data => 
                                <div key={data.id} className="m-2" >
                                    <p> <span className="h6" > Nombre: </span> {data.Nombre} </p>
                                    <p> <span className="h6" > Objetivo: </span> {data.objetivo} </p>
                                    <p> <span className="h6" > Responde las siguientes preguntas, si tienes dudas comunicate con tu docente: </span></p>
                                        {
                                         puntos.map(datos =>
                                            <div>
                                                {data.tipo_s === 1 ? 
                                                    <div key={datos.id}>
                                                        <h4>#{datos.id} - {datos.pregunta}</h4>
                                                        <ul class="list-group">
                                                        {datos.A ? <li onClick={()=>contestar(datos.id,'A')} class={`list-group-item ${respuntos[`${datos.id}`] === "A"? 'list-group-item-success' : null}`}>A. {datos.A}</li> : null }
                                                        {datos.B ? <li onClick={()=>contestar(datos.id,'B')} class={`list-group-item ${respuntos[`${datos.id}`] === "B"? 'list-group-item-success' : null}`}>B. {datos.B}</li> : null }
                                                        {datos.C ? <li onClick={()=>contestar(datos.id,'C')} class={`list-group-item ${respuntos[`${datos.id}`] === "C"? 'list-group-item-success' : null}`}>C. {datos.C}</li> : null }
                                                        {datos.D ? <li onClick={()=>contestar(datos.id,'D')} class={`list-group-item ${respuntos[`${datos.id}`] === "D"? 'list-group-item-success' : null}`}>D. {datos.D}</li> : null }
                                                        </ul> 
                                                    </div>
                                                    :
                                                    data.tipo_s === 3?                                
                                                    <form key={datos.pregunta}>
                                                        <p><span className="h6" >*{datos.pregunta}</span></p>
                                                        <input className="form-control m-2" id={datos} placeholder="Responde" />
                                                        <Button variant="contained" color="secondary" className="m-3" type="button" onClick={()=>contestar(1,1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                        </svg>
                                                            responde
                                                        </Button>
                                                    </form>: null
                                                }
                                                </div>)
                                                
                                        }
                                    <div>
                                        {data.Tipo === 1 ?   
                                            <div>
                                                <h4>Esta actividad contiene un archivo pdf para realizarlo</h4>
                                                <iframe id="inlineFrameExample"
                                                    title="Inline Frame Example"
                                                    width="100%"
                                                    height="350"
                                                    src={data.link}>
                                                </iframe>
                                            </div>
                                        : null }
                                        {data.Tipo === 3 ?
                                            <div>
                                                <img  src={data.link} alt={"Enso Learning "+data.Nombre}  className="w-50" />
                                            </div>   
                                        : null }
                                        {data.Tipo === 2 ? 
                                            <div>
                                                <span className="w-100" >
                                                    <iframe 
                                                    width="900"
                                                    height="500"
                                                    src={Link} 
                                                    title="YouTube video player" 
                                                    frameBorder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowFullScreen="1" >
                                                    </iframe>
                                                </span>
                                            </div>      
                                        : null }
                                        {data.Tipo === 4 ?    
                                            <div>
                                                <div className="p-3" >
                                                    {/* {Validacion ? 
                                                        <div className="shadow p-3" >
                                                            <h3> Preguntas ICFES </h3>
                                                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? </p>
                                                            <p> <span className="h6" > Tiempo: </span> 30 minutos </p>
                                                            <Button variant="contained" color="secondary" className="mt-3" onClick={()=> setValidacion(false)}  >
                                                                    ¡Resolver!
                                                            </Button>
                                                        </div>
                                                    : 
                                                        <div className="mt-5" >
                                                            <div className="d-flex justify-content-start" id="botonVolver" > 
                                                                <div className="pointer rounded-circle shadow  p-2" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" onClick={Volver} className="bi bi-arrow-left" viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <Icfes />
                                                        </div>
                                                    } */}
                                                </div>
                                            </div>   
                                        : null }
                                        {/* {data.juegos !== "NULL" ?
                                            <div className="p-3 shadow m-3" >
                                                <h3> Juegos Interactivos </h3>
                                                <p> Proximamente... </p>
                                            </div>
                                        : null} */}
                                    </div>
                                </div>
                            )}
                        </div>
            
                        <div className="p-3 shadow m-3" >
                            <h3> Subir archivos </h3>
                            <p> Si tu docente te ha dado instruciones, sube aquí el archivo que te esta pidiendo tu docente. </p>
                            <form  onSubmit={EnviarTarea} >
                                <input className="form-control m-2" id="PDF" type="file" />
                                <input className="form-control m-2" id="comentario" placeholder="Comentario de trabajo" />
                                <Button variant="contained" color="secondary" className="m-3" type="submit">
                                    Subir Actividad
                                </Button>
                            </form>
                        </div>
                    </div>
            :  
                    <div className="alert alert-success" >
                        Felicidades, ¡Ya has agregado una respuesta a esta actividad!
                    </div>
            }
        </div>
    );
}
 
export default Actividad;