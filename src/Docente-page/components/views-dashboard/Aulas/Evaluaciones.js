/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React, { useState } from 'react';
import URL from '../../../../URL.js';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import Volver from './volver.js';
import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));

const Evaluaciones = (props) => {

    const opcionesRespuesta = ["A","B","C","D","E"]
    const aulaSeleccionada = useSelector(state => state.aulaSeleccionada)
    const docente = useSelector(state => state.user)

    const [Campos, setCampos] = useState({
        idCol: docente.id_col,
        idCurso: aulaSeleccionada.id_curso,
        idDoc: docente.id,
        idMateria: aulaSeleccionada.id_materia
    })

    const [CamposRespuesta, setCamposRespuesta] = useState({})
    console.log(CamposRespuesta);
    const [NumeroDepreguntas, setNumeroDepreguntas] = useState(0)
    const [idMaestra, setidMaestra] = useState(0)
    const [numeroRespuestas , setNumeroRespuestas] = useState(1)
    const [tipoPregu , setTipoPregu] = useState(1)
    const [descriEvaluacion, setDescriEvaluacion] = useState(0)
    const [post_quest, setpost_quest] = useState(1);

    const cantRespuestas = (e)=>{
        setNumeroRespuestas(parseInt(e.target.value.trim()))
        console.log(e.target.value.trim())
    }
    const tipoPregunta = (e) =>{
        setTipoPregu(parseInt(e.target.value.trim()))
    }
    const NoRecargar = (e) => {
        e.preventDefault()
        const NumeroPreguntas = parseInt(Campos.NumeroPreguntas)
        if (NumeroPreguntas > 0 && NumeroPreguntas <= 10) {
            Swal.fire({
                title: '¿Has verificado correctamente los datos? ',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `¡Listo!`,
                denyButtonText: `Quiero verificar nuevamente`,
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(Campos);
                    EnviarDatosServidor(Campos, NumeroPreguntas)
                }
            })
        } else {
            Swal.fire({
                title: 'Maximo de campos invalido',
                text: 'No puedes agregar más de 10 preguntas y menos de 0',
                icon: 'error'
            })
        }
    }


    const EnviarDatosServidor = async (Campos1, NumeroPreguntas) => {
        let DatosJson = JSON.stringify(Campos1)
        console.log(DatosJson)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/Crear_eva.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if (datosRecibidos.estado === true) {
            if (datosRecibidos.id_m) {
                document.getElementById("form").classList.add("Eliminar")
                setDescriEvaluacion(1)
                setidMaestra(datosRecibidos.id_m)
                console.log(Campos.NumeroPreguntas);
                setNumeroDepreguntas(parseInt(Campos.NumeroPreguntas))
                
            }

        } else if (datosRecibidos.mensaje) {
            Swal.fire({
                title: 'error',
                text: datosRecibidos.mensaje,
                icon: 'error'
            })
        }

        /*try {
            let Configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: DatosJson
            }
            let res = await fetch(`${URL.servidor}/api-php-react/Crear_eva.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()
            console.log(json)
            if (json.estado === true) {
                if (json.id_m) {
                    document.getElementById("form").classList.add("Eliminar")
                    setidMaestra(json.id_m)
                    setNumeroDepreguntas(Campos.NumeroPreguntas)
                }
            } else if (json.mensaje) {
                Swal.fire({
                    title: 'error',
                    text: json.mensaje,
                    icon: 'error'
                })
            }
        } catch (error) {
            console.error(error);
        }*/
    }

    const onChange = (e) => {
        console.log(Campos)
        setCampos({
            ...Campos,
            [e.target.name]: e.target.value.trim()
        });
    }


    let EvaluacionesCampos = []
    if (EvaluacionesCampos) {
        for (let i = 0; i < NumeroDepreguntas; i++) {
            EvaluacionesCampos.push(i)
        }
    }

    const EnviarPregunta = (e, Campos) => {
        e.preventDefault()
        const data1 = []
        if(post_quest < NumeroDepreguntas ){
            if(tipoPregu === 3){
           
                for (const prop in CamposRespuesta) {
                    console.log(`obj.${prop} = ${CamposRespuesta[prop]}`)
                    if(prop !== "A" && prop !== "B" && prop !== "C" && prop !== "D" && prop !== 'Correcta' && prop !== 'pregunta'){
                        const temp = {
                            [prop]: CamposRespuesta[prop]
                            
                        }
                        data1.push(temp);
                    }           
                }
                
            }else{
                const temp = {
                    A: CamposRespuesta.A,
                    B: CamposRespuesta.B,
                    C: CamposRespuesta.C,
                    D: CamposRespuesta.D
                }
                data1.push(temp);
            }
            const data = {
                Correcta:CamposRespuesta.Correcta,
                Respuesta:data1,
                pregunta: CamposRespuesta.pregunta,
                idm: idMaestra,
                Tipo: tipoPregu,
                Cantidad : numeroRespuestas
            }
            EnviarDatosPreguntas(data, Campos)
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Evaluación Creada correctamente'
            })
            window.location.reload();
        }
    }


    const EnviarDatosPreguntas = async (data) => {
        let DatosJson = JSON.stringify(data)
        if(post_quest <= parseInt(NumeroDepreguntas)){
            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/Crear_eva_h.php`,
                data:DatosJson
            })
            let datosRecibidos = consulta.data
    
            if (datosRecibidos.estado === true) {
                let h = post_quest;
                h++;
                setpost_quest(h);
                Swal.fire({
                    icon: 'success',
                    title: 'Pregunta agregada correctamente'
                })
                let tipop = tipoPregu === 1 ? 2 : 1;
                setTipoPregu(tipop);
            } else if (datosRecibidos.mensaje) {
                Swal.fire({
                    title: 'error',
                    text: datosRecibidos.mensaje,
                    icon: 'error'
                })
            }
        }
    }

    const DatosPreguntas = (e) => {
        setCamposRespuesta({
            ...CamposRespuesta,
            [e.target.name]: e.target.value
        });
    }

 

    return (
        <div>   
            <div> 
                <div className='row'>
                    <div className='col-3 header-evaluacion'>
                        <p style={{marginTop:"20px",marginLeft:"10px"}} >{"Evaluacion > Crear evaluacion >"}</p>
                        <h3 style={{marginTop:"10px"}}>Crear evaluacion</h3>
                        <svg width="430" height="310" xmlns="http://www.w3.org/2000/svg"> 
                            <path fill="#ffe051" stroke="#000" opacity="undefined" d="m142.31161,201.31344c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 124.11448,79.06179 92.53753,125.09326c-31.57695,46.03147 -65.69122,60.41077 -127.09997,30.53378l0,0.00001z" id="svg_1" transform="rotate(42.3141, 142.34, 128.318)" strokeWidth="0"/>
                            <path fill="#ffe051" stroke="#000" opacity="undefined" d="m85.67218,274.0409c-54.73653,-1.12407 -146.407,-21.18349 -148.99923,-101.90566c-2.59222,-80.72218 113.33626,-73.67283 187.65755,2.46831c74.32129,76.14114 181.97181,20.27043 105.87094,59.48369c-76.10086,39.21326 -89.79273,41.07773 -144.52927,39.95366l0.00001,0z" id="svg_6" transform="rotate(3.44996, 96.437, 194.375)" strokeWidth="0"/>
                            <path fill="rgba(255,175,141,.9)" stroke="#000" strokeWidth="0" opacity="undefined" d="m255.52083,241.45521c-61.03073,-2.63906 -111.62908,103.06236 -118.83419,-14.73957c-7.20511,-117.80193 45.83233,-160.23607 106.42882,-154.20696c60.59649,6.02912 151.8411,42.24113 152.56132,106.81053c0.72022,64.5694 -79.12522,64.77504 -140.15595,62.13599z" id="svg_7" transform="rotate(24.6954, 265.855, 177.239)"/>
                        </svg>
                    </div>
                    <div className='col-8 d-flex justify-content-center align-items-end mx-5 mb-5 pb-4 con-descri-crearEvaluacion'>
                        <h6>
                            En este espacio podras crear las evaluaciones para tus estudiantes con  4 diferentes
                            tipos de pregunta
                        </h6>
                    </div>
                </div>
                {
                descriEvaluacion === 0?
                <div className='row d-flex justify-content-center'>
                    <div className='col-7 cont-form-crearevaluacion '>
                        <div  onClick={props.volver} className='volver-evaluacion' >{`<`}</div>
                        <form onSubmit={NoRecargar} id="form" >
                            <p className=""> ¿Como se llamará tú evaluación? </p>
                            <input className="input-crearEvaluacion input-tam-CrearEvaluacion" type="text" name="Nombre" onChange={onChange} />
                            <p className=""> agregar una descripcion para orientar a tus estudiantes  en la realizacion de la evaluacion </p>
                            <textarea className="input-crearEvaluacion input-tam-CrearEvaluacion" type="text" name="texto" onChange={onChange} /> 
                            <div className=" input-tam-medio-CrearEvaluacion">
                                <div className='mr-4'>
                                    <p className="mt-2">  ¿Cuantas preguntas tendra tu evaluación? </p>
                                    <input className="input-crearEvaluacion input-tam-CrearEvaluacion" type="number" name="NumeroPreguntas" onChange={onChange} />
                                </div>
                                <div className='ml-4' > 
                                    <p className="mt-2"> asigna una fecha de entrega para la evaluacion </p>
                                    <input className="input-crearEvaluacion input-tam-CrearEvaluacion" type="date" name="fechamax" onChange={onChange} />
                                </div>
                                <div className='mr-4'>
                                    <p className="mt-2"> Tiempo de desarrollo para la evaluacion </p>
                                    <input className="input-crearEvaluacion input-tam-CrearEvaluacion" type="number" name="tiempo" onChange={onChange} placeholder="En minutos..." />
                                </div>
                            </div>
                            
                            
                            <div className="col text-center p-4">
                                <button className="boton-form-Crear-Evaluacion" type="submit"> Agregar preguntas </button>
                            </div>
                        </form>
                    </div>
                </div>:null
                }
            </div>

            {descriEvaluacion === 1 ?
            <div>
                <div className="row d-flex justify-content-center aling-items-center" key={Campos} >
                    <div className='col-7 cont-creador-pregunta-form'>
                        <h5>Pregunta {post_quest} de {NumeroDepreguntas}</h5>
                        <form  className="form-crear-preguntas" onSubmit={(e) => EnviarPregunta(e, Campos)} id={Campos + 1} >
                            <label>Escribe aqui el enunciado de tu pregunta</label>
                            {
                            tipoPregu === 1 || tipoPregu === 3 ?  
                                <input className='form-input-evaluaciones' name="pregunta" onChange={DatosPreguntas} type='text' value={CamposRespuesta.pregunta}/>:null
                            }
                            {
                            tipoPregu ===2 ?
                                <textarea className='form-input-evaluaciones' name="pregunta" onChange={DatosPreguntas}  type='text' value={CamposRespuesta.pregunta} style={{height:"70px", width:"100%"}}></textarea>:null
                            }
                                
                            <div className='form-selecion'>
                                <div >
                                    <label>Seleciona el tipo de pregunta</label>
                                    <select className="from-select-tip-pregunta" name="Tipo" onChange={tipoPregunta} >
                                        <option value="1" > Seleccion multiple </option>
                                        <option value="2" > Pregunta abierta </option>
                                        {/* <option value="3" > Pregunta de union </option> */}
                                    </select>
                                </div>
                               { tipoPregu === 1 || tipoPregu === 3?<div >
                                    <label className='label-select-cat-opciones'>Cantidad opciones de respuesta</label>
                                    {tipoPregu === 3 ? 
                                    <select className="from-select-cat-opciones" name="cantidad" onChange={cantRespuestas} >
                                        <option value="1" > 1 </option>
                                        <option value="2" > 2 </option>
                                        <option value="3" > 3 </option>
                                        <option value="4" > 4 </option>
                                        <option value="5" > 5 </option>
                                        <option value="6" > 6 </option>
                                        <option value="7" > 7 </option>
                                        <option value="8" > 8 </option> 
                                        </select>
                                        :                                     
                                        <select className="from-select-cat-opciones" name="cantidad" onChange={cantRespuestas} >
                                        <option value="1" > 1 </option>
                                        <option value="2" > 2 </option>
                                        <option value="3" > 3 </option>
                                        <option value="4" > 4 </option>
                                        </select>}
                                    
                                </div>: " "}
                            </div>

                            <div className={tipoPregu === 2 || tipoPregu === 3? "cont-respuestas-evaluacion" : ""}>
                                {tipoPregu ===2 ? <h3>El estudiante tendra un campo de texto para contestar</h3>: null}  
                                 
                                {tipoPregu === 1 || tipoPregu === 3 ?<label>Acontinuacion escribe tus opciones de respuesta</label>: ""}
                                <div >
                                    {tipoPregu === 1 ?
                                        opcionesRespuesta.slice(0,numeroRespuestas).map((el,index)=>
                                            <div className='cont-label-letra' key={index}>
                                                <label >{el}.</label>
                                                <input className='form-input-evaluaciones' onChange={DatosPreguntas}  name={el} type="text" />
                                            </div>  
                                        ):null
                                    }
                                    {tipoPregu ===3 ?
                                        <div className='col-preguntas-union'>
                                            <div >
                                                <h6 className='text-center color-h6'>Columna A</h6>
                                                
                                                {opcionesRespuesta.slice(0,numeroRespuestas).map((el,index)=>
                                                    <input  onChange={DatosPreguntas} key={index} name={"A"+index}  className="inputs-acti-union mb-3" type='text' />
                                                )}
                                            </div>
                                            <div className='columna-b-union-evaluaciones '>
                                                <h6 className='text-center color-h6'>Columna B</h6>
                                                {opcionesRespuesta.slice(0,numeroRespuestas).map((el,index)=>
                                                    <div>
                                                        <input onChange={DatosPreguntas} key={index} className="inputs-acti-union mb-3" name={"B"+index}  type='text' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    :null}
                                        
                                </div>
                                    
                                {tipoPregu === 1 ?  
                                <div>
                                    <label>elige la respuesta correcta a esta pregunta</label>
                                    <select className="from-select-opciones-correcta" name="Correcta" onChange={DatosPreguntas} >
                                        <option value="A" > A </option>
                                        <option value="B" > B </option>
                                        <option value="C" > C </option>
                                        <option value="D" > D </option>
                                    </select>
                                </div>     
                                :null
                                }
                            </div>
                            
                            <div className='btn-form-Crear-evaluacion'>
                                <button  type="submit" > Agregar Punto </button>
                            </div>   
                        </form>
                    </div>
                    {/* <div className='barra-preguntas-evaluacion'>
                        {EvaluacionesCampos.map((NumeroDepreguntas,index) =>
                                
                            <div key={index} className='barra-cant-preguntas'></div>
                        )}
                    </div> */}
                </div>
            </div> :null }
        </div>

    )
}


/*
<Volver />
            <div className="p-3 w-80 m-auto" >
                <form onSubmit={NoRecargar} id="form" >
                    <h3 className="text-warning text-center"> Aquí podrás agregar evaluaciones a tus estudiantes </h3>
                    <p className="text-white"> ¿Como se llamará tú evaluación? </p>
                    <input className="form-control" type="text" name="Nombre" onChange={onChange} />
                    <p className="text-white"> Aquí podrás agregar un campo de texto para que tus estudiantes puedan desarrollar la evaluación correctamente </p>
                    <textarea className="form-control" type="text" name="texto" onChange={onChange} /> 
                    <p className="text-white">  ¿Cuantas preguntas vas a hacer en esta evaluación? </p>
                    <input className="form-control" type="number" name="NumeroPreguntas" onChange={onChange} />
                    <p className="text-white"> ¿Cuando será el plazo máximo de entrega de está evaluación? </p>
                    <input className="form-control" type="date" name="fechamax" onChange={onChange} />
                    <p className="text-white"> ¿Cuanto tiempo tendrán los estudiantes para desarrollar la evaluación? </p>
                    <input className="form-control" type="number" name="tiempo" onChange={onChange} placeholder="En minutos..." />
                    <div className="col text-center p-4">
                        <button className="btn btn-info" type="submit"> ACEPTAR </button>
                    </div>
                </form>

                <div>
                    {EvaluacionesCampos.map(Campos =>
                        <div className="shadow rounded m-3 p-4" key={Campos} >
                            <form onSubmit={(e) => EnviarPregunta(e, Campos)} id={Campos + 1} >
                                <h6 className="m-2" > Escribe aquí la pregunta número {Campos + 1} </h6>
                                <input onChange={DatosPreguntas} className="form-control m-2" name="pregunta" type="text" />
                                <h6 className="m-2" > Escribe aquí las respuestas  </h6>
                                <input onChange={DatosPreguntas} placeholder="A" className="form-control m-2" name="A" type="text" />
                                <input onChange={DatosPreguntas} placeholder="B" className="form-control m-2" name="B" type="text" />
                                <input onChange={DatosPreguntas} placeholder="C" className="form-control m-2" name="C" type="text" />
                                <input onChange={DatosPreguntas} placeholder="D" className="form-control m-2" name="D" type="text" />
                                <h6 className="m-2" > Elije la respuesta correcta de esta pregunta. </h6>
                                <select className="form-control m-2" name="Correcta" onChange={DatosPreguntas} >
                                    <option value={null}> Elije.. </option>
                                    <option value="A" > A </option>
                                    <option value="B" > B </option>
                                    <option value="C" > C </option>
                                    <option value="D" > D </option>
                                </select>
                                <button className="btn btn-info" type="submit" > Agregar Punto </button>
                            </form>

                        </div>)}
                </div>
            </div>
            */
export default Evaluaciones;