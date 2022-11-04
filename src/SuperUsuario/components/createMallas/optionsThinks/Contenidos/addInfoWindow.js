import React,{useState} from 'react';
import axios from 'axios';
import URL from '../../../../../URL.js';
import Swal from 'sweetalert2';
import {useSelector, useDispatch} from 'react-redux'


const AddInfoWindow = ({type , Datos}) => {

    const [Campos, setCampos] = useState({})
    const dispatch = useDispatch()
    const subTemas = useSelector(state => state.subTemas)
    const Tema = useSelector(state => state.Tema)
    const Temas = useSelector(state => state.Temas)

    const onChange = (e) => {
        setCampos({
            ...Campos, 
            [e.target.name] : e.target.value
        })
    }


    const enviarData = async (e) => {
        e.preventDefault()
        if(type === "Tema"){
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/Crear_tema.php`,
                data : {
                    Nombre : Campos.name,
                    id : Datos.id_pensamiento,
                    Descr : Campos.descri,
                    id_p : Datos.id
                }
            })

            Swal.fire({
                icon : "success",
                title : "Agregado correctamente"
            })

            const newTema = [{
                nombre : Campos.name,
                id : consulta.data,
                descr : Campos.descri
            }]

            const newTemas = Temas.concat(newTema)
            
            dispatch({
                type : "@updateTemas",
                Temas : newTemas
            })
            

        }else if (type === "subTema")  {

            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/Crear_sub_tema.php`,
                data : {
                    Nombre : Campos.name,
                    tema : Tema.id,
                    descr : Campos.descri
                }
            })

            Swal.fire({
                icon : "success",
                title : "Agregado correctamente"
            })

            const newSubTema = [{
                nombre_sub : Campos.name,
                descrip : Campos.descri,
                id : consulta.data
            }]

            const newSubTemas = subTemas.concat(newSubTema)
            console.log(newSubTemas)

            dispatch({
                type : "@updatesubTemas",
                subTemas : newSubTemas
            })
        }
    }


    return (
        <div>
            <form onSubmit={enviarData}>
                <input type="text" onChange={onChange} placeholder="Nombre" className="form-control mt-2" name="name"/>
                <input type="text" onChange={onChange} placeholder="Descripción" className="form-control mt-2" name="descri"/>
                <div className="w-100 d-flex justify-content-center mt-2" >
                    <button className="btn btn-outline-dark" > Agregar </button>
                </div>
            </form>
        </div>
    );
}
 
export default AddInfoWindow;

