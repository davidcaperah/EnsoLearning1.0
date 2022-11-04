import React,{useState, useEffect} from 'react';
import niños from '../img/niños.png'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import URL from './../../URL'

const Banner = () => 
{
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
    useEffect(()=>{
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            setinfoEstudiante(
                response.data.estu
            )}
            TraerDatos()
        //eslint-disable-next-line
    }, []);
    return (
        <div className="pt-5 container" >
            <div className="row" >
                <div className="col-md-6" >
                    <div className="p-3 m-2" >
                        <h1 className="font-chewy text-dark mt-5" > ¡Bienvenido {infoEstudiante.Nombre}! Nos da gusto tenerte de nuevo </h1>
                        <p className="mt-2" > Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! </p>

                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="p-3 m-2" >
                        <img alt="logo" className="w-100" src={niños} />
                    </div>
                </div>
            </div>
        </div>

    );
}
 
export default Banner;