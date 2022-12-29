import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../URL.js';
import EditColegio from './editColegio';
import { useDispatch } from 'react-redux';
import Calendario from '../../../components/calendario.js'


const AdminSchool = () => {

    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();
    const dispatch = useDispatch()
    let IdAdminEncriptado = cookies.get('iduser')
    let bytesadmin = CryptoJS.AES.decrypt(IdAdminEncriptado, 'A')
    let IdAdmin = JSON.parse(bytesadmin.toString(CryptoJS.enc.Utf8))

    const Datos = {
        id: IdAdmin
    }

    const [DatosRecibidos, setDatosRecibidos] = useState({});
    const [Validacion, setValidacion] = useState(0)

    useEffect(() => {
        const sendData = async () => {
            let DatosJson = JSON.stringify(Datos)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_col.php', DatosJson);
            setDatosRecibidos(
                response.data
            )
            console.log(DatosRecibidos);
            let CryptoJS = require("crypto-js")
            const cookies = new Cookies();
            cookies.remove("idcol")

            let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(response.data.id), 'A').toString();
            cookies.set('colid', idEncriptado, { path: "/", expires: new Date(Date.now() + 5 * 60 * 60 * 1000) })
        }
        sendData();
        //eslint-disable-next-line
    }, []);

    const editarCole = (num) => {
        setValidacion(num)
        dispatch({
            type: "@updateInfoCoordi",
            infoCoordi: DatosRecibidos
        })
    }
    
    return (
      
        <div className='cont-princi-docentes'>
            <div className='cont-imagen-docentes1'>
                <div className='titulo-Vista'>Bienvenido docentes</div>
                <div className='titulo-Vista1'> I.E.D Gonzalo Arango  </div>
            </div>

        <div >
            <div className='cont-info-home1'>
                <div >
                    <h4>Agenda</h4>
                    <div className='cont-agenda-home'>
                        <div>
                            <p>Reunion area de ciencia</p>
                            <p>13-Enero-2021</p>
                        </div>
                        <div>
                            <p>Reunion docentes con rector</p>
                            <p>20-enero-2022</p>
                        </div>
                        <div>
                            <p>Entrega de boletines 1 periodo</p>
                            <p> 02-febrero-2021</p>
                        </div> 
                        <div className='d-flex justify-content-end ver-mas-agenda'>{`Ver mas >`}</div>   
                    </div>
                </div>

                <div >
                    <Calendario contenedor={`cont-calendario-home`} diasCale={`dias-calendario-home`} colorLetra={"mes-calendario-contenido"}/>
                </div>

                <div>
                   <h4>Proximos eventos intitucionales</h4> 
                   <ul>
                       <li>Dia del idioma</li>
                       <li>Dia de la tierra</li>
                       <li>Semana de la ciencia</li>
                       <li>Integracion halloween</li>
                   </ul>
                </div>
                <div className='cont-circulares-home'>
                    <h4>Criculares</h4>
                    <div>
                        <p><strong>Circular 122 de 2021</strong> <br/>
                        Acuerdos de convivencia institucional
                        </p>
                    </div>
                    <div>
                        <p><strong>Circular 121 de 2021</strong> <br/>
                        Actualizacion medidad de bioseguridad
                        </p>
                    </div>
                    <div>
                        <p><strong>Circular 122 de 2021</strong> <br/>
                        Proceso electoral estudiantil 2021
                        </p>
                    </div>
                </div>
            </div> 
        </div>
     </div>
    );
}

/*
  <div>
            {Validacion === 0 &&
                <div className="p-3 text-white" >
                    <div className="d-flex justify-content-center" >
                        {
                            DatosRecibidos.imagen === undefined ||  DatosRecibidos.imagen === null?
                            <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}Archivos_u/Logos_estu/F1.png`} alt ={DatosRecibidos.nombreC} />
                            :
                            <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}${DatosRecibidos.imagen}`} alt ={DatosRecibidos.nombreC} />
                        }
                        
                    </div>
                    <h4 className="text-center mt-2 font-weigth-bolder p-2" >{DatosRecibidos.nombreC} </h4>
                    <p className="text-center"><i className="text-center">Colegio</i></p>
                    <div className="alert-success-miomt-2" >
                        <p className="text-center p-3 alert-link-mio text-warning " > {DatosRecibidos.id_cod} </p>
                    </div>
                    <hr className="color-hr-white"></hr>
                    <div>
                        <h6 className="text-warning"> Información de tu institución: </h6>
                        <p > {DatosRecibidos.info} </p>
                        <h6 className="text-warning"> Telefono de contacto : </h6>
                        <p> {DatosRecibidos.contacto} </p>
                    </div>
                    <div className="d-flex justify-content-center" >
                        <div className="d-flex justify-content-center mr-2" >
                            <div className="bg-warning rounded-circle pointer p-3  shadow" onClick={() => editarCole(1, DatosRecibidos)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            }
            {Validacion === 1 &&
                <div>
                    <div className="d-flex justify-content-start mt-2 " >
                        <div className="shadow pointer rounded-circle p-3 bg-white" onClick={() => setValidacion(0)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </div>
                    </div>
                    <EditColegio DatosRecibidos={DatosRecibidos} />
                </div>
            }
        </div>
*/
export default AdminSchool;