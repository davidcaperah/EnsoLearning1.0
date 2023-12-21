import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import URL from './../../../URL';

import Swal from 'sweetalert2';


function CalifiacionEvaluacion({ Datos }) {
    const [datosEnviar, setdatosEnviar] = useState([])
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [contador, setContador] = useState(0)


    const cookies = new Cookies();
    let CryptoJS = require("crypto-js")

    let IdCEncriptado = cookies.get('idcol')
    let bytesC = CryptoJS.AES.decrypt(IdCEncriptado, 'A')
    let IdC = JSON.parse(bytesC.toString(CryptoJS.enc.Utf8))

    let idDocEncrip = cookies.get('iduser')
    let byteDoc = CryptoJS.AES.decrypt(idDocEncrip, 'A')
    let IdDocente = JSON.parse(byteDoc.toString(CryptoJS.enc.Utf8))

    let idMateria = cookies.get('id1080M')
    let byteMateria = CryptoJS.AES.decrypt(idMateria, 'A')
    let IDMateria = JSON.parse(byteMateria.toString(CryptoJS.enc.Utf8))

    let Datosx = {
        d: 7,
        id: Datos.id
    }
    console.log(Datos)
    
    useEffect(() => {
        const TraerDatos = async () => {
            let DatosJson = JSON.stringify(Datosx)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_evaluacion_m.php', DatosJson);
            let datax = response.data;
            setDatosRecibidos(
                datax
            )
            console.log(response)
        }
        TraerDatos()
        //eslint-disable-next-line
    }, [])

    const escritosDocente = (e) => {
        setdatosEnviar({
            ...datosEnviar,
            [e.target.name]: e.target.value.trim(),
            d: 0,
            eva : 1
        });
    }

    const calificar = async (estudiante) => {
        setdatosEnviar({
            ...datosEnviar,
            id_estu: estudiante.id_estu,
            id_docente: IdDocente,
            id_colegio: IdC,
            id_curso: estudiante.id_curso,
            id_materia: IDMateria,
            id_actividad: estudiante.id,
            tipo: 1,
            id_nota : estudiante.nota,
            id : estudiante.id
        });
        console.log(estudiante)
        console.log(DatosRecibidos[0].nota)
        if (datosEnviar.id_estu && datosEnviar.id_docente && datosEnviar.id_colegio && datosEnviar.id_curso
            && datosEnviar.id_materia && datosEnviar.id_actividad && datosEnviar.tipo) {
            console.log(datosEnviar)
            if (datosEnviar.comentario !== "") {
                enviarDatos(datosEnviar);
            } else if (datosEnviar.comentario === "") {
                Swal.fire({
                    title: 'Ingresa un comentario por favor.',
                    icon: 'warning',
                })
            } else {
                Swal.fire({
                    title: 'Nota invalida',
                    icon: 'warning',
                    text: 'Recuerda calificar de 1 a 100'
                })
            }
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Cargando datos...',
                showConfirmbutton: false,
                timer: 1000
            })
            console.log(contador);
            setContador(1)
        }
    }

    const enviarDatos = async (daticxos) => {
        Swal.fire({
            title: '¿Desea asignar esta nota?',
            showDenybutton: true,
            confirmbuttonText: `Si`,
            denybuttonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(contador);
                const DatosJson = JSON.stringify(daticxos)
                const api = axios.create({ baseURL: URL.servidor });
                const response = await api.post('/api-php-react/Crear_Notas.php', DatosJson);
                const res = response.data.promedio_col;
                if (res && response.data.estadode) {
                    Swal.fire({
                        title: 'Se ha agregado la nota',
                        icon: 'success'
                    })
                    window.location.replace("/DocenteEvaluaciones")
                }
                console.log(response)
            }

        }
        )
    }
    console.log(DatosRecibidos)
    console.log(datosEnviar);
    return (
        <div className="container" >
            <h3 className="text-center text-warning font-weight-bold">Calificar evaluaciones</h3>
            <div>
                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipiscing elit, porta habitant consequat et feugiat scelerisque magna, in neque sociis hac dictum bibendum. Cursus ultricies arcu gravida interdum ad eu hendrerit etiam cum euismod, pulvinar penatibus ut ullamcorper vitae inceptos eros a potenti cras mollis, leo suspendisse sollicitudin nullam litora sapien fringilla duis risus. Consequat ultricies risus tempus purus semper inceptos venenatis maecenas tortor commodo imperdiet proin, per taciti habitant curae mattis etiam nullam justo curabitur eu.</p>
                <p className="text-white" >La <strong>evaluación</strong> que estas apunto de calificar con el titulo: <strong className="text-warning">{Datos.Titulo}</strong>,
                    la cual tuvo un tiempo asignado de<strong className="text-warning"> {Datos.tiempo}</strong> minutos, la fecha maxima para resolver fue hasta
                    <strong className="text-warning"> {Datos.fecha_max}</strong> y fue creada el dia <strong className="text-warning">{Datos.fecha_c}</strong>.
                </p>
            </div>
            <div className="py-3" >
                <div>
                    {DatosRecibidos.length === 0 ?
                        <div className="w-75 m-auto">
                            <div className="shadow bg-white rounded p-3 m-auto" >
                                <h6 className="text-center"> ¡Ninguno de tus estudiantes han contestado a la evaluación propuesta! </h6>
                            </div>
                        </div>
                        
                        : 
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4" >
                        {DatosRecibidos.map(Estu =>
                        <div key={Estu.id}>
                                {Estu.estado === 4 &&
                                    <div className="col-sm-12">
                                        <div className="col-md-12 mt-2 shadow rounded bg-light " key={Estu.id}>
                                            <div className="col-md-12 p-3 mt-2">
                                                <h4 className="text-center text-warning font-weight-bold font-chewy">{Estu.Nombree} {Estu.Apellidoe}</h4>
                                            </div>
                                            <hr></hr>
                                            <p><strong>Tiempo: </strong>{Estu.tiempo}</p>
                                            <p><strong>Nota: </strong>{Estu.nota}</p>
                                            <p><strong>Resultado: </strong>{Estu.resultado}</p>
                                            <div className="col-md-10 justify-content-center align-items-center" >
                                                <textarea type="text" name="comentario" onBlur={escritosDocente} className="border-1 form-control " placeholder="Comentario sobre la evaluacion" />
                                            </div>
                                            <hr></hr>
                                            <div className="col-md-12 d-flex justify-content-around align-items-center p-2" >
                                                {contador === 0 &&
                                                    button
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        className="d-flex justify-content-center align-items-center"
                                                        onClick={() => calificar(Estu)}
                                                        id="btn-calificar"
                                                    >
                                                        Cargar
                                                    </button>
                                                }
                                                {contador === 1 &&

                                                    button
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        className="d-flex justify-content-center align-items-center"
                                                        onClick={() => calificar(Estu)}
                                                        id="btn-calificar"
                                                    >
                                                        Enviar
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                                {Estu.estado === 5 &&
                                        <div className="col-sm-12">
                                            <div className=" mt-2 shadow rounded  w-100 bg-light " key={Estu.id}>
                                                <div className="p-3 mt-2">
                                                    <h4 className="text-center text-warning font-weight-bold font-chewy">{Estu.Nombree} {Estu.Apellidoe}</h4>
                                                </div>
                                                <hr></hr>
                                                <div className="p-3 w-100">
                                                    <h4 className="text-center font-chewy text-warning">¡Calificado!</h4>
                                                </div>
                                            </div>
                                        </div>
                                    
                                }

                                {Estu.estado === null &&
                                    <div>
                                        <p>No existe el estado.</p>
                                    </div>
                                }
                           </div>
                        )
                            }</div>
                    }

                </div>
            </div>
        </div>
    )
}

export default CalifiacionEvaluacion;
