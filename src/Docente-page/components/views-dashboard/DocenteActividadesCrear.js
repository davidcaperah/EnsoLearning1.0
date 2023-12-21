import React,{useState} from "react"
import '../../css/actividadesCurso.css'
import axios from "axios"

import VistaActividades from './Aulas/ActividadesFolder/VistaActividad';
import URL from  '../../../URL'



const CrearActividad = () =>{

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [Validacion, setValidacion] = useState(false)
    const [Mensaje, setMensaje] = useState({mensaje : "Esperando busqueda" , tipo : "2"})
    const [select, setselect] = useState(0)
    const [datos, setdatos] = useState()
    const [filtro, setfiltro] = useState()

    const onFiltro = (e) =>{
        setfiltro(e.target.value)
    }
    const onChange = async  (e) => {
        let datos= {
            d : 1,
            nombre : document.getElementById("nombre").value,
            filtro : filtro
        }
        let DatosJson = JSON.stringify(datos)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_actividad_maestro.php`,
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
    }

    const agregarActividad = (data,e) => {
        setselect(e)
        setdatos(data)

    }
    console.log(filtro);
    return(
        <div>
            <div className='header-crear-actividades'>
                <div className='cont-titulo-actividadesCrear '>
                    <p>{`Actividades > Agregar actividad`}</p>
                    <h2>Agregar actividad</h2>
                    <svg width="430" height="350" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <title>Layer 1</title>
                            <path fill="#1a9de6" stroke="#000" opacity="undefined" d="m136.15592,204.97428c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 131.994,92.17336 115.55868,147.40977c-16.43531,55.23641 -88.71237,38.09426 -150.12112,8.21727l0,0.00001z" id="svg_1" transform="rotate(42.3141, 143.992, 138.101)" strokeWidth="0"/>
                            <line fill="none" stroke="#000" x1="334" y1="358" x2="331" y2="358" id="svg_2"/>
                            <line fill="none" stroke="#000" x1="42" y1="360" x2="41" y2="360" id="svg_3"/>
                            <path fill="#1a9de6" stroke="#000" opacity="undefined" d="m86.45571,265.53702c-54.73653,-1.41292 -154.02771,86.02351 -159.12254,-46.73289c-5.09483,-132.7564 121.75354,-125.98235 196.07483,-30.27566c74.32129,95.70669 161.53718,-24.60141 105.57006,68.49544c-55.96712,93.09685 -87.78581,9.92603 -142.52235,8.51311z" id="svg_6" transform="rotate(3.44996, 86.9871, 209.42)" strokeWidth="0"/>
                            <path fill="rgba(255,218,49,0.9)" stroke="#000" strokeWidth="0" opacity="undefined" d="m255.64946,237.14642c-56.53371,-2.38947 -102.74717,73.20136 -110.27689,-20.95875c-7.52972,-94.1601 42.4552,-145.08178 98.58667,-139.62287c56.13147,5.45892 140.65277,38.24618 141.31992,96.70895c0.66715,58.46276 -73.09599,66.26213 -129.6297,63.87267z" id="svg_7" transform="rotate(8.65267, 264.951, 169.881)"/>
                        </g>
                     </svg>
                </div>
                <div className='cont-input-buscador-crearActi'>
                        <input id="nombre" onChange={onChange} type="text" name="nombre"  placeholder="Buscar actividad nombre o docente"/>
                </div>
                <div className='cont-filto-crear-actividad'>
                    <select className="from-select-tip-pregunta" name="Correcta" onChange={onFiltro} >
                    <option value={`${null}`} > Filtrar por area </option>
                        <option value="1" > Seleccion multiple </option>
                        <option value="2" > Pregunta abierta </option>
                        <option value="3" > Pregunta de union </option>
                    </select>
                </div>
           </div>
           <div className="d-flex justify-content-center cont-pri-actividad-docente">
                <div >
                    <div className="cont-tabla-actividad">
                        <div>Nombre actividad</div>
                        <div>Area</div>
                        <div>grado</div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="my-4">
                        
                    {select == 1?                        
                        <div>
                        <button variant="contained" color="secondary" className="m-3" type="button" onClick={()=> agregarActividad(0,0)}>
                                            Volver
                        </button>
                            <VistaActividades ver={datos}/>
                        </div> 
                        :
                        null
                       }
                       {select === 0? 
                        <div>
                        {Validacion ? 
                        
                        DatosRecibidos.map(data => 
                        <div  key={data.id} className="cont-datos-actividad-crear">
                            <div>{data.Nombre}</div>
                            <div>{data.N_Materia}</div>
                            <div>{data.Curso? data.Curso : "N/A"}°</div>
                            <div className="btn-ver-actividad-crear" onClick={()=> agregarActividad(data,1)} >Ver actividad</div>
                            <div className="btn-ver-agregar-crear">Agregar actividad</div>
                        </div>
                        )
                    
                    :   
                    <div>
                        {Mensaje.tipo === "1" ? <div className="alert alert-danger  m-3" > {Mensaje.mensaje} </div> : null}
                        {Mensaje.tipo === "2" ? <div className="alert alert-warning m-3" > {Mensaje.mensaje} </div> : null}
                    </div>
                }  
                        </div>
                       : null
                       }
                    </div>
                </div>
           </div>
        </div>
    )
}


export default CrearActividad

/* 
      <div className="col-md-6 Areas pointer" key={data.id}>
                                <div className="shadow p-3 m-2">
                                    <p className="text-white"> <span className="h6" > Nombre: </span> {data.Nombre} </p>
                                    <p className="text-white">  <span className="h6" > Objetivo: </span> {data.objetivo} </p>
                                    <button variant="contained" color="secondary" className="m-3" type="button" onClick={()=> agregarActividad(data)}>
                                            ver
                                </button>
                                </div>
                            </div>  
*/