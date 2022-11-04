import React,{useState} from 'react';
import CompetenciasDeGrado from './optionsThinks/CompetenciasDeGrado';
import Contenido from './optionsThinks/Contenido';
import DerechosBasicos from './optionsThinks/DerechosBasicos';
import Estandares from './optionsThinks/Estandares';
import Evidencias from './optionsThinks/Evidencias';

const Diferenciador = ({Datos}) => {

    const [changeNumber, setchangeNumber] = useState(0)

    const DiferenciarBotones = (number) => {
        if(number === 0){
            setchangeNumber(number)
            document.getElementById("pensamientosInterfaz-arrow").classList.remove("Eliminar")
        }else{
            setchangeNumber(number)
            document.getElementById("pensamientosInterfaz-arrow").classList.add("Eliminar")
        }
    }

    return (
        <div>
            { changeNumber === 0? 
                <div className="m-2 p-3" >
                    <div className="row" >
                        <div className="col-md-6" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(1) }>
                                <h6> Competencias de Grado </h6>
                            </div>
                        </div>
                        <div className="col-md-6" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(2) }>
                                <h6> Evidencias </h6>
                            </div>
                        </div>
                        <div className="col-md-6" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(3) }>
                                <h6> Contenido </h6>
                            </div>
                        </div>
                        <div className="col-md-6" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(4) }>
                                <h6> Derechos Basicos de Aprendizaje </h6>
                            </div>
                        </div>
                        <div className="col-md-6" >
                            <div className="shadow p-3 m-2 pointer" onClick={()=>  DiferenciarBotones(5) }>
                                <h6> Estandares </h6>
                            </div>
                        </div>
                    </div>    
                </div>
            : null}
            {changeNumber !== 0 ? 
                <div>
                    <div className="d-flex justify-content-start"  >
                        <div id="diferenciadorInterfaz-arrow" className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> DiferenciarBotones(0) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    {changeNumber === 1 ? <CompetenciasDeGrado Datos={Datos} />  :null}
                    {changeNumber === 2 ? <Evidencias Datos={Datos} />  :null}
                    {changeNumber === 3 ? <Contenido  Datos={Datos} /> :null}
                    {changeNumber === 4 ? <DerechosBasicos  Datos={Datos} /> :null}
                    {changeNumber === 5 ? <Estandares  Datos={Datos} /> :null}
                </div>
            :null}

        </div>
    );
}
 
export default Diferenciador;