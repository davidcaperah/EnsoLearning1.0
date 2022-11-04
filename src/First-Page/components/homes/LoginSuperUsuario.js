import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import URL from '../../../URL';
import { useNavigate } from 'react-router';
import axios from 'axios';


const LoginSuperUsuario = () => {

    const history = useNavigate();
    const handleClick = () => history.push('/2H365X2')
    const [Datos, setDatos] = useState({})

    const Escribir = (e) => {
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim()
        });
    }

    const NoRecargar = async  (e) => {
        e.preventDefault()
        let DatosJson = JSON.stringify(Datos)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/admin/login_s.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.mensaje){
            Swal.fire({
                icon: 'error',
                text: datosRecibidos.mensaje
              })
        }else if(datosRecibidos.id){

            const cookies =  new Cookies();
            let CryptoJS = require("crypto-js");

            let sesion = datosRecibidos.estado
            let id = datosRecibidos.id

            let sesionEncriptado = CryptoJS.AES.encrypt(JSON.stringify(sesion), 'B').toString();
            cookies.set('estado', sesionEncriptado , {path: "/" , expires: new Date(Date.now()+5*60*60*1000)});

            let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
            cookies.set('iduser', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});


            if(sesion === 8){
                window.location.replace("/AdminInicio");
            }else{
                window.location.replace("/");
            }
        }

        /*try{
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            let res = await fetch(`${URL.servidor}/api-php-react/admin/login_s.php` , Configuracion)
            let json = await res.json()
            // let json = await res.text()
            console.log(json)

            if(json.mensaje){
                Swal.fire({
                    icon: 'error',
                    text: json.mensaje
                  })
            }else if(json.id){

                const cookies =  new Cookies();
                let CryptoJS = require("crypto-js");

                let sesion = json.estado
                let id = json.id

                let sesionEncriptado = CryptoJS.AES.encrypt(JSON.stringify(sesion), 'B').toString();
                cookies.set('estado', sesionEncriptado , {path: "/" , expires: new Date(Date.now()+5*60*60*1000)});

                let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
                cookies.set('iduser', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});


                if(sesion === 8){
                    window.location.replace("/AdminInicio");
                }else{
                    window.location.replace("/");
                }
            }


        }catch(error){
            console.error(error);
        }*/
    }

    return (
        <div className="container" >
            <div className="row  shadow mb-5 mt-5" >
                <div className="bg-dark  col-md-6 " >

                </div>
                <div className="col-md-6" >
                    <form className="p-3 m-2" onSubmit={NoRecargar} >
                        <h6 className="p-2" > Bienvenido Super Usuario </h6>

                        <input className="form-control m-2" 
                            placeholder="Email" 
                            type="text" 
                            minLength="1" 
                            maxLength="40" 
                            name="email"
                            autoComplete="on"
                            required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
                            onChange={Escribir}
                        />
                        <input className="form-control m-2" 
                            placeholder="Contraseña" 
                            type="password" 
                            minLength="1" 
                            maxLength="40" 
                            name="pass"
                            autoComplete="on"
                            required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
                            onChange={Escribir}
                        />

                        <Button  
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className={`CeroBootstrap ml-2 link-button`}
                        >
                            Entrar
                        </Button>
                        <button className="text-primary link pointer btn-link-cero" onClick={handleClick}> Recuperar clave  </button>
                    </form>
                    
                </div>
            </div>

        </div>
    );
}
 
export default LoginSuperUsuario;