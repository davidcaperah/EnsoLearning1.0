import React,{useState} from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import URL from '../../../URL.js'

const CreateMaterias = ({Datos}) => {

    const [Campos, setCampos] = useState({})

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const agregarMateria = async (e) => {
        e.preventDefault()
        const materiaDatos = {       
            id : Datos.id,
            ...Campos
        }
        const consulta = await axios({
            method: 'post',
            url: `${URL.servidor}/api-php-react/Crear_materia.php`,
            data: materiaDatos
        })

        if(consulta.data.estado === true){
            Swal.fire({
              icon: 'success',
              title: 'Pensamiento agregado correctamente'
            })
            window.location.reload()
        }

    }

    return (
        <div>
            <div>
                <h2> Agrega todas las materias que necesites. </h2>
                <form className="row"  onSubmit={agregarMateria} >
                    <input onChange={onChange}  type="text" className="form-control m-2"  name="Nombre" placeholder="Materia" />
                    <div className="d-flex justify-content-center w-100" >
                        <button className="btn btn-dark " > Agregar Materia </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default CreateMaterias;