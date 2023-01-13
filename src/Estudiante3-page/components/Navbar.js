import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Rutas from '../router.js';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../URL.js';
import Header from './header'
import Carga from './pantallaCarga'
import '../css/index.css';

const Navbar = () => {

    const path = window.location.pathname
    const dispatch = useDispatch();
    const [load, setLoad] = useState(0);
    const [infoEstudiante, setinfoEstudiante] = useState({})
    const cookies = new Cookies()
    let CryptoJS = require("crypto-js")
    const Desencriptar = (Nombre , key ) => {
        let IdEncriptado =  cookies.get(Nombre)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, key)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
    let iduser = Desencriptar('iduser' , 'A')
    let idCurso = Desencriptar('idCurso' , 'A')

    
    const Datos = {
        id : iduser ,
        d: 0 ,
        idcurso : idCurso
    }

    
    useEffect(() => {

        fetch(`http://localhost:3000${path}`)
        .then((response) => {
          if(response.status === 200){
            setLoad(200)
          }
        }) 
    
      }, []);
    useEffect(()=>{
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            setinfoEstudiante(
                response.data.estu
            )
            dispatch({type:"@addDatauser", user: response.data.estu})
        }
        TraerDatos()
        //eslint-disable-next-line
    }, []);
    
    if(load === 200){
    return (
        <div>
            <Header student={infoEstudiante}/>
            <Rutas />
        </div>   
    );
    } else{
        return(
            <Carga/>
        )
    }
}
 

/*
<div className="bg-light" >
                <div className="container pt-2"> 
                    <div className="d-flex justify-content-between align-items-center" >
                        <div>
                            <h1> <a href="/EstudianteThreeHome" className="font-chewy text-blue p-2 link-no" > Enso learning </a></h1>
                        </div>

                        <div className="opcionesNav" >
                            <a className="pointer m-2 link-navbar link-no text-dark "  href="/EstudianteThreeAulas" > Mis Aulas </a>
                            <a className="pointer m-2 link-navbar link-no text-dark "  href="/EstudianteThreeEvaluaciones" > Mis evaluaciones </a>
                            <a className="pointer m-2 link-navbar link-no text-dark "  href="/EstudianteThreeActividades" > Mis actividades </a>
                            <a className="pointer m-2 link-navbar link-no text-dark "  href="/EstudianteThreeCurso" > Mi curso </a>
                            <a className="pointer m-2 link-navbar link-no text-dark "  href="/EstudianteThreeEventos" > Eventos </a>
                            <a className="pointer m-2 link-navbar link-no text-dark "  href="/EstudianteThreeLecturas" > Lecturas </a>
                        </div>

                        <div className="botonNav" >
                            <Button  variant="contained" color="primary" onClick={DesplegarMenu} >
                                <div className="d-flex align-items-center" >
                                    <p className="m-1 mr-2" > {infoEstudiante.Nombre} </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                                </div>
                            </Button>
                            <div className="Desplegable Eliminar" id="Desplegable" >
                                <ul className="list-group">
                                    <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteThreeAulas" > Mis Aulas </a> </li>
                                    <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteThreeEvaluaciones" > Mis evaluaciones </a> </li>
                                    <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteThreeActividades" > Mis actividades </a> </li>
                                    <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteThreeCurso" > Mi curso </a> </li>
                                    <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteThreeUser" > Mi perfil </a></li>
                                    <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteThreeConfiguracion" > Configuración  </a></li>
                                    <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteThreeEventos" > Eventos  </a></li>
                                    <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteThreeLecturas" > Lecturas  </a></li>
                                    <li className="list-group-item pointer link-desplegable"><p className="text-dark  " onClick={Salir} > Salir  </p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

*/
export default Navbar;