import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

const Colegio = () => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [datosEscritos, setdatosEscritos] = useState({});

    const escritoenCampo = (e) => {
        setdatosEscritos({
            ...datosEscritos,
            [e.target.name]: e.target.value
        })
    }


    const agregarDias = async (idx) => {
        let datosEnviados = {
            d: 12,
            id: idx
        }
        let DatosJson = JSON.stringify(datosEnviados)
        const api = axios.create({ baseURL: URL.servidor });
        const response = await api.post('/api-php-react/info_admin.php', DatosJson);
        if (response.data) {
            Swal.fire({
                text: "Se ha agregado 30 dias más.",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace('/AdminInicio')
                }
            })
        } else {
            Swal.fire({
                text: "Error no se ha podido agregar.",
                icon: "warning"
            })
        }
    }

    const agregarNinos = async (idx) => {
        if (datosEscritos.cupos) {
            let datosEnviados = {
                d: 11,
                id: idx,
                cupos: datosEscritos.cupos
            }
            let DatosJson = JSON.stringify(datosEnviados)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_admin.php', DatosJson);
            if (response.data) {
                Swal.fire({
                    title: "Cupos para niños",
                    icon: "success",
                    text: "Se ha agregado " + datosEscritos.cupos + " niños."
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace('/AdminColegios')
                    }
                })
            }
        } else {
            Swal.fire({
                title: "Campos vacios",
                icon: "warning"
            })
        }


    }


    useEffect(() => {
        const cargarUsuarios = async () => {
            let datosEnviados = {
                d: 1
            }
            let DatosJson = JSON.stringify(datosEnviados)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_admin.php', DatosJson);
            let data = response.data
            console.log(data);
            setDatosRecibidos(
                ...DatosRecibidos,
                data
            )
        }
        cargarUsuarios();
        //eslint-disable-next-line
    }, [])
    console.log(DatosRecibidos);
    return (
        <div>
            <h4 className="ml-2" > Aquí podrás ver todos los Colegios de la plataforma </h4>
            {DatosRecibidos.map(data =>
                <div className="shadow p-3 m-2" key={data.id_cod} >
                    <p> <span className="h6" > Nombre: </span> {data.nombreC} </p>
                    <p> <span className="h6" > Contacto: </span> {data.contacto} </p>
                    <p> <span className="h6" > Fecha de Creación: </span> {data.fecha_creación} </p>
                    <p> <span className="h6" > Fecha de vencimiento: </span> {data.fecha_vencimiento} </p>
                    <p> <span className="h6" > Codigo: </span> {data.id_cod} </p>
                    <p> <span className="h6" > Información: </span> {data.info} </p>
                    <p> <span className="h6" > Estudiantes registrados: </span> {data.cupos} </p>
                    <p> <span className="h6" > Estado de pagos: </span> {data.pago === "1" ? <span>Activo</span> : <span>Inactivo</span>} </p>
                    <p> <span className="h6" > Cupos máximo: </span> {data.Cupos_max} </p>
                    {data.pago === "1" ? <div><div className="alert text-center alert-success" >  Valido   </div>
                       </div>
                        :
                        <div><div className="alert text-center alert-danger" >  No valido </div> <div className="d-flex flex-sm-row justify-content-center p-2">
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            name="submit"
                            className="text-center"
                            onClick={() => agregarDias(data.id)}
                        >
                            +30 días
                        </Button>
                    </div></div>}
                    <div className="d-flex flex-sm-row justify-content-center p-2">
                        <input type="number" placeholder="Cupos maximo" className="form-control m-2 w-75" name="cupos" onChange={escritoenCampo} />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            name="submit"
                            className="text-center"
                            onClick={() => agregarNinos(data.id)}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Colegio;