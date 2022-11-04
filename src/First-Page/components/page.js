import React from 'react';
import '../css/index.css';
import Logo from '../../assets/img/VBBV.svg';
import librosytemas from '../../assets/img/librosytema.png';
import AulaVirtual from '../../assets/img/Aulavirtual.png';


const PaginaUno = () => {
    return (  
        <div className="container" >
            <div className="d-flex justify-content-center" >
                <img  src={Logo} className="w-75" alt="Enso Learning logo" />
            </div>

            <div className="row" >
                <div className="col-md-6" >
                    <div className="p-3 m-2 libros-temas " >
                        <h3 className="text-center text-white text-lucky h1" > Libros y Temas </h3>
                        <div className="row" >
                            <div className="col-lg-6" >
                                <img className="w-100" src={librosytemas} alt="Enso Learning Libros y temas" />
                            </div>
                            <p className="col-lg-6 mt-5 h6" >El equipo de Enso Learning quiere darles acceso ilimitado a los estudiantes a todos los libros utilizando nuestro sistema de libros interactivos, abarcando temas de todas las materias vistas en cada institución.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="p-3 m-2 aula-virtual " >
                        <h3 className="text-center text-white text-lucky h1" > Aula Virtual </h3>
                        <div className="row" >
                            <div className="col-lg-6" >
                                <img className="w-100" src={AulaVirtual} alt="Enso Learning Aula Virtual" />
                            </div>
                            <p className="col-lg-6 mt-5 h6" >Contamos con un sistema de aulas que le permite al docente y al estudiante tener mayor interactividad entre ellos, brindando herramientas intuitivas para cada uno de ellos.
    </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-5" >
                    <div className="p-3 m-2 evaluaciones" >
                        <h3 className="text-center text-white text-lucky h1" > Evaluaciones sin trampas </h3>
                        <div className="row" >
                            <div className="col-lg-6" >
                                <img className="w-100" src={librosytemas} alt="Enso Learning Libros y Temas" />
                            </div>
                            <p className="col-lg-6 mt-5 h6" >Queremos brindar resultados reales, y que mejor un sistema que mide la capacidad de los estudiantes, con esta herramienta conocerá el estado exacto de cada uno de los estudiantes, reforzar esa área y mejorar el desempeño y conocimiento de cada estudiante.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-5" >
                    <div className="p-3 m-2 agendaVirtual " >
                        <h3 className="text-center text-white text-lucky h1" > ¿Por qué utilizar Enso? </h3>
                        <div className="row" >
                            <div className="col-lg-6" >
                                <img className="w-100" src={AulaVirtual} alt="Enso Learning Aula Virtual" />
                            </div>
                            <p className="col-lg-6 mt-5 h6" >Se espera de Enso learning, más que ser un aplicativo web, sea una red social educativa, Ofrecer herramientas pedagógicas a los docentes para promover en uso de herramientas electrónicas, y la competencia sana entre instituciones.
</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" >
                <div className="col-md-4" >
                    <div className="p-3 m-2" >
                        <img src="https://images.pexels.com/photos/2766408/pexels-photo-2766408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="w-100 rounded-circle" alt="" />
                    </div>
                </div>
                <div className="col-md-8" >
                    <div className="p-3 m-2" >
                        <div className="d-flex justify-content-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="text-warning bi bi-star-fill m-2" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="text-warning bi bi-star-fill m-2" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="text-warning bi bi-star-fill m-2" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="text-warning bi bi-star-fill m-2"  viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="text-warning bi bi-star-fill m-2" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </div>
                        <div className="border rounded bg-light p-3 m-3" >
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum quisquam molestias quo omnis praesentium totam, sunt culpa sit unde! Minima, consequuntur dolores. Ullam commodi soluta dolorem nobis labore mollitia laboriosam. </p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}
 
export default PaginaUno;