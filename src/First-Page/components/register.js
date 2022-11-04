import React from 'react';

const Register = () => {

    return (
        <div className="container" >
            <div> 
              <h2 className="text-center mt-4" > ¿Quien eres? </h2>
              <p className="text-center" > ¡Nos da gusto que quieras registrate en nuestra plataforma! </p> 
            </div>
            <div className="row mb-4" >
              <div className="col-md-6">
                <div className="shadow p-3 m-2 pointer Areas" onClick={()=> window.location.replace("/FormE") } >
                  <img className="img-register" src="https://image.freepik.com/vector-gratis/ilustracion-estudiante-que-toma-clase-linea-casa_352318-245.jpg" alt="Enso Learning Estudiante" />
                  <h4 className="text-center text-lucky h2 mt-3"> Estudiante </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="shadow p-3 m-2 pointer Areas" onClick={()=> window.location.replace("/FormD") } >
                  <img className="img-register" src="https://contactomaestro.colombiaaprende.edu.co/sites/default/files/maestrospublic/styles/interna_850x260/public/2020-06/btn_plataforma_1.jpg?h=aeae0952&itok=ca5hc4NL" alt="Enso Learning Docente" />
                  <h4 className="text-center text-lucky h2 mt-3"> Docente </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="shadow p-3 m-2 pointer Areas" onClick={()=> window.location.replace("/FormA") } >
                  <img className="img-register" src="https://www.iedenriquepardoparra.edu.co/images/matri3.jpg?crc=309402739" alt="Enso Learning Acudiente" />
                  <h4 className="text-center text-lucky h2 mt-3"> Acudiente </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="shadow p-3 m-2 pointer Areas" onClick={()=> window.location.replace("/FormAA") } >
                  <img className="img-register" src="https://img.freepik.com/vector-gratis/administradores-sistemas-o-administradores-sistemas-estan-dando-servicio-racks-servidores-administracion-sistemas-mantenimiento-configuracion-sistemas-informaticos-concepto-redes-paleta-azul-coral-rosado-ilustracion-vectorial_335657-1642.jpg?size=626&ext=jpg&ga=GA1.2.1728038866.1628812800" alt="Enso Learning Administrador" />
                  <h4 className="text-center text-lucky h2 mt-3"> Coordinador </h4>
                </div>
              </div>
            </div>
        </div>
    );
}
 
export default Register;