import React,{useEffect, useState} from 'react';
import axios from 'axios'
import URL from '../../../URL.js'
import AddGrados from './addGrados.js';
import AreasInterfaz from './areasInterfaz.js';
import Swal from 'sweetalert2';
import {useSelector , useDispatch} from 'react-redux'

const GradosInterfaz = () => {

    const dispatch = useDispatch()
    const numberInterfazGrados = useSelector(state => state.numberInterfazGrados)

    const [Grado, setGrado] = useState({})
    const [Grados, setGrados] = useState([])

    useEffect(() => {
        const cargarGrados = async ()=>{
          const DatosJson = JSON.stringify({ d :1})
          const api = axios.create({baseURL : URL.servidor});
          const response = await api.post('/api-php-react/Info_cursos_admin.php', DatosJson);
          const data = response.data
          console.log(data);
          if(data.mensaje){
            Swal.fire({
                text : data.mensaje,
                icon : "warning"
            })
          }else{
            setGrados(data)
          }
        }

        cargarGrados();
        //eslint-disable-next-line
    }, [])
    

    const changeInterfaz = (number, grado) => {
      dispatch({
        type : "@updateInterfazGrados",
        numberInterfazGrados : number
      })
      setGrado(grado)
    }


    const EliminarCurso = (grado) => {
      Swal.fire({
        title: '¿Quieres eliminar este curso?',
        text: 'se eliminarán todas las mallas agregadas a este curso.',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Estoy seguro`,
        denyButtonText: `Quiero verificar`,
      }).then(async (result) => {      
          if(result.isConfirmed){

            let DatosJson = JSON.stringify({d :3 , id : grado.id })
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Info_cursos_admin.php', DatosJson);
            let data = response.data
            if(data === true){
                Swal.fire({
                  icon : "success" ,
                  text : "El curso se elimino correctamente"
                })
                const newGrados = Grados.filter(data => data.id !== grado.id)
                setGrados(newGrados)
            }

          }
      })
  }



    return (
      <div>
        {numberInterfazGrados === 0 ? 
            <div>
              <h2> Elije los cursos a los que quieras agregar una malla curricular. </h2>
              <div className="row" >
                  {Grados.map(data =>
                  <div className="col-md-4" key={data.id} > 
                    <div className="shadow m-2 p-3 Areas  d-flex justify-content-between"  >
                        <h6  className="pointer" onClick={()=> changeInterfaz(2 , data) } > {data.Nombre} </h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" onClick={()=> EliminarCurso(data)} className="pointer bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>
                  </div>
                  )}
                  <div className="col-md-4" > 
                    <div className="shadow m-2 p-1 pointer Areas" onClick={()=> changeInterfaz(1 , {}) } >
                        <h2 className="text-center h1" > + </h2>
                    </div>
                  </div>
              </div>
            </div>
        :null}
        {numberInterfazGrados === 1 ? 
          <div>
            <div className="d-flex justify-content-start" >
              <div className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> changeInterfaz(0, {}) } >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
              </div>
            </div>
            <AddGrados grados={Grados} />
          </div>
        :null}

        {numberInterfazGrados === 2 ? 
            <div>
                <div className="d-flex justify-content-start"  >
                  <div id="gradosInterfaz-arrow" className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> changeInterfaz(0, {}) } >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                  </div>
                </div>
              <AreasInterfaz grado={Grado}  />
            </div>
        :null}

      </div>
    );
}
 
export default GradosInterfaz;