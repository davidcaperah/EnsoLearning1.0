import React,{useEffect, useState} from 'react';
import axios from 'axios';
import URL from '../../../URL';

const Evidencias = ({Datos, pensamiento}) => {

    const [Evidencias, setEvidencias] = useState([])
 
    useEffect(() => {
        const cargarEvidencias = async() => {
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data : {
                    id :pensamiento.id,
                    d : 4
                }
            })
            if(consulta.data.length > 0){
                setEvidencias(consulta.data)
            }
        }
        cargarEvidencias()
    }, [Datos, pensamiento])

    console.log(Evidencias)
    return (
        <div>
            <div className="border-green p-1 rounded w-50" >
                <h5> <strong> Evidencias de Aprendizaje </strong></h5>
            </div>

            <div className="row mt-2" >
                <div className="col-md-1" >
                    <div className="d-flex mt-5">
                        <h5 className="text-blue-mallas text-rotate w-100" > PENSAMIENTO </h5>
                        <h5 className="text-blue-mallas text-rotate-pensamiento w-100" > {pensamiento.Nombre.toUpperCase()} </h5>
                    </div>
                </div>
                <div className="col-md-11" >
                    <div className="mt-4" >
                        {(Evidencias.length !== 0)
                        ?
                        Evidencias.map(data => 
                            <h6 key={data.id} > - {data.Texto} </h6>    
                        )
                    : <h6>En construccion</h6>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Evidencias;