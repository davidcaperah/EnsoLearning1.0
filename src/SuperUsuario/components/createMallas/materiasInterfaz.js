import React,{useEffect , useState} from 'react';
import axios from 'axios'
import URL from '../../../URL.js'
import CreateMaterias from './createMaterias.js';
import Periodos from './Periodos';

const MateriasInterfaz = ({area}) => {

    const [Materias, setMaterias] = useState([])
    const [Mat, setMat] = useState({})
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)



    useEffect(() => {
        const cargarMaterias = async () => {
            const DatosJson = JSON.stringify({id : area.id })
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_materia.php', DatosJson);
            const data = response.data
            setMaterias(
                data
            )
            document.getElementById("gradosInterfaz-arrow").classList.add("Eliminar")
        }
        cargarMaterias()
    }, [area])

    const agregarPeriodos = (mat, num) => {
        setMat(mat)
        setnumeroInterfaz(num)
        if(num !== 0){
            document.getElementById("areasInterfaz-arrow").classList.add("Eliminar")
        }else{
            document.getElementById("areasInterfaz-arrow").classList.remove("Eliminar")
        }
    }


    const eliminarMateria = async (mat) => {
        const consulta = await axios({
            method: 'post',
            url: `${URL.servidor}/api-php-react/Borrar_materia.php`,
            data: {
                id : mat.id
            }
        })
        if(consulta.data){
            const newMaterias = Materias.filter(data => data.id !== mat.id)
            setMaterias(newMaterias)
        }
    }

    return (
        <div>
            {numeroInterfaz === 0 ? 
                <div className="row" >
                    
                    {Materias.map(mat =>
                        <div className="col-md-4" key={mat.id} >
                            <div className="p-3 Areas shadow  m-2 d-flex justify-content-between" >
                                <h2 className="text-center  pointer"  onClick={()=> agregarPeriodos(mat , 2) } > {mat.nombre_m}  </h2>
                                <svg onClick={()=> eliminarMateria(mat) } xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="pointer bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </div>
                        </div> 
                    )}
                    <div className="col-md-4"  >
                        <div className="p-3 Areas shadow pointer m-2" onClick={() => agregarPeriodos({}, 1)}  >
                            <h2 className="text-center"> +  </h2>
                        </div>
                    </div> 
                </div>
            : null}
            
            {numeroInterfaz !== 0 ? 
                <div>
                    <div className="d-flex justify-content-start"  >
                        <div id="materiasInterfaz-arrow" className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> agregarPeriodos({}, 0) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    {numeroInterfaz === 1 ? <CreateMaterias  Datos={area} /> :null }
                    {numeroInterfaz === 2 ? <Periodos materia={Mat} />  :null }
                </div>
            :null}
 
        </div>
    );
}
 
export default MateriasInterfaz;