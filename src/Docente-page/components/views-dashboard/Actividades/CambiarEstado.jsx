/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React , { useState} from 'react';
import axios from 'axios';
import URL from '../../../../URL';
import Swal from 'sweetalert2';

const DocenteActividades = (actividad) => {
    const [select, setselect] = useState(false)
    const [form, setform] = useState({})
    let datos = actividad.actividad;
    console.log(form)
    const estado = (e) =>{
        setform({...form,
            d:8,
            id:datos.id,
            [e.target.name] : e.target.value.trim()})
        if(parseInt(e.target.value) === 1 ){
            setselect(true)
        }else{
            setselect(false)
        }
       
    }
    const GuardarDatos = (e) => {
        setform({...form,
            [e.target.name] : e.target.value.trim()})
    }
    const CambiarEstado = async () =>  {
        if(form.estado && form.fecha_max){
                let idCurso = JSON.stringify(form)
                const api = axios.create({baseURL : URL.servidor});
                const response = await api.post('/api-php-react/info_actividad_maestro.php', idCurso);
                const data = response.data
                console.log(data);
                if(data){
                    Swal.fire('Guardada!', '', 'success')
                    window.location.reload();
                }
                setform({})
        }else{
            Swal.fire('El campo estado esta vacio', '', 'info')   
        }
    }
    return (
    <div>
        <div className="card">
        <h5 className="card-header">Cambiar Estado de actividad</h5>
        <div className="card-body text-center">
            <h5 className="card-title">{datos.objetivo}</h5>
            <p className="card-text">{datos.objetivo}</p>
            <form>
                <div className="row">
                <div className='col-md-12'>
                    <label for="fecha_max" className="form-label">Estado</label>
                    <select name="estado" id="estado" className="form-control" onClick={estado} required >
                        <option value=" ">Seleccione</option>
                        <option value="2">Desactivar</option>
                        <option value="1">Activar</option>
                    </select>
                </div>
                </div>
                {select?
                <div className="row">
                <div className='col-md-12'>
                    <label htmlFor="fecha_max" className="form-label">Fecha Entrega:</label>
                    <input name='fecha_max'type="date" className="form-control" id="fecha_max" aria-describedby="emailHelp" onChange={GuardarDatos} /> 
                </div>
                </div>
                :
                null
                }
            </form>
            <br />
            <button className='btn btn-primary' onClick={CambiarEstado}>Guardar</button>
        </div>
        </div>
    </div>
    )
    }
export default DocenteActividades;