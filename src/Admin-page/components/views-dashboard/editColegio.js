import React from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import Swal from 'sweetalert2'

function editColegio({ DatosRecibidos }) {

    console.log(DatosRecibidos)

    const NoRecargar = async (e) => {
        e.preventDefault()
        console.log(document.getElementById("IMG").files[0]);
        if (document.getElementById("IMG").value === "") {
            let datos = {
                info: document.getElementById("info").value,
                Nombre: document.getElementById("nombre").value,
                contacto: document.getElementById("contacto").value,
                imagen: DatosRecibidos.imagen,
                d: 0,
                id: DatosRecibidos.id
            }

            let DatosJson = JSON.stringify(datos)
            console.log(DatosJson);

            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/info_cordinador.php`,
                data:DatosJson
            })

            let datosRecibidos = consulta.data
            
            if (datosRecibidos === true) {
                window.location.replace("/AdminSchool")
            }

            /*try {
                let Configuracion = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: DatosJson
                }
                let res = await fetch(`${URL.servidor}/api-php-react/info_cordinador.php`, Configuracion)
                let json = await res.json()
                // let json = await res.text()
                console.log(res)
                console.log(json);
                if (json === true) {
                    window.location.replace("/AdminSchool")
                }
            } catch (error) {
                console.log(error)
            }*/
        } else {
            let Archivo = document.getElementById("IMG").files[0]
            if (Archivo.type === "image/jpeg" || Archivo.type === "image/png" || Archivo.type === "image/jpg" ) {
                console.log("entro")
                const formData = new FormData();
                formData.append('archivo', Archivo)
                let res = await axios.post(`${URL.servidor}/api-php-react/Subir_perfil_col.php`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                console.log(res)
                let data = res.data
                console.log(data)
                if (data.status === "error") {
                    Swal.fire({
                        title: 'Error',
                        text: data.error,
                        icon: 'error'
                    })
                } else if (data.status === "success") {
                    let datos = {
                        info: document.getElementById("info").value,
                        Nombre: document.getElementById("nombre").value,
                        contacto: document.getElementById("contacto").value,
                        imagen: data.url,
                        d: 0,
                        id: DatosRecibidos.id
                    }

                    let DatosJson = JSON.stringify(datos)
                    console.log(DatosJson);
                    const consulta = await axios({
                        method : "post",
                        url:`${URL.servidor}/api-php-react/info_cordinador.php`,
                        data:DatosJson
                    })
                    
                    let datosRecibidos = consulta.data
                    if (datosRecibidos === true) {
                        window.location.replace("/AdminSchool")
                    }
        

                    /*try {
                        let Configuracion = {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: DatosJson
                        }
                        let res = await fetch(`${URL.servidor}/api-php-react/info_cordinador.php`, Configuracion)
                        let json = await res.json()
                        // let json = await res.text()
                        console.log(json);
                        if (json === true) {
                            window.location.replace("/AdminSchool")
                        }
                    } catch (error) {
                        console.log(error)
                    }*/
                }
            }
        }
    }

    return (
        <div>
            <form className="w-80 m-auto" onSubmit={NoRecargar}>
                <h2 className="text-center text-warning p-2">Editar mi Información</h2>
                <h6 className="m-2 text-white" > Nombre Colegio </h6>
                <input className="form-control m-2" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" defaultValue={DatosRecibidos.nombreC} id="nombre" placeholder="Información" name="nombre" />
                <h6 className="m-2 text-white"  > Informacion </h6>
                <input className="form-control m-2" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" defaultValue={DatosRecibidos.info} placeholder={DatosRecibidos.info} id="info" name="info" />
                <h6 className="m-2 text-white"  > contacto </h6>
                <input type="number" className="form-control m-2" required defaultValue={DatosRecibidos.contacto} placeholder={DatosRecibidos.contacto} id="contacto" name="contacto" />
                <h6 className="m-2 text-white"  > Imagen del colegio </h6>
                <input className="m-2 text-warning" name="IMG" type="file" id="IMG" />
                <br />
                <div className="col text-center p-3">
                    <button className="btn btn-info"> ACEPTAR </button>
                </div>
            </form>
        </div>
    )
}

export default editColegio
