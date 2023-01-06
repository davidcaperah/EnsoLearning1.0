/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React , { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../../URL';
import Swal from 'sweetalert2';

const DocenteActividades = (actividad) => {
    const [Formulario, setFormulario] = useState({})
    const [aulas, setAulas] = useState([]);
    let datos = actividad.actividad;
    let puntos = JSON.parse(datos.puntos);
    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();
    const Desencriptar = (NombreCookie, Llave) => {
        let IdEncriptado = cookies.get(NombreCookie)
        let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let iduser = Desencriptar("iduser", "A")
    let idcol = Desencriptar("idcol", "A")
    const Data = {
        d: 13,
        id: iduser
    }
    const Guardar_Asing = async ()=>{
        const DatosJson = JSON.stringify(Formulario)
        const api = axios.create({ baseURL: URL.servidor });
        const response = await api.post('/api-php-react/info_actividad_maestro.php', DatosJson);
        const data = response.data
        Swal.fire('creada!', '', 'success')
        window.location.reload();
    }
    const Datos = (e)=>{
        setFormulario({
            ...Formulario,
            [e.target.name]:e.target.value.trim(),
            d:0,
            idCol:idcol,
            iduser: iduser,
            idMateria:datos.materia,
            id_acti:datos.id

        })
    }

    useEffect(()=>{
        const data = {id: iduser};
        const dataJSON = JSON.stringify(data);
        const api = axios.create({ baseURL: URL.servidor });
        api.post('/api-php-react/Cargar_Curaula.php', dataJSON).then((res)=>{
            setAulas(res.data);
        })
    }, [iduser])
    return (
    <div>
        <div className="card">
        <h5 className="card-header">Asignar actividad</h5>
        <div className="card-body">
            <h5 className="card-title">{datos.objetivo}</h5>
            <p className="card-text">{datos.objetivo}</p>
            <form>
                <div className="row">
                <div className='col-md-6'>
                    <label for="Nombre" className="form-label">Nombre:</label>
                    <input name='Nombre' onChange={Datos} type="text" className="form-control" id="Nombre" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">Este nombre es para acoplar a el tema que esten viendo actualmente</div>
                </div>
                <div className='col-md-6'>
                    <label for="fecha_max" className="form-label">Fecha Entrega:</label>
                    <input name='fecha_max' onChange={Datos} type="date" className="form-control" id="fecha_max" aria-describedby="emailHelp"/> 
                </div>
                </div>
                <div className="row">
                <div className='col-md-6'>
                    <label for="Nombre" className="form-label">Periodo:</label><br/>
                    <select className="text-select" aria-label="Default select example" name='periodo' onChange={Datos} >
                        <option value=" " selected>Seleccione</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className='col-md-6'>
                    <label for="Nombre" className="form-label">Curso:</label>
                    <select className="text-select" aria-label="Default select example" name='idCurso' onChange={Datos} >
                        <option value=" " selected>Selecione</option>
                        {aulas.map(curso=>
                        <option value={curso.id_curso}>{curso.Curso_Nu}</option>
                        )

                        }
                    </select>
                </div>
                </div>
                <div className="row">
                    <div className='col-md-12'>
                        <label for="Nombre" className="form-label">Descripción:</label><br />
                        <textarea rows="10" cols="95" onChange={Datos} name="descri" ></textarea>
                    </div>
                </div>
            </form>
            <button onClick={Guardar_Asing} className='btn btn-primary'>asignar curso</button>
        </div>
        </div>
    </div>
    )
    }
export default DocenteActividades;