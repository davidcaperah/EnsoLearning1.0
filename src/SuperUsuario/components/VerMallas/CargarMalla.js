import React from 'react';
import Competencias from './Competencias';
import Contenido from './Contenido';
import Evidencias from './Evidencias';
import Navbar from './Navbar';
import Estandares from './Estandares';
import Derechos from './Derechos';


const CargarMalla = ({pensamiento, Datos}) => {

    return (
        <div>
            <Navbar />
            <h2 className="text-center text-blue-mallas" > <strong> GRADO {Datos.Curso.toUpperCase() } </strong> </h2>
            <h3 className="text-center text-blue-mallas">  <strong> UNIDAD {Datos.periodo} </strong> </h3>
            <div className="row mb-5" >
                <div className="col-md-6" >
                    <div className="p-3 m-2" >
                        <Evidencias  Datos={Datos}  pensamiento={pensamiento} />
                    </div>
                </div>
                <div className="col-md-6" >
                    <div className="p-3 m-2" >
                        <Competencias  Datos={Datos}  pensamiento={pensamiento} />
                    </div>
                </div>
            </div>

            <hr  className="line w-100 " /> 

            <div className="row mt-5 " >
                <div className="col-md-1 border-blue" >
                    <div className="m-2" >
                        <h6 className="text-center text-green-mallas" > <strong>  GRADO  </strong></h6>
                    </div>
                </div>
                <div className="col-md-2 border-blue" >
                    <div className="m-2" >
                        <h6 className="text-center text-green-mallas" > <strong> PENSAMIENTO </strong> </h6>
                    </div>
                </div>
                <div className="col-md-3 border-blue" >
                    <div className="m-2" >
                        <h6 className="text-center text-green-mallas" > <strong>  CONTENIDOS  </strong></h6>
                    </div>
                </div>
                <div className="col-md-3 border-blue" >
                    <div className=" m-2" >
                        <h6 className="text-center text-green-mallas" > <strong> ESTANDÁRES </strong></h6>
                    </div>
                </div>
                <div className="col-md-3 border-blue" >
                    <div className=" m-2" >
                        <h6 className="text-center text-green-mallas " > <strong>DERECHOS BÁSICOS DE APRENDIZAJE  </strong></h6>
                    </div>
                </div>
            </div>

            <div className="row mb-2" >
                <div className="col-md-1 border-blue" >
                    <div className="m-2" >
                        <h6 className="text-center text-green-mallas text-rotate-relative py-5" > <strong> {Datos.Curso.toUpperCase() } </strong></h6>
                    </div>
                </div>
                <div className="col-md-2 border-blue" >
                    <div className="m-2" >
                        <h6 className="text-center text-green-mallas text-rotate-relative py-5" > <strong> {pensamiento.Nombre.toUpperCase() } </strong></h6>
                    </div>
                </div>
                <div className="col-md-3 border-blue" >
                    <div className="m-2" >
                        <Contenido pensamiento={pensamiento}  />
                    </div>
                </div>
                <div className="col-md-3 border-blue" >
                    <div className=" m-2" >
                        <Estandares pensamiento={pensamiento} />
                    </div>
                </div>
                <div className="col-md-3 border-blue" >
                    <div className=" m-2" >
                        <Derechos  pensamiento={pensamiento} />
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default CargarMalla;