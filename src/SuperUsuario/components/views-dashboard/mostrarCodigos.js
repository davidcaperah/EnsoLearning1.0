import React,{useState, useEffect} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

const MostrarCodigos = ({datos}) => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [Validacion, setValidacion] = useState(true)

    useEffect(() => {
        const cargarData = async () => {
            let datosEnviados = {
                d : 7,
                curso : datos.id    
            }
            let DatosJson = JSON.stringify(datosEnviados)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', DatosJson);
            let data = response.data
            if(data.length < 1 ){
                setDatosRecibidos([])
                setValidacion(true)
            }else if(data.length > 0){
                setDatosRecibidos(
                    ...DatosRecibidos,
                    data
                )
                setValidacion(false)
            }
        }
          cargarData();
        //eslint-disable-next-line
    }, [])


    const cargarUsuarios =  async () => {

        let ciclo = 0

        if(datos.ciclos.trim() === "warning"){
            ciclo = 5
        }else if(datos.ciclos.trim() === "danger") {
            ciclo = 6
        }else if(datos.ciclos.trim() === "dark"){
            ciclo = 7
        }else{
            ciclo = null
        }

        let datosEnviados = {
            d : 6,
            codigo : uuidv4(),
            curso : datos.id,
            col : datos.IdCol,
            ciclo :  ciclo
        }
        console.log(datosEnviados);
        let DatosJson = JSON.stringify(datosEnviados)
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/info_admin.php', DatosJson);
        if(response.data === true){
            Swal.fire({
                icon : 'success',
                text : 'Agregado correctamente'
            })
            window.location.replace("/CodigosLibros")
        }
    }


    return (
        <div>
            {Validacion ? 
                <div>
                    <h6 className="m-4" > Aquí puedes agregar un codigo a cada libro de cada niño, recuerda no repetir códigos en los libros. </h6>
                    <div className="row" >
                        <div className="col-md-4" >
                            <div className="shadow m-2 p-3 pointer" onClick={cargarUsuarios} >
                                <h6 className="h2 text-center" > + </h6>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div>
                    <div className="row" >
                        {DatosRecibidos.map(data => 
                            <div className="col-md-4" key={data.id} >
                                <div className="alert alert-success p-3 m-2" >
                                    {data.Cod}
                                </div>
                            </div>
                        )}
                            <div className="col-md-4" >
                                <div className="shadow m-2 p-3 pointer" onClick={cargarUsuarios} >
                                    <h6 className="h2 text-center" > + </h6>
                                </div>
                            </div>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default MostrarCodigos;