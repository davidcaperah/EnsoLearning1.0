import axios from 'axios'
import React,{useState} from 'react'
import Swal from 'sweetalert2'
import URL from '../../../../../URL'

const SearchActividades = ({datos}) => {

    const [resultActividades, setresultActividades] = useState([])

    const cargarActividades = async (e) => {
        e.preventDefault()
        const campos = document.getElementById("search").value
        if(campos !== ""){
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data :{
                    d : 15,
                    nombre : campos
                }
            })
            if(consulta.data.length > 0){
                setresultActividades(consulta.data)
            }else{
                setresultActividades([])
            }
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos"
            })
        }
    }

    const asignarActividad = (data) => {
        Swal.fire({
            title: '¿Quieres agregar esta actividad a este subtema?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                const consulta = await axios({
                    method : "post",
                    url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                    data :{
                        d : 16,
                        id : data.id,
                        sub_tema : datos.id
                    }
                })
                if(consulta){
                    Swal.fire({
                        icon : "success",
                        title : "Actividad asignada correctamente",
                        text : "Puedes seguir asignando Actividades a tus subtemas."
                    })
                }else{
                    Swal.fire({
                        icon : "error",
                        title : "Error en el servidor"
                    })
                }
            }
          })
    }

    return (
        <div className="w-100" >
            <div className="d-flex justify-content-center" >
                <form onSubmit={cargarActividades} >
                    <input type="text" className="form-control m-2" placeholder="Nombre de la Actividad" id="search" />
                    <button className="btn btn-outline-dark m-2">  Buscar Actividad </button>
                </form>
            </div>
            <div>
                {resultActividades.length > 0 ? 
                    <div>
                        {resultActividades.map(data => 
                            <div className="shadow p-3 m-2 rounded Areas pointer" key={data.id}  onClick={()=> asignarActividad(data) } > 
                                <h4> {data.Nombre} </h4>
                            </div>    
                        )}
                    </div>
                :
                    <div className="alert alert-warning p-3 m-2" >
                        No se encontró ninguna coincidencia
                    </div>
                }

            </div>
        </div>
    );
}
 
export default SearchActividades;