import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import URL from '../../../URL.js';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * ': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))



const DocenteFormOne = () => {
    const classes = useStyles();
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

  
    let IdDocEncriptado =  cookies.get('idDoc')
    let IdColEncriptado =  cookies.get('idcol')
    let IdCursoEncriptado =  cookies.get('idcurso')

    let bytesDoc  = CryptoJS.AES.decrypt(IdDocEncriptado, 'A')
    let IdDocArreglo = JSON.parse(bytesDoc.toString(CryptoJS.enc.Utf8))
    let DocId = parseInt(IdDocArreglo[0])
    
    let bytescurso  = CryptoJS.AES.decrypt(IdCursoEncriptado, 'A')
    let IdCursoArreglo = JSON.parse(bytescurso.toString(CryptoJS.enc.Utf8))
    let CursoId = parseInt(IdCursoArreglo[0])
  
    let bytesCol  = CryptoJS.AES.decrypt(IdColEncriptado, 'A')
    let IdColArreglo = JSON.parse(bytesCol.toString(CryptoJS.enc.Utf8))
    let ColId = parseInt(IdColArreglo[0])




    const [Datos, setDatos] = useState({
      Materias : "",
      Estudios : "",
      InfoDoc : "",
      InfoAula  : "",
      idDoc : DocId,
      idCurso : CursoId,
      idCol : ColId

    });
    const [DatosRecibidos, setDatosRecibidos] = useState([]);

    useEffect(()=>{
        const sendData = async ()=>{
          let DatosJson = JSON.stringify("1")
          const api = axios.create({baseURL :URL.servidor});
          const response = await api.post('/api-php-react/Cargar_mat.php', DatosJson);
          setDatosRecibidos(
              response.data
          )
        }
        sendData();
      }, []);    

    const onChange = (e) =>{
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim()
          });
    }

    async function NoRecargar (e) {
        e.preventDefault()
        if(Datos.Materias && Datos.InfoDoc && Datos.InfoAula){
          let DatosJson = JSON.stringify(Datos)
          console.log(DatosJson)

          const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/Guardar_info.php`,
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
              let res = await fetch(`${URL.servidor}/api-php-react/Guardar_info.php`, Configuracion)
      
              let json = await res.json()
              console.log(json)
                
              if(json.mensaje){
                Swal.fire({
                  icon: 'error',
                  text: json.mensaje
                })
              }else if(json === true){
                cookies.remove("idcurso")
                cookies.remove("idcol")
                cookies.remove("idDoc")
                window.location.replace("/login");
              }
      
          } catch (error) {
              console.log(error)
          }*/
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
            <form onSubmit={NoRecargar}  className="shadow rounded p-4 ">

              <select className="m-2 form-control" name="Materias"  onChange={onChange}>
                  <option  unselectable="true" > ¿Que materias dictas? </option>
                  {
                    DatosRecibidos.map(data => 
                      <option value={data.id} > {data.N_Materia}  </option>
                    )
                  }
              </select>
              <h6 className="m-2" >Estudios profesionales </h6>
              <input 
                  type="text" 
                  placeholder="ejemplo... Licenciado en..." 
                  className="form-control m-2"
                  name="Estudios"
                  onChange={onChange}
                  minLength="1" maxLength="40" 
                  required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              />
              
              <textarea placeholder="Descripción del docente" name="InfoDoc"  onChange={onChange}  type="text" minLength="30" maxLength="250" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  className="form-control col-sm-12 m-2" />


              <h4 className="m-2" > Bienvenido a tu aula virtual </h4>
              <div> 
                <textarea placeholder="Descripción de tu aula virtual" name="InfoAula"  onChange={onChange}  type="text" minLength="30" maxLength="700" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"   className="form-control col-sm-12 m-2" />
              </div>


              <Button
              variant="contained"
              color="primary"
              type="submit"
              className={`${classes.button} CeroBootstrap  link-button`}
              >
                Enviar
              </Button>
            </form>

        </div>
    );
}
 
export default DocenteFormOne;