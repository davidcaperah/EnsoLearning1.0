import React, {useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../../../URL';

const EditActividad = ({ datosEnviar }) => {
    // Enviar 1 para deshabilitado y 2 para habilitado y enviador estado.
    const [datosEscritos, setdatosEscritos] = useState({
        Nombre: datosEnviar.Nombre,
        descri: datosEnviar.descri,
        fecha_MAX: datosEnviar.fecha_MAX,
        estado: datosEnviar.estado_d
    });

    const escritoenCampo = (e) => {
        setdatosEscritos({
            ...datosEscritos,
            [e.target.name]: e.target.value,
            d: 5,
            idM: datosEnviar.id
        })
    }
    console.log(datosEscritos)
    console.log(datosEnviar)


    const insertarDatos = async (e) => {
        e.preventDefault()
        console.log(datosEscritos)
        if (datosEscritos.Nombre !== "" && datosEscritos.descri !== "" && datosEscritos.fecha_MAX !== "") {
            console.log(datosEscritos.Nombre)
            Swal.fire({
                title: '¿Quieres editar esta actividad?',
                showDenyButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const api = axios.create({ baseURL: URL.servidor });
                    const respuesta = await api.post('/api-php-react/info_actividad_maestro.php', datosEscritos);
                    const resBackend = respuesta.data;
                    console.log(respuesta);
                    console.log(datosEscritos)
                    if (resBackend) {
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Error al editar.',
                        //     text: 'Por favor comunicarse con soporte'
                        // })
                        // window.location.reload();
                        Swal.fire({
                            icon: 'success',
                            text: 'Se ha editado esta actividad',
                            timer: 1000
                        })
                        window.location.reload();
                    } else {
                        // Swal.fire({
                        //     icon: 'success',
                        //     text: 'Se ha editado esta actividad',
                        //     timer: 1000
                        // })
                        // window.location.reload();
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al editar.',
                            text: 'Por favor comunicarse con soporte'
                        })
                    }
                }
            })

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Recuerda llenar todos los campos.', timer: 1000
            })
        }

    }


    return (
        <div className="m-2" >
            <h4 className="text-warning text-center"> Aquí podrás editar actividades. </h4>
            <div className="p-2" >
                <h6 className=""> Digita las caracteristicas de esta actividad. </h6>
                <form onSubmit={insertarDatos}>
                    <input onBlur={escritoenCampo} defaultValue={datosEnviar.Nombre} name="Nombre" className="form-control my-2" placeholder="Nombre" />
                    <textarea onBlur={escritoenCampo} defaultValue={datosEnviar.descri} name="descri" className="form-control my-2" placeholder="Descripción" ></textarea>
                    <h6 className="text-white"> Fecha máxima de entrega </h6>
                    <input onBlur={escritoenCampo} defaultValue={datosEnviar.fecha_MAX} name="fecha_MAX" className="form-control my-2" type="date" />
                    <h6 className="text-white"> Estado </h6>

                    {datosEnviar.estado_d === "1" && <select className="form-control " name="estado" onChange={escritoenCampo}>
                        <option unselectable="true" > Activo </option>
                        <option value="1" > Activo </option>
                        <option value="2" > Inactivo </option>
                    </select>}
                    {datosEnviar.estado_d !== "1" && <select className="form-control " name="estado" onChange={escritoenCampo}>
                        <option unselectable="true" > Inactivo </option>
                        <option value="1" > Activo </option>
                        <option value="2" > Inactivo </option>
                    </select>}


                    <div className="col text-center p-4">
                        <button className="btn btn-info" type="submit" onClick={() => insertarDatos}> ACEPTAR </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default EditActividad
