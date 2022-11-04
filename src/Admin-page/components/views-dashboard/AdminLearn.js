import React,{useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../URL.js';
import Curso from './Curso.js';
import '../../css/curso.css'


const AdminLearn = () => {

    const[interfaz , setInterfaz] = useState(0)
    

    
    return(
        <div>
            {interfaz == 0?
            <div>
                <div className='header-curso-coord'>
                    <div>
                        <svg width="473" height="398" viewBox="0 0 473 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M217.392 275.071C146.236 208.559 147.325 347.617 76.5106 283.795C39.8429 191.118 71.3377 91.7659 146.856 61.8871C222.375 32.0084 313.32 82.9171 349.988 175.595C386.655 268.273 318.48 369.563 217.392 275.071Z" fill="#00639A" fillOpacity="0.9"/>
                            <path d="M282.878 261.356C253.463 233.189 227.833 184.048 261.714 157.381C295.595 130.713 380.526 129.015 407.194 162.897C433.861 196.778 428.013 245.862 394.132 272.529C360.251 299.197 309.545 295.237 282.878 261.356Z" fill="#FFBB5E" fillOpacity="0.9"/>
                        </svg>
                        <h4>Cursos</h4>
                    </div>
                    <div className='descri-curso-coord-header'>
                        <p>
                            En este espacio podras crear las aulas, y/o cursos para
                            facilitar la asignacion de sus integrantes en la institucion. 
                        </p>
                    </div>
                </div>
                <div className='btn-curso-coord'>
                    <div id="aulas-curso-coord" onClick={()=>{setInterfaz(1)}}>
                        <h5>Mis aulas</h5>
                        <p>Crea y consulta las aulas para tus docentes</p>
                    </div>
                    <div id="misCursos-curso-coord" onClick={()=>{setInterfaz(2)}}>
                        <h5>Mis cursos</h5>
                        <p>Crea cursos y elije la asignacion para tus estudiantes</p>
                    </div>
                </div>
          </div>
          :null}
          {
            interfaz == 1 ?
            <div>
                <div className='cont-header-usuario-coor'>
                    <div >
                        <h4>Mis aulas </h4>
                        <svg width="473" height="412" viewBox="0 0 473 412" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M217.392 289.071C146.236 222.559 147.325 361.617 76.5106 297.795C39.8429 205.118 71.3377 105.766 146.856 75.8871C222.375 46.0084 313.32 96.9171 349.988 189.595C386.655 282.273 318.48 383.563 217.392 289.071Z" fill="#00639A" fillOpacity="0.9"/>
                            <path d="M282.878 275.356C253.463 247.189 227.833 198.048 261.714 171.381C295.595 144.713 380.526 143.015 407.194 176.897C433.861 210.778 428.013 259.862 394.132 286.53C360.251 313.197 309.545 309.237 282.878 275.356Z" fill="#FFBB5E" fillOpacity="0.9"/>
                        </svg>
                    </div>
                    <div className='d-flex justify-content-center align-items-center' >
                        <div className='btn-crear-use-cordi'>+ Crear aula</div>   
                    </div>
                </div>
                <div className='cont-filtos-crear-aula-coord'>
                    <div>
                        <h4>Grado</h4>
                        <select>
                            <option>Seleccionar el grado</option>
                        </select>
                    </div>
                    <div>
                        <h4>Materia</h4>
                        <select>
                            <option>Seleccionar la materia</option>
                        </select>
                    </div>
                    <div>
                        <h4>Curso</h4>
                        <select>
                            <option>Seleccionar el curso</option>
                        </select>
                    </div>
                </div>
                <div className='cont-cursos-coord'>
                    <div>
                        <img src={`${URL.servidor}Archivos_u/iconos/aulaMatematicas.svg`}/>
                        <h5>Matematicas</h5>
                        <h6>Curso 103</h6>
                    </div>
                    <div>
                        <img src={`${URL.servidor}Archivos_u/iconos/aula-ciencias.svg`}/>
                        <h5>Matematicas</h5>
                        <h6>Curso 103</h6>
                    </div>
                    <div>
                        <img src={`${URL.servidor}Archivos_u/iconos/aulaGeometria.svg`}/>
                        <h5>Matematicas</h5>
                        <h6>Curso 103</h6>
                    </div>
                </div>
            </div>
            :null
          }
          {
              interfaz == 2?
              <div>
                   <div className='cont-header-usuario-coor'>
                        <div >
                            <h4>Mis cursos </h4>
                            <svg width="473" height="412" viewBox="0 0 473 412" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M217.392 289.071C146.236 222.559 147.325 361.617 76.5106 297.795C39.8429 205.118 71.3377 105.766 146.856 75.8871C222.375 46.0084 313.32 96.9171 349.988 189.595C386.655 282.273 318.48 383.563 217.392 289.071Z" fill="#00639A" fillOpacity="0.9"/>
                                <path d="M282.878 275.356C253.463 247.189 227.833 198.048 261.714 171.381C295.595 144.713 380.526 143.015 407.194 176.897C433.861 210.778 428.013 259.862 394.132 286.53C360.251 313.197 309.545 309.237 282.878 275.356Z" fill="#FFBB5E" fillOpacity="0.9"/>
                            </svg>
                        </div>
                        <div className='d-flex justify-content-center align-items-center' >
                            <div className='btn-crear-use-cordi'>+ Crear curso</div>   
                        </div>
                    </div>
                    <div className='cont-filtos-crear-aula-coord1'>
                        <div>
                            <h4>Grado</h4>
                            <select>
                                <option>Seleccionar el grado</option>
                            </select>
                        </div>
                        <div>
                            <h4>Curso</h4>
                            <select>
                                <option>Seleccionar el curso</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className='tabla-docentes-coordi'>
                            <div className='titulo-tabla-docentes-coordi2'>
                                <div>Nombre del Estudiante</div>
                                <div>Correo electronico</div>
                                <div>Grado</div>
                                <div>Curso</div>
                                <div>Director de grupo</div>
                            </div>
                
                            <div className='datos-docente-coordi2'>
                                <div>docente.Nombre </div>
                                <div>docente.Documento</div>
                                <div>2</div>
                                <div>201</div>
                                <div>director grupo</div>
                                <div className='btn-tabla-modifi-curso-coord'>Modificar curso</div>
                            </div> 

                            <div className='datos-docente-coordi2'>
                                <div>docente.Nombre </div>
                                <div>docente.Documento</div>
                                <div>2</div>
                                <div>201</div>
                                <div>director grupo</div>
                                <div className='btn-tabla-modifi-curso-coord'>Modificar curso</div>
                            </div>


                            <div className='datos-docente-coordi2'>
                                <div>docente.Nombre </div>
                                <div>docente.Documento</div>
                                <div>2</div>
                                <div>201</div>
                                <div>director grupo</div>
                                <div className='btn-tabla-modifi-curso-coord'>Modificar curso</div>
                            </div>


                            <div className='datos-docente-coordi2'>
                                <div>docente.Nombre </div>
                                <div>docente.Documento</div>
                                <div>2</div>
                                <div>201</div>
                                <div>director grupo</div>
                                <div className='btn-tabla-modifi-curso-coord'>Modificar curso</div>
                            </div>    
                        </div>
                    </div>
              </div>
              :null
          }
      </div>
    )
}



export default AdminLearn;