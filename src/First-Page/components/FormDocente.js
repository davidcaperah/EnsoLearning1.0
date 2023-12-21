import React, {useState} from 'react';


import Cookies from 'universal-cookie';
import URL from '../../URL.js'
import Swal from 'sweetalert2';
import axios from 'axios';

const FormDocente = () => {
    

    const [Datos, setDatos] = useState({});
    const [DatosValidacion, setDatosValidacion] = useState({});
    const [Validacion, setValidacion] = useState(true);
    const [Curso, setCurso] = useState(0)


    const onChange = (e)=>{
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim()
        });
    }


    const onChangeCodigo = (e) =>{
        setDatosValidacion({
            ...DatosValidacion,
            [e.target.name]: e.target.value.trim()
        });
    }

    async function EnviarCodigo (e) {
        e.preventDefault()
        let DatosJson = JSON.stringify(DatosValidacion)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/Buscar_codpro.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(!datosRecibidos){
            Swal.fire({
                icon: 'error',
                title: 'Codigo invalido',
                text: '¡Verifica que el codigo que te dimos sea igual al que estas digitando!',
                footer: '<a href="/Planes">¿No tienes un código? Consiguelo aquí </a>'
              })
        }else if (datosRecibidos.Curso_Nu) {
            setCurso(datosRecibidos.Curso_Nu)
            const cookies =  new Cookies();
            let CryptoJS = require("crypto-js");
            let id = [datosRecibidos.id]
            let IdCol = [datosRecibidos.IdCol]
            let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
            let IdColEncriptado = CryptoJS.AES.encrypt(JSON.stringify(IdCol), 'A').toString();
            cookies.set('idcurso', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
            cookies.set('idcol', IdColEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
            setValidacion(false)
        }
        /*try {
            //Envía configuración de json 
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            //Envía datos de json a la api
            let res = await fetch(`${URL.servidor}/api-php-react/Buscar_codpro.php` , Configuracion)
            let json = await res.json()
            console.log(json)
            if(!json){
                Swal.fire({
                    icon: 'error',
                    title: 'Codigo invalido',
                    text: '¡Verifica que el codigo que te dimos sea igual al que estas digitando!',
                    footer: '<a href="/Planes">¿No tienes un código? Consiguelo aquí </a>'
                  })
            }else if (json.Curso_Nu) {
                setCurso(json.Curso_Nu)
                const cookies =  new Cookies();
                let CryptoJS = require("crypto-js");
                let id = [json.id]
                let IdCol = [json.IdCol]
                let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
                let IdColEncriptado = CryptoJS.AES.encrypt(JSON.stringify(IdCol), 'A').toString();
                cookies.set('idcurso', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
                cookies.set('idcol', IdColEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
                setValidacion(false)
            }
        } catch (error) {
            console.log(error)
        }*/
    }



    async function NoRecargar (e) {
        e.preventDefault()
        if( Datos.Nombres  && Datos.Apellidos && Datos.email && Datos.CC ){
            if(Datos.pass1 === Datos.pass2){
                let DatosJson = JSON.stringify(Datos)

                const consulta = await axios({
                    method : "post",
                    url:`${URL.servidor}/api-php-react/Guardar_pro.php`,
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
                    let id = [datosRecibidos.id]
                    let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
                    cookies.set('idDoc', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
                    window.location.replace("/DocenteFormOne");
                }
                /*try {
                    //Envía configuración de json 
                    let Configuracion = {
                        method : 'POST',
                        headers : {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body :  DatosJson
                    }
                    //Envía datos de json a la api
                    let res = await fetch(`${URL.servidor}/api-php-react/Guardar_pro.php` , Configuracion)
                    let json = await res.json()
                    if(json.mensaje){
                        Swal.fire({
                            icon: 'error',
                            text: json.mensaje
                        })
                    }else if(json.id){
                        const cookies =  new Cookies();
                        let CryptoJS = require("crypto-js");
                        let id = [json.id]
                        let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
                        cookies.set('idDoc', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
                        window.location.replace("/DocenteFormOne");
                    }
        
                } catch (error) {
                    console.log(error)
                }*/
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseñas desiguales',
                    text: '¡las contraseñas no son iguales!'
                })
            }
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Campos Vacios',
                text: '¡Recuerda llenar todos los campos!'
            })
        }
  


    }

    return (
        <div className="container" >
            
            { Validacion? 
            <div className="d-flex justify-content-center w-100 h-100 my-5" >
                <div className="my-5" >
                    <h3> Bienvenido </h3>
                    <p> Nos da gusto que quieras usar nuestra plataforma, te pedimos que llenes los siguientes campos </p>  
                    <form onSubmit={EnviarCodigo} className="w-75" >
                        <input className="form-control m-2" name="Codigo"    onChange={onChangeCodigo}  minLength="10" maxLength="50" required pattern="[A-Za-z0-9--- -ñ]+"   type="text"     placeholder="Codigo de Validación" />            
                        <button
                            variant="contained" 
                            type="submit"
                            color="primary"
                            className={` CeroBootstrap`}
                        >
                            Aceptar 
                        </button>
                    </form> 
                </div>
            </div>
            :
                <div className="row shadow rounded mt-4" > 
                    <div className="col-md p-4" >
                        <h5> El curso que tendrás acargo será : {Curso} </h5>
                        <form  onSubmit={NoRecargar} > 
                            <input className="form-control m-2" name="Nombres"   onChange={onChange} minLength="5" maxLength="40"  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text"     placeholder="Nombres" />
                            <input className="form-control m-2" name="Apellidos" onChange={onChange} minLength="5" maxLength="40"  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text"     placeholder="Apellidos" />
                            <input className="form-control m-2" name="email"     onChange={onChange} minLength="5" maxLength="40"  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"   type="email"     placeholder="Correo eléctronico" />
                            <input className="form-control m-2" name="CC"        onChange={onChange} minLength="5" maxLength="40"  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="number"   placeholder="Documento de identidad" />
                            <input className="form-control m-2" name="pass1"     onChange={onChange} minLength="5" maxLength="40"  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="password" autoComplete="on" placeholder="Contraseña" />
                            <input className="form-control m-2" name="pass2"     onChange={onChange} minLength="5" maxLength="40"  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="password" autoComplete="on" placeholder="Valida tu Contraseña" />
                            <p className="text-muted" > Recuerda que debes tener un codigo de validación, si no cuentas con uno, comunicate con el administrador de tu institución educativa </p>

                            <button
                                variant="contained" 
                                type="submit"
                                color="primary"
                                className={` CeroBootstrap`}
                                name="submit"
                            >
                                Aceptar 
                            </button>
                        </form> 
                    </div>
                    <div className="col-md bg-dark" > 
                    </div>
                </div>
            }


        </div>
    );
}
 
export default FormDocente;