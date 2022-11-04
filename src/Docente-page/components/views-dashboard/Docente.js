import React,{useState, useEffect} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';

const Docente = (idDocente) => {

    const [Docente, setDocente] = useState({})
    

    useEffect(()=>{
        const EnviarDocente = async () =>{
            let DatosJson = JSON.stringify(idDocente.idDocente)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_proid.php', DatosJson);

            setDocente(
                response.data
            )
        }
    
        EnviarDocente()
        //eslint-disable-next-line
      }, []);  

      
    return (
        <div>
            <div className="p-3" >
                <div className="d-flex justify-content-center" >
                {Docente.imagen?
                            <div>
                                <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}${Docente.imagen}`} alt="logo" />
                            </div>
                            :
                            <div>
                                <img className="rounded-circle border-1-mio" width="200px" height="200px" src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`} alt="logo" />
                            </div>
                        }
                </div>
                
                <h6 className="text-center mt-2 h5" > {`${Docente.Nombre} ${Docente.apellido}` }  </h6>
                <p className="text-center " >  {Docente.Cargo} </p>
                <div>
                    <h6> Información del Docente </h6>
                    <p> {Docente.Descr} </p>
                    <h6> Documento de Identidad </h6>
                    <p> {Docente.Documento} </p>
                    <h6> Titulo Profesional: </h6>
                    <p> {Docente.estudios} </p>
                </div>
            </div>
        </div>
    );
}
 
export default Docente;