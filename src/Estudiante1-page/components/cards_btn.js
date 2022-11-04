import React from 'react'

function cards_btn() {
    return (
       
    <div className="bg-img">
    <div className="pt-2 container" >
      <div className="row" >
        <div className="col-md-15 m-auto" >
          <div className="p-3 m-2" >
            <h1 className="font-chewy text-warning mt-5" > ¡Bienvenida Lorena!</h1>
            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          </div>

          <div className="container" >
            <div className="row" >
              <div className="col-md-4 mt-2 mb-2">
                <div className="shadow p-3 m-2 m-auto pointer opciones" onClick={() => window.location.replace("/EstudianteOneEvaluaciones")} >
                  <img className="img-register-1 shadow" src="https://image.freepik.com/vector-gratis/ilustracion-concepto-examenes_114360-2754.jpg" alt="Enso learning Evaluaciones" />
                  <h4 className="text-center text-lucky  text-xx text-warning h2 mt-3"> Mis evaluaciones </h4>
                </div>
              </div>
              <div className="col-md-4 mt-2 mb-2">
                <div className="shadow p-3 m-2 m-auto pointer opciones" onClick={() => window.location.replace("/EstudianteOneAula")} >
                  <img className="img-register-1 shadow" src="https://image.freepik.com/vector-gratis/escuela-aula-escena-pizarra_25030-39311.jpg" alt="enso learning aulas" />
                  <h4 className="text-center text-lucky  text-warning  h2 mt-3"> Mis aulas </h4>
                </div>
              </div>
              <div className="col-md-4 mt-2 mb-2">
                <div className="shadow p-3 m-2 m-auto pointer opciones" onClick={() => window.location.replace("/EstudianteOneActividades")} >
                  <img className="img-register-1 shadow" src="https://image.freepik.com/vector-gratis/ninos-aprendiendo-jugando-ilustracion_53876-40285.jpg" alt="enso learning actividades" />
                  <h4 className="text-center  text-warning text-lucky h2 mt-3"> Mis actividades </h4>
                </div>
              </div>
              <div className="col-md-4 m-auto mt-2 mb-2">
                <div className="shadow p-3 m-2 m-auto  pointer opciones" onClick={() => window.location.replace("/EstudianteOneCurso")} >
                  <img className="img-register-1 shadow" src="https://image.freepik.com/vector-gratis/reunion-colegas-charla-negocios_74855-6304.jpg" alt="enso learning mi curso" />
                  <h4 className="text-center text-lucky  text-warning h2 mt-3"> Mi curso </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default cards_btn
