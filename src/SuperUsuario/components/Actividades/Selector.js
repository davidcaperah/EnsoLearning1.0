import React from 'react';
import {useDispatch} from 'react-redux';


const CreateActividades = () => {

    const dispatch = useDispatch()
    const siguiente = (interfaz) =>{
        const Datos = {}
        if(interfaz === 5){
            Datos.tipo_p = 1
        }else if (interfaz === 2){
            Datos.tipo_p = 2

        }else{
            console.log("error dispatch")
        }
        dispatch({
            type : "numberInterfazActividades",
            numberInterfazActividades : interfaz

        })
        dispatch({
            type:"CrearActividadDatos",
            CrearActividadDatos : Datos
        })
    }
    const volverActividades = () => {
      dispatch({
        type : "numberInterfazActividades",
        numberInterfazActividades : 0
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
                  <div className="shadow p-3 m-2 rounded Areas pointer" onClick={()=> siguiente(5) } >
                    <div className="d-flex justify-content-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
                            <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/>
                        </svg>                     
                    </div>
                    <h5 className="text-center mt-3" > <strong> Didactica </strong></h5>
                  </div>
              </div>
              <div className="col-md-6" >
                  <div className="shadow p-3 m-2 rounded Areas pointer" onClick={()=> siguiente(2) } >
                    <div className="d-flex justify-content-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
                        </svg>                    
                    </div>
                    <h5 className="text-center mt-3" > <strong> Recurso </strong></h5>
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
}
 
export default CreateActividades;