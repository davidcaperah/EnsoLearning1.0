import React from 'react';
import CreateActividades from './createActividades';
import GetActividades from './getActividades';
import UpdateActividades from './updateActvidades';
import {useSelector} from 'react-redux';
import Abiertas from './Abiertas';
import Selector from './Selector';
import Selector1 from './tipo_actividad'
import Seleccion from './seleccion'
import Unir from './grupos'


const Actividades = () => {

    const numberInterfazActividades = useSelector(state => state.numberInterfazActividades)

    return(
      <div>
          {numberInterfazActividades === 1 ?<UpdateActividades />  :null}
          {numberInterfazActividades === 0 ?<GetActividades />     :null}
          {numberInterfazActividades === 2 ?<CreateActividades />  :null}
          {numberInterfazActividades === 3 ?<Abiertas />  :null}
          {numberInterfazActividades === 4 ?<Selector />: null}
          {numberInterfazActividades === 5 ?<Selector1 />: null}
          {numberInterfazActividades === 6 ?<Seleccion />: null}
          {numberInterfazActividades === 7 ?<Unir />: null}
          
      </div>
    )
}
 
export default Actividades;