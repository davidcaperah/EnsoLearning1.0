import React from 'react';

const Horarios = ({idmath}) => {


    let Horario = [
        {dia : "1" , materia : "Politica", Hora :"2"},
        {dia : "2" , materia : "Español", Hora :"2"},
        {dia : "3" , materia : "Filosofia", Hora :"1"},
        {dia : "4" , materia : "Español", Hora :"1"},
        {dia : "5" , materia : "Ciencias", Hora :"1"},
        {dia : "1" , materia : "Sociales", Hora :"2"},
        {dia : "3" , materia : "Religión", Hora :"1"},
        {dia : "4" , materia : "Deportes", Hora :"2"},
        {dia : "5" , materia : "Ingles", Hora :"2"},
        {dia : "1" , materia : "Etica", Hora :"1"},
        {dia : "3" , materia : "Matematicas", Hora :"2"},
        {dia : "2" , materia : "Matematicas", Hora :"2"},
    ]

    let Lunes = Horario.filter(dia => dia.dia === "1")
    let Martes =  Horario.filter(dia => dia.dia === "2")
    let Miercoles =  Horario.filter(dia => dia.dia === "3")
    let Jueves =  Horario.filter(dia => dia.dia === "4")
    let Viernes =  Horario.filter(dia => dia.dia === "5")

    return (
        <div>
            <div className="mt-4" >
                <p className="font-chewy h2" > Lunes </p>
                {Lunes.map(hora => 
                <div key={hora.materia} > 
                    <h5> {hora.materia}  </h5>
                    <p> <span className="h6" > Intensidad Horaria </span> {hora.Hora} </p>
                </div>
                )}
                <p className="font-chewy h2"  > Martes </p>
                {Martes.map(hora => 
                <div key={hora.materia} > 
                    <h5> {hora.materia}  </h5>
                    <p> <span className="h6" > Intensidad Horaria </span> {hora.Hora} </p>
                </div>
                )}
                <p className="font-chewy h2"  > Miercoles </p>
                {Miercoles.map(hora => 
                <div key={hora.materia} > 
                    <h5> {hora.materia}  </h5>
                    <p> <span className="h6" > Intensidad Horaria </span> {hora.Hora} </p>
                </div>
                )}
                <p className="font-chewy h2"  > Jueves </p>
                {Jueves.map(hora => 
                <div  key={hora.materia}> 
                    <h5> {hora.materia}  </h5>
                    <p> <span className="h6" > Intensidad Horaria </span> {hora.Hora} </p>  
                </div>
                )}
                <p className="font-chewy h2" > Viernes </p>
                {Viernes.map(hora => 
                <div key={hora.materia} >  
                    <h5> {hora.materia}  </h5>
                    <p> <span className="h6" > Intensidad Horaria </span> {hora.Hora} </p>
                </div>
                )}
            </div>
        </div>
    );
}
 
export default Horarios;