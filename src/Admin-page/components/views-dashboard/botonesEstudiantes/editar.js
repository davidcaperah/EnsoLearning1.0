import React from 'react';
import URL from '../../../../URL.js';
import Swal from 'sweetalert2';
import axios from 'axios';

const Editar = ({datos , curso}) => {

    const NoRecargar = async (e) => {
        e.preventDefault()
        let dataEnviar = {
            curso : document.getElementById("curso").value ,
            nombre :document.getElementById("nombre").value,
            apellido : document.getElementById("apellido").value ,
            id : datos.id,
            ciclo : document.getElementById("ciclo").value, 
            d: 4
        }
        
        let DatosJson = JSON.stringify(dataEnviar)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_docente.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos === true){
            Swal.fire({
                icon : 'success',
                text : "Editado correctamente"
            })
            window.location.replace("/AdminStudent")
        }
        /*try {
            //Envía configuración de json 
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            //Envía datos de json a la api
            let res = await fetch(`${URL.servidor}/api-php-react/info_docente.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()
            if(json === true){
                Swal.fire({
                    icon : 'success',
                    text : "Editado correctamente"
                })
                window.location.replace("/AdminStudent")
            }

        } catch (error) {
            console.log(error)
        }*/
    }
    
    return (
        <div>
            <h6> Aquí podrás editar los datos de tu estudiante </h6>
            <form onSubmit={NoRecargar}  className="row m-2" >
                    <input  defaultValue={datos.Nombre}  id="nombre"  className="form-control col-md-2" />
                    <input  defaultValue={datos.Apellido}   id="apellido"  className="form-control col-md-2"  />
                    <select   id="curso"  className="form-control col-md-2" >
                        <option value={0}> Curso </option>
                        {curso.map(Autor => 
                            <option key={Autor.id} value={Autor.id}> {Autor.Curso_Nu} </option>
                        )}
                    </select>
                    <select id="ciclo"  className="form-control col-md-2" >
                        <option value={0} > Ciclo </option>
                        <option value={5} > 1 </option>
                        <option value={6} > 2 </option>
                        <option value={7} > 3 </option>
                    </select>
                    <button className="btn btn-dark col-md-2" type="submit" >
                            Editar
                    </button>
            </form>
        </div>
    );
}
 
export default Editar;