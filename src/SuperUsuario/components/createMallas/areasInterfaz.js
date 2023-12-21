import React,{useEffect, useState} from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import CreateAreas from './createAreas';
import Swal from 'sweetalert2';
import MateriasInterfaz from './materiasInterfaz.js';


const AreasInterfaz = ({grado}) => {

    const [Areas, setAreas] = useState([])
    const [area, setarea] = useState([])
    const [numberInterfaz, setnumberInterfaz] = useState(0)




    useEffect(() => {
        const cargarAreas = async () => {
            const DatosJson = JSON.stringify({id : grado.id })
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_malla.php', DatosJson);
            const data = response.data
            if(data.estado === true){
            }else{
               setAreas(
                 response.data
               )
            }
        }
        cargarAreas()
    
    }, [grado])

    const EliminarInterfaz = (Area) => {
        Swal.fire({
          title: '¿Quieres eliminar esta area?',
          text: 'se eliminarán todas las mallas agregadas a esta area.',
          showDenybutton: true,
          showCancelbutton: true,
          confirmbuttonText: `Estoy seguro`,
          denybuttonText: `Quiero verificar`,
        }).then(async (result) => {      
            if(result.isConfirmed){

                const consulta = await axios({
                    method : "post",
                    url:`${URL.servidor}/api-php-react/Borrar_area.php`,
                    data:{id : Area.id}
                })
                let datosRecibidos = consulta.data

                if(datosRecibidos === true){
                    Swal.fire({
                    icon: 'success',
                    title: 'Se ha eliminado correctamente',
                    })
                    const newAreas = Areas.filter(data => data.id !== Area.id)
                    setAreas(newAreas)
                }

                /*try {
                    let Configuracion = {
                        method : 'POST',
                        headers : {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({id : Area.id})
                    }
                    let res = await fetch( `${URL.servidor}/api-php-react/Borrar_area.php`, Configuracion)
                    let json = await res.json()

                    if(json === true){
                        Swal.fire({
                        icon: 'success',
                        title: 'Se ha eliminado correctamente',
                        })
                        const newAreas = Areas.filter(data => data.id !== Area.id)
                        setAreas(newAreas)
                    }
                } catch (error) {
                    console.log(error)
                }*/
            }
        })
    }


    const CambiarInterfaz = (Area, number) => {
        if(number === 1){
            setarea(Area)
            setnumberInterfaz(number)
        }else if(number === 2){
            setnumberInterfaz(number)
            setarea(Area)
        }else{
            setnumberInterfaz(number)
            document.getElementById("gradosInterfaz-arrow").classList.remove("Eliminar")
        }
    }

    return (
        <div>
            { numberInterfaz === 0?
                <div className="row" >
                    {Areas.map(Area =>
                    <div className="col-md-4" key={Area.id} >
                        <div className="p-3 Areas shadow  m-2 d-flex justify-content-between" >
                            <h2 className="text-center  pointer" onClick={() => CambiarInterfaz(Area, 2)} > {Area.nombre_a}  </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" onClick={()=> EliminarInterfaz(Area)} className="pointer bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </div>
                    </div> 
                    )}
                    <div className="col-md-4"  >
                        <div className="p-3 Areas shadow pointer m-2" onClick={() => CambiarInterfaz({}, 1)}  >
                            <h2 className="text-center"> +  </h2>
                        </div>
                    </div> 
                </div>
            :null}

            {numberInterfaz !== 0 ? 
                <div>
                    <div className="d-flex justify-content-start"  >
                        <div id="areasInterfaz-arrow" className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> CambiarInterfaz({}, 0) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    {numberInterfaz === 1 ? <CreateAreas idCurso={grado} /> :null }
                    {numberInterfaz === 2 ? <MateriasInterfaz area={area}  />  :null }
                </div>
            :null}
        </div>
    );
}
 
export default AreasInterfaz;