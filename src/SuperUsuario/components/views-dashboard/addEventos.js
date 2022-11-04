import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import PagelistaEventos from './listaEventos';
import URL from './../../../URL';
import Button from '@material-ui/core/Button';



function AddEventos() {

    const [datosEscritos, setdatosEscritos] = useState({});
    const [ventana, setVentana] = useState(1);
    const escritoenCampo = (e) => {
        imagen().then(respuesta => {
            setdatosEscritos({
                ...datosEscritos,
                [e.target.name]: e.target.value,
                d: 0,
                img: respuesta
            })
        }).catch(res => {
            console.log("Error" + res)
        })
    }

    const imagen = async () => {
        const IMG = document.getElementById("IMG").files
        // const url = "";
        if (IMG.length > 0) {

            const formData = new FormData();
            formData.append('archivo', IMG[0])
            const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_imagen_evento.php`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            return consulta.data.url;
        }
    }



    const insertarDatos = async () => {
        const api = axios.create({ baseURL: URL.servidor });
        const respuesta = await api.post('/api-php-react/CRUD_eventos.php', datosEscritos);
        const resBackend = respuesta.data;
        console.log(respuesta.data)
        return resBackend;
    }

    const NoRecargar = async (e) => {
        e.preventDefault()

        if (datosEscritos.Nombre == null || datosEscritos.des == null || datosEscritos.asignatura == null
            || datosEscritos.cupos == null || datosEscritos.fecha_i == null || datosEscritos.fecha_f == null
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacios',
                text: '¡Recuerda llenar todos los campos!'
            })
        } else {

            Swal.fire({
                title: '¿Deseas agregar el evento?',
                showDenyButton: true,
                confirmButtonText: `¡Si!`,
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    insertarDatos().then(r => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Felicidades',
                            text: '¡Se ha agregado el evento!',
                            confirmButtonText: `OK`
                        })
                        console.log(r);
                        window.location.replace("/AdminInicio");
                    }).catch(() => {
                        console.log("Error");
                    })
                }
            })

        }
    }
    const cambiarPage = (n) => {
        setVentana(n)
    }
    return (
        <div>
            {ventana === 1 &&
                <div >
                    <h3 className="p-3 text-center font-weight-bolder" > Agregar evento </h3>
                    <p className="m-2 p-2">Lorem ipsum dolor sit amet consectetur adipiscing elit condimentum egestas velit venenatis metus quis magna nascetur arcu, interdum nibh mollis vivamus imperdiet eros mi in ac magnis curabitur semper libero feugiat.</p>
                    <form onSubmit={NoRecargar} className="w-80 m-auto" >
                        <h6> Titulo del evento. </h6>
                        <input name="Nombre" onChange={escritoenCampo} required placeholder="Titulo" className="form-control my-2" />
                        <h6> Descripción del evento, de que trata. </h6>
                        <input name="des" onChange={escritoenCampo} required placeholder="Descripción" className="form-control my-2" />
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
                        <h6 className="m-2" > Imagen del evento.</h6>
                        <input name="img" className="col-sm-6 col-md-6 col-lg-6" onChange={escritoenCampo} required type="file" id="IMG" />
                        <h6> Cantidad de estudiante a participar. </h6>
                        <input type="number" onChange={escritoenCampo} required minLength="1" maxLength="5" name="cupos" placeholder="Numero de participantes" className="form-control my-2" />
                        <h6> Fecha en que dará inicio el evento </h6>
                        <input type="date" onChange={escritoenCampo} required name="fecha_i" className="form-control my-2" />
                        <h6> Fecha del finalización del evento </h6>
                        <input type="date" onChange={escritoenCampo} required name="fecha_f" className="form-control my-2" />
                        <div className="d-flex flex-sm-row justify-content-center p-2">
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                name="submit"
                                className="mt-4 mb-4 text-center"

                            >
                               Añadir evento
                            </Button>
                        </div>
                    </form>
                    <p className="mt-4 pointer text-center" onClick={() => cambiarPage(2)} > Ir a lista de eventos agregados </p>
                    <div className="m-2" >

                    </div>
                </div>
            }
            {ventana === 2 &&
                <div className="container" >
                    <div className="d-flex justify-content-start" >
                        <div className="pointer rounded-circle shadow  p-2" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" onClick={() => cambiarPage(1)} className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </div>
                    </div>

                    <PagelistaEventos />
                </div>
            }

        </div>
    )

}
export default AddEventos;
