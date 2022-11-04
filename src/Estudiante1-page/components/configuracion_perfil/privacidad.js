import React, { useState,useEffect } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import URL from '../../../URL';
function Privacidad() {
    const [Datos, setDatos] = useState({});
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();


    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }
    let iduser = Desencriptar("iduser" , "A")

    const click = async (estado)=>{
        var enviar_estado = ""
        if(estado === 1){
            enviar_estado = 0
        }else{
            enviar_estado = 1
        }
        let idusers = JSON.stringify({d : 2, id: iduser, estado:enviar_estado})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/Config_estu.php', idusers);
        const data = response.data
        console.log(data)
        if(data){
            setDatos({
                estado_p:enviar_estado
            })
        }else{
            console.log(data)
        }
    }
    useEffect(()=>{
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify({d : 12, id: iduser})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            const data = response.data
            setDatos(data)
        }
        TraerDatos()
        //eslint-disable-next-line
    }, []);  
    console.log(Datos.estado_p)
    return (
        <div className="col-md-8" >
            <div className="shadow m-2 p-3 bg-light respon" >
                <h2 className="font-chewy  text-warning p-2 text-center">¡Elige tu privacidad!</h2>
                <p>Acá podras si quieres que otros te vean o no, elige la que mas te llame la atención o la cual se adecue a tu necesidad.
                    (Da clic sobre el o que deseas para elegir tu privacidad)
                </p>

                <div className="d-flex justify-content-center">
                    {parseInt(Datos.estado_p) !== 0?                    
                    <div className="w-50 m-auto ">
                        <button onClick={()=>click(parseInt(Datos.estado_p))}>
                        <img alt={"Enso Learning privado"} className="w-25 h-100 m-auto d-flex justify-content-center pointer" src="https://cdn-icons.flaticon.com/png/512/2592/premium/2592543.png?token=exp=1635202922~hmac=77771c59bf6229971cc8dd1f50dfc674" />
                        <p className="text-center ocultar"><strong>Privado</strong> solo podran verte los docentes y administradores.</p>
                        </button>
                        
                    </div>
                    :
                    <div className="w-50 m-auto">
                        <button onClick={()=>click(parseInt(Datos.estado_p))}>
                        <img alt={"Enso Learning  publico"} className="w-25 h-100 m-auto d-flex justify-content-center pointer" src="https://cdn-icons-png.flaticon.com/512/1484/1484584.png" />
                        <p className="text-center"><strong>Publico</strong> Te podran ver todos los de tu institucion educativa incluyendo demás estudiantes.</p>
                        </button>
                   
                </div>
                    }
                </div>
                {parseInt(Datos.estado_p) === 0 ? 
                <p className="shadow m-2 mt-5 p-3 w-50 m-auto text-center">Actualmente tu perfil es: <strong className="font-chewy text-red">Privado</strong></p>
                :
                <p className="shadow m-2 mt-5 p-3 w-50 m-auto text-center">Actualmente tu perfil es: <strong className="font-chewy text-blue">Publicoooooo</strong></p>
                }
                
            </div>
        </div>
    )
}

export default Privacidad;
