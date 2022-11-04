import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import URL from '../../../../URL';
import axios from 'axios';
import Volver from '../Aulas/volver';

const CargarAreas = () => {
  const idMallaSeleccionada = useSelector(state => state.idMallaSeleccionada)

  useEffect(() => {
    const cargarAreas = async () => {
        const api = axios.create({baseURL : URL.servidor});

        try {
          const response = await api.post('/api-php-react/CRUD_Copia_malla.php', JSON.stringify({
            d : 1,
            curso : idMallaSeleccionada.Nombre,
            id_curso: idMallaSeleccionada.id_curso,
            id_col : idMallaSeleccionada.id_col
          }));
  
          const responseTwo = await api.post('/api-php-react/CRUD_Copia_malla.php', JSON.stringify({
            d : 2,
            id : response.data,
            id_copia : idMallaSeleccionada.id
          }));
          if(!responseTwo.data){
            return
          }

          const responseThree = await api.post('/api-php-react/CRUD_Copia_malla.php', JSON.stringify({
            d : 3,
            id : response.data,
            id_copia : idMallaSeleccionada.id,
            N_copia : idMallaSeleccionada.Nombre
          }));
          console.log(responseThree.data);


        } catch (error) {
          console.error(error);
        }
    }
      cargarAreas();
    //eslint-disable-next-line
  }, [])


  return (
    <div>
      <Volver  num={1001} />
    </div>
  );
}

export default CargarAreas;