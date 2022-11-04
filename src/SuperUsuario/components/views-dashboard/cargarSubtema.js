import React, {useEffect ,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../../../URL.js';
import '../../css/index.css'
import CargarActividad from './cargarActividad.js';

const CargarSubtema = ({datos}) => {
    console.log(datos)

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [ValidacionMensaje, setValidacionMensaje] = useState(false)
    const [DatosActividades, setDatosActividades] = useState(0)
    const [ValidacionBoton, setValidacionBoton] = useState(true)

    useEffect(() => {
        const cargarMaterias = async () => {
            let DatosJson = JSON.stringify({id : datos.id})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_sub_tema.php', DatosJson);
            let data = response.data
            if(data.mensaje){
                Swal.fire({
                    text : data.mensaje,
                    icon : "warning"
                })
                setValidacionMensaje(true)
            }else{
                setDatosRecibidos(
                    ...DatosRecibidos ,
                    data
                )
            }
        }

          cargarMaterias();
        //eslint-disable-next-line
    }, [])

    const cargarActividades = (data) => {
        setDatosActividades(data)
        setValidacionBoton(false)
        document.getElementById("volver-temas").classList.add("Eliminar")
    }

    const volver = () => {
        setValidacionBoton(true)
        document.getElementById("volver-temas").classList.remove("Eliminar")

    }

    return (
        <div>
            {ValidacionBoton?
            <div  className="shadow p-3 m-2" >
                <h4> Nombre del Tema: {datos.nombre} </h4>
                {ValidacionMensaje ? <div className="alert alert-warning m-2" > No hay temas </div>  : null  }
                {DatosRecibidos.map(data => 
                    <div key={data.id} className="pointer Areas" onClick={() => cargarActividades(data) } >
                        <h5> Subtema: {data.nombre_sub} </h5>
                        <p> Descripción: {data.descrip} </p>
                        <p> Finalidad : {data.finalidad} </p>
                    </div>
                )}
            </div>
            : 
            <div>
                <div>
                    <div id="volver-temas" >
                        <div className="d-flex justify-content-start" >
                            <div className="shadow rounded-circle p-3 pointer" onClick={volver} >
                                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <CargarActividad datos={DatosActividades} />
                </div>
                
            </div>
            }
        </div>

    );
}
 
export default CargarSubtema;