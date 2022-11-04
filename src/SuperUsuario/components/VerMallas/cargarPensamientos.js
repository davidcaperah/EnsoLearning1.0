import React,{useState, useEffect} from 'react';
import URL from '../../../URL.js';
import CargarMalla from './CargarMalla';
import { useSelector , useDispatch} from 'react-redux';
import VerActividades from './verActividades.js';
import axios from 'axios';

const CargarPensamientos = ({materia, periodo, areas}) => {

    const numberInterfazVerMallas = useSelector(state => state.numberInterfazVerMallas)
    const dispatch = useDispatch()

    const Datos = {
        Curso : areas.Nombre,
        materia : materia.nombre_m,
        periodo : periodo
    }

    const [Pensamientos, setPensamientos] = useState([])
    const [Validacion, setValidacion] = useState(true)
    const [datosPensamiento, setdatosPensamiento] = useState({})

    

    useEffect(() => {
        const cargarPensamientos = async () => {
            const DatosJson = JSON.stringify({Periodo : periodo , Materia : materia.id, d : 1})

            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data:DatosJson
            })
    
            let datosRecibidos = consulta.data

            setPensamientos(datosRecibidos)
            /*try {
                let Configuracion = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body :  DatosJson
                }
                const res = await fetch(`${URL.servidor}/api-php-react/CRUD_Mallas.php`, Configuracion)
                const json = await res.json()
                setPensamientos(json)
    
            } catch (error) {
                console.log(error)
            }*/
        }
        cargarPensamientos()
    }, [materia, periodo, areas])
    

    const cambiarInterfaz = (data , estado ) => {
        if(estado === true){
            document.getElementById("periodos-arrow").classList.remove("Eliminar")
            setValidacion(estado)
            setdatosPensamiento(data)
            dispatch({
                type : "@updatenumberInterfazVerMallas",
                numberInterfazVerMallas : 0
            })
        }else{
            document.getElementById("periodos-arrow").classList.add("Eliminar")
            setdatosPensamiento(data)
            setValidacion(estado)
            dispatch({
                type : "@updatenumberInterfazVerMallas",
                numberInterfazVerMallas : 1
            })
        }
    }   

    return (
        <div>
            {Validacion ?
                <div className="row" >
                    {Pensamientos.map(data => 
                        <div className="col-md-4" key={data.id} >
                            <div className="shadow p-3 m-2 rounded Areas pointer" onClick={()=> cambiarInterfaz(data, false) } >
                                <h3> {data.Nombre} </h3>
                            </div>
                        </div>
                    )}
                </div>
            :
                <div className="malla shadow px-5 pt-2 pb-4 m-2 rounded"  >
                    <div className="d-flex justify-content-end p-5" >
                        <div className="shadow rounded p-3 pointer" onClick={()=> cambiarInterfaz({} , true) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div>
                    {numberInterfazVerMallas  === 1? <CargarMalla pensamiento={datosPensamiento} Datos={Datos} /> :null }
                    {numberInterfazVerMallas  === 2? <VerActividades /> :null }
                    
                </div>
            }
        </div>
    );
}
 
export default CargarPensamientos;