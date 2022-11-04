import React from 'react';
import {useDispatch,useSelector} from 'react-redux';


const CreateActividades = () => {
    const Datos = useSelector(state => state.CrearActividadDatos)
    
    console.log(Datos)
    const dispatch = useDispatch()

    const siguiente = (interfaz) =>{
      
      let tipoActividad
      interfaz === 12 ? tipoActividad = 1 : interfaz === 13 ? tipoActividad = 2 : tipoActividad = 3
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: interfaz
        })
        dispatch({
          type : "CrearActividadDatos",
          CrearActividadDatos :{
                                tipo_p: Datos.tipo_p,
                                tipo_s : tipoActividad
                              } 
          
      })
      
      
    }
    const volverActividades = () => {
      dispatch({
        type: "@updateNumberInterfazAula",
        numberInterfazAula : 9
      })
    }


    return(
      <div>
          <div className="d-flex justify-content-start" >
            <div className="shadow p-3 m-2 rounded-circle pointer" onClick={volverActividades} >
                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
            </div>
          </div>

          <div className="row" >

            <div className="row col-md-7" >
              <div className="col-md-6" >
                  <div className="shadow p-3 m-2 rounded Areas pointer" onClick={()=> siguiente(12) } >
                    <div className="d-flex justify-content-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-question-diamond-fill" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/>
                        </svg>                  
                    </div>
                    <h5 className="text-center mt-3" > <strong> Seleción </strong></h5>
                  </div>
              </div>
              <div className="col-md-6" >
                  <div className="shadow p-3 m-2 rounded Areas pointer" onClick={()=> siguiente(13) } >
                    <div className="d-flex justify-content-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-align-center" viewBox="0 0 16 16">
                            <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/>
                        </svg>
                    </div>
                    <h5 className="text-center mt-3" > <strong> Grupos </strong></h5>
                  </div>
              </div>
              <div className="col-md-6" >
                  <div className="shadow p-3 m-2 rounded Areas pointer" onClick={()=> siguiente(14) } >
                    <div className="d-flex justify-content-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                        </svg>                   
                    </div>
                    <h5 className="text-center mt-3" > <strong> Abiertas </strong></h5>
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
}
 
export default CreateActividades;