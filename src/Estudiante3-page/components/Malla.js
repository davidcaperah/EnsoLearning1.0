import React from 'react';

const Malla = ({idmath}) => {


    return (
        <div>
            <div>
                <h4 className="m-2" > ¡Diferencia los colores! </h4>
                <div className="m-2 p-3  alert-warning" > Actividades </div>
                <div className="m-2 p-3  alert-info" > Evaluaciones</div>
                <div className="m-2 p-3  alert-success" > Lecturas </div>
            </div>

            <h3 className="p-3" > 1 Periodo </h3>

            <div>
                <div className="shadow p-3 m-2" >
                    <h4 className="ml-2" > Triángulos </h4>
                    <h5 className="ml-2" > - Vertices y ángulos  </h5>
                    <hr className="ml-2 w-50 bg-info shadow-sm line" ></hr>
                    <hr className="ml-2 w-25 bg-warning shadow-sm line" ></hr>
                    
                    <h6 className="ml-2" > Contenido </h6>
                    <div className="p-3 alert-warning m-2" >
                        <p className="m-1" > Medir triángulos   </p>                
                    </div>
                    <div className="p-3 alert-success m-2" >
                        <p className="m-1" > Diferenciar ángulos y vertices   </p>                
                    </div>
                    <div className="p-3 alert-warning m-2" >
                        <p className="m-1" > Usar reglas para medir triángulos  </p>                
                    </div>
                    <div className="p-3 alert-info m-2" >
                        <p className="m-1" > Medidas correctas de los triángulos. </p>                
                    </div>
                </div>


            </div>



        </div>
    );
}
 
export default Malla;