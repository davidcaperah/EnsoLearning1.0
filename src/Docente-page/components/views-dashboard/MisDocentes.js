import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import URL from '../../../URL.js';
import Docente from './Docente';
import axios from 'axios';
import '../../css/docente.css'

const MisDocenteDocente = () => {

    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();

    const [DatosRecibidos, setDatosRecibidos] = useState([]);
    const [Mensaje, setMensaje] = useState({ mensaje: "esperando busqueda", tipo: "2" })
    const [Validacion, setValidacion] = useState(true)
    const [datosDocente, setdatosDocente] = useState({})
    const[materias ,setMaterias] = useState([])
    const IdcolEncriptado = cookies.get('idcol')
    const bytescol = CryptoJS.AES.decrypt(IdcolEncriptado, 'A')
    const colId = JSON.parse(bytescol.toString(CryptoJS.enc.Utf8))


    const Buscar = async () => {
        let datos = {
            d: 1,
            nombre: document.getElementById("nombre").value,
            col: colId
        }
        let DatosJson = JSON.stringify(datos)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_docente.php`,
            data:DatosJson
        })  
        let datosRecibidos = consulta.data

        console.log(datosRecibidos)

        if (datosRecibidos.mensaje) {
            setDatosRecibidos([])
            setMensaje(datosRecibidos)

        } else if (datosRecibidos.length > 0) {
            setDatosRecibidos(
                datosRecibidos
            )
            setMensaje(datosRecibidos)
        }
    }
    const cargarMaterias = async ()=>{
        /*let DatosJson = JSON.stringify({})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/Cargar_materia.php', DatosJson);
        let data = response.data
        console.log(data)
        setMaterias(data)*/
        
    }

    const cambiarInterfaz = (docente) => {
        Validacion ? setValidacion(false) : setValidacion(true)
        setdatosDocente(docente)
    }


    return (
      
        <div className='cont-princi-docentes'>
            {Validacion ?
            <div>
                <div className='cont-imagen-docentes'>
                    <div className='url'>{`Docente >`} </div>
                    <div className='titulo-Vista'>Docentes</div>
                    <div>   
                        <input type="text" name="nombre" id="nombre" className="buscador-docentes" onChange={Buscar} placeholder="&#128269;     Buscar docente por nombre" />
                        <select id="ciclo"  className="filtro-docentes" >
                            <option value={null}>Filtrar por area</option>
                            {materias.map(el =>{
                                <option value={0} > Ciclo </option>
                            })}
                            
                        </select>
                            
                    </div>
                </div>

                <div className='cont-contacto-docentes'>
       
                    {DatosRecibidos.map((docente,index) =>
                        <div className="cont-encotrar-info" key={docente.id} >
                            <div>
                                <h6 className={`profecion-docente ${ index % 2 === 0 ? "profecion-docente1":"profecion-docente2"}` }>Titular en Biologia</h6>
                                <div className={`linea1  ${ index % 2 === 0 ? "linea-color1":"linea-color2"}` }  ></div>
                                <div className={`linea2  ${ index % 2 === 0 ? "linea-color1":"linea-color2"}` }></div>
                            </div>
                            <div className='info-docentes'>
                                <div className='info-docentes-nombre'>
                                    <h6>{`${docente.Nombre} ${docente.apellido}`}</h6>
                                    <p>
                                        {docente.estudios}
                                        <br/>
                                        colegio lorem impsum
                                    </p>
                                    
                                </div>
                                <div>
                                    <img src={`${URL.servidor}${docente.imagen}`} className="imagen-infoDocente" alt="" />
                                </div>
                            </div>
                            <div className='cont-botones-info'>  
                                <div className="mensaje-docentes">Enviar mensaje</div>
                                <div onClick={() => cambiarInterfaz(docente)}> Ver perfil</div>
                            </div>   
                        </div>
                    )}

                    {Mensaje.tipo === "1" ? <div className="alert alert-danger m-2  w-100" >  {Mensaje.mensaje} </div> : null}
                </div>
           </div> :

            <div>
            <div className="d-flex justify-content-start" >
                <div className="shadow p-3 m-2 rounded-circle pointer" onClick={() => cambiarInterfaz({})} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </div>
            </div>
            <Docente idDocente={datosDocente} />
            </div>
            }

        </div>  
    )
    
}


/*
<div>
{Validacion ?
    <div className="p-2" >
        <div className="p-3">
            <h3 className="text-center text-warning"> Docentes y administrativos  </h3>
            <p className="text-white text-center"> Aquí podrás ver, editar, agregar y eliminar docentes de tu institución, al tiempo podrás ver su perfil academico. </p>
        </div>

        <div className="m-2" >
            <input type="text" name="nombre" id="nombre" className=" mt-2 form-control col-md-10" onChange={Buscar} placeholder="&#128269;Buscar docente por nombre" />
            <div className="row" >
                {DatosRecibidos.map(docente =>
                    <div className="shadow rounded p-3 m-3 bg-light col-md-4 pointer Areas" key={docente.id} onClick={() => cambiarInterfaz(docente)}  >
                        <div>
                            <div className="d-flex justify-content-center" >
                                <img src={`${URL.servidor}${docente.imagen}`} className="w-50" alt="" />
                            </div>
                            <h6 className="text-center mt-2" > {`${docente.Nombre} ${docente.apellido}`} </h6>
                            <h6 className="text-center" > {docente.estudios} </h6>
                        </div>
                    </div>
                )}
            </div>
            {Mensaje.tipo === "1" ? <div className="alert alert-danger m-2  w-50" >  {Mensaje.mensaje} </div> : null}
            {Mensaje.tipo === "2" ? <div className="alert alert-warning m-2 w-50" >    {Mensaje.mensaje} </div> : null}
        </div>
    </div>
    :
    <div>
        <div className="d-flex justify-content-start" >
            <div className="shadow p-3 m-2 rounded-circle pointer" onClick={() => cambiarInterfaz({})} >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
            </div>
        </div>
        <Docente idDocente={datosDocente} />
    </div>
</div>
}*/

export default MisDocenteDocente;