import React, {useState} from 'react';


import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import URL from '../../URL.js'
import axios from 'axios';

const FormEstudiante = () => {
    
    const cookies =  new Cookies();

    const [Validacion, setValidacion] = useState(true);
    const [Datos, setDatos] = useState({});
    const [DatosValidacion, setDatosValidacion] = useState({});
    const [Datoscod, setDatoscod] = useState({})

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
            url:`${URL.servidor}/api-php-react/verify_estu.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.mensaje){
            Swal.fire({
                icon: 'error',
                title: 'Codigo invalido',
                text: '¡Verifica que el codigo que te dimos sea igual al que estas digitando!',
                footer: '<a href="/Planes">¿No tienes un código? Consiguelo aquí </a>'
              })
        }else if (datosRecibidos.Id_Col) {
            setDatoscod(datosRecibidos)
            const cookies =  new Cookies();
            let CryptoJS = require("crypto-js");

            let idCurso = [datosRecibidos.Id_Curso]
            let IdCol = [datosRecibidos.Id_Col]
            
            let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(idCurso), 'A').toString();
            let IdColEncriptado = CryptoJS.AES.encrypt(JSON.stringify(IdCol), 'A').toString();
            
            cookies.set('idcurso', idEncriptado , {path:  "/FormE"  , expires: new Date(Date.now()+5*60*60*1000)});
            cookies.set('idcol', IdColEncriptado , {path: "/FormE"  , expires: new Date(Date.now()+5*60*60*1000)});
            setValidacion(false)
        }

        /*try {
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            let res = await fetch(`${URL.servidor}/api-php-react/verify_estu.php` , Configuracion)
            let json = await res.json()
            console.log(json)
            if(json.mensaje){
                Swal.fire({
                    icon: 'error',
                    title: 'Codigo invalido',
                    text: '¡Verifica que el codigo que te dimos sea igual al que estas digitando!',
                    footer: '<a href="/Planes">¿No tienes un código? Consiguelo aquí </a>'
                  })
            }else if (json.Id_Col) {
                setDatoscod(json)
                const cookies =  new Cookies();
                let CryptoJS = require("crypto-js");

                let idCurso = [json.Id_Curso]
                let IdCol = [json.Id_Col]
                
                let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(idCurso), 'A').toString();
                let IdColEncriptado = CryptoJS.AES.encrypt(JSON.stringify(IdCol), 'A').toString();
                
                cookies.set('idcurso', idEncriptado , {path:  "/FormE"  , expires: new Date(Date.now()+5*60*60*1000)});
                cookies.set('idcol', IdColEncriptado , {path: "/FormE"  , expires: new Date(Date.now()+5*60*60*1000)});
                setValidacion(false)
            }
        } catch (error) {
            console.log(error)
        }*/
    }


    async function NoRecargar (e) {
        e.preventDefault()
        if( Datos.Nombres  && Datos.Apellidos && Datos.Email){
            if(Datos.pass1 === Datos.pass2){
                let DatosObjeto = {
                    Ciclo : Datoscod.ciclo,
                    Nombres : Datos.Nombres,
                    Apellido : Datos.Apellidos,
                    Email : Datos.Email,
                    Codigo : DatosValidacion.Codigo,
                    pass1 : Datos.pass1,
                    Curso : Datoscod.Id_Curso,
                    Id_Col : Datoscod.Id_Col,
                    id : Datoscod.id
                }
                let DatosJson = JSON.stringify(DatosObjeto)

                const consulta = await axios({
                    method : "post",
                    url:`${URL.servidor}/api-php-react/Guardar_estu.php`,
                    data:DatosJson
                })
                let datosRecibidos = consulta.data

                if(datosRecibidos.mensaje){
                    Swal.fire({
                        icon: 'error',
                        text: datosRecibidos.mensaje
                    })
                }else if(datosRecibidos === true){
                    cookies.remove("idcurso")
                    cookies.remove("idcol")
                    cookies.remove("idDoc")
                    Swal.fire({
                        icon: 'success',
                        text: '¡Registro Exitoso!'
                    })
                    window.location.replace("/login");
                }

                /*try {
                    let Configuracion = {
                        method : 'POST',
                        headers : {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body :  DatosJson
                    }
                    let res = await fetch( `${URL.servidor}/api-php-react/Guardar_estu.php`, Configuracion)
                    let json = await res.json()
                    // let json = await res.text()
                    
                    if(json.mensaje){
                        Swal.fire({
                            icon: 'error',
                            text: json.mensaje
                        })
                    }else if(json === true){
                        cookies.remove("idcurso")
                        cookies.remove("idcol")
                        cookies.remove("idDoc")
                        Swal.fire({
                            icon: 'success',
                            text: '¡Registro Exitoso!'
                        })
                        window.location.replace("/login");
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
        <div> 
            {Validacion ? 
            <div className="container"> 
                <div className="d-flex justify-content-center w-100 h-100 my-5">
                    <form onSubmit={EnviarCodigo} className="w-75 my-5 py-5" >
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
                <div className="container" >
                    <h3> Bienvenido </h3>
                    <p> Nos da gusto que quieras usar nuestra plataforma, te pedimos que llenes los siguientes campos </p> 
                    <div className="row shadow rounded mt-4" > 
                        <div className="col-md p-4" >
                            <form  onSubmit={NoRecargar} > 
                                <input className="form-control m-2" name="Nombres"   onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text"     placeholder="Nombres" />
                                <input className="form-control m-2" name="Apellidos" onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text"     placeholder="Apellidos" />
                                <input className="form-control m-2" name="Email"     onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="email"     placeholder="Correo eléctronico" />
                                <input className="form-control m-2" name="pass1"     onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="password" placeholder="Contraseña" />
                                <input className="form-control m-2" name="pass2"     onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="password" placeholder="Valida tu Contraseña" />
                                <p className="text-muted" > Recuerda que debes tener un codigo de validación, si no cuentas con uno, comunicate con tu docente acargo.</p>

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
                </div>
            }
        </div>

    );
}
 
export default FormEstudiante;