import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import URL from './../../../URL';

import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

function Calificar({ Datos }) {

    const [datosEnviar, setdatosEnviar] = useState([])
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [estador, setestador] = useState(false);
    const [res, setres] = useState([]);
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
        d: 5,
        idC: IdC,
        id: Datos.id
    }


    useEffect(() => {
        const TraerDatos = async () => {
            let DatosJson = JSON.stringify(Datosx)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_docente.php', DatosJson);
            let datax = response.data;
            setDatosRecibidos(
                datax
            )
        }
        TraerDatos()
        //eslint-disable-next-line
    }, [])

    const escritosDocente = async (estudiante) => {
        let hola = document.getElementById("nota").value
        let comentario = document.getElementById("comentario").value
        setdatosEnviar({
            ...datosEnviar,
            comentario:comentario,
            id_nota: hola,
            d: 0,
            eva : 0,
            id_estu: estudiante.id_estu,
            id_docente: IdDocente,
            id_colegio: IdC,
            id_curso: estudiante.id_curso,
            id_materia: IDMateria,
            id_actividad: estudiante.id,
            tipo: Datos.id_acti
        });
        console.log(hola)
    }

    const calificar = async () => {
        if (datosEnviar.id_estu && datosEnviar.id_docente && datosEnviar.id_colegio && datosEnviar.id_curso
            && datosEnviar.id_materia && datosEnviar.id_actividad && datosEnviar.tipo) {
            if (datosEnviar.comentario !== "" && datosEnviar.id_nota > 0 && datosEnviar.id_nota <= 100) {
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
        }
    }
    const respuestas = async (res) =>{
        let json = JSON.parse(res);
        console.log(json)
        setres(json)
        if(estador === true){

            setestador(false)
        }else{
            setestador(true)
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
                const DatosJson = JSON.stringify(daticxos)
                const api = axios.create({ baseURL: URL.servidor });
                const response = await api.post('/api-php-react/Crear_Notas.php', DatosJson);
                const res = response.data.promedio_col;
                if (res && response.data.estadode) {
                    console.log(response)
                    Swal.fire({
                        title: 'Se ha agregado la nota',
                        icon: 'success',
                        showDenybutton: true,
                        confirmbuttonText: `Si`,
                        denybuttonText: `No`,
                    }).then(async(result)=>{
                        if(result.isConfirmed){
                            window.location.replace('/DocenteActividades');
                        }
                    })
                }
            }

        }
        )
    }
    const abrirPDF = (urlink) => {
        window.open(urlink, '_blank');

    }
    console.log(res["pregunta 1"])
    return (
        <div className="container" >
            <h3 className="text-center text-warning font-weight-bold">Calificar actividad</h3>
            <div>
                <p className="text-white">Califica a tus estudiantes</p>
                <p className="text-white" >La actividad que estas apunto de calificar será <strong className="text-warning">{Datos.Nombre}</strong>,
                    la cual fue para el periodo<strong className="text-warning"> {Datos.periodo}</strong>, la fecha maxima de entrega fue hasta
                    <strong className="text-warning"> {Datos.fecha_MAX}</strong> y fue creada el dia <strong className="text-warning">{Datos.fecha_c}</strong>.
                </p>
            </div>
            <div className="py-3" >
                <div>
                    {DatosRecibidos.length === 0 ?
                        <div className="w-75 m-auto">
                            <div className="shadow bg-white rounded p-3 m-auto" >
                                <h6 className="text-center"> Ninguno de tus estudiantes han respondido la actividad! </h6>
                            </div>
                        </div>
                        : DatosRecibidos.map(Estu =>
                            <div className="row" >
                                {Estu.estado === 4 &&
                                    <div className="col-md-8 mt-2">
                                        <div className="col-md-7 mt-2 shadow rounded bg-light " key={Estu.id}>
                                            <div className="col-md-12 p-3 mt-2">
                                                <h4 className="text-center text-warning font-weight-bold font-chewy">{Estu.Nombree} {Estu.Apellidoe}</h4>
                                            </div>
                                            <div className="p-2">
                                                <i className="font-weight-light text-center m-auto ">"{Estu.comentario}"</i>
                                            </div>
                                            {estador === true ? 
                                            <div className="p-2">
                                                {   
                                                    Object.keys(res).map((onekey,i)=>
                                                    {
                                                        return (
                                                            <div className="p-2" key={i}>
                                                            <i className="text-center m-auto" key={i}>{onekey}</i>

                                                            <h6 className='text-break'>Respuesta: {res[onekey]}</h6>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <button variant="contained" color="secondary" className="m-3" type="button" onClick={()=>respuestas(Estu.respuestas)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                                </svg>
                                                    ocultar respuestas
                                                </button>
                                            </div>
                                             
                                            :
                                            <button variant="contained" color="secondary" className="m-3" type="button" onClick={()=>respuestas(Estu.respuestas)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                    </svg> 
                                                Ver respuestas
                                            </button>
                                            }
                                            <div className="col-md-12 pt-2 d-md-flex justify-content-center align-items-center  col-sm-2" >
                                                <p className="col-md-2 text-center mt-3 pointer Areas" onClick={() => abrirPDF(Estu.evidencia)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi text-warning bi-paperclip" viewBox="0 0 16 16">
                                                        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                    </svg>
                                                </p>
                                                <div className="col-md-10 justify-content-center align-items-center" >
                                                    <textarea type="text" id="comentario" name="comentario" className="border-1 form-control " placeholder="Comentario sobre la actividad" onChange={()=>escritosDocente(Estu)} />
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="col-md-12 d-flex justify-content-around align-items-center p-2" >
                                                <input type="number" id = "nota" name="id_nota" min="1" max="100" className="border border-bottom w-50" placeholder="Nota de la actividad" onChange={()=>escritosDocente(Estu)} />
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
                                            </div>
                                        </div>
                                    </div>}
                                {Estu.estado === 5 &&
                                        <div className="col-md-8 mt-2">
                                            <div className="col-md-7 mt-2 shadow rounded bg-light " key={Estu.id}>
                                                <div className="col-md-12 p-3 mt-2">
                                                    <h4 className="text-center text-warning font-weight-bold font-chewy">{Estu.Nombree} {Estu.Apellidoe}</h4>
                                                </div>
                                                <div className="p-2">
                                                    <i className="font-weight-light text-center m-auto ">"{Estu.comentario}"</i>
                                                </div>
                                                <div className="col-md-12 pt-2 d-md-flex justify-content-center align-items-center  col-sm-2" >
                                                    <p className="col-md-2 text-center mt-3 pointer Areas" onClick={() => abrirPDF(Estu.evidencia)} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi text-warning bi-paperclip" viewBox="0 0 16 16">
                                                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                        </svg>
                                                    </p>
                                                </div>
                                                <div className="p-3">
                                                    <h4 className="text-center font-chewy text-warning">¡Calificado!</h4>
                                                    {/* <p className="text-center m-auto">El estudiante obtuvo la nota de: <strong>5.0</strong></p> */}
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
                    }

                </div>
            </div>
        </div>


    )
}

export default Calificar
