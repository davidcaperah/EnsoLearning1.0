import React,{useState, useEffect} from 'react';
import URL from '../../../../URL.js'
import Swal from 'sweetalert2'
import axios from 'axios'

const CompetenciasDeGrado = ({Datos}) => {

    const [Campos, setCampos] = useState({})
    const [interfaz, setinterfaz] = useState(true)
    const [compentencia, setcompetencia] = useState({})
    



    useEffect(() => {
        const cargarCompentencias = async () => {
            const consulta = await axios({
                method: 'post',
                url: `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data: {
                  id: Datos.id,
                  d : 7
                }
            })
            if(consulta.data.length > 0){
                setcompetencia(consulta.data[0])
                setinterfaz(false)  
            }else{
                setinterfaz(true)
            }
        }
        cargarCompentencias()
    }, [Datos])


    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const agregarCompentencia = async (e) => {
        e.preventDefault()
        const competenciaDatos = {       
            pensamiento : Datos.id,
            d : 6,
            ...Campos
        }
        const consulta = await axios({
            method: 'post',
            url: `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
            data: competenciaDatos
        })
        if(consulta.data === true){
            Swal.fire({
              icon: 'success',
              title: 'Pensamiento agregado correctamente'
            })
            setcompetencia(competenciaDatos)
            setinterfaz(false)  
        }

    }

    const deleteCompetencia = async() => {
        const consulta = await axios({
            method: 'post',
            url: `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
            data: {
                id : compentencia.id,
                d : 8
            }
        })
        if(consulta.data){
            setcompetencia({})
            setinterfaz(true)
        }
    }

    return (
        <div>
            {interfaz? 
                <div>
                    <h2> Digita las competencias de Grado de esta malla. </h2>
                    <form className="row"  onSubmit={agregarCompentencia} >
                        <div className="col-md-6" >
                            <input onChange={onChange}  type="text" className="form-control m-2"  name="Descri" placeholder="Descripción de las competencias." />
                        </div>
                        <div className="col-md-6" >
                            <input onChange={onChange}  type="text" className="form-control m-2"  name="A" placeholder="Interpretativo" />
                        </div>
                        <div className="col-md-6" >
                            <input onChange={onChange}  type="text" className="form-control m-2"  name="B" placeholder="Argumentativo" />
                        </div>
                        <div className="col-md-6" >
                            <input onChange={onChange}  type="text" className="form-control m-2"  name="C" placeholder="Propositivo" />
                        </div>
                        <div className="d-flex justify-content-center" >
                            <button className="btn btn-dark " > Agregar Competencias </button>
                        </div>
                    </form>
                </div>
            :
                <div className="shadow p-3 m-2 d-flex justify-content-between" >
                    <div>
                        <h4> Compentencia del Grado </h4>
                        <h6> Descripción: {compentencia.Descri} </h6>
                        <h6> Interpretativo: {compentencia.A} </h6>
                        <h6> Interpretativo: {compentencia.B} </h6>
                        <h6> Interpretativo: {compentencia.C} </h6>
                    </div>
                    <div className="d-flex align-items-center pointer" onClick={deleteCompetencia} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>

                </div>
            }

        </div>
    );
}
 
export default CompetenciasDeGrado;