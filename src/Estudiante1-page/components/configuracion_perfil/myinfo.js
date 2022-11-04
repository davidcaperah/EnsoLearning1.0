import React, { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import Cookies from 'universal-cookie';
import URL from '../../../URL';
import Swal from "sweetalert2";

function Myinfo() {

    const [Datos, setDatos] = useState({});
    const [Form, setForm] = useState();
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();


    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }
    let iduser = Desencriptar("iduser" , "A")

    const Escribir = (e) => {
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim(),
            id: iduser,
            d: 1
        });
    }
    const Cambiar_perfil = async() =>{
        if(Datos.clave === Datos.claveconfimar){
            let idCurso = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Config_estu.php', idCurso);
            const data = response.data
            console.log(data);
            if(data.correo){
                Swal.fire({
                    icon:'success',
                    title:'Datos Cambiados correctamente',
                    text:'Tendra que volver a iniciar sesion',
                    confirmButtonText:'Entendido!'
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
            else if(data.error){
                Swal.fire({
                    icon:"error",
                    title:'error:'+data.mensaje        
                })
            }else{

            }
        }else{
            Swal.fire({
                icon:'error',
                title:'Error Contraseñas no coinciden',
                text:'Verificar los campos'
            })
        }
    }
    useEffect(()=>{
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify({d : 11, id: iduser})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            const data = response.data
            setForm(data)
            var objeto = Object();
            objeto.Nombres = data.Nombre
            objeto.Apellidos = data.Apellido
            objeto.Correo = data.Correo
            objeto.d = 1
            objeto.id = iduser
            setDatos(objeto)
            console.log(Form) 
        }
        TraerDatos()
        //eslint-disable-next-line
    }, []);  
    console.log(Form)
    console.log(Datos)
    return (
        <div className="col-md-8" >
            <div className="shadow m-2 p-3 bg-light " >
                <h2 className="font-chewy text-warning p-2 text-center">Mi información</h2>
                {Form ?<img alt={"Enso Learning "} className="shadow m-auto border-radius-30 mb-2" src={`${URL.servidor}${Form.imagen}`} />:
                <img alt={"Enso Learning "} className="shadow m-auto border-radius-30 mb-2" src="" />}
               {Form ?  
               <h5 className="font-chewy shadow mt-3 p-2 w-25 m-auto text-center">{Form.Nombre} {Form.Apellido}</h5> :null}
                <div className="mt-3">
                    <p>Acá podras realizar cambios en tu información, recuerda que es nesesario ingresar tu contraseña actual, para realizar el cambio.</p>
                    <div className="m-5 w-100 m-auto  mt-7" >
                        {Form? 
                            <form className=" w-75 m-auto  mt-7 p-2 text-center" >
                            <input className="form-control m-2" name="Nombres"  defaultValue={Form.Nombre} onChange={Escribir} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text" placeholder="Nombres" />
                            <input className="form-control m-2" name="Apellidos" defaultValue={Form.Apellido} onChange={Escribir} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text" placeholder="Apellido" />
                            <input className="form-control m-2" name="Correo"  defaultValue={Form.Correo} onChange={Escribir} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="email" placeholder="Correo eléctronico" />
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
                            <Button
                                variant="contained"
                                type="button"
                                color="primary"
                                name="submit"
                                className="mt-4 mb-4 text-center"
                                onClick={()=>Cambiar_perfil()}  
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
                            </Button>
                        </form>
                        :
                        <form className=" w-75 m-auto  mt-7 p-2 text-center" >
                            <input className="form-control m-2" name="Nombres"  onChange={Escribir} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text" placeholder="Nombres" />
                            <input className="form-control m-2" name="Apellidos"  onChange={Escribir} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text" placeholder="Apellidos" />
                            <input className="form-control m-2" name="Correo"  onChange={Escribir} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="email" placeholder="Correo eléctronico" />
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
                            <Button
                                variant="contained"
                                type="button"
                                color="primary"
                                name="submit"
                                className="mt-4 mb-4 text-center"
                                onClick={()=>Cambiar_perfil()}
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
                            </Button>
                        </form>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myinfo
