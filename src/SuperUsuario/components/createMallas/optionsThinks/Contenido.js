import React,{useState, useEffect} from 'react';
import ContentPrincipalTheme from './Contenidos/contentPrincipalTheme';
import axios from 'axios'
import URL from '../../../../URL.js';


const Contenido = ({Datos}) => {

    const [InterfazThemes, setInterfazThemes] = useState(0)
    const [PrincipalTemas, setPrincipalTemas] = useState([])
    const [TemaPrincipal, setTemaPrincipal] = useState({})


    useEffect(() => {
        const cargarTemasPrincipales = async () => {
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_tema_p.php`,
                data :{
                    id : Datos.id,
                    d : 1
                }
            })
            setPrincipalTemas(consulta.data)
        }
        cargarTemasPrincipales()
    }, [Datos])


    const createPrincipalTemas = async (e) => {
        e.preventDefault()
        const campo = document.getElementById("campo").value
        const datos = {
            id : Datos.id,
            Nombre : campo,
            d : 0
        }
        if(campo !== ""){
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_tema_p.php`,
                data :datos
            })
            const newPrincipalTheme = [{
                Nombre : campo,
                id : consulta.data
            }]
            const newPrincipalThemes = PrincipalTemas.concat(newPrincipalTheme)
            setPrincipalTemas(newPrincipalThemes)
            setInterfazThemes(0)
        }
    }



    const changeInterfaz = (num, data) => {
        setInterfazThemes(num)
        setTemaPrincipal(data)
        document.getElementById("diferenciadorInterfaz-arrow").classList.remove("Eliminar")
    }


    const eliminarTemaPrincipal = async(data) => {
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/CRUD_tema_p.php`,
            data : {
                id : data.id,
                d : 2
            }
        })
        if(consulta){
            const newPrincipalTemas = PrincipalTemas.filter(datos => datos.id !== data.id)
            setPrincipalTemas(newPrincipalTemas)
        }
    }

    return (
        <div>
            {InterfazThemes === 0? 
                <div>
                    <h3>Aquí encontrarás todos tus temas principales de esta Malla. </h3> 
                    {PrincipalTemas.map(data =>
                        <div className="d-flex justify-content-between shadow m-2" key={data.id}  >
                            <div className="pointer  p-3 m-2 Areas"  onClick={()=> changeInterfaz(2 , data) }   >
                                <h6> {data.Nombre} </h6>
                            </div>
                            <div className="pointer p-3 m-2" onClick={()=> eliminarTemaPrincipal(data) } >
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className="shadow p-3 m-2 pointer rounded opacity Areas" onClick={()=> changeInterfaz(1, {}) } >
                        <h2 className="text-center" > + </h2>
                    </div>
                </div>
            : null}
            {InterfazThemes === 2 ? 
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 pointer rounded-circle" id="contenido-arrow" onClick={()=> changeInterfaz(0, {}) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <ContentPrincipalTheme Datos={TemaPrincipal} />
                </div>
            :null}

            {InterfazThemes === 1 ? 
                <div className="p-3 m-2" >
                    <form onSubmit={createPrincipalTemas}>
                        <input type="text" placeholder="Nombre del Tema Principal" id="campo" className="form-control mt-2" />
                        <button className="btn btn-outline-dark mt-2"> Agregar Tema Principal </button>
                    </form>
                </div>
            :null}

        </div>
    );
}
 
export default Contenido;