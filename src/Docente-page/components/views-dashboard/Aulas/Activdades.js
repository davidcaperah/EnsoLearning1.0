import React, { useState } from 'react';
import Swal from 'sweetalert2'
import AgregarPuntos from './ActividadesFolder/agregarPuntos';
import { useSelector,useDispatch } from 'react-redux';
import '../../../css/actividadesCurso.css'
import URL from '../../../../URL'

const Actividades = () => {
    const dispatch = useDispatch()
    const [Campos, setCampos] = useState({})
    const [Validacion, setValidacion] = useState(true)
    console.log(URL.servidor)

    const aulaSeleccionada = useSelector(state => state.aulaSeleccionada)
    const docente = useSelector(state => state.docente)

    let idCol = docente.colegio
    let idCurso = aulaSeleccionada.id_curso
    let iduser = docente.id
    let idMateria = aulaSeleccionada.id_materia


    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name]: e.target.value.trim()
        });
    }

    const NoRecargar = async (e) => {
        e.preventDefault()
        if (Campos.periodo !== null && Campos.Nombre && Campos.descri) {
            try {
                let data = {
                    periodo: parseInt(Campos.periodo),
                    Nombre: Campos.Nombre,
                    descri: Campos.descri,
                    d: 0,
                    idCurso: idCurso,
                    idCol: idCol,
                    iduser: iduser,
                    idMateria: idMateria,
                    fecha_max: Campos.fecha
                }
                dispatch({
                    type : "CrearActividadDocente",
                    CrearActividadDocente : data
                })
                setValidacion(false)

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Ocurrió un error',
                    title: error
                })

            }

        } else {
            Swal.fire({
                icon: 'warning',
                text: 'Recuerde llenar todos los campos.'
            })
        }
    }
    const volver = ()=>{
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: 1
        })
    }






  

    return (
       <div>
           <div className='row header-curso-actividades '>
                <div className='cont-titulo-actividades '>
                    <p>{`Mis aulas > Matematicas > Actividades`}</p>
                    <h2>Curso 402</h2>
                    <svg width="450" height="329" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <title>Layer 1</title>
                        <line id="svg_2" y2="358" x2="331" y1="358" x1="334" stroke="#000" fill="none"/>
                        <line id="svg_3" y2="360" x2="41" y1="360" x1="42" stroke="#000" fill="none"/>
                        <path id="svg_1" d="m179.15621,301.11035c-75.62227,0.6074 -102.23703,-70.99978 -102.23703,-158.65384c0,-87.65405 21.79559,-158.73124 102.23703,-158.65384c80.44144,0.0774 120.62617,69.6731 120.62617,157.32715c0,87.65405 -45.0039,159.37312 -120.62617,159.98052z" transform="rotate(-45.1808, 188.351, 142.458)" opacity="undefined" strokeWidth="0" stroke="#000" fill="rgba(0, 99, 154, 1)"/>
                        <path transform="rotate(46.0603, 92.3902, 159.346)" id="svg_5" d="m93.06925,298.70801c-119.53433,-3.72845 -111.15796,-2.91478 -107.51344,-139.81685c3.64452,-136.90207 -1.08732,-139.81685 107.51344,-139.81685c108.60076,0 107.51344,-2.67789 107.51344,139.81685c0,142.49474 12.02089,143.5453 -107.51344,139.81685z" opacity="undefined" strokeWidth="0" stroke="#000" fill="rgba(0, 99, 154, 1)"/>
                        <path transform="rotate(4.34329, 299.059, 146.214)" id="svg_6" d="m290.42141,247.52273c-60.51065,0 -115.78777,-32.06681 -105.519,-109.00642c10.26878,-76.93961 40.9609,-93.61161 101.47155,-93.61161c60.51065,0 141.92979,79.45468 126.07168,140.41148c-15.85811,60.95681 -61.51359,62.20655 -122.02423,62.20655z" opacity="undefined" strokeWidth="0" stroke="#000" fill=" rgba(254, 166, 128, 0.9)"/>
                        </g>

                    </svg>
                    </div>
                <div className='cont-titulo-retroceder-activCurso'>
                    <div className='volver-actividadCurso' onClick={volver}>
                        
                        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                            <g>
                            <title>Layer 1</title>
                            <line id="svg_2" y2="358" x2="331" y1="358" x1="334" stroke="#000" fill="none"/>
                            <line id="svg_3" y2="360" x2="41" y1="360" x1="42" stroke="#000" fill="none"/>
                            <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_1" y2="14.93243" x2="7.29732" y1="6.14868" x1="14.86486" stroke="#00639A" fill="none"/>
                            <path id="svg_4" d="m16.75675,3.71625l-9.45943,11.21618" opacity="undefined" strokeLinecap="undefined" strokeLinejoin="undefined" strokeWidth="4" stroke="#00639A" fill="none"/>
                            <path id="svg_6" d="m7.02705,12.36487l9.3243,10.94591" opacity="undefined" strokeLinecap="undefined" strokeLinejoin="undefined" strokeWidth="4" stroke="#00639A" fill="none"/>
                            </g>

                        </svg>
                    </div>
                    <div className='titulo-curso-actividades'>Actividades</div>
                </div>
                <div className='cont-titulo-retroceder-activCurso '>
                    <div className='agregarActividad-curso'>
                        <strong>+</strong>  Agregar actividad  
                    </div>
    
                </div>
           </div>
           <div className='d-flex justify-content-center cont-titu-actividade-curso'>
                <div className='curso-actividades-acti'>Actividades activas</div>
                <div className='curso-actividades-desacti'>Actividades vencidas</div>
           </div>

           <div className='cont-cards-acti-curso'>
               <div className='card-curso-actividades'>
                    <div className='card-cont-img'>
                        <img alt='matematicas-actividad' src={`${URL.servidor}Archivos_u/Archivos_Acti/image-matematicas.jpg`}></img>
                    </div>
                    <div className='card-info-actiCurso'>
                        <h3>
                            Curso de matematicas <br/>
                            <strong>Suma de tres cifras</strong>
                        </h3>
                        <p>
                            Vencimiento <br/>
                            22/04/2022
                        </p>
                        <div></div>
                    </div>
                    <div className='d-flex justify-content-center con-btn-actiCurso'>
                        <div className='cont-btn-actividadCurso'>
                            Ver actividad
                        </div>
                    </div>
               </div>




      

               <div className='card-curso-actividades'>
                    <div className='card-cont-img'>
                        <img alt='matematicas-actividad' src={`${URL.servidor}Archivos_u/Archivos_Acti/image-matematicas.jpg`}></img>
                    </div>
                    <div className='card-info-actiCurso'>
                        <h3>
                            Curso de matematicas <br/>
                            <strong>Suma de tres cifras</strong>
                        </h3>
                        <p>
                            Vencimiento <br/>
                            22/04/2022
                        </p>
                        <div></div>
                    </div>
                    <div className='d-flex justify-content-center con-btn-actiCurso'>
                        <div className='cont-btn-actividadCurso'>
                            Ver actividad
                        </div>
                    </div>
               </div>
                
           </div>
       </div> 

    )
}



/*

    <div>
            <Volver />
            {Validacion ?
                <div className="p-3 w-80 m-auto m-2" >
                    <h4 className="text-warning text-center"> Aquí podrás agregar actividades al curso que seleccionaste. </h4>
                    <div className="p-2" >
                        <h6 className="text-white"> Digita las caracteristicas de esta actividad.perrro </h6>
                        <form onSubmit={NoRecargar} >
                            <input onChange={onChange} name="Nombre" className="form-control my-2" placeholder="Nombre" />
                            <textarea onChange={onChange} name="descri" className="form-control my-2" placeholder="Descripción" ></textarea>
                            <h6 className="text-white"> Fecha máxima de entrega </h6>
                            <input onChange={onChange} name="fecha" className="form-control my-2" type="date" />
                            <h6 className="text-white"> Periodo en el que se va agregar esta actividad. </h6>
                            <select onChange={onChange} className="form-control" name="periodo" >
                                <option value={null} >Periodo </option>
                                <option value="4" >Cuarto</option>
                                <option value="3" >Tercero</option>
                                <option value="2" >Segundo</option>
                                <option value="1" >Primero</option>
                            </select>
                            <div className="col text-center p-4">
                                <button className="btn btn-info" type="submit"> ACEPTAR </button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div>
                    <AgregarPuntos/>
                </div>
            }


        </div>
*/ 
export default Actividades