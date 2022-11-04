import React,{useState, useEffect} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import MostrarCodigos from './mostrarCodigos.js';


const CursosColegio = ({data}) => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [idCurso, setidCurso] = useState(0)
    const [Validacion, setValidacion] = useState(true)

    useEffect(() => {
        const cargarUsuarios = async () => {
            let datosEnviados = {
                d : 5,
                id : data.id
            }
            let DatosJson = JSON.stringify(datosEnviados)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', DatosJson);
            let datos = response.data
            setDatosRecibidos(
                ...DatosRecibidos,
                datos
            )
        }
          cargarUsuarios();
        //eslint-disable-next-line
    }, [])


    const cambiarInterfaz = (estado, data, clase) => {
        setValidacion(estado)
        setidCurso(data)
        document.getElementById("flecha-uno").classList.toggle(clase)
    }

    return (
        <div>
            { Validacion ? 
            <div className="row" >
                {DatosRecibidos.map(data=> 
                    <div className="col-md-6" key={data.id} >
                        <div className="shadow p-3 m-2  pointer Areas" onClick={()=> cambiarInterfaz(false , data , "Eliminar")} >
                            <h2> {data.Curso_Nu} </h2>
                        </div>
                    </div>
                )}
            </div>
            : 
            <div>
                <div className="pointer" onClick={() =>cambiarInterfaz(true , 0 , "Eliminar")} id="flecha-uno" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>
                <div>
                    <MostrarCodigos datos={idCurso} />
                </div>
            </div>
            }
        </div>
    );
}
 
export default CursosColegio;