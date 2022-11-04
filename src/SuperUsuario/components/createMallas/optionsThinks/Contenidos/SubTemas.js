import React,{ useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import AddInfoWindow from './addInfoWindow.js';
import axios from 'axios';
import URL from '../../../../../URL.js';
import SearchActividades from './searchActividades.js';


const Subtemas = () => {


    const dispatch = useDispatch()
    const Tema = useSelector(state => state.Tema)
    const subTemas = useSelector(state => state.subTemas)

    const [Window, setWindow] = useState(false)
    const [Search, setSearch] = useState(false)
    const [datosSubtema, setdatosSubtema] = useState({})


    const cargarActividades = (data) => {
        setdatosSubtema(data)
        setSearch(true)
    }

    const eliminarsubTema = async(data) => {
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/Borrar_sub_tema.php`,
            data : {
                id : data.id
            }
        })

        if(consulta){
            const newsubTemas = subTemas.filter(datos => datos.id !== data.id)
            dispatch({
                type : "@updatesubTemas",
                subTemas : newsubTemas
            })
            
        }
    }


    return (
        <div>
            {JSON.stringify(Tema) !== '{}' ? 
                    <div>
                        {Window ? 
                            <div className="shadow p-3 m-2 rounded ventana-emergente-subtema" >
                                <div className="d-flex justify-content-start" >
                                    <svg onClick={()=> setWindow(false) }   xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left pointer" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg>
                                </div>
                                <AddInfoWindow type={"subTema"}  Datos={Tema} /> 
                            </div>
                        : null}

                        {Search ? 
                            <div className="shadow p-3 m-2 rounded ventana-emergente-subtema" >
                                <div className="d-flex justify-content-start" >
                                    <svg onClick={()=> setSearch(false) }   xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left pointer" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg>
                                </div>
                                <SearchActividades  datos={datosSubtema} />
                            </div>
                        : null}
        
                        <h5 className="text-center" > Subtemas </h5>
                        {subTemas.map(data => 

                            <div className="d-flex justify-content-between shadow m-2"  key={data.id}  >
                                <div  className="pointer p-3 m-2 Areas" key={data.id} onClick={()=> cargarActividades(data) } >
                                    <h5> {data.nombre_sub} </h5>
                                    <h6>{data.descrip} </h6>
                                </div>
                                <div className="pointer p-3 m-2" onClick={()=> eliminarsubTema(data) } >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                        <div className="shadow p-3 m-2 pointer rounded opacity Areas" onClick={()=> setWindow(true) }  >
                            <h4 className="text-center" > + </h4>
                        </div>
                    </div>
            : null}
        </div>
    );
}
 
export default Subtemas;