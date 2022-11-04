import React,{useState} from 'react';
import Swal from 'sweetalert2';
import URL from '../../../URL.js';
import axios from 'axios';

const AddGrados = ({grados}) => {


    const [CamposCurso, setCamposCurso] = useState({})  

    const CursoNombre = (e) => {
        setCamposCurso({
          ...CamposCurso,
          [e.target.name]: e.target.value.trim()
        });
    }

    const EnviarCurso =  async (e) => {
        e.preventDefault()
        let data = {
          d  : 2 ,
          curso : CamposCurso.curso
        }
        let DatosJson = JSON.stringify(data)

        const consulta = await axios({
          method : "post",
          url:`${URL.servidor}/api-php-react/Info_cursos_admin.php`,
          data:DatosJson
      })
      let datosRecibidos = consulta.data

      if(datosRecibidos === true){
        Swal.fire({
          icon : "success" ,
          text : "El curso se agrego correctamente"
        })
        window.location.reload()
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
          let res = await fetch( `${URL.servidor}/api-php-react/Info_cursos_admin.php`, Configuracion)
          let json = await res.json()
          if(json === true){
              Swal.fire({
                icon : "success" ,
                text : "El curso se agrego correctamente"
              })
              window.location.reload()
          }
        } catch (error) {
            console.log(error)
        }*/
    }


    return (
        <div>
            <form onSubmit={EnviarCurso} >
              <input className="form-control m-2" onChange={CursoNombre} name="curso" type="text" placeholder="Curso"  />
              <button className="btn btn-primary m-2" > 
                  Enviar
              </button>
            </form>
        </div>
    );
}
 
export default AddGrados;