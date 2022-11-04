import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'
import URL from '../../../../URL.js'

const EditAnuncios = ({ datosAnuncio }) => {

    const editarAnuncio = async (e) => {
        e.preventDefault()
        const titulo = document.getElementById("titulo").value
        const anuncio = document.getElementById("anuncio").value
        if (titulo !== "" && anuncio !== "") {
            const consulta = await axios({
                method: "post",
                url: `${URL.servidor}/api-php-react/CRUD_anuncios.php`,
                data: {
                    d: 0,
                    id: datosAnuncio.id,
                    titulo,
                    anuncio
                }
            })
            if (consulta.data) {
                window.location.reload()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error en el servidor"
                })
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "Campos Vacíos"
            })
        }
    }

    return (
        <div>
            <form onSubmit={editarAnuncio} className="w-75 m-auto" >
                <h2 className="text-center text-warning p-2">Editar anuncio</h2>
                <p className="text-center text-white">{datosAnuncio.titulo}</p>
                <input id="titulo" type="text" className="form-control m-2" defaultValue={datosAnuncio.titulo} />
                <textarea id="anuncio" className="form-control m-2" defaultValue={datosAnuncio.anuncio} ></textarea>
                <div className="col text-center p-3">
                <button className="btn btn-info w-25"> Editar Anuncio </button>
                </div>
            </form>
        </div>
    );
}

export default EditAnuncios;