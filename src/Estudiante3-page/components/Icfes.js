import React, {useState} from 'react';

import Swal from 'sweetalert2'


const Icfes = () => {

    const [Respuesta, setRespuesta] = useState(0)
    const [idEliminar, setidEliminar] = useState(0)
    const [Suma, setSuma] = useState(0)
    const [ValidacionRespuestas, setValidacionRespuestas] = useState(false)

    const EnviarRespuesta = () => {
        if(Respuesta !== 0){
            Swal.fire({
                title: '¿Estas seguro de tu respuesta?, no podrás cambiarla.',
                showDenybutton: true,
                showCancelbutton: true,
                confirmbuttonText: `¡Si!`,
                denybuttonText: `Cancelar`,
              }).then((result) => {
                if (result.isConfirmed) {
                    setRespuesta(0)
                    document.getElementById(idEliminar).parentElement.parentElement.parentElement.classList.add("Eliminar")
                    setSuma(Suma+1)
                    let numeroHijos = parseInt(document.getElementById("Padre").children.length)
                    if(numeroHijos === Suma+1){
                        setValidacionRespuestas(true)
                        document.getElementById("botonVolver").classList.add("Eliminar")
                    }

                }   
              })
        }else{
            Swal.fire({
                icon : "error",
                text : "No has elegido una respuesta"
            })
        }
    }

    const SeleccionarRespuesta = (R , id) => {
        let numeroPregunta = id.slice(0, -1);
        let ArregloPreguntas = [`${numeroPregunta}A` , `${numeroPregunta}B` ,`${numeroPregunta}C`,`${numeroPregunta}D`]

        let PreguntasnoElegidas = ArregloPreguntas.filter(ids => ids !== id)
        PreguntasnoElegidas.map(noelegidas => document.getElementById(noelegidas).classList.remove("bg-dark"))
        PreguntasnoElegidas.map(noelegidas => document.getElementById(noelegidas).classList.remove("text-white"))

        document.getElementById(id).classList.toggle("bg-dark")
        document.getElementById(id).classList.toggle("text-white")

        if(document.getElementById(id).classList[4] === undefined ){
            setRespuesta(0)
            setidEliminar(0)
        }else{
            setRespuesta(R)
            setidEliminar(id)
        }
    }

    let ArregloActividades = [1,2]

    return (
        <div>
            <div id="Padre" >
                {ArregloActividades.map(acti => 
                    <div className="my-5" key={acti} > 
                        <h6> ¿Cdasdadasdasdasd  dasd as sd asd sada ad as d ?</h6>
                        <div className="row" >
                            <div className="col-md-6"  onClick={()=> SeleccionarRespuesta("A" , `${acti}A`)} >
                                <div className="p-3 m-2 bg-warning pointer"  id={`${acti}A`}>
                                    <h6> A. </h6>
                                    <p className="text-center" > dsasdasdasd </p>
                                </div>
                            </div>
                            <div className="col-md-6"  onClick={()=> SeleccionarRespuesta("B" , `${acti}B`)} >
                                <div className="p-3 m-2   bg-danger pointer" id={`${acti}B`} >
                                    <h6> B. </h6>
                                    <p className="text-center" > dsasdasdasd </p>
                                </div>
                            </div>
                            <div className="col-md-6"  onClick={()=> SeleccionarRespuesta("C", `${acti}C`)} >
                                <div className="p-3 m-2   bg-success  pointer" id={`${acti}C`}  >
                                    <h6> C. </h6>
                                    <p className="text-center" > dsasdasdasd </p>
                                </div>
                            </div>
                            <div className="col-md-6"  onClick={()=> SeleccionarRespuesta("D" , `${acti}D`)} >
                                <div className="p-3 m-2   bg-primary pointer" id={`${acti}D`} >
                                    <h6> D. </h6>
                                    <p className="text-center" > dsasdasdasd </p>
                                </div>
                            </div>
                        </div>
                        <button variant="contained" color="primary"  className="mt-3" onClick={EnviarRespuesta}  >
                                Enviar Respuesta
                        </button>
                    </div>
                )}
            </div>
            {ValidacionRespuestas ? 
                <div className="alert-success p-3 m-2  shadow" > 
                    ¡Ya has terminado todas las respuestas y se han enviado correctamente!
                </div>
            
            :null}
                
        </div>

    );
}
 
export default Icfes;