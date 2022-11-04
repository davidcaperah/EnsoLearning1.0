import React,{useState} from 'react'
import Swal from 'sweetalert2';
import URL from '../../../URL.js'
import axios from 'axios';


const CreateAreas = ({idCurso}) => {

    const [Campos, setCampos] = useState({})

    const Escribir = (e) => {
        setCampos({
          ...Campos,
          [e.target.name]: e.target.value.trim()
        });
    }

    const NoRecargar = async (e) => {
        e.preventDefault()
        if(Campos.Area !== ""){
            let DatosJson = JSON.stringify({
                Area : Campos.Area ,
                id : idCurso.id
            })
  


            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/Crear_Malla.php`,
                data:DatosJson
            })
            let datosRecibidos = consulta.data

            if(datosRecibidos.estado === true){
                Swal.fire({
                  icon: 'success',
                  title: 'Area Agregada Correctamente'
                })
                window.location.reload()
            }
            /*try {
                const Configuracion = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body :  DatosJson
                }
                const res = await fetch( `${URL.servidor}/api-php-react/Crear_Malla.php`, Configuracion)
                const json = await res.json()
                // let json = await res.text()
                console.log(json);
                if(json.estado === true){
                    Swal.fire({
                      icon: 'success',
                      title: 'Area Agregada Correctamente'
                    })
                    window.location.reload()
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
        <div>
            <form onSubmit={NoRecargar} >
              <input className="form-control m-2" name="Area"  onChange={Escribir} placeholder="Areas" />
              <button className="btn btn-primary m-2" type="submit"  > 
                  Enviar
              </button>
            </form>
        </div>
    )
}


export default CreateAreas;