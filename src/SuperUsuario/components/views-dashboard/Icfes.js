import React,{useState, useEffect} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import URL from '../../../URL.js';

const Icfes = () => {
    
    const [Datos, setDatos] = useState({});
    const [Validacion, setValidacion] = useState(true)
    const [ArregloPreguntas, setArregloPreguntas] = useState([])
    const [ValidacionPreguntas, setValidacionPreguntas] = useState(false)
    const [validacionCrearPregunta, setvalidacionCrearPregunta] = useState(true)
    const [idMaestra, setidMaestra] = useState(0)
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [ValidacionICFES, setValidacionICFES] = useState(true)
    const [DatosICFES, setDatosICFES] = useState([])
    const [ValidacionPregunta, setValidacionPregunta] = useState(true)

    useEffect(() => {
        //Cargar cursos de la base de datos
        const CargarCurso = async ()=>{
            let DatosEnviar = {
                d : 5
            }
            let DatosJson = JSON.stringify(DatosEnviar)
            console.log(DatosJson);
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Actividad_icfes.php', DatosJson);
            let data = response.data
            console.log(data);
            if(data.mensaje){
              Swal.fire({
                  text : data.mensaje,
                  icon : "warning"
              })
            }else{
              setDatosRecibidos(
                ...DatosRecibidos ,
                data
              )
                setValidacionICFES(false)
            }
        }
        CargarCurso();
        //eslint-disable-next-line
    }, [])


    const onChange = (e)=>{
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim()
        });
    }

    const NoRecargar =  async (e) => {
        e.preventDefault()
        if(Datos.Nombre && Datos.obje){
            let DatosEnviar = {
                nombre : Datos.Nombre ,
                obje : Datos.obje ,
                descri : Datos.descri,
                d : 0
            }
            let DatosJson = JSON.stringify(DatosEnviar)

            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/Actividad_icfes.php`,
                data:DatosJson
            })
            let datosRecibidos = consulta.data

            if(datosRecibidos.mensaje){
                Swal.fire({
                    icon : "error",
                    text : datosRecibidos.mensaje
                })
            }else{
                setvalidacionCrearPregunta(false)
                setidMaestra(datosRecibidos)
            }

            /*try{
                let Configuracion = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body :  DatosJson
                }
                let res = await fetch(`${URL.servidor}/api-php-react/Actividad_icfes.php`, Configuracion)
                let json = await res.json()

                if(json.mensaje){
                    Swal.fire({
                        icon : "error",
                        text : json.mensaje
                    })
                }else{
                    setvalidacionCrearPregunta(false)
                    setidMaestra(json)
                }
                
            }catch(error){
                console.error(error);
            }*/

        }else{
            Swal.fire({
                icon : "error",
                text : "Campos Vacíos"
            })
        }
    }


    const agregarPreguntas = () => {
        if(ArregloPreguntas.length > 9 ){
            Swal.fire({
                title : "¡No puedes agregar más preguntas a esta actividad!",
                text : "No puedes agregar más de 10 preguntas a tus actividades",
                icon : "error"
            })
        }else{
            setValidacion(false)
        }
    }


    const EnviarPregunta = async  (e) => {
        if(Datos.pregunta && Datos.respuesta && Datos.A && Datos.B && Datos.C &&  Datos.D){
            let data = {
                pre : Datos.pregunta ,
                res : Datos.respuesta ,
                A : Datos.A ,
                B : Datos.B , 
                C : Datos.C , 
                D : Datos.D,
                idM : idMaestra,
                d : 1
            }
            let DatosJson = JSON.stringify(data)

            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/Actividad_icfes.php`,
                data:DatosJson
            })
            let datosRecibidos = consulta.data

            if(datosRecibidos.mensaje){
                Swal.fire({
                    icon : "error",
                    text : datosRecibidos.mensaje
                })
            }else{
                setValidacion(true)
                setArregloPreguntas([
                    ...ArregloPreguntas,
                    data
                ])
                setValidacionPreguntas(true)   
            }
            /*try{
                let Configuracion = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body :  DatosJson
                }
                let res = await fetch( `${URL.servidor}/api-php-react/Actividad_icfes.php`, Configuracion)
                let json = await res.json()
                 
                if(json.mensaje){
                    Swal.fire({
                        icon : "error",
                        text : json.mensaje
                    })
                }else{
                    setValidacion(true)
                    setArregloPreguntas([
                        ...ArregloPreguntas,
                        data
                    ])
                    setValidacionPreguntas(true)   
                }

            }catch(error){
                console.error(error);
            }*/
        }else{
            Swal.fire({
                icon : "error",
                text : "Campos Vacíos"
            })
        }
    }

    const cargarPreguntas = async (data) =>{
        let DatosEnviar = {
            idM : data.id,
            d : 3
        }
        let DatosJson = JSON.stringify(DatosEnviar)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/Actividad_icfes.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.length > 0 ){
            console.log(datosRecibidos);
            setValidacionPregunta(false)
            setDatosICFES(
                ...DatosICFES,
                datosRecibidos
            )
        }else{
            Swal.fire({
                icon : "warning",
                text : "No se encuentran preguntas."
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
            let res = await fetch( `${URL.servidor}/api-php-react/Actividad_icfes.php`, Configuracion)
            let json = await res.json()
            if(json.length > 0 ){
                console.log(json);
                setValidacionPregunta(false)
                setDatosICFES(
                    ...DatosICFES,
                    json
                )
            }else{
                Swal.fire({
                    icon : "warning",
                    text : "No se encuentran preguntas."
                })
            }

        } catch (error) {
            console.error(error);
        }*/
    }

    const Volver = () => {
        setValidacionPregunta(true)
        setDatosICFES([]) 
    }
    return (
        <div>
            {ValidacionICFES ?
                <div>
                    { validacionCrearPregunta? 
                        <form onSubmit={NoRecargar} >
                        <h5> Aquí podrás agregar preguntas con respuesta multiple. </h5>
                            <input  onChange={onChange} name="Nombre" className="form-control my-2" placeholder="Nombre de actividad" />    
                            <input  onChange={onChange} name="obje" className="form-control my-2" placeholder="Objetivo" /> 
                            <textarea  onChange={onChange} name="descri" className="form-control my-2" maxLength={150}  placeholder="Descripción" >  

                            </textarea>
                            <button className="btn btn-primary" type="submit" >
                                Enviar
                            </button>
                        </form>  
                    :
                    <div>
                        {Validacion ? 
                                <div>
                                    <h6> Agrega preguntas </h6>
                                    <div className="shadow p-3 m-2 pointer Areas" onClick={agregarPreguntas} >
                                        <h2 className="text-center" > + </h2>
                                    </div>
                                    { ValidacionPreguntas ? 
                                        <div>
                                            <h6> Has agregado estas preguntas. </h6>
                                                {ArregloPreguntas.map(pregunta => 
                                                    <div key={pregunta.pre} className="alert alert-success m-2 p-3 d-flex justify-content-between" >  
                                                        <p> {pregunta.pre} </p>
                                                        <p> {pregunta.res} </p>
                                                    </div>
                                                )}
                                            <button className="btn btn-primary" onClick={() => window.location.replace('/AdminInicio')} >
                                                Ya Agregué todas mis preguntas
                                            </button>
                                        </div>
                                    : null}
                                </div>
                            : 
                                <div className="shadow p-3 m-3" >
                                    <input onChange={onChange} placeholder="Pregunta"  name="pregunta" className="form-control my-2"  />
                                    <input onChange={onChange} placeholder="A" name="A" className="form-control my-2"  />
                                    <input onChange={onChange} placeholder="B" name="B" className="form-control my-2"  />
                                    <input onChange={onChange} placeholder="C" name="C" className="form-control my-2"  />
                                    <input onChange={onChange} placeholder="D" name="D" className="form-control my-2"  />
                                    <select className="form-control my-2" onChange={onChange} name="respuesta" >
                                        <option value={null} > Respuesta </option>
                                        <option value="A" > A</option>
                                        <option value="B" > B</option>
                                        <option value="C" > C</option>
                                        <option value="D" > D</option>
                                    </select> 
                                    <button className="btn btn-primary" onClick={EnviarPregunta}>
                                        Enviar
                                    </button>
                                </div>
                            } 
                    </div>
                    }                       
                </div>            
            :
            <div>
                {ValidacionPregunta ? 
                    <div className="row" >
                        {DatosRecibidos.map(data => 
                            <div className="col-md-4" key={data.id} >
                                <div className="shadow p-3 m-2 Areas pointer" onClick={()=> cargarPreguntas(data)} >
                                    <p> <span className="h6" > Nombre </span> {data.Nombre} </p>
                                    <p> <span className="h6" > Descripción </span> {data.descri} </p>
                                    <p> <span className="h6" > Objetivo </span> {data.objetivo} </p>
                                </div>
                            </div>
                        )}
                            <div className="col-md-4" >
                                <div className="shadow p-3 m-2 Areas pointer" onClick={()=> setValidacionICFES(true) } >
                                    <h2> + </h2>                            
                                </div>
                            </div>
                    </div>                
                :
                    <div>
                        <div onClick={Volver} className="pointer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                        <div>
                            {DatosICFES.map(data => 
                                <div key={data.id} className="shadow p-3 m-2" >
                                    <h5> {data.pregunta}</h5>
                                    <p> <span className="h6" > Pregunta A:  </span>  {data.A}  </p>
                                    <p> <span className="h6" > Pregunta B:  </span>  {data.B}  </p>
                                    <p> <span className="h6" > Pregunta C:  </span>  {data.C}  </p>
                                    <p> <span className="h6" > Pregunta D:  </span>  {data.D}  </p>
                                    <h6> Respuesta : {data.respuesta} </h6>
                                </div>
                            )}
                        </div>

                    </div>
                }
            </div>
            }


        </div>
    );
}
 
export default Icfes;