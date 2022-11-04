import React from 'react';
import Cookies from 'universal-cookie';
import URL from '../../URL.js';


const Menu = () => {

    const cookies =  new Cookies();
    const Salir = () =>{
        cookies.remove('iduser')
        cookies.remove('colid')
        cookies.remove('estado')
        window.location.replace(URL.compartido)
    }

    return (
        <div className='menu' >
        <div className="list-group" >
            <li className="btn-menu">
                <img src={`${URL.servidor}Archivos_u/iconos/menu1.svg`}/>                        
            </li>
            <li className="alert-primary-mio   btn-menu ">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="40px" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd",}}>
                    <path style={{opacity:"0.903"}} fill="#afafaf" d="M 15.5,1.5 C 15.5,4.16667 15.5,6.83333 15.5,9.5C 11.5,12.5 7.5,15.5 3.5,18.5C 1.93819,18.2671 0.60486,17.6005 -0.5,16.5C -0.5,15.5 -0.5,14.5 -0.5,13.5C 4.83333,9.5 10.1667,5.5 15.5,1.5 Z"/>
                    <path style={{opacity:"0.96"}} fill="#777777" d="M 15.5,1.5 C 17.3925,2.70166 19.2258,4.03499 21,5.5C 23.0408,4.57692 25.2075,4.24358 27.5,4.5C 26.659,8.57488 27.9924,11.5749 31.5,13.5C 31.5,14.5 31.5,15.5 31.5,16.5C 30.3951,17.6005 29.0618,18.2671 27.5,18.5C 23.8578,15.0134 19.8578,12.0134 15.5,9.5C 15.5,6.83333 15.5,4.16667 15.5,1.5 Z"/>
                    <path style={{opacity:"0.959"}} fill="#d6d6d6" d="M 15.5,9.5 C 15.5,13.5 15.5,17.5 15.5,21.5C 13.631,23.6353 12.9644,26.3019 13.5,29.5C 10.1667,29.5 6.83333,29.5 3.5,29.5C 3.5,25.8333 3.5,22.1667 3.5,18.5C 7.5,15.5 11.5,12.5 15.5,9.5 Z"/>
                    <path style={{opacity:"0.885"}} fill="#afafaf" d="M 15.5,9.5 C 19.8578,12.0134 23.8578,15.0134 27.5,18.5C 27.5,22.1667 27.5,25.8333 27.5,29.5C 24.1667,29.5 20.8333,29.5 17.5,29.5C 18.0356,26.3019 17.369,23.6353 15.5,21.5C 15.5,17.5 15.5,13.5 15.5,9.5 Z"/>
                </svg>
                <a className="h6 alert-link-mio" href="/AdminSchool"  > Home  </a>                      
            </li>

            <li className="alert-primary-mio   btn-menu ">  
                <img src={`${URL.servidor}Archivos_u/iconos/icon-docentes.svg`}/>
                 <a className="h6 alert-link-mio" href="/AdminTeacher" > Usuario  </a>

            </li>

            <li className="alert-primary-mio btn-menu ">  
                <img src={`${URL.servidor}Archivos_u/iconos/icon-misaulas.svg`}/>
                <a className="h6 alert-link-mio" href="/AdminStudent" >   Comunicaciones  </a>  
            </li>

            <li className="alert-primary-mio btn-menu ">  
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-stack mr-2" viewBox="0 0 16 16">
                    <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"/>
                    <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"/>
                </svg>

                <a className="h6 alert-link-mio" href="/AdminLearn" >   Cursos  </a>  
            </li>


            <li className="alert-primary-mio  btn-menu  ">  
                <img src={`${URL.servidor}Archivos_u/iconos/icon-estadisticas.svg`}/>
                <a className="h6 alert-link-mio"  href="/AdminStatistics" >  Estadísticas </a>  
            </li>

            <li className="alert-primary-mio  btn-menu  ">  
                <img src={`${URL.servidor}Archivos_u/iconos/icon-evaluaciones.svg`}/>
                <a className="h6 alert-link-mio"  href="/AdminAnuncios" >  Evaluaciones </a>  
            </li>
        </div>
    </div>          
    );
}


/*
<div className="col-lg-2" >
                <div>
                    <div className="list-group" >
                        <li className="list-group-item text-white h5 bg-dark"> Hogar   </li>
                        <li className="list-group-item alert-primary-mio d-flex  aling-items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-house-door mr-2" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                            </svg>
                            <a className="h6 alert-link-mio" href="/AdminSchool"  >  Mi colegio     </a>                      
                        </li>

                        <li className="list-group-item alert-primary-mio  d-flex  aling-items-center ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-book mr-2" viewBox="0 0 16 16">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                            </svg>

                            <a className="h6 alert-link-mio" href="/AdminTeacher" > Mis Docentes  </a>
                        </li>

                        <li className="list-group-item alert-primary-mio d-flex  aling-items-center ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-pencil mr-2" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>

                        <a className="h6 alert-link-mio" href="/AdminStudent" > Mis Estudiantes     </a>  </li>

                        <li className="list-group-item alert-primary-mio d-flex  aling-items-center ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-stack mr-2" viewBox="0 0 16 16">
                                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"/>
                                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"/>
                            </svg>

                        <a className="h6 alert-link-mio" href="/AdminLearn" >   Mis cursos   </a>  </li>

                        <li className="list-group-item alert-primary-mio d-flex  aling-items-center  ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-clipboard-data mr-2" viewBox="0 0 16 16">
                                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                            </svg>

                        <a className="h6 alert-link-mio"  href="/AdminStatistics" >  Estadísticas </a>  </li>

                        <li className="list-group-item alert-primary-mio d-flex  aling-items-center  ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-newspaper mr-2" viewBox="0 0 16 16">
                                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
                                <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
                            </svg>

                        <a className="h6 alert-link-mio"  href="/AdminAnuncios" >  Anuncios </a>  </li>


                        <li className="list-group-item alert-primary-mio d-flex  aling-items-center  ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mr-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        <p className="h6 alert-link-mio" onClick={Salir} >  Salir </p></li>
                    </div>
                </div>
            </div>

*/
 
export default Menu;