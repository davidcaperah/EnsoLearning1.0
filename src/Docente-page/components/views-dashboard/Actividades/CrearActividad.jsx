/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React , { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../../URL';
import Swal from 'sweetalert2';

const DocenteActividades = (props) => {
    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();
    const [formulario, setformulario] = useState({})
    const [materias, setmaterias] = useState([])
    const [Vista, setVista] = useState(0) 
    const [post_quest, setpost_quest] = useState(1);
    const [pregunta, setpregunta] = useState({})
    const [preguntaadd, setpreguntaadd] = useState([])
    const [fin, setfin] = useState(false)


    const Desencriptar = (NombreCookie, Llave) => {
        let IdEncriptado = cookies.get(NombreCookie)
        let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }
    let iduser = Desencriptar("iduser", "A")
    const Cvista = (re) => {
        setVista(re)
    }
    const info_pregunta = (e) =>{
        setpregunta(
            {...pregunta,
            [e.target.name]:e.target.value})
    }
    const subir_actividad = async () =>{
        Swal.fire({
            title: '¿Desea guardar la evaluación?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No guardar`,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const DatosJson = JSON.stringify(formulario)
                const api = axios.create({ baseURL: URL.servidor });
                const response = await api.post('/api-php-react/info_docente.php', DatosJson);
                const data = response.data
                console.log(data)
                if(data){
                    Swal.fire('Guardada!', '', 'success')
                    window.location.reload();
                }
            } else if (result.isDenied) {
              Swal.fire('La actividad no fue guardada', '', 'info')
              props.volver()
            }
          })

    }
    const Pregunta = async (e) =>{
        e.preventDefault();
        let c = post_quest;
       if(c < formulario.NumeroPreguntas){
        c++
        setpreguntaadd(
            [...preguntaadd,
            pregunta])
        document.getElementById("form").reset();
        Swal.fire({
            icon: 'success',
            title: 'Pregunta agregada correctamente'
          })
        setpregunta("")
        setpost_quest(c)
        console.log("entra 1")
       }else if(fin){
        let LINK = "";
        switch (parseInt(formulario.archivo)) {
            case 1:
                LINK = formulario.adjunto;
                break;
            case 2:
                const formDatos = new FormData();
                formDatos.append('archivo', formulario.adjunto )
                const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_pdf.php`, formDatos, {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
              })
              if(consulta.data.error === false){
                LINK = consulta.data.url
              }else{
                Swal.fire({
                    title : 'Error',
                    text: consulta.data.menssage,
                    icon : 'warning'
                  })
              }
                break;
            case 3:
                console.log("imagen")
                break;  
            case 4:
                LINK = "N/A";
            break;  
            default:
                Swal.fire({
                    title : 'Error',
                    text: "error v-1",
                    icon : 'warning'
                  })
                break;
        }
        setformulario({
            ...formulario,
            preguntas: preguntaadd,
            URL: LINK,
            d: 12,
            estado: true,
            iduser:iduser
        })
        setVista(2)
        console.log("entra 2")
       }else if(c === parseInt(formulario.NumeroPreguntas) && fin === false){
        setpreguntaadd(
            [...preguntaadd,
           pregunta])
        setfin(true)
        console.log("entra 3")
       }
    }
    const onChange = (e) =>{
            if(formulario.archivo !== "1" && e.target.name === "adjunto"){
                setformulario({
                    ...formulario,
                    [e.target.name]: e.target.files[0]
                })
            }else{
                setformulario({
                    ...formulario,
                    [e.target.name]: e.target.value.trim()
                })
            }

       
    }
    useEffect(() => {
        const sendData = async () => {
            let Datos = {
                d:15
            }
            const DatosJson = JSON.stringify(Datos)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_docente.php', DatosJson);
            const data = response.data
            setmaterias(
                ...materias,
                data
            )
        }
        sendData();
        //eslint-disable-next-line
    }, []);
    return (
        <div>   
        <div> 
            <div className='row'>
                <div className='col-3 header-evaluacion'>
                    <p style={{marginTop:"20px",marginLeft:"10px"}} >{"Atividades > Crear Atividades >"}</p>
                    <h3 style={{marginTop:"30px"}}>Crear Atividades</h3>
                    <svg width="430" height="310" xmlns="http://www.w3.org/2000/svg"> 
                        <path fill="#ffe051" stroke="#000" opacity="undefined" d="m142.31161,201.31344c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 124.11448,79.06179 92.53753,125.09326c-31.57695,46.03147 -65.69122,60.41077 -127.09997,30.53378l0,0.00001z" id="svg_1" transform="rotate(42.3141, 142.34, 128.318)" strokeWidth="0"/>
                        <path fill="#ffe051" stroke="#000" opacity="undefined" d="m85.67218,274.0409c-54.73653,-1.12407 -146.407,-21.18349 -148.99923,-101.90566c-2.59222,-80.72218 113.33626,-73.67283 187.65755,2.46831c74.32129,76.14114 181.97181,20.27043 105.87094,59.48369c-76.10086,39.21326 -89.79273,41.07773 -144.52927,39.95366l0.00001,0z" id="svg_6" transform="rotate(3.44996, 96.437, 194.375)" strokeWidth="0"/>
                        <path fill="rgba(255,175,141,.9)" stroke="#000" strokeWidth="0" opacity="undefined" d="m255.52083,241.45521c-61.03073,-2.63906 -111.62908,103.06236 -118.83419,-14.73957c-7.20511,-117.80193 45.83233,-160.23607 106.42882,-154.20696c60.59649,6.02912 151.8411,42.24113 152.56132,106.81053c0.72022,64.5694 -79.12522,64.77504 -140.15595,62.13599z" id="svg_7" transform="rotate(24.6954, 265.855, 177.239)"/>
                    </svg>
                </div>
                <div className='col-8 d-flex justify-content-center align-items-end mx-5 mb-5 pb-4 con-descri-crearEvaluacion'>
                    <h6>
                       En este espacio podrar crear actividades para tus cursos.
                    </h6>
                </div>
            </div>
            {
            Vista === 0?
            <div className='row d-flex justify-content-center'>
            <div className='col-7 cont-form-crearevaluacion '>
                <div  onClick={props.volver} className='volver-evaluacion' >{`<`}</div>
                <form onSubmit={()=>Cvista(1)} id="form" >
                    <p className=""> ¿Como se llamará tú Actividad? </p>
                    <input className="input-crearEvaluacion input-tam-CrearEvaluacion" type="text" name="Nombre" onChange={onChange} maxLength="250" required />
                    <p className=""> ¿Cual es el obejtivo de esta actividad? </p>
                    <textarea className="input-crearEvaluacion input-tam-CrearEvaluacion" type="text" name="texto" onChange={onChange} maxLength="250" required /> 
                    <div className=" input-tam-medio-CrearEvaluacion">
                        <div className='mr-4'>
                            <p className="mt-2">  ¿Cuantas Puntos tendra tu actividad? </p>
                            <input className="input-crearEvaluacion input-tam-CrearEvaluacion" type="number" name="NumeroPreguntas" onChange={onChange} min="1" required/>
                        </div>
                        <div className='mr-4'>
                            <p className="mt-2"> Tipo actividad </p>
                            <select className="input-crearEvaluacion input-tam-CrearEvaluacion" name="tipo" id="tipo" onChange={onChange} required >
                                <option value=" ">Seleccione</option>
                                <option value="1">Opción multiple</option>
                                <option value="3">Preguntas Abiertas</option>
                            </select>
                        </div>
                    </div>
                    <div className=" input-tam-medio-CrearEvaluacion">
                        <div className='mr-4'>
                            <p className="mt-2">Curso</p>
                            <select className="input-crearEvaluacion input-tam-CrearEvaluacion" name="curso" id="curso" onChange={onChange} required >
                                    <option defaultValue={""} defaultChecked disabled={formulario.curso?true:false}>Seleccione</option>
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
                        <div className='mr-4'>
                            <p className="mt-2"> Materia </p>
                            <select className="input-crearEvaluacion input-tam-CrearEvaluacion" name="materia" id="materia" onChange={onChange} required >
                                <option defaultValue={""} disabled={formulario.materia?true:false}>Seleccione</option>
                                {materias.map(materia=>
                                    <option key={materia.id} value={materia.id}>{materia.N_Materia}</option>
                                )
                                }
                            </select>
                        </div>
                    </div>
                    <div className=" input-tam-medio-CrearEvaluacion">
                        <div className='mr-4'>
                            <p className="mt-2"> Archivo </p>
                            <select className="input-crearEvaluacion input-tam-CrearEvaluacion" name="archivo" id="archivo" onChange={onChange} required >
                                <option value="0">selecione</option>
                                <option value="1">Link</option>
                                <option value="2">Archivo PDF</option>
                                <option value="3">Archivo IMAGEN</option>
                                <option value="4">No aplica</option>
                            </select>
                        </div>
                        {formulario.archivo === "1"? 
                            <div className='mr-4'>
                                <p className="mt-2">Recurso</p>
                                <input  onChange={onChange} className="input-crearEvaluacion input-tam-CrearEvaluacion" type="text" name="adjunto" id="link" required />
                            </div>
                        :
                        formulario.archivo === "4"? null :
                            <div className='mr-4'>
                                <p className="mt-2">Recurso</p>
                                <label htmlFor="adjunto" className="input-crearEvaluacion input-tam-CrearEvaluacion" style={{height:"48%"}}>
                                    <input  onChange={onChange}  accept="image/png, .jpeg, .jpg, image/gif, .pdf" type="file" name="adjunto" id="adjunto"  required style={{display:"none"}} />
                                    {
                                        formulario.adjunto?`${formulario.adjunto.name}`:`Choose a file`
                                    }
                                </label>
                            </div>
                        }

                    </div>
                    <div className="col text-center p-4">
                        <button  className="boton-form-Crear-Evaluacion" type="submit"> Agregar Puntos </button>
                    </div>
                </form>
            </div>
        </div>
            :null
            }
            {
            Vista === 1? 
                <div className="row d-flex justify-content-center aling-items-center"  >
                <div className='col-7 cont-creador-pregunta-form'>
                    <h5>Punto {post_quest} de {formulario.NumeroPreguntas}</h5>
                    <form  onSubmit={Pregunta} id="form"className="form-crear-preguntas" >
                        <label>Escribe aqui el enunciado de tu pregunta</label>
                        {
                        formulario.tipo === "1" || formulario.tipo === "3" ?  
                            <input className='form-input-evaluaciones' name="pregunta" id='pregunta' onChange={info_pregunta} type='text'/>:null
                        }
                        {
                        formulario.tipo === "2" ?
                            <input className='form-input-evaluaciones' id='pregunta' name="pregunta" onChange={info_pregunta}  type='text' style={{height:"70px"}}/>:null
                        }

                        <div className={formulario.tipo === "2" || formulario.tipo === "3"? "cont-respuestas-evaluacion" : ""}>
                            {formulario.tipo === "3" ? <h3>El estudiante tendra un campo de texto para contestar</h3>: null}  
                             
                            {formulario.tipo === "1" ?<label>Acontinuacion escribe tus opciones de respuesta</label>: ""}
                            <div >
                                {formulario.tipo === "1" ?
                                <div className='cont-label-letra'>
                                    <label >A</label>
                                    <input className='form-input-evaluaciones' onChange={info_pregunta} id="A" name="A" type="text" />
                                    <label >B</label>
                                    <input className='form-input-evaluaciones' onChange={info_pregunta} id="B" name="B" type="text" />
                                    <label >C</label>
                                    <input className='form-input-evaluaciones' onChange={info_pregunta} id="C" name="C" type="text" />
                                    <label >D</label>
                                    <input className='form-input-evaluaciones' onChange={info_pregunta} id="D" name="D" type="text" />
                                </div>  
                                :null
                                }
                                    
                            </div>
                        </div>
                        
                        <div className='btn-form-Crear-evaluacion'>
                            {fin ? 
                            <button  type="submit" >Subir actividad</button>
                            :
                            <button  type="submit" > Agregar Punto </button>
                            }
                        </div>   
                    </form>
                </div>
            </div>
            :
            null
            }           
            {Vista === 2? 
                <div className="row d-flex justify-content-center aling-items-center"  >
                <div className='col-7 cont-creador-pregunta-form'>
                    <h5>Datos de actividad</h5>
                    <p>La actividad <strong>{formulario.Nombre}</strong> que tiene como objetivo: <br /> <strong>{formulario.texto}</strong></p>
                    <p>Cuenta con <strong>{formulario.NumeroPreguntas}</strong> Puntos/preguntas.</p>
                    <button className="boton-form-Crear-Evaluacion" onClick={subir_actividad} >Confirmar</button>
                </div>
            </div>
            :
            null
            }
        </div>
    </div>
    );
    }
export default DocenteActividades;