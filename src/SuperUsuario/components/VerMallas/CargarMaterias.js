import React, {useEffect ,useState} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import ElegirPeriodos from './elegirPeriodos';


const CargarMaterias = ({datos , areas}) => {

    const [Materias, setMaterias] = useState([])
    const [DatosMateria, setDatosMateria] = useState(0)
    const [ValidacionBoton, setValidacionBoton] = useState(true)

    useEffect(() => {
        const cargarMaterias = async () => {
            let DatosJson = JSON.stringify({id : datos.id })
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_materia.php', DatosJson);
            let data = response.data
            setMaterias(
                ...Materias,
                data
            )
        }

          cargarMaterias();
        //eslint-disable-next-line
    }, [])


    const MostrarMallas = (materia) => {
        setValidacionBoton(false)
        setDatosMateria(materia)
        document.getElementById("areas-arrow").classList.add("Eliminar")
    }

    const volver = () => {
        setValidacionBoton(true)
        document.getElementById("areas-arrow").classList.remove("Eliminar")
    }

    return (
        <div>
            {ValidacionBoton ?
                <div className="row" >
                    {Materias.map(materia => 
                        <div className="col-md-4" key={materia.id} >
                            <div className="shadow p-3 m-2 Areas pointer" onClick={()=> MostrarMallas(materia)}>
                                <h5> {materia.nombre_m} </h5>
                            </div>
                        </div>
                    )}
                </div>
             :
                <div>
                    <div id="materias-arrow" >
                        <div className="d-flex justify-content-start" >
                            <div className="shadow rounded-circle p-3 pointer" onClick={volver} >
                                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <ElegirPeriodos  materia={DatosMateria} areas={areas} />
                </div>
             }
        </div>
    );
}
 
export default CargarMaterias;