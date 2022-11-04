import React, { useState } from 'react';
// import Swal from 'sweetalert2';
import axios from 'axios';

function EditEventos({datos}) {

    const [datosEscritos, setdatosEscritos] = useState({});

    const escritoenCampo = (e) => {
        setdatosEscritos({
            ...datosEscritos,
            [e.target.name]: e.target.value
        })
    }

    const insertarDatos = async () => {
        const api = axios.create({ baseURL: URL.servidor });
        const respuesta = await api.post('/api-php-react/Crud_eventos.php', datosEscritos);
        const resBackend = respuesta.data;
        return resBackend;
    }

    console.log(insertarDatos);
    console.log(datos);
    return (
        <div>
            <h3 className="p-3 text-center font-weight-bolder" > Editar evento </h3>
                    <form className="w-80 m-auto" >
                        <h6> Titulo del evento. </h6>
                        <input name="Titulo" onChange={escritoenCampo} required defaultValue={datos.titulo} className="form-control my-2" />
                        <h6> Descripción del evento, de que trata. </h6>
                        <input name="Descripcion" onChange={escritoenCampo} required defaultValue={datos.descripcion} className="form-control my-2" />
                        <h6> Seleccione el area: </h6>
                        <select name="asignatura" onChange={escritoenCampo} className="form-control my-2" >
                            <option value={null} > Asignatura </option>
                            <option value={1} > Ciencias </option>
                            <option value={2} > Matematicas </option>
                            <option value={3} > Español </option>
                            <option value={4} > Tecnologia </option>
                            <option value={5} > Economia </option>
                            <option value={6} > Filosofia </option>
                            <option value={7} > Quimica </option>
                        </select>
                        <h6> Cantidad de estudiante a participar. </h6>
                        <input type="number" onChange={escritoenCampo} required minLength="1" maxLength="5" name="Participantes" className="form-control my-2" />
                        <h6> Fecha en que dará inicio el evento </h6>
                        <input type="date" onChange={escritoenCampo} required name="f_inicio" className="form-control my-2" />
                        <h6> Fecha del finalización del evento </h6>
                        <input type="date" onChange={escritoenCampo} required name="f_finalizacion"  className="form-control my-2" />

                        <h6 className="m-2" > Imagen del evento.</h6>
                        <div className="m-2" >
                            <input name="imagen" required onChange={escritoenCampo}  type="file" id="IMG" />
                        </div>
                        <div className="d-flex flex-sm-row justify-content-center p-2">
                            <button className="btn btn-primary w-25 m-auto mt-2   p-2" > Aceptar </button>
                        </div>
                    </form>
        </div>
    )
}

export default EditEventos;
