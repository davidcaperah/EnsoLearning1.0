import React,{useState} from 'react';
//import Cookies from 'universal-cookie';
import Icfes from './Icfes';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../../../../../URL';
import {useDispatch,useSelector} from 'react-redux';

const CrearActividades = ({idActividad}) => {
    const dispatch = useDispatch()
    let datos = useSelector(state => state.RecursosImagen)
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [Campos, setCampos] = useState({})

    //let CryptoJS = require("crypto-js")
   // const cookies = new Cookies();
    //const [CamposTemas, setCamposTemas] = useState({})


    //let IdAdminEncriptado = cookies.get('idcol')
    //let bytesadmin = CryptoJS.AES.decrypt(IdAdminEncriptado, 'A')
    //let Idcol = JSON.parse(bytesadmin.toString(CryptoJS.enc.Utf8))

    /*const DatosDoc = {
        id: Idcol
    }*/

    const cambiarInterfaz = (numero, estado) => {
        setnumeroInterfaz(numero)
    }

    const onChange = (e) =>{
        setCampos({
            ...Campos,
            [e.target.name]: e.target.value.trim()
        }); 
    }

    const GestionarRecursoImagen = async (evento)=>{
        evento.preventDefault()
      
        if (document.getElementById("IMG").value === "") { 
            alert("no se a cargado ninguna  imagen")    

        }else {
            let Archivo = document.getElementById("IMG").files[0]
            if (Archivo.type === "image/jpeg" || Archivo.type === "image/png") {
                
                const formData = new FormData();
                await formData.append('archivo', Archivo)

                let res = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_imagen.php`, formData, {
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
                    let urlFinal = data.url.substring(60)
                    datos = `${URL.servidor}Archivos_u/imagen_doc/${urlFinal}` 
                    Redireccionar(datos,Archivo.type)
                    
                }      
            }
        }
    }

    const GestionarRecursoPDF = async (e)=>{
        e.preventDefault()
        if (document.getElementById("PDF").value === "") { 
            alert("no se a cargado ninguna  imagen")    

        }else {
            let Archivo = document.getElementById("PDF").files[0]
            console.log(Archivo.type)
            if (Archivo.type === "application/pdf") {
                
                const formData = new FormData();
                await formData.append('archivo', Archivo)

                let res = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_pdf.php`, formData, {
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
                    let urlFinal = data.url.substring(57)
                    datos = `${URL.servidor}Archivos_u/PDFs_doc/${urlFinal}` 
                    Redireccionar(datos,Archivo.type)
                    
                }      
            }
        }
    }

    const GestionarRecursoVideo = (e)=>{
        e.preventDefault()
        if (document.getElementById("VIDEO").value === "") { 
            alert("no se a cargado ninguna  imagen")    

        }else {
            let Archivo = document.getElementById("VIDEO").value
            
            Redireccionar(Archivo,"Video")           
        }
    }

    const Redireccionar = (datos, tipo)=>{
        dispatch({
            type: "RecursosImagen",
            RecursosImagen: {
                datos,
                tipo ,
            },     
        })
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: 11
        })
  
    }

    return (
            <div>
                <div className="m-5" >
                    <h5> Aquí podrás crear tus actividades </h5>
                    <p> Tienes la libertad de elegir lo que tu quieras para agregar en tu actividad, el orden en el que vayas subiendo estas opciones será el orden en el que el estudiante deba realizar la actividad. </p>
                </div>
                <div>
                    <div className="row m-4">
                        <div className="col-md-3" >
                            <div className="shadow d-flex justify-content-center Areas" onClick={()=> cambiarInterfaz(1, false )} >
                                <div className="p-3 m-2 pointer" >
                                    <div>
                                        <h5  className="text-center" > Video </h5>
                                    </div>
                                    <div className="p-3 m-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
                                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
                                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                                            <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="shadow d-flex justify-content-center Areas" onClick={()=>  cambiarInterfaz(2, false)}  >
                                <div className="p-3 m-2 pointer" >
                                    <div>
                                        <h5  className="text-center" > Imagen </h5>
                                    </div>
                                    <div className="p-3 m-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="shadow d-flex justify-content-center Areas" onClick={()=> cambiarInterfaz(3, false)}  >
                                <div className="p-3 m-2 pointer" >
                                    <div>
                                        <h5 className="text-center" > PDF </h5>
                                    </div>
                                    <div className="p-3 m-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cloud-plus" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="shadow d-flex justify-content-center Areas" onClick={()=> cambiarInterfaz(4, false)}  >
                                <div className="p-3 m-2 pointer" >
                                    <div>
                                        <h5 className="text-center" > Icfes </h5>
                                    </div>
                                    <div className="p-3 m-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-ui-checks-grid" viewBox="0 0 16 16">
                                            <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-3" >
                            <div className="shadow d-flex justify-content-center Areas" onClick={()=> cambiarInterfaz(5, false)}  >
                                <div className="p-3 m-2 pointer" >
                                    <div>
                                        <h5 className="text-center" > Juegos </h5>
                                    </div>
                                    <div className="p-3 m-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                                            <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                                            <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 m-3" >
                        {numeroInterfaz === 4 ? <Icfes idActividad={idActividad} />  : null }
                        {numeroInterfaz === 3 ? 
                        <div>
                            <form onSubmit={GestionarRecursoPDF}>
                                <input onChange={onChange} name="PDF" type="file" id="PDF" />
                                <br/>
                                <button className="btn btn-dark mt-2"> Enviar </button>
                            </form>
                        </div>
                        : null }
                        {numeroInterfaz === 1 ? 
                        <div>
                            <form onSubmit={GestionarRecursoVideo}>
                                <input onChange={onChange} className="form-control" placeholder="Link del Video" name="video" id="VIDEO" />
                                <button className="btn btn-dark mt-2" > Enviar </button>
                            </form>
                        </div>
                        : null }
                        {numeroInterfaz === 2 ? 
                        <div>
                            <form onSubmit={GestionarRecursoImagen}>
                                <input onChange={onChange} name="IMG" type="file" id="IMG" />
                                <br/>
                                <button className="btn btn-dark mt-2" > Enviar </button>
                            </form>
                        </div>
                        : null }
                        {numeroInterfaz === 5 ? 
                        <div className="alert alert-warning" >
                            Proximamente
                        </div>
                        : null }
                    </div>
                </div>
            </div>
    );
}
 
export default CrearActividades;