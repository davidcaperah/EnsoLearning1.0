import axios from 'axios';
import React,{useEffect, useState} from 'react';
import URL from '../../../URL';

const Estandares = ({pensamiento}) => {

    const [Derechos, setDerechos] = useState([])
 

    useEffect(() => {
        const cargarDerechos= async () => {
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data : {
                    id :pensamiento.id,
                    d : 13
                }
            })
    
            if(consulta.data.length > 0){
                setDerechos(consulta.data)
            }
        }
        cargarDerechos()
    }, [pensamiento])
    console.log(Derechos)
    return(
        <div> 
            {(Derechos.length !== 0)?
            Derechos.map(datos =>
                <div key={datos.id} >
                    <h6> - {datos.Texto}  </h6>
                </div> 
            )
            :
            <h6>En construccion</h6>
            }
        </div>
    )
}

export default Estandares