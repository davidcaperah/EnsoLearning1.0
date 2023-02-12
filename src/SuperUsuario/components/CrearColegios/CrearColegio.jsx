/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import URL from "../../../URL";
import Swal from 'sweetalert2';
const CrearColegio = () => {
    const [estado, setestado] = useState(0)
    const [colegios, setcolegios] = useState([])
    const [form, setform] = useState([])
    console.log("🚀 ~ file: CrearColegio.jsx:18 ~ CrearColegio ~ form", form)
    let User = useSelector((state) => state.user);

    const GuardarDatos = (e) => {
        setform({...form,
            [e.target.name] : e.target.value.trim()})
    }
    const Enviar = async (e) =>{
        e.preventDefault();
        var Datos = {
            d:1,
            Nombre: form.Nombre,
            id:0,
            Telefono:form.Telefono,
            Info:form.Descripcion,
            Reseller:User.id,
            cupos:form.cupos
        }
        const consulta = await axios({
            method: "post",
            url: `${URL.servidor}/api-php-react/admin/Crud_admin.php`,
            data: Datos
        })
        if(consulta.data){
            Swal.fire({
                icon: 'success',
                title: 'Exitoso!',
                text: 'Colegio creado con exito',
                confirmButtonText: 'Entendido'
              }).then((result) => {
                if (result.isConfirmed) {
                    setestado(1)
                }
              })
        }
    }
    useEffect(()  =>  {
        const TrearDatos = async () => {
          let idCurso = JSON.stringify({ d: 2, reseller: User.id});
          const api = axios.create({ baseURL: URL.servidor });
          const response = await api.post(
            "/api-php-react/admin/Crud_admin.php",
            idCurso
          );
          const data = response.data;
          console.log("🚀 ~ file: CrearColegio.jsx:25 ~ useEffect ~ data", data)
          setcolegios(data);
          }
          TrearDatos();
      }, [estado]);

    return (
        <div className="col-md-12">
            <div className="row center">
                <div className="col-md-6">
                    <p className="card-text text-center shadow p-3 m-2 Areas pointer" onClick={() => setestado(0)}>Crear Colegio</p>
                </div>
                <div className="col-md-6">
                    <p className="card-text text-center shadow p-3 m-2 Areas pointer" onClick={() => setestado(1)}>Consultar Colegio</p>
                </div>
            </div>
            {estado === 0 ?
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={Enviar}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Nombre Colegio</label>
                            <input type="text" name='Nombre' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={GuardarDatos} />
                                <div id="emailHelp" className="form-text">Agregue un nombre de la institución</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Telefono</label>
                                    <input type="number" onChange={GuardarDatos} name='Telefono' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Cupos</label>
                                    <input type="number" name='cupos' onChange={GuardarDatos} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            <label for="exampleInputEmail1" className="form-label">Descripción</label>
                            <textarea name="Descripcion" onChange={GuardarDatos} id="" cols="110" rows="10"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            :
            null
            }
            {estado === 1 ?
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cupos</th>
                        <th scope="col">fecha vencimiento</th>
                        <th scope="col">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {colegios.length > 0
                        ? colegios.map((Colegio) =>
                        <tr>
                        <th scope="row">{Colegio.id}</th>
                        <td>{Colegio.nombreC}</td>
                        <td>{Colegio.fecha_creación}</td>
                        <td>{Colegio.cupos}</td>
                        <td>{Colegio.fecha_vencimiento}</td>
                        <td className='text-center'>
                            {Colegio.pago === 1 ? 
                                <span  style={{color: 'green'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                    </svg>
                                </span>
                                :
                                <span style={{color: 'red'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </span>
                            }
                        </td>
                        </tr>
                        )
                        : null
                        }
                        </tbody>
                    </table>
                </div>
            </div> 
            :
            null
            }
        </div>
    )
}
export default CrearColegio;