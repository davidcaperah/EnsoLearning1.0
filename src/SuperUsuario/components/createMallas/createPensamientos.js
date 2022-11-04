import React from 'react'
import URL from '../../../URL.js';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';

const CreatePensamientos = ({Datos}) => {

    const dispatch = useDispatch()
    const Pensamientos = useSelector(state => state.Pensamientos)

    const addPensamiento = async (e) => {
        e.preventDefault()
        const name = document.getElementById("name").value
        if(name !== ""){
            const newDatos = {
                Periodo : Datos.Periodo,
                Materias :Datos.Materia ,
                Nombre : name,
                d : 0
            }
            const DatosJson = JSON.stringify(newDatos)


            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data:DatosJson
            })
            let datosRecibidos = consulta.data

            if(datosRecibidos){
                dispatch({
                    type :  "@updateInterfazPensamientos",
                    numberInterfazPensamientos : 0
                })
                const newPensamiento = [{
                    Periodo : Datos.Periodo,
                    Materias : Datos.Materia,
                    Nombre : name,
                    id : datosRecibidos
                }]
                const newPensamientos = Pensamientos.concat(newPensamiento)
                dispatch({
                    type : "@updatePensamientos",
                    Pensamientos : newPensamientos
                })
            }
            
           /* try {
                let Configuracion = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body :  DatosJson
                }
                const res = await fetch( `${URL.servidor}/api-php-react/CRUD_Mallas.php`, Configuracion)
                const json = await res.json()
                if(json){
                    dispatch({
                        type :  "@updateInterfazPensamientos",
                        numberInterfazPensamientos : 0
                    })
                    const newPensamiento = [{
                        Periodo : Datos.Periodo,
                        Materias : Datos.Materia,
                        Nombre : name,
                        id : json
                    }]
                    const newPensamientos = Pensamientos.concat(newPensamiento)
                    dispatch({
                        type : "@updatePensamientos",
                        Pensamientos : newPensamientos
                    })
                }
            } catch (error) {
                console.log(error)
            }*/
        }
    }

    return (
        <div>
            <form onSubmit={addPensamiento} >
                <input type="text" className="form-control m-2" id="name" placeholder="Nombre del Pensamiento" />
                <button className="btn btn-outline-dark m-2"> Agregar Pensamiento </button>
            </form>
        </div>   
    )
}


export default CreatePensamientos;