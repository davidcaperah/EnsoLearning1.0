import React,{useState} from 'react';

import URL from '../../../URL.js';
import '../../css/usuario.css'
import axios from 'axios';


const AdminTeacher = () =>{

   
   
   return (

    <div>
        <div className='cont-header-usuario-coor'>
            <div >
                <h4>Usuario</h4>
                <svg width="497" height="366" viewBox="0 0 497 366" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M221.088 310.674C135.5 264.178 171.5 398.5 86.9197 354.523C28.1381 274.035 33.6542 169.957 99.2404 122.058C164.827 74.1599 265.647 100.58 324.428 181.068C383.21 261.557 342.678 376.729 221.088 310.674Z" fill="#00639A" fillOpacity="0.9"/>
                    <path d="M401.202 151.003C435.922 183.306 466.587 240.092 427.586 271.709C388.584 303.326 289.726 306.726 258.109 267.724C226.492 228.723 232.479 171.475 271.48 139.858C310.482 108.242 369.585 112.002 401.202 151.003Z" fill="#FEE280" fillOpacity="0.9"/>
                </svg>
            </div>
            <div className='d-flex justify-content-center align-items-center' >
                <div className='btn-crear-use-cordi'>+ Crear usuario</div>   
            </div>
        </div>
        <div className='card-usuario-coord'>
            <a id='card-abajo-usuario-coor1' href='/AdminBuscadorDocente'>
                <div >
                    <img src={`${URL.servidor}Archivos_u/iconos/buscarDocoord.svg`}/>
                    <h4>Buscar perfil docente</h4>
                </div> 
            </a>
           <a id='card-arriba-usuario-coor' href='/AdminRegistroDocente'>
            <div >
                    <img src={`${URL.servidor}Archivos_u/iconos/registro-coord.svg`}/>
                    <h4>Registro docente</h4>
                </div> 
           </a>
           <a id='card-abajo-usuario-coor2' href='/AdminRegistroEstudiante'>
                <div >
                    <img src={`${URL.servidor}Archivos_u/iconos/niños-regis-coord.svg`}/>
                    <h4>Registro estudiantil</h4>
                </div> 
           </a>   
        </div>
    </div>
   );
 }


/*<div> 
        {EditarDocente ? 
            <div className="container m-5 p-4" > 
                <div className="d-flex justify-content-start mt-2 pointer"  onClick={()=>{setEditarDocente(false)}} > 
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>
    
                <div className="mt-3" >   
                    <h5> ¡Edita los datos de los docentes de tu colegio con tan solo un click! </h5>
                    <form> 
                        <input
                            className="form-control m-2 w-50"
                            type="text"
                            placeholder={DatosDocente.Nombre}
                        />
                        <input
                            className="form-control m-2 w-50"
                            type="text"
                            placeholder={DatosDocente.apellido}
                        />
                        <input
                            className="form-control m-2 w-50"
                            type="text"
                            placeholder={DatosDocente.estudios}
                        />
    
                        <button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={` CeroBootstrap  link-button`}
                        > 
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" className=" bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
    
                        </button>
    
                    </form>
                </div>
            </div>
        :
            <div className="p-2" >
                <div className="p-3">
                    <h3 className="text-center text-warning"> Docentes y administrativos  </h3>
                    <p className="text-white text-center"> Aquí podrás ver, editar, agregar y eliminar docentes de tu institución, al tiempo podrás ver su perfil academico. </p>
                </div>

                <div className="m-2" >
                    <input type="text" name="nombre" id="nombre" className=" mt-2 form-control col-md-10" onChange={Buscar} placeholder="&#128269;Buscar docente por nombre" /> 
                    <div> 
                        {DatosRecibidos.map(docente =>
                            <div className="row shadow rounded p-3 m-3 bg-light" key={docente.id} >
                                <div className="my-3 list-min-width  col-md-4"> 
                                    <p className="pointer link-formateado text-dark" > {`${docente.Nombre} ${docente.apellido}`} </p>
                                </div>
                
                                <div  className="col-md-3" > 
                                    <p className="pt-3" > {docente.estudios} </p>
                                </div>
                
                                <div className="d-flex ml-5 justify-content-end col-md-4 " >
                                    <div>
                                        <div className="d-flex justify-content-center mr-2" onClick={()=>{
                                            setEditarDocente(true)
                                            setDatosDocente({
                                                Nombre : docente.Nombre,
                                                apellido : docente.apellido,
                                                estudios : docente.estudios
                                            })
                                        }} >
                                            <div className="bg-warning rounded-circle pointer p-3  shadow" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                
                
                                    <div>
                                        <div className="d-flex justify-content-center ml-2" >
                                            <div className="bg-danger rounded-circle pointer p-3  shadow">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-center ml-3" >
                                            <div className="bg-success rounded-circle pointer p-3  shadow" onClick={()=>{
                                                AgregarAulas(docente)
                                            }} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-stack" viewBox="0 0 16 16">
                                                    <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"/>
                                                    <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    { Mensaje.tipo === "1" ? <div className="alert alert-danger m-2  w-50" >  {Mensaje.mensaje} </div>  : null }
                    { Mensaje.tipo === "2" ? <div className="alert alert-warning m-2 w-50" >    {Mensaje.mensaje} </div>  : null }
                </div>
            </div>
        }
    </div>*/

 export default AdminTeacher;