import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Volver from '../volver';
import URL from '../../../../../URL';
import { useSelector } from 'react-redux';
import "../../../../css/planillaAcademica.css"


const Notas = (props) => {
    const data = useSelector(state => state.planillasEstudiante)
    const [materianame, setmaterianame] = useState( { id: "1", materia: "Ciencias", nota: "86" })
    const [estado, setestado] = useState(false)
    let Datos = {
        d: 11,
        id:data.id
    }
    console.log(data);
        useEffect(() => {
            const TraerDatos = async () => {
                let DatosJson = JSON.stringify(Datos)
                const api = axios.create({ baseURL: URL.servidor });
                const response = await api.post('/api-php-react/info_docente.php', DatosJson);
                let datax = response.data;
                let materias = []
                datax.map(e=>{
                    console.log(e)
                    materias.push({id:e.id, materia: e.N_Materia ,nota:e.promedio})
                    return null;
                })
                setmaterianame(
                    materias
                )
                setestado(true)
            }
            TraerDatos()
            //eslint-disable-next-line
        }, [])

    const notass = [
        { id: "1", materia: "Ciencias", nota: "86" },
        { id: "2", materia: "Economia", nota: "88" },
        { id: "3", materia: "Matematicas", nota: "30" },
        { id: "4", materia: "Español", nota: "25" },
        { id: "5", materia: "Filosofia", nota: "66" },
        { id: "6", materia: "Quimica", nota: "71" },
        { id: "7", materia: "Edu Fisica", nota: "00" },
        { id: "8", materia: "Artistica", nota: "50" },
    ]
    console.log(materianame)
    console.log(notass)
    console.log(data)
    return (
        <div className='d-flex position-fixed justify-content-center aling-items-center modal-agenda'>
            
            <div >
                
                <div className="cont-modal-info">
                    <div className='d-flex flex-colum '>
                        <div className='col-6 modal-name-agenda '>Notas estudiante</div>
                        <div  className='col-6 d-flex justify-content-end aling-items-center cerrar-modal-agenda'>
                            <p onClick={props.cerrarNota}>X</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 d-flex justify-content-center aling-items-center my-5 '>
                            <div className='card-notas-info'>
                               <div className='card-img-info'>   
                                    <img className="foto-notas" src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`}/> 
                                </div> 
                                <div className='card-nom-notas'>
                                    {data.Nombre} {data.Apellido}
                                </div>
                                <div className='card-parrafo-notas'>
                                    <p>
                                        Ciclo {data.Ciclo} <br/>
                                        Promedio materia: {data.promedio} <br/>
                                        Total puntos: {data.Puntos} <br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-5 d-flex flex-column mx-3 mt-5'>
                            <div className='titulo-materias-notas'>
                                <h6>Materia Matematicas</h6>
                            </div>
                            <div className='notas-perido-notas'>
                                <div>
                                    Periodo
                                </div>
                                <div>
                                    notas
                                </div>
                            </div>
                            <div className='notas-perido-nota'>
                                <div>
                                    <p>1 perido</p>
                                    <p>2 perido</p>
                                    <p>3 perido</p>
                                    <p>4 perido</p>
                                </div>
                                <div>
                                    <p>8.0</p>
                                    <p>7.0</p>
                                    <p>7.5</p>
                                    <p>8.5</p>
                                </div>
                            </div>
                            <div className='nota-f-notas'>
                                Nota final 8.5
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


/*

    <div>
            <Volver num={4} />
            <h2 className="text-center text-warning"> Notas </h2>
            <div className=" p-5 ">
                <div className="row d-flex  align-self-center align-items-center col-md-12">
                    <div key={data.id} className="col-md-5 col-sm-12" >
                        <div className="shadow bg-white p-3 m-2 rounded">
                            <div className="d-flex justify-content-center" >
                                <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}${data.imagen}`} alt={"Enso Learning " + data.nombre + data.Apellido} />
                            </div>
                            <h6 className="mt-3 text-center" > <strong> {data.Nombre} {data.Apellido} </strong></h6>
                            <div className="text-center">
                                <p><strong>Ciclo: </strong>{data.Ciclo}</p>
                                <p><strong>Promedio: </strong>{data.promedio}</p>
                                <p><strong>Puntos: </strong>{data.Puntos}</p>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="shadow bg-white border" >
                            <div className="row" >
                                <div className="col-md-6" >
                                    <h3 className="text-center mt-3 text-warning"  > Materia </h3>
                                </div>
                                <div className="col-md-6" >
                                    <h3 className="text-center mt-3 text-warning"  > Nota </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        {estado === true ?
                        materianame.map(notaStu =>
                            <div className="bg-ligth" key={notaStu.id}>
                                <div className="row"  >
                                    <div className="col-md-6" >
                                        <p className="text-center mt-3 text-white"  > {notaStu.materia} </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="text-center mt-3 text-white"  > {notaStu.nota} </p>
                                    </div>
                                </div>
                            </div>
                        
                        ):
                        <div className="bg-ligth" >
                            <div className="row" >
                            <p className="text-center mt-3 text-white"  > Cargando datos </p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
*/
export default Notas;