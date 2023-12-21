import React, { useState } from "react";

import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from "sweetalert2";
import URL from './../../../URL';
function Seguridad() {
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();


    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }
    let iduser = Desencriptar("iduser" , "A")
    const [Datos, setDatos] = useState({});

    const Escribir = (e) => {
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim(),
            id: iduser,
            d:0
        });
    }
    const cambiar_clave =  async ()=>{
        if(Datos.clave === Datos.claveconfimar){
            let idCurso = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Config_estu.php', idCurso);
            const data = response.data
            if(data.correo){
                Swal.fire({
                    icon:'success',
                    title:'Contraseña cambiada correctamente',
                    text:'Tendra que volver a iniciar sesion',
                    confirmbuttonText:'Entendido!'
                }).then((result)=>{
                    if(result.isConfirmed){
                        cookies.remove('iduser')
                        cookies.remove('idCurso')
                        cookies.remove('idcol')
                        cookies.remove('estado')
                        window.location.replace(URL.compartido)
                    }
                })
            }
            else{}
        }else{
            Swal.fire({
                icon:'error',
                title:'Error Contraseñas no coinciden',
                text:'Verificar los campos'
            })
        }

    }
    return (
        <div className="col-md-8" >
            <div className="shadow m-2 p-3 bg-light " >
                <div>
                    <h2 className="font-chewy text-warning p-2 p-2 text-center">Cambio de contraseña</h2>
                    <p className="w-80 m-auto text-center">¿Deseas cambiar tu contraseña?</p>
                    <p className="w-80 m-auto">Si desea cambiar la contraseña requiere llenar los siguiente</p>
                    <div className="m-5 w-100 m-auto  mt-7">
                        <div className="w-75 m-auto  mt-7 p-2 text-center">
                            <form >
                                <input
                                    className="form-control m-2"
                                    name="clave"
                                    id="clave"
                                    onChange={Escribir}
                                    minLength="5"
                                    maxLength="40"
                                    required
                                    pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
                                    type="password"
                                    placeholder="Nueva contraseña"
                                /> <input
                                    className="form-control m-2"
                                    name="claveconfimar"
                                    id="confirmclave"
                                    onChange={Escribir}
                                    minLength="5"
                                    maxLength="40"
                                    required
                                    pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
                                    type="password"
                                    placeholder="Confirmar contraseña"
                                />
                                <hr/>
                                <input
                                    className="form-control m-2"
                                    name="clave_actual"
                                    id="clave_actual"
                                    onChange={Escribir}
                                    minLength="5"
                                    maxLength="40"
                                    required
                                    pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
                                    type="password"
                                    placeholder="Contraseña actual"
                                />

                                <button
                                    variant="contained"
                                    type="button"
                                    color="primary"
                                    name="submit"
                                    className="mt-4 mb-4 text-center"
                                    onClick={()=>cambiar_clave()}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="30"
                                        fill="currentColor"
                                        className=" bi bi-arrow-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Seguridad;
