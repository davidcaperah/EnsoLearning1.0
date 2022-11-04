import React  from 'react';
import CamposCursosAdmin from './CamposCursosAdmin';
import uuid from 'react-uuid';
import { useSelector , useDispatch} from 'react-redux';

const AdminFormFour = ({datos}) => {
    const interfazCursosAdmin = useSelector(state => state.interfazCursosAdmin)
    const cursosAdmin = useSelector(state => state.cursosAdmin)
    const dispatch = useDispatch()

    const cambiarInterfaz = (estado) => {
        dispatch({
            type : "@updateinterfazCursosAdmin",
            interfazCursosAdmin : estado
        })
    }

    return (
        <div>
            <div className="container" >
                <div className="p-2" >
                    <h3> <strong> Aula virtual </strong> </h3>
                    <p> ¡Agrega todos los datos de los cursos que tengas en tu colegio!</p>
                </div>  
                <div className="row" >
                    <div className="col-md-6" >
                        {cursosAdmin.map(data => 
                            <div className="p-3 m-2 shadow" key={data.id} >
                                <h5> {data.Curso} </h5>
                                {data.jornada === "1" ? <h6> Jornada Mañana </h6> : null }
                                {data.jornada === "2" ? <h6> Jornada Tarde </h6> : null }
                                {data.jornada === "3" ? <h6> Jornada Noche </h6> : null }
                            </div>      
                        )}
                        <div className="p-3 m-2 shadow Areas" onClick={()=> interfazCursosAdmin? cambiarInterfaz(false) : cambiarInterfaz(true) } >
                            <h3 className="text-center pointer " > + </h3>
                        </div>
                    </div>
                    <div className="col-md-6" >
                        <div className="m-2" >
                            {interfazCursosAdmin ? 
                                <CamposCursosAdmin datos={datos} Codigo={uuid()} /> 
                            : null}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-center mt-5" > ¿Ya Agregaste todos tus cursos? </h2>
                </div>
                <div className="d-flex justify-content-center mb-5" >
                    <button className="btn btn-outline-dark p-2" onClick={()=> window.location.replace("/Login") } > ¡Subir Cursos! </button>
                </div>
            </div>
        </div>
    );
}
 
export default AdminFormFour;