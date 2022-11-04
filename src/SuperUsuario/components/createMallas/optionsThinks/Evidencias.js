import axios from 'axios';
import React,{useEffect, useState} from 'react';
import URL from '../../../../URL';

const Evidencias = ({Datos}) => {

    const [Evidencias, setEvidencias] = useState([])
    const [interfaz, setinterfaz ] = useState(true)

    useEffect(() => {
        const cargarEvidencias = async() => {
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data : {
                    id :Datos.id,
                    d : 4
                }
            })
            if(consulta.data.length > 0){
                setEvidencias(consulta.data)
            }
        }
        cargarEvidencias()
    }, [Datos])



    const addEvidencia = async (e) => {
        e.preventDefault()
        const campo = document.getElementById("evidencia").value
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
            data : {
                d : 3,
                id : Datos.id,
                Texto: campo
            }
        })
        if(consulta.data){
            const newEvidencia = [{
                id : consulta.data,
                Texto: campo
            }]
            const newEvidencias = Evidencias.concat(newEvidencia)
            setEvidencias(newEvidencias)
            setinterfaz(true)
        }
    }

    const eliminarMateria = async (mat) => {
        const consulta = await axios({
            method: 'post',
            url: `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
            data: {
                id : mat.id,
                d : 4
            }
        })
        if(consulta.data){
            const newEvidencias = Evidencias.filter(data => data.id !== mat.id)
            setEvidencias(newEvidencias)
        }
    }

    return (
        <div>
            {interfaz?
                <div className="row" >
                    {Evidencias.map(mat =>
                        <div className="col-md-4" key={mat.id} >
                            <div className="p-3 Areas shadow  m-2" >
                                <h4 className="text-center  pointer"> {mat.Texto}  </h4>
                                <div className="d-flex justify-content-center w-100" >
                                    <svg onClick={()=> eliminarMateria(mat) } xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="pointer bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                            </div>
                        </div> 
                    )}
                    <div className="col-md-4"  >
                        <div className="p-3 Areas shadow pointer m-2" onClick={() => setinterfaz(false)}  >
                            <h2 className="text-center"> +  </h2>
                        </div>
                    </div> 
                </div>
            :
                <div>
                    <form onSubmit={addEvidencia} >
                        <input type="text" className="form-control m-2" placeholder="Evidencia" id="evidencia" name="evidencia" />
                        <button className="btn btn-dark m-2"> Enviar </button>
                    </form>
                </div>
            }
        </div>
    );
}
 
export default Evidencias;