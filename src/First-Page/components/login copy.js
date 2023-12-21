import React, {useState} from 'react';


import Cookies from 'universal-cookie';
import URL from '../../URL.js'
import Swal from 'sweetalert2';


const Login = () => {
  

  const [Datos, setDatos] = useState({});

  const Escribir = (e) =>{
    setDatos({
      ...Datos,
      [e.target.name]: e.target.value.trim()
    });

  }

  async function NoRecargar (e) {
    e.preventDefault()
    let DatosJson = JSON.stringify(Datos)

    const consulta = await axios({
      method : "post",
      url:`${URL.servidor}/api-php-react/login.php`,
      data:DatosJson
    })

    let datosRecibidos = consulta.data

    if(datosRecibidos.mensaje){
      Swal.fire({
        icon: 'error',
        text: datosRecibidos.mensaje
      })
    }else if(datosRecibidos.id) {
      const cookies =  new Cookies();
      const CryptoJS = require("crypto-js");
      if(datosRecibidos.id_col){
        let idCol = datosRecibidos.id_col
        let idColEncriptado = CryptoJS.AES.encrypt(JSON.stringify(idCol), 'A').toString();
        cookies.set('idcol', idColEncriptado , {path: "/" , expires: new Date(Date.now()+5*60*60*1000)});
      }

      let id = datosRecibidos.id
      let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
      cookies.set('iduser', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});


      if(datosRecibidos.Id_curso){
        let idCurso = datosRecibidos.Id_curso
        let idCursoEncriptado = CryptoJS.AES.encrypt(JSON.stringify(idCurso), 'A').toString();
        cookies.set('idCurso', idCursoEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
      }
      

      let sesion = datosRecibidos.estado
      let sesionEncriptado = CryptoJS.AES.encrypt(JSON.stringify(sesion), 'B').toString();
      cookies.set('estado', sesionEncriptado , {path: "/" , expires: new Date(Date.now()+5*60*60*1000)});

      if(sesion === 1){
        window.location.replace("/");
      }else if(sesion === 2){
        window.location.replace("/DocenteInfo");
      }else if(sesion === 3){
        window.location.replace("/Acudientes");
      }else if(sesion === 4){
        window.location.replace("/AdminSchool");
      }else if(sesion === 5) {
        window.location.replace('/EstudianteOnePage');
      }else if(sesion === 6){
        window.location.replace("/EstudianteTwoHome");
      }else if(sesion === 7) {
        window.location.replace("/EstudianteThreeHome");
      }else {
        window.location.replace("/");
      }
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
        let res = await fetch(`${URL.servidor}/api-php-react/login.php` , Configuracion)

        let json = await res.json()

        if(json.mensaje){
          Swal.fire({
            icon: 'error',
            text: json.mensaje
          })
        }else if(json.id) {
          const cookies =  new Cookies();
          const CryptoJS = require("crypto-js");
          if(json.id_col){
            let idCol = json.id_col
            let idColEncriptado = CryptoJS.AES.encrypt(JSON.stringify(idCol), 'A').toString();
            cookies.set('idcol', idColEncriptado , {path: "/" , expires: new Date(Date.now()+5*60*60*1000)});
          }
 
          let id = json.id
          let idEncriptado = CryptoJS.AES.encrypt(JSON.stringify(id), 'A').toString();
          cookies.set('iduser', idEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});


          if(json.Id_curso){
            let idCurso = json.Id_curso
            let idCursoEncriptado = CryptoJS.AES.encrypt(JSON.stringify(idCurso), 'A').toString();
            cookies.set('idCurso', idCursoEncriptado , {path: "/"  , expires: new Date(Date.now()+5*60*60*1000)});
          }
          

          let sesion = json.estado
          let sesionEncriptado = CryptoJS.AES.encrypt(JSON.stringify(sesion), 'B').toString();
          cookies.set('estado', sesionEncriptado , {path: "/" , expires: new Date(Date.now()+5*60*60*1000)});

          if(sesion === 1){
            window.location.replace("/");
          }else if(sesion === 2){
            window.location.replace("/DocenteInfo");
          }else if(sesion === 3){
            window.location.replace("/Acudientes");
          }else if(sesion === 4){
            window.location.replace("/AdminSchool");
          }else if(sesion === 5) {
            window.location.replace('/EstudianteOnePage');
          }else if(sesion === 6){
            window.location.replace("/EstudianteTwoHome");
          }else if(sesion === 7) {
            window.location.replace("/EstudianteThreeHome");
          }else {
            window.location.replace("/");
          }
        }
    } catch (error) {
        console.log(error)
    }*/
  }


    return (
      <div className="mb-5" >
        <div className="container pt-4" >
          <div className="row shadow-lg rounded " >
            <div className="col-md-7 bg-dark" >

            </div>
            
            <div className="col-md-5 p-4" >

              <div className="m-2" >
                <h3> <strong>  Bienvenido </strong> </h3>
                <p> ¡Hola! Nos da gusto tenerte de vuelta. </p>
              </div>

              <form
              onSubmit={NoRecargar}
              className={classes.root}
              noValidate
              autoComplete="off"
              >

                <select className="m-2 form-control" name="Estado"  onChange={Escribir}> 
                    <option  unselectable="true" > ¿Eres? </option>
                    <option  value="1" > Estudiantes </option>
                    <option  value="2" > Docente </option>
                    <option  value="3" > Acudiente </option>
                    <option  value="4" > Administrador </option>
                </select>
              <input
                type="email"
                placeholder="Correo eléctronico"
                onChange={Escribir}
                className="form-control"
                name="Email"
                minLength="1" maxLength="40" 
                required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              />

              <input 
              type="password" 
              placeholder="Contraseña" 
              className="form-control"
              name="Pass"
              autoComplete="on"
              onChange={Escribir}
              minLength="1" maxLength="40" 
              required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              />

              <div className="pt-3 row" >
                <div className="" >
                    <p> ¿Olvidaste tú contraseña?  <span className="text-primary link pointer" > Recuperala  </span> </p>
                </div>

                <div className="" >
                  button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={` CeroBootstrap  link-button`}
                  >

                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" className=" bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>

                  </button>
                </div>                
              </div>
            </form>

            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Login;