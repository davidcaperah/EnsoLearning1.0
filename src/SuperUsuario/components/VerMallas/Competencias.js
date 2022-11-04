import React,{useState, useEffect} from 'react';
import URL from '../../../URL.js'
import axios from 'axios'


const Competencias = ({Datos , pensamiento}) => {

    const [compentencia, setcompetencia] = useState({})


    useEffect(() => {
        const cargarCompentencias = async () => {
            const consulta = await axios({
                method: 'post',
                url: `${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data: {
                  id: pensamiento.id,
                  d : 7
                }
            })
            if(consulta.data.length > 0){
                setcompetencia(consulta.data[0])
            }
        }
        cargarCompentencias()
    }, [Datos , pensamiento])


    return (
        <div>
            <div className="border-green p-1 rounded w-50" >
                <h5> <strong>Competencias del grado   </strong></h5>
            </div>
            <div className="row mt-2" >
                <div className="col-md-1" ></div>
                <div className="col-md-11" >
                    <div className="border-red p-3 m-2 rounded" >
                        <h6> {compentencia.Descri} </h6>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-md-1" >
                    <div className="d-flex">
                        <h5 className="text-blue-mallas text-rotate w-100" > PENSAMIENTO </h5>
                        <h5 className="text-blue-mallas text-rotate-pensamiento w-100" > {pensamiento.Nombre.toUpperCase()} </h5>
                    </div>
                </div>
                <div className="col-md-11" >
                    <div className="mt-3" >
                        <div>
                            <h5> <strong> INTERPRETATIVO </strong></h5>
                            <h6> {compentencia.A} </h6>
                        </div>
                        <div className="mt-2" >
                            <h5> <strong> ARGUMENTATIVO </strong></h5>
                            <h6> {compentencia.B} </h6>
                        </div>
                        <div className="mt-2" >
                            <h5> <strong> PROPOSITIVO </strong></h5>
                            <h6> {compentencia.C} </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Competencias;