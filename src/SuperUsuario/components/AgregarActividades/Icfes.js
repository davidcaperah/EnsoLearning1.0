import React,{useState, useEffect} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import URL from '../../../URL.js';
import Cookies from 'universal-cookie';


const Icfes= ({datos}) => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [ValidacionClick, setValidacionClick] = useState(true)


    useEffect(() => {
        //Cargar cursos de la base de datos
        const CargarCurso = async ()=>{
            let DatosEnviar = {
                d : 4 
            }
            let DatosJson = JSON.stringify(DatosEnviar)
            console.log(DatosJson);
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Actividad_icfes.php', DatosJson);
            let data = response.data
            if(data.mensaje){
              Swal.fire({
                  text : data.mensaje,
                  icon : "warning"
              })
            }else{
              setDatosRecibidos(
                ...DatosRecibidos ,
                data
              )
            }
        }
        CargarCurso();
        //eslint-disable-next-line
    }, [])


    const VerActividad =  (data) => {
        Swal.fire({
            title: '¿Quieres agregar esta icfes a esta actividad?',
            showDenybutton: true,
            showCancelbutton: true,
            confirmbuttonText: `¡Si!`,
            denybuttonText: `¡No!`,
          }).then((result) => {
            if (result.isConfirmed) {
                AgregarActividad(data)
            } 
          })
    }


    const AgregarActividad = async (data) => {
        let DatosJson = JSON.stringify({idM : data.id , d : 5 , subtema : datos.id })

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/Actividad_icfes.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.mensaje){
            Swal.fire({
                icon : 'error',
                text : datosRecibidos.mensaje
            })
        }else{  
            setValidacionClick(false) 
            const cookies = new Cookies();
            cookies.set('id', datosRecibidos , { path: '/AdminInicio' });
            cookies.set('nombre', data.Nombre , { path: '/AdminInicio' });
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
            let res = await fetch( `${URL.servidor}/api-php-react/Actividad_icfes.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()
            console.log(json)

            if(json.mensaje){
                Swal.fire({
                    icon : 'error',
                    text : json.mensaje
                })
            }else{  
                setValidacionClick(false) 
                const cookies = new Cookies();
                cookies.set('id', json , { path: '/AdminInicio' });
                cookies.set('nombre', data.Nombre , { path: '/AdminInicio' });
            }

        } catch (error) {
            console.error(error);
        }*/
    }

    return (
        <div>
            {ValidacionClick ?
                <div className="row" >
                    {DatosRecibidos.map(data =>
                    <div className="col-md-4" key={data.id} >
                        <div className="shadow p-3 m-2 pointer Areas"  onClick={()=> VerActividad(data) } >
                            <p> <span className="h6" > Nombre: </span>  {data.Nombre} </p>
                            <p> <span className="h6" > Descripción: </span>  {data.descri} </p>
                            <p> <span className="h6" > Objetivo: </span>  {data.objetivo} </p>
                        </div>
                    </div>
                    )}
                </div>
            :
                <div className="alert alert-info" >
                    Recuerda llenar los campos del nombre de esta actividad, para que se agregue correctamente la actividad tipo icfes. No olvides tampoco darle al boton de enviar para guardar todos los datos.
                </div>
            }
        </div>

    );
}
 
export default Icfes;