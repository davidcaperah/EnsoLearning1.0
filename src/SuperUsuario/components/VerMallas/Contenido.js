import React,{useState, useEffect} from 'react';
import axios from 'axios'
import URL from '../../../URL.js';
import {useDispatch} from 'react-redux';


const Contenido = ({pensamiento}) => {

    const [Contenidos, setContenidos] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const cargarTemasPrincipales = async () => {
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_tema_p.php`,
                data :{
                    id : pensamiento.id,
                    d : 1
                }
            })
    
            const cargarTemas = async (data) => {
                const Temas = await axios({
                    method : "post",
                    url : `${URL.servidor}/api-php-react/Cargar_tema.php`,
                    data :{
                        id : data.id,
                        d : 2
                    }
                })
    
                const cargarsubTemas = async (tema) => {
                    const consulta = await axios({
                        method : "post",
                        url : `${URL.servidor}/api-php-react/Cargar_sub_tema.php`,
                        data : {
                            id : tema.id
                        }
                    })
                    return consulta.data
                }
    
                const newTemas = await Promise.all(
                    Temas.data.map(async (tema) => {
                        const newTema = {
                            descr: tema.descr,
                            nombre : tema.nombre,
                            id: tema.id,
                            id_pensamiento: tema.id_pensamiento,
                            id_temap: tema.id_temap,
                            subtemas : await cargarsubTemas(tema)
                        }
                        return newTema
                    })
                )
                const datos = {
                    principal : data,
                    Temas : newTemas
                }
    
                return datos
            }
    
            const Temas = await Promise.all(
                consulta.data.map(async (data) => {
                    return await cargarTemas(data)
                })
            )
    
            setContenidos(Temas)
        }
        cargarTemasPrincipales()
    }, [pensamiento])

    const cargarActividades = async (sub) => {
        const consulta = await axios({
            method : "post",
            url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
            data : {
                d:17,
                "sub_tema":sub.id
            }
        })
        dispatch({
            type : "@updateverMallasActividades",
            verMallasActividades : {
                sub ,
                actividades : consulta.data
            }
        })
        dispatch({
            type : "@updatenumberInterfazVerMallas",
            numberInterfazVerMallas : 2
        })

    }

    console.log(Contenidos);
    return(
        <div> 
            {(Contenidos.length !== 0)
                ?Contenidos.map(data => 
                    <div key={data.principal.id} >
                        <h5 className="text-blue-mallas text-center" > {data.principal.Nombre} </h5>
                        {data.Temas.map(datos => 
                            <div key={datos.id} >
                                <h6> <strong> {datos.nombre} </strong> </h6>
                                {datos.subtemas.map(sub => 
                                    <div key={sub.id} className="pointer" onClick={()=> cargarActividades(sub) } >
                                        <h6> {sub.nombre_sub} </h6>
                                    </div>
                                )}
                            </div>    
                        )}
                    </div>
                )

                :
                <div className="text-blue-mallas text-center"> En construccion</div>
            }
            
        </div>
    )
}

export default Contenido