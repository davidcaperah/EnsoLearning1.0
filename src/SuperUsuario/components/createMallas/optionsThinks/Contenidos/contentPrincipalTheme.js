import React,{useEffect} from 'react';
import Subtemas from './SubTemas';
import Temas from './Temas';

const ContentPrincipalTheme = ({Datos}) => {

    useEffect(() => {
        document.getElementById("diferenciadorInterfaz-arrow").classList.add("Eliminar")
    }, [])

    return (
        <div className="pt-3 pl-5" >
            <div className="row" >
                <div className="col-md-6" >
                    <Temas Datos={Datos} />
                </div>
                <div className="col-md-6"  >
                    <Subtemas  Datos={Datos} />
                </div>
            </div>
        </div>
    );
}
 
export default ContentPrincipalTheme;