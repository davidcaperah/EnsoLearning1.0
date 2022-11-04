import axios from 'axios';
import React,{useEffect, useState} from 'react'
import URL from '../../../../URL';
import Volver from '../Aulas/volver';
import { useDispatch} from 'react-redux';

const UseMallas = () => {

  const [mallasLista, setmallasLista] = useState([])
  const dispatch = useDispatch()


  useEffect(() => {
    const cargarMallas = async () => {
      const consulta  =await axios({
        method : "post",
        url : `${URL.servidor}/api-php-react/CRUD_Copia_malla.php`,
        data : {
          d:0
        }
      })
      if(consulta.data.length > 0){
        setmallasLista(consulta.data)
      }
    }
    cargarMallas()
  }, [])

  const elegirMalla = (id) => {
    dispatch({
      type : "@updateidMallaSeleccionada",
      idMallaSeleccionada : id
    })
    dispatch({
      type :"@updateNumberInterfazAula",
      numberInterfazAula : 1003
    })
  }

  return (
    <div>
      <Volver num={1000} />
      <div className="row" >
        {mallasLista.map(data =>
          <div className="col-md-6" key={data.id}  onClick={()=> elegirMalla(data) } >
            <div className="pointer Areas m-2 p-3 shadow-lg rounded" >
              <h4 className="text-center" > {data.Nombre} </h4>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default UseMallas;