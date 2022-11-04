import React from 'react';
import {useSelector , useDispatch} from 'react-redux';
import axios from 'axios';
import URL from './../../../URL';
import Swal from 'sweetalert2';



const FormActividades = ({type}) => {

    const dispatch = useDispatch()
    const subirActividad = useSelector(state => state.subirActividad)
    console.log(subirActividad);
    if(type === 1){
      const agregarPDF = async (e) => {
        e.preventDefault()
        const PDF = document.getElementById("PDF").files
        if(PDF.length > 0 ){
            const formDatos = new FormData();
            formDatos.append('archivo', PDF[0] )
            const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_pdf.php`, formDatos, {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          })
            console.log(consulta);
            if(consulta.data.url){
              const newSubirActividad = {
                ...subirActividad,
                PDF : consulta.data.url,
                nombrePDF : PDF[0].name,
                tipo: 1
              }
              dispatch({
                type : "@updateSubirActividad",
                subirActividad : newSubirActividad
              })
              console.log(newSubirActividad);
          }else{
            Swal.fire({
              title : 'Error',
              text: consulta.data,
              icon : 'warning'
            })
          }
            }           
      }

      return(
        <div className="p-4" >
          <h5> Agrega un nuevo PDF </h5>
          <form onSubmit={agregarPDF} >
            <input type="file" id="PDF"  className="form-control m-2" />
            <button type="submit" className="btn btn-outline-dark m-2" > Agregar PDF </button>
          </form>
        </div>
      )
    }


    if(type === 2){

      const agregarVideo = (e) => {
        e.preventDefault()
        const Video = document.getElementById("video").value
        if(Video !== ""){
            const newSubirActividad = {
              ...subirActividad,
              video : Video,
              tipo: 2
            }
            dispatch({
              type : "@updateSubirActividad",
              subirActividad : newSubirActividad
            })
        }

      }

      return(
        <div className="p-4" >
          <h5> Agrega un nuevo video </h5>
          <h6> Para agregar un video selecciona el link de un video de youtube y agregalo en el formulario. </h6>
          <form onSubmit={agregarVideo} >
            <input type="text" id="video" placeholder="https://youtube.com/fgfdgfd@ff/"  className="form-control m-2" />
            <button type="submit" className="btn btn-outline-dark m-2" > Agregar Video </button>
          </form>
        </div>
      )
    }

    if(type === 3){
      const agregarImagen = async (e) => {
        e.preventDefault()
        const IMG = document.getElementById("IMG").files
        if(IMG.length > 0 ){
            const formDatos = new FormData();
            formDatos.append('archivo', IMG[0] )
            const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_pdf.php`, formDatos, {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          })
            console.log(consulta);
            if(consulta.data.url){
              const newSubirActividad = {
                ...subirActividad,
                IMG : consulta.data.url,
                nombreIMG : IMG[0].name,
                tipo: 3
              }
              dispatch({
                type : "@updateSubirActividad",
                subirActividad : newSubirActividad
              })
              console.log(newSubirActividad);
          }else{
            Swal.fire({
              title : 'Error',
              text: consulta.data,
              icon : 'warning'
            })
          }
            }   
        // e.preventDefault()
        // const IMG = document.getElementById("IMG").files
        // if(IMG.length > 0 ){
        //     const formDatos = new FormData();
        //     formDatos.append('archivo', IMG[0] )
        //     const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_pdf.php`, formDatos, {
        //       headers: {
        //           'content-type': 'multipart/form-data'
        //       }
        //   })
        //     console.log(consulta);
        //     if(consulta.data.url){
        //       const newSubirActividad = {
        //         ...subirActividad,
        //         IMG : formDatos,
        //         nombreIMG : IMG[0].name
        //       }
        //     }
        //     dispatch({
        //       type : "@updateSubirActividad",
        //       subirActividad : newSubirActividad
        //     })
        // }

      }

      return(
        <div className="p-4" >
          <h5> Agrega una nueva Imagen </h5>
          <form onSubmit={agregarImagen} >
            <input type="file" id="IMG"  className="form-control m-2" />
            <button type="submit" className="btn btn-outline-dark m-2" > Agregar IMG </button>
          </form>
        </div>
      )
    }

    if(type === 4){
      return(
        <div className="p-4" >
          <h5> Proximamente </h5>
        </div>
      )
    }
}

export default FormActividades;