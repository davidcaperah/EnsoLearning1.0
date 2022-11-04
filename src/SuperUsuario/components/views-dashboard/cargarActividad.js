import React, {useEffect ,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../../../URL.js';
import '../../css/index.css'

const CargarActividad = (datos) => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [ValidacionDatos, setValidacionDatos] = useState(true)

    useEffect(() => {
        const cargarMaterias = async () => {
            let datosEnviados = {
                id : datos.datos.id ,
                d : 0    
            }
            let DatosJson = JSON.stringify(datosEnviados)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Actividades_admin.php', DatosJson);
            let data = response.data
            console.log(data)

            if(data.mensaje){
                Swal.fire({
                    text : data.mensaje,
                    icon : "warning"
                })
                setValidacionDatos(false)
            }else if(data.length < 1 ){
                setValidacionDatos(false)
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

    return (
        <div>
            {ValidacionDatos ? 
                <div>
                    {DatosRecibidos.map(data => 
                        <div key={data.id}  className="shadow p-3 m-2"  >
                                <div>
                                    <h4> {data.Nombre} </h4>
                                    <h6> {data.objetivo} </h6>
                                    <p> {data.puntos} </p>
                                    {data.ICFES !== "NULL"  ?  
                                    <div> 
                                        <p>  <span className="h6" > Tipo: </span> Icfes {data.ICFES}  </p>  
                                    </div> 
                                    : null}
                                    {data.PDF !== "NULL"    ?  
                                    <div> 
                                        <p>  <span className="h6" > PDF  </span>  <a href={data.PDF} className="link-formateado text-white pointer"  rel="noreferrer"> Ver PDF </a>   </p>  
                                    </div> 
                                    : null}
                                    {data.imagen !== "NULL" ?  
                                    <div>
                                        <p> Imagen </p> 
                                        <div className="d-flex justify-content-center" >
                                            <img className="w-50 rounded" alt="img" src={data.imagen} />   
                                        </div>
                                    </div> 
                                    : null}
                                    {data.video !== "NULL"  ?  
                                        <div> 
                                            <p>  <span className="h6" > Video </span>  <a href={data.video} className="link-formateado text-white pointer"  rel="noreferrer" > Ver video </a>  </p>  
                                        </div> 
                                    : null}
                                </div>    
                        </div>
                    )}
                </div>
            : 
            <div className="mt-4" >
                <div className="alert alert-warning" >
                    No se han agregado actividades
                </div>
            </div>
            }
        </div>
    );
}
 
export default CargarActividad;