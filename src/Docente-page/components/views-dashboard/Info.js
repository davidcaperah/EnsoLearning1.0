import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../URL.js';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import '../../css/docente.css'

const InfoDocente = () => {
    const dispatch = useDispatch()
    const Docente = useSelector(state => state.user)

    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();
    const [CamposTemas, setCamposTemas] = useState({})


    let IdAdminEncriptado = cookies.get('idcol')
    let bytesadmin = CryptoJS.AES.decrypt(IdAdminEncriptado, 'A')
    let Idcol = JSON.parse(bytesadmin.toString(CryptoJS.enc.Utf8))

    const Datos = {
        id: Idcol
    }


    let IdDocEncriptado = cookies.get('iduser')
    let bytesDoc = CryptoJS.AES.decrypt(IdDocEncriptado, 'A')
    let IdDoc = JSON.parse(bytesDoc.toString(CryptoJS.enc.Utf8))

    const DatosDoc = {
        id: IdDoc
    }

    const [DatosRecibidos, setDatosRecibidos] = useState({});
    const [Validacion, setValidacion] = useState(true)


    const TemasCampos = (e) => {
        setCamposTemas({
            ...CamposTemas,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const sendData = async () => {
            let DatosJson = JSON.stringify(Datos)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_colid.php', DatosJson);
            setDatosRecibidos(
                response.data
            )
        }

        const EnviarDocente = async () => {
            let idDocente = JSON.stringify(DatosDoc)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_proid.php', idDocente);
            dispatch({
                type: "@addDatauser",
                user: response.data
            })
        }

        EnviarDocente()
        sendData();
        //eslint-disable-next-line
    }, []);



    const NoRecargar = async (e) => {
        e.preventDefault()
        console.log(document.getElementById("IMG").files[0]);
        if (document.getElementById("IMG").value === "") { 
            let datos = {
                info: document.getElementById("info").value,
                Nombres: document.getElementById("Nombres").value,
                apellidos: document.getElementById("apellidos").value,
                estudios: document.getElementById("estudios").value,
                imagen: Docente.imagen,
                d: 0,
                id: DatosDoc.id
            }

            let DatosJson = JSON.stringify(datos)
            console.log(DatosJson);
            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/info_docente.php`,
                data:DatosJson
            })
            let datosRecibidos = consulta.data

            if (datosRecibidos === true) {
                window.location.replace("/DocenteInfo")
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
                let res = await fetch(`${URL.servidor}/api-php-react/info_docente.php`, Configuracion)
                let json = await res.json()
                // let json = await res.text()
                console.log(json);
                if (json === true) {
                    window.location.replace("/DocenteInfo")
                }
            } catch (error) {
                console.log(error)
            }*/
        } else {
            let Archivo = document.getElementById("IMG").files[0]
            if (Archivo.type === "image/jpeg" || Archivo.type === "image/png") {
                console.log("entro")
                const formData = new FormData();
                formData.append('archivo', Archivo)
                let res = await axios.post(`${URL.servidor}/api-php-react/Subir_perfil_pro.php`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                let data = res.data
                console.log(data)
                if (data.status === "error") {
                    Swal.fire({
                        title: 'Error',
                        text: data.error,
                        icon: 'error'
                    })
                } else if (data.status === "success") {
                    let datos = {
                        info: document.getElementById("info").value,
                        Nombres: document.getElementById("Nombres").value,
                        apellidos: document.getElementById("apellidos").value,
                        estudios: document.getElementById("estudios").value,
                        imagen: data.url,
                        d: 0,
                        id: DatosDoc.id
                    }

                    let DatosJson = JSON.stringify(datos)
                    console.log(DatosJson);

                    const consulta = await axios({
                        method : "post",
                        url:`${URL.servidor}/api-php-react/info_docente.php`,
                        data:DatosJson
                    })
                    let datosRecibidos = consulta.data

                    if (datosRecibidos === true) {
                        window.location.replace("/DocenteInfo")
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
                        let res = await fetch(`${URL.servidor}/api-php-react/info_docente.php`, Configuracion)
                        let json = await res.json()
                        // let json = await res.text()
                        console.log(json);
                        if (json === true) {
                            window.location.replace("/DocenteInfo")
                        }
                    } catch (error) {
                        console.log(error)
                    }*/
                }
            }
        }
    }
    console.log(Docente.imagen)

    return (
        <div className='contenedor-info'>
            <div>
                <div className='cont-datos-docentes'>
                    <div className='url1'>
                        <p>{'Mi perfil >'}</p>
                    </div>
                    <div className='cont-ico-editar' > 
                        <img src={`${URL.servidor}Archivos_u/iconos/notas-copia2.svg`}/>  
                    </div>
                    <div className='cont-nombre-profesion'>
                        <h4>{`${Docente.Nombre} ${Docente.apellido}`} </h4>
                        <h5>{Docente.Cargo}</h5>
                    </div>
                    <div className='cont-info-colegio'>
                        <div className='cont-imagen-info'>
                            {Docente.imagen?
                                <div>
                                    <img className="imagen-info"  src={`${URL.servidor}${Docente.imagen}`} alt="logo" />
                                </div>
                                :
                                <div>
                                    <img className="imagen-info"  src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`} alt="logo" />
                                </div>
                            }
                        </div>
                        <div id='cont-ubi-colegio'>
                            <h6>{DatosRecibidos.nombreC}</h6>
                        </div>
                        <div >
                            <h6>ubi colegio</h6>
                        </div>  
                    </div>
                </div>
            </div>
            <div className='cont-info-subDatos'>
                <div className='cont-editar'>
                    <img src={`${URL.servidor}Archivos_u/iconos/notas-copia2.svg`}/>  
                </div>

                <div className='cont-sobreMi'>

                    <div className='cont-idiomas'>
                        <div className="cont-titulo-idiomas">
                            <h6>Idiomas</h6>
                        </div>
                            
                        <div>
                            <div className='datos-idioma'>
                                <p>español</p> <div className="separador" > </div> <p>nativo</p>
                            </div>
                            <div className='datos-idioma'>
                                <p>ingles</p> <div className="separador" > </div> <p>avanzado</p>
                            </div> 
                        </div>

                    </div>

                    <div className='cont-descripcion'>
                        <h5>Sobre Mi</h5>
                        <p> 
                            {Docente.Descr}
                        </p>
                    </div>

                </div>

                <div className='cont-areasInteres'>
                    <div>
                        <h5>Areas de interes</h5>
                    </div>
                    <div className='cont-intereses'>
                        <div className="con-ico-areaInteres">
                            <img src={`${URL.servidor}Archivos_u/iconos/icon-areas-interes.svg`}/>
                        </div>
                        <div className='areas-interes'>
                            <div>
                                <p>Tecnologia</p>
                            </div>
                            <div>
                                <p>Tecnologia</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='profeciones'>
                    <div className='formacion-academica'>
                        <div className='image-info-forAcademica'>
                            <img  src={`${URL.servidor}Archivos_u/iconos/icon-formacion-academica.svg`}/>
                        </div>
                        <div>
                            <h4>Formacion Academica</h4>
                        </div>
                        <div>
                            <img className='editar-info-formacion' src={`${URL.servidor}Archivos_u/iconos/notas-copia2.svg`}/>
                        </div>
                    </div>
                    <div>
                        <ul className='lista-profesiones'>
                            <li>     
                                <strong>{Docente.estudios}</strong>
                                <br/>
                                En didactica de la materia  para la educacion basica
                                <br/>
                                 2017 - 2020     
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='mis-cursos'>
                    <h4>Mis cursos</h4>
                    <div>
                        <p>201 </p>
                        <div className="separador1" > </div> 
                        <p>301 </p>
                        <div className="separador1" > </div> 
                        <p>401</p> 
                        <div className="separador1" > </div> 
                        <p>501</p>
                    </div>
                </div>

                <div className='actividades-grados'>
                    <div className='titulo-actividades-grados'>Mis Actividades</div>
                    <div className='grados'>
                        <p>Grado 2</p>
                        <div className='cont-imagen-info1'> 
                            <img className="imagen-info1" src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}/>
                        </div>
                    </div>
                    <div className='grados'>
                        <p>Grado 3</p>
                        <div className='cont-imagen-info1'> 
                            <img className="imagen-info1" src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}/>
                        </div>
                    </div>
                    <div className='grados'>  
                        <p>Grado 4</p>
                        <div className='cont-imagen-info1'> 
                            <img className="imagen-info1" src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

/*<div className='contenedor-info'>
            {Validacion ?
                <div className="p-4 w-100 m-auto" >
                    <div className="d-flex justify-content-center p-2" >
                        {Docente.imagen?
                            <div>
                                <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}${Docente.imagen}`} alt="logo" />
                            </div>
                            :
                            <div>
                                <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`} alt="logo" />
                            </div>
                        }
                        
                    </div>
                    <div className="p-3">
                        <h4 className="text-center font-weigth-bolder text-warning" > {`${Docente.Nombre} ${Docente.apellido}`}  </h4>
                        <p className="text-center text-white" >  <i className="text-center">{DatosRecibidos.nombreC} </i></p>
                    </div>
                    <div>
                        <h5 className="text-warning"> Información del Docente </h5>
                        <p className="text-white"> {Docente.Descr} </p>
                        <h5 className="text-warning"> Documento de Identidad </h5>
                        <p className="text-white"> {Docente.Documento} </p>
                        <h5 className="text-warning"> Titulo Profesional: </h5>
                        <p className="text-white"> {Docente.estudios} </p>
                        <h5 className="text-warning"> Ocupación: </h5>
                        <p className="text-white"> {Docente.Cargo} </p>
                    </div>
                    <div className="d-flex justify-content-center" >

                        <div className="d-flex justify-content-center mr-2" onClick={() => setValidacion(false)} >
                            <div className="bg-warning rounded-circle pointer p-3  shadow" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
                :
                <div>

                    <div className="d-flex justify-content-start mt-2 " >
                        <div className="shadow pointer rounded-circle p-3 bg-white" onClick={() => setValidacion(true)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-80 m-auto p-2">
                        <h2 className="text-center text-warning p-2">Editar mi Información</h2>
                        <form onSubmit={NoRecargar} >
                            <h6 className="m-2 text-white" > Información </h6>
                            <input className="form-control m-2" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" defaultValue={Docente.Descr} id="info" placeholder="Información" name="info" />
                            <h6 className="m-2 text-white"  > Nombres </h6>
                            <input className="form-control m-2" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" defaultValue={Docente.Nombre} placeholder={Docente.Nombre} id="Nombres" name="Nombres" />
                            <h6 className="m-2 text-white"  > Apellidos </h6>
                            <input className="form-control m-2" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" defaultValue={Docente.apellido} placeholder={Docente.apellido} id="apellidos" name="apellidos" />
                            <h6 className="m-2 text-white"  > Estudios </h6>
                            <input className="form-control m-2" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" defaultValue={Docente.estudios} placeholder="estudios" name="estudios" id="estudios" />
                            <h6 className="m-2 text-white"  > Imagen </h6>
                            <input className="m-2  text-warning" name="IMG" type="file" id="IMG" onChange={TemasCampos} />
                            <br />
                            <div className="col text-center p-3">
                                <button className="btn btn-info" type="submit"> ACEPTAR </button>
                            </div>
                        </form>
                    </div>

                </div>
            }
        </div>*/

export default InfoDocente;