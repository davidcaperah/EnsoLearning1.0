import React, {useEffect ,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import URL from '../../../URL.js';


const Añadir = () => {

    const [Añadir, setAñadir] = useState(false)
    const [Codigo, setCodigo] = useState("")
    const [DatosRecibidos, setDatosRecibidos] = useState([])

    useEffect(() => {
        const cargarMaterias = async () => {
            let datosEnviados = {
                d : 3    
            }
            let DatosJson = JSON.stringify(datosEnviados)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', DatosJson);
            let data = response.data
            setDatosRecibidos(
                ...DatosRecibidos ,
                data
            )
        }

          cargarMaterias();
        //eslint-disable-next-line
    }, [])



    const EnviarCodigo =  async () => {
        let CodigoGenerado = uuidv4()
        let DatosJson = JSON.stringify({d : 2 ,cod : CodigoGenerado})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/info_admin.php', DatosJson);
        let data = response.data
        if(data === true){
            setCodigo(CodigoGenerado)
            setAñadir(true)
        }
    }

    console.log(DatosRecibidos);
    return (
        <div>
            <div className="row" >
                {DatosRecibidos.map(data =>
                    <div className="col-md-6"  key={data.id}> 
                        <div className="shadow p-3 m-2 Areas pointer" >
                            <div>
                                <p className="h6" > Código: {data.codigo_cor} </p>
                                <p className="h6" > Fecha de creación: {data.fecha} </p>
                            </div>
                        </div>
                    </div>    
                )}
            </div>
            <div className="m-2" >
                <div className="shadow p-3 m-2 Areas pointer" onClick={EnviarCodigo} >
                    <h2 className="text-center" > + </h2>
                </div>
                {Añadir ? 
                    <div className="alert alert-success ml-2" >
                        <p> ¡Copia el siguiente código! </p>
                        {Codigo}
                    </div>
                :null}
            </div>
        </div>
    );
}
 
export default Añadir;