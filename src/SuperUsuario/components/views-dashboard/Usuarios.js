import React,{useState, useEffect} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';

const Usuarios = () => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])

    useEffect(() => {
        const cargarUsuarios = async () => {
            let datosEnviados = {
                d : 0    
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
          cargarUsuarios();
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <h4 className="ml-2" > Aquí podrás ver todos los coordinadores de la plataforma </h4>
            {DatosRecibidos.map(data=>
                <div className="shadow p-3 m-2" key={data.documento} >
                    <p> <span className="h6" > Nombres: </span> {data.nombre} </p>
                    <p> <span className="h6" > Apellidos: </span> {data.apellido} </p>
                    <p> <span className="h6" > Correo: </span> {data.correo} </p>
                    <p> <span className="h6" > Codigo: </span> {data.codigo} </p>
                    <p> <span className="h6" > Documento: </span> {data.documento} </p>
                </div>
            )}
        </div>
    );
}
 
export default Usuarios;