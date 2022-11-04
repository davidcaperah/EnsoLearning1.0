import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import URL from '../../../../URL';

const AddAnuncios = ({colegio}) => {

    const agregarAnuncio = async (e) => {
        e.preventDefault()
        const titulo = document.getElementById("titulo").value
        const anuncio = document.getElementById("anuncio").value
        if(titulo !== "" && anuncio !== ""){
            const IMG = document.getElementById("IMG").files
            if(IMG.length > 0){

                const formData = new FormData();
                formData.append('archivo', IMG[0] )
                const consulta = await axios.post(`${URL.servidor}/api-php-react/Cargar_anuncio.php`, formData,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                const url = consulta.data.url

                const subirAnuncio = await axios({
                    method : "post",
                    url : `${URL.servidor}/api-php-react/CRUD_anuncios.php`,
                    data : {
                        d:2,
                        id_col: colegio ,
                        titulo: titulo,
                        anuncio:anuncio,
                        imagen:url
                    }
                })
                if(subirAnuncio){
                    window.location.reload()
                }else{
                    Swal.fire({
                        icon : "error",
                        title : "Error en el servidor"
                    })
                }

            }else{
                Swal.fire({
                    icon : "warning",
                    title :"Agrega un imagen"
                })
            }
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos"
            })
        }

    }

    return (
        <div>
            <form onSubmit={agregarAnuncio} >
                <h2 className="text-center text-warning p-2">Agregar anuncios</h2>
                <input id="titulo" type="text" className="form-control m-2 p-2" placeholder="Titulo" />
                <textarea id="anuncio" className="form-control m-2 p-2" placeholder="Ej: Mañana se celebrará la entrega de boletines" ></textarea>
                <h6 className="m-2 p-2" > <strong className="text-warning"> Agrega la imagen de portada de tu anuncio! </strong> </h6>
                <input type="file" className="text-white m-3 p-2" id="IMG"/>
                <button className="btn btn btn-info m-2 m-auto"> Agregar Anuncio </button>
            </form>
        </div>
    );
}
 
export default AddAnuncios;