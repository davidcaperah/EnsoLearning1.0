import React from 'react';

const Planillas = ({idmath}) => {

    let ActiEstu =  [
        {id: "1" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "2" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "3" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "4" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "5" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "6" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "7" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "8" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "9" ,  "nombre"  :  "asdpo ddapo das"},
        {id: "10" , "nombre" :  "asdpo ddapo das"},
        {id: "11" , "nombre" :  "asdpo ddapo das"},
        {id: "12" , "nombre" :  "asdpo ddapo das"},
        {id: "13" , "nombre" :  "asdpo ddapo das"},
        {id: "14" , "nombre" :  "asdpo ddapo das"},
        {id: "15" , "nombre" :  "asdpo ddapo das"},
        {id: "16" , "nombre" :  "asdpo ddapo das"},
        {id: "17" , "nombre" :  "asdpo ddapo das"},
        {id: "18" , "nombre" :  "asdpo ddapo das"},
        {id: "19" , "nombre" :  "Material uy"},
        {id: "20" , "nombre" :  "asdpo ddapo das"},
        {id: "21" , "nombre" :  "asdpo ddapo das"},
        {id: "22" , "nombre" :  "asdpo ddapo das"},
        {id: "23" , "nombre" :  "asdpo ddapo das"},
        {id: "24" , "nombre" :  "asdpo ddapo das"},
        {id: "25" , "nombre" :  "asdpo ddapo das"},
        {id: "26" , "nombre" :  "asdpo ddapo das"},
        {id: "27" , "nombre" :  "asdpo ddapo das"},
        {id: "28" , "nombre" :  "asdpo ddapo das"},
        {id: "29" , "nombre" :  "asdpo ddapo das"},
    ]

    let NotasEstu = [
        {id: "1" ,  "nota"  : "2.5"},
        {id: "2" ,  "nota"  : "2.5"},
        {id: "3" ,  "nota"  : "2.5"},
        {id: "4" ,  "nota"  : "2.5"},
        {id: "5" ,  "nota"  : "2.5"},
        {id: "6" ,  "nota"  : "2.5"},
        {id: "7" ,  "nota"  : "2.5"},
        {id: "8" ,  "nota"  : "2.5"},
        {id: "9" ,  "nota"  : "2.5"},
        {id: "10" , "nota" : "2.5"},
        {id: "11" , "nota" : "2.5"},
        {id: "12" , "nota" : "2.5"},
        {id: "13" , "nota" : "2.5"},
        {id: "14" , "nota" : "2.5"},
        {id: "15" , "nota" : "2.5"},
        {id: "16" , "nota" : "2.5"},
        {id: "17" , "nota" : "2.5"},
        {id: "18" , "nota" : "2.5"},
        {id: "19" , "nota" : "1.7"},
        {id: "20" , "nota" : "1.5"},
        {id: "21" , "nota" : "3.5"},
        {id: "22" , "nota" : "4.5"},
        {id: "23" , "nota" : "2.5"},
        {id: "24" , "nota" : "2.5"},
        {id: "25" , "nota" : "2.5"},
        {id: "26" , "nota" : "2.5"},
        {id: "27" , "nota" : "2.5"},
        {id: "28" , "nota" : "2.5"},
        {id: "29" , "nota" : "2.5"},
    ]

    let notasSumadas = NotasEstu.map(promedio => promedio.nota )

    let suma = 0;
    notasSumadas.forEach (function(numero){
        suma += parseInt(numero);
    });

    const Promedio = suma / 29;

    return (
        <div>
            <div>
                {ActiEstu.map(acti =>
                <div key={acti.id} > 
                    <p> <span className="h6" >Nombre de Actividad: </span> {acti.nombre} </p>
                    {NotasEstu.map(nota =>
                        <div>
                            {acti.id === nota.id ? 
                                <p key={nota.id} > <span className="h6" >Nota de Actividad: </span> {nota.nota} </p>    
                            : null}
                        </div>
                    )}                    
                </div>
                )}
                
                <p><span className="h6" >Promedio:  </span> {Promedio} </p>
                {Promedio > 3.5 ?   <div className="alert alert-warning" role="alert">  Estado : Riesgo  </div>     : null}
                {Promedio < 3.5 && Promedio > 3.0 ?   <div className="alert alert-success p-3" role="alert"> Estado : Pasando </div>  : null}
                {Promedio < 3.0 ?   <div className="alert alert-danger" role="alert"> Estado : Perdiendo  </div>    : null}
            </div>
        </div>
    );
}
 
export default Planillas;