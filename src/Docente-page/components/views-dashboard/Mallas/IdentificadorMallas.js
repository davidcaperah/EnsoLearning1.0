import axios from 'axios'
import React,{useEffect} from 'react'
import URL from '../../../../URL';
import { useDispatch , useSelector} from 'react-redux';

const IdentificadorMallas = () => {
  const dispatch = useDispatch()
  const aulaSeleccionada = useSelector(state => state.aulaSeleccionada)

  useEffect(() => {
    const verificarMalla = async () => {
      const consulta = await axios({
        method : "post",
        url : `${URL.servidor}/api-php-react/CRUD_Copia_malla.php`,
        data : {
          d:10,
          id : aulaSeleccionada.id_curso
        }
      })
      if(!consulta.data){
        dispatch({
          type : "@updateNumberInterfazAula",
          numberInterfazAula : 1000
        })
      }else{
        dispatch({
          type : "@updateNumberInterfazAula",
          numberInterfazAula : 1
        })
      }
    }

    verificarMalla()
  }, [])


  const cambiarInterfaz = (num) => {
    dispatch({
      type : "@updateNumberInterfazAula",
      numberInterfazAula : num
    })
  }

  return(
    <div>
      <div className="p-4" >
        <h4 className="text-center text-warning" > No tienes una malla asociada a esta aula </h4>
        <h6 className="text-center text-white mt-2" > ¡Elije una malla curricular o crea una! </h6>
      </div>
      <div className="row" >
          <div className="col-md-6" >
            <div className="m-2 p-3 shadow rounded bg-white Areas pointer" onClick={()=> cambiarInterfaz(1001) } >
                <h4 className="text-center text-warning"> ¡Elije una de nuestras mallas! </h4>
            </div>
          </div>
          <div className="col-md-6" >
            <div className="m-2 p-3 shadow rounded bg-white Areas pointer"  onClick={()=> cambiarInterfaz(1002) } >
              <h4 className="text-center text-warning"> ¡Crea una malla personalizada! </h4>
            </div>
          </div>
      </div>
    </div>
  )
}

export default IdentificadorMallas