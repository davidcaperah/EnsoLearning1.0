import React, {useEffect ,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../../../URL.js';
import CargarAreas from './CargarAreas.js';
import '../../css/index.css'

const AdminMallas = () => {
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [ValidacionAreas, setValidacionAreas] = useState(true)
    const [DatosCurso, setDatosCurso] = useState(0)

    useEffect(() => {
        //Cargar cursos de la base de datos
        const CargarCurso = async ()=>{
          let DatosJson = JSON.stringify({ d :1})
          const api = axios.create({baseURL : URL.servidor});
          const response = await api.post('/api-php-react/Info_cursos_admin.php', DatosJson);
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


    const cargarAreas = (data) => {
        setValidacionAreas(false)
        setDatosCurso(data)

    }
    console.log(DatosRecibidos);

    return (
        <div>
            {ValidacionAreas ? 
                <div className="row" >
                    {DatosRecibidos.map(data =>
                    <div className="col-md-4" key={data.id} >
                        <div className="shadow p-3 m-2 Areas pointer d-flex aling-items-center justify-content-center" key={data.id} onClick={ () => cargarAreas(data)} >
                            <h2> {data.Nombre} </h2> 
                        </div>
                    </div>
                    )}
                </div>
            :
            <div>
                <div>
                    <div className="d-flex justify-content-start"   >
                        <div id="mallas-arrow" className="shadow rounded-circle p-3 pointer" onClick={()=> setValidacionAreas(true)} >
                            <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <CargarAreas datos={DatosCurso} />
            </div>
            }


        </div>
    );
}
 
export default AdminMallas;