import React, {useEffect ,useState} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import CargarMaterias from './CargarMaterias.js';


const CargarAreas = ({datos}) => {
    const [Areas, setAreas] = useState([])
    const [ValidacionMalla, setValidacionMalla] = useState(true)
    const [DatosMalla, setDatosMalla] = useState(0)

    useEffect(() => {
        const cargarAreas = async () => {
            let DatosJson = JSON.stringify({id : datos.id })
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_malla.php', DatosJson);
            let data = response.data
            console.log(data);
            setAreas(
                ...Areas ,
                data
            )
        }
          cargarAreas();
        //eslint-disable-next-line
    }, [])

    const cargarMallas = (area) => {
        setValidacionMalla(false)
        setDatosMalla(area)
        document.getElementById("mallas-arrow").classList.add("Eliminar")
    }

    const volver = () => {
        setValidacionMalla(true)
        document.getElementById("mallas-arrow").classList.remove("Eliminar")
    }

    return (
        <div>
            {ValidacionMalla ? 
                <div className="row mt-4" >
                    {Areas.map(area =>
                    <div className="col-md-4" key={area.id} >
                        <div className="shadow p-3 ml-2 pointer d-flex justify-content-center Areas" onClick={()=>  cargarMallas(area) } >
                            <h4> {area.nombre_a} </h4>
                        </div>
                    </div>
                    )}
                </div>
            :
                <div>
                    <div id="areas-arrow" >
                         <div className="d-flex justify-content-start" >
                            <div className="shadow rounded-circle p-3 pointer" onClick={volver} >
                                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <CargarMaterias datos={DatosMalla} areas={datos} />
                </div>
            }
        </div>

    );
}
 
export default CargarAreas;