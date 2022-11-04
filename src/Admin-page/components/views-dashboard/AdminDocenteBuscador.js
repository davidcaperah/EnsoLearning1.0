import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import URL from '../../../URL';
import axios from 'axios';


const BuscadorDocente = () => {
    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();

    const [DatosRecibidos, setDatosRecibidos] = useState([]);
    const [EditarDocente, setEditarDocente] = useState(false);
    const [DatosDocente , setDatosDocente] = useState({})
    const [Mensaje, setMensaje] = useState({mensaje : "esperando busqueda" , tipo : "2"})
    const [Validacion, setValidacion] = useState(true)
    
    
    
    console.log(document.cookie)
    let IdcolEncriptado = cookies.get('colid');
    console.log(IdcolEncriptado)
    let bytescol = CryptoJS.AES.decrypt(IdcolEncriptado, 'A')
    let colId = JSON.parse(bytescol.toString(CryptoJS.enc.Utf8))

    const Datos = {
        id : colId
    }

      

   const AgregarAulas = (Docente) => {
        let id = Docente.id
        let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
        cookies.set('idDoc', idEncriptado , {path: '/AdminDocenteCursos'  , expires: new Date(Date.now()+5*60*60*1000)});
        window.location.replace('/AdminDocenteCursos' );
   }


    const Buscar =  async (e) =>{
        let datos= {
            d : 1,
            nombre : document.getElementById("nombre").value,
            col : Datos.id
        }
        let DatosJson = JSON.stringify(datos)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_docente.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.mensaje){
            setDatosRecibidos([])
            setMensaje(datosRecibidos)
            

        }else if(datosRecibidos.length > 0){
            setDatosRecibidos(
                datosRecibidos
            )
            setMensaje(datosRecibidos)
        }

        try {
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            let res = await fetch(`${URL.servidor}/api-php-react/info_docente.php`, Configuracion)
            let json = await res.json()
            if(json.mensaje){
                setDatosRecibidos([])
                setMensaje(json)

            }else if(json.length > 0){
                setDatosRecibidos(
                    json
                )
                setMensaje(json)
            }

        } catch (error) {
            console.log(error)
        }
    }
    try{
        console.log(DatosRecibidos)
    }catch(e){}
      
    const cambiarInterfaz = (docente) => {
        Validacion ? setValidacion(false) : setValidacion(true)
        setDatosDocente(docente)
    }
    return (
      
        <div className='cont-princi-docentes'>
            {Validacion ?
            <div>
                <div className='cont-imagen-docentes'>
                    <div className='url'>{`Docente >`} </div>
                    <div className='titulo-Vista'>Docentes</div>

                    <div>   
                        <input type="text" name="nombre" id="nombre" className="buscador-docentes" onChange={Buscar} placeholder="&#128269;Buscar docente por nombre" />
                        <select id="ciclo"  className="filtro-docentes" >
                            <option value={null}>Filtrar por area</option>
                           
                                <option value={0} > Ciclo </option>
                           
                            
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
            
            </div>
            }

        </div>  
    )
}

export default BuscadorDocente;