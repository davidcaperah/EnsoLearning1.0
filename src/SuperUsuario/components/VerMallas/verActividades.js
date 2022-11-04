import React from 'react'
import { useSelector } from 'react-redux';

const VerActividades = () => {
    const verMallasActividades = useSelector(state => state.verMallasActividades)

    return (
        <div>
            <div>
                <h4 className="text-center" > {verMallasActividades.sub.nombre_sub} </h4>
                <h6 className="text-center" > {verMallasActividades.sub.descrip} </h6>
            </div>
            <div className="row mt-4" >
                {verMallasActividades.actividades.map(data => 
                    <div className="col-md-6" key={data.id} >
                        <div className="p-3 m-2 shadow rounded" >
                            <h3 className="text-center" > {data.Nombre} </h3>
                            <h5> {data.objetivo} </h5>
                            <h5> {data.puntos} </h5>
                            { data.ICFES !==  "NULL" ? 
                                <div>

                                </div> 
                            :null}
                            { data.imagen !==  "NULL"? 
                                <div>

                                </div> 
                            :null}
                            { data.video !==  "NULL" ? 
                                <div>

                                </div> 
                            :null}
                            { data.PDF !==  "NULL"   ? 
                                <div>

                                </div> 
                            :null}
                        </div>
                    </div>        
                )}
            </div>
        </div>
    );
}
 
export default VerActividades;