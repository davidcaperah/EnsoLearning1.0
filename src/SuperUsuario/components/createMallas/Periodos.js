import React,{useState} from 'react';
import LoadPensamientos from './loadPensamientos.js';

const Periodos = ({materia}) => {

    const [Validacion, setValidacion] = useState(true)
    const [Datos, setDatos] = useState(0)

    const DiferenciarBotones = async (numero) => {   
        if(numero === 0){
            setValidacion(true)
            document.getElementById("materiasInterfaz-arrow").classList.remove("Eliminar")
        }else{
            setDatos({Periodo : numero , Materia : materia.id, d : 1})
            setValidacion(false)
        }
    }



    return (
        <div>
            {Validacion ? 
                <div className="m-2 p-3 shadow" >
                    <h6 className="ml-2" > ¿A que periodo pertenece esta malla? </h6>
                    <div className="row" >
                        <div className="col-md-3" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(1) }>
                                <h6> Primer periodo </h6>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(2) }>
                                <h6> Segundo periodo </h6>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(3) }>
                                <h6> Tercer periodo </h6>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(4) }>
                                <h6> Cuarto periodo </h6>
                            </div>
                        </div>
                    </div>    
                </div>
            :
                <div>
                    <div className="d-flex justify-content-start"  >
                        <div id="periodosInterfaz-arrow" className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> DiferenciarBotones(0) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <LoadPensamientos Datos={Datos} />
                </div>
            }
        </div>     
    );
}
 
export default Periodos;