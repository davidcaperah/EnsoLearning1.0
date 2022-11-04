import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../../URL.js';
import Swal from 'sweetalert2'

const Libros = () => {

    const [CamposTemas, setCamposTemas] = useState({})
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [DatosRecibidosDos, setDatosRecibidosDos] = useState([])
    const [Cargar, setCargar] = useState(false)

    useEffect(() => {
        const sendData = async () => {
            let DatosJson = JSON.stringify("1")
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/c_genero.php', DatosJson);
            let data = response.data
            setDatosRecibidos(
                ...DatosRecibidos,
                data
            )
            let DatoJsonA = JSON.stringify("1")
            const apiA = axios.create({ baseURL: URL.servidor });
            const responseA = await apiA.post('/api-php-react/c_autor.php', DatoJsonA);
            let dataA = responseA.data

            setDatosRecibidosDos(
                ...DatosRecibidosDos,
                dataA
            )
        }
        sendData();
        //eslint-disable-next-line
    }, []);

    const TemasCampos = (e) => {
        setCamposTemas({
            ...CamposTemas,
            [e.target.name]: e.target.value
        })
    }

    const NoRecargar = async (e) => {
        e.preventDefault()
        let Archivo = document.getElementById("IMG").files[0]
        if (Archivo.type === "image/jpeg") {
            setCargar(true)
            const formData = new FormData();
            formData.append('archivo', Archivo)
            let res = await axios.post(`${URL.servidor}/api-php-react/Subir_portadas.php`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            let data = res.data
            if (data.status === "error") {
                Swal.fire({
                    title: 'Error',
                    text: data.error,
                    icon: 'error'
                })
            } else if (data.status === "success") {
                let img = data.url
                let datosEnviar = {
                    Nombre: CamposTemas.Nombre,
                    objetivo: CamposTemas.objetivo,
                    puntos: CamposTemas.Puntos,
                    autor: CamposTemas.Autor,
                    genero: CamposTemas.Genero,
                    intro: CamposTemas.intro,
                    publico: CamposTemas.publico,
                    rese: CamposTemas.reseña,
                    imagen: img,
                    pdf: CamposTemas.libro,
                    d: 0,
                    editorial: CamposTemas.Editorial
                }
                let DatosJson = JSON.stringify(datosEnviar)
                const consulta = await axios({
                    method : "post",
                    url:`${URL.servidor}/api-php-react/info_libros.php`,
                    data:DatosJson
                })
                let datosRecibidos = consulta.data

                if (datosRecibidos === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha guardado correctamente',
                    })
                    setCargar(false)
                    window.location.replace("/AdminLibros")
                }
            }
        } else {
            Swal.fire({
                icon: "error",
                text: "Solo puedes agregar imagenes en este campo."
            })
            setCargar(false)
        }
    }
    console.log(CamposTemas)
    return (
        <div className="m-2 shadow p-3" >
            <h5 className="m-2" > Aquí podrás agregar libros a la plataforma, para luego agregarlos en diferentes actividades. </h5>
            <form onSubmit={NoRecargar} encType="multipart/form-data" action="" >
                <input onChange={TemasCampos} name="Nombre" placeholder="Nombre" className="form-control m-2" />
                <input onChange={TemasCampos} name="Editorial" placeholder="Editorial" className="form-control m-2" />
                <select onChange={TemasCampos} name="publico" className="form-control m-2" >
                    <option value={null}  >Público </option>
                    <option value="1"  > Ciclo Uno  </option>
                    <option value="2"  > Ciclo Dos  </option>
                    <option value="3"  > Ciclo Tres </option>
                    <option value="4"  > Para todos </option>
                </select>

                <select name="Autor" onChange={TemasCampos} className="form-control m-2" >
                    <option value={null} > Autor </option>
                    {DatosRecibidosDos.map(Autor =>
                        <option key={Autor.id} value={Autor.id}> {Autor.autor} </option>
                    )}
                </select>

                <select name="Genero" onChange={TemasCampos} className="form-control m-2"  >
                    <option value={null} > Género </option>
                    {DatosRecibidos.map(genero =>
                        <option key={genero.id} value={genero.id}> {genero.genero} </option>
                    )}
                </select>

                <textarea onChange={TemasCampos} name="intro" placeholder="Introducción del libro" className="form-control m-2" ></textarea>
                <textarea onChange={TemasCampos} name="objetivo" placeholder="Objetivo" className="form-control m-2" ></textarea>
                <textarea onChange={TemasCampos} name="reseña" placeholder="Reseña" className="form-control m-2"></textarea>
                <h6 className="m-2 text-white" > Portada del libro </h6>
                <div className="m-2" >
                    <input onChange={TemasCampos} name="portada" type="file" id="IMG" />
                </div>

                <h6 className="m-2 text-white" > URL </h6>
                <div className="m-2" >
                    <input onChange={TemasCampos}  className="form-control m-2" name="libro" type="text"  />
                </div>

                <button className="btn btn-primary m-2" > Enviar</button>
            </form>
            {Cargar ?
                <div className="d-flex justify-content-center" >
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only h1">Loading...</span>
                    </div>
                </div>
                : null}
        </div>
    );
}

export default Libros;