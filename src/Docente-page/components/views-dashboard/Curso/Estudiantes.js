import React,{useState, useEffect} from 'react';
import axios from 'axios';
import URL from '../../../../URL.js';

const Estudiantes = ({curso}) => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])


    const getEstudiantes = async () =>{
        let idCurso = JSON.stringify(curso.id)
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/Cargar_Curaula2.php', idCurso);
        if(!response.data.mensaje){
            setDatosRecibidos(
                ...DatosRecibidos,
                response.data
            )
        }else{
            setDatosRecibidos([])
        }

  }

  useEffect(()=>{
    getEstudiantes()
    //eslint-disable-next-line
  }, []);   


    return (
        <div className="row m-2 p-3" >
            {DatosRecibidos.map(estudiante => 
                <div className="col-md-4" key={estudiante.id} >
                    <div className="shadow p-3 m-2" >
                        <div className="d-flex justify-content-center" >
                            <img src={estudiante.imagen} className="img-estudiantes-lista-curso" alt="" />
                        </div>
                        <h6 className="text-center" > {estudiante.nombre} </h6>
                    </div>
                </div>    
            )}
        </div>
    );
}
 
export default Estudiantes;