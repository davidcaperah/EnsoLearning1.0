import React,{useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import InterfazAulas from './Aulas/interfazAulas';
import ViewAulas from './Aulas/viewAulas';
import Cookies from 'universal-cookie';
import Evaluaciones from './Aulas/Evaluaciones';
import Actividades from './Aulas/Activdades';
import AllPlanillas from './Aulas/Planillas/allPlanillas';
import Libros from './Aulas/Libros';
import Agenda from './Aulas/Planillas/Agenda';
import Notas from './Aulas/Planillas/Notas';
import IdentificadorMallas from './Mallas/IdentificadorMallas';
import UseMallas from './Mallas/UseMallas';
import CreateMallas from './Mallas/CreateMallas';
import CargarAreas from './Mallas/cargarAreas';
import ActividadLibro from './Aulas/actividadLibro';
import CreateActividades from './Aulas/ActividadesFolder/SelectorActividad';
import RecursosActividad from './Aulas/ActividadesFolder/crearActividades';
import TipoActividad from './Aulas/ActividadesFolder/tipoActividad';
import SeccionSelecion from './Aulas/ActividadesFolder/seccionSelecion';
import SeccionGrupos from './Aulas/ActividadesFolder/seccionGrupos';
import SeccionAbierta from './Aulas/ActividadesFolder/seccionAbierta';
import SeccionEvaluaciones from './DocenteEvaluaciones'

const MisAulas = () => {
    const dispatch = useDispatch()
    const [valid, setValid] = useState(false)
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    

    const idCol = Desencriptar("idcol" , "A")
    const iduser = Desencriptar("iduser" , "A")

    if(!valid){
        dispatch({
            type : "@uploadDocente",
            docente : {
                id : iduser,
                colegio : idCol
            }
        })
        setValid(true)
    }
    

    const numberInterfazAula = useSelector(state => state.numberInterfazAula)
    
    return (
        <div>
            {numberInterfazAula === 1000 ? <IdentificadorMallas /> : null}
            {numberInterfazAula === 1001 ? <UseMallas /> : null}
            {numberInterfazAula === 1002 ? <CreateMallas /> : null}
            {numberInterfazAula === 1003 ? <CargarAreas /> : null}
            {numberInterfazAula === 0 ? <ViewAulas /> : null}
            {numberInterfazAula === 1 ? <InterfazAulas /> : null}
            {numberInterfazAula === 2 ? <Evaluaciones /> : null}
            {numberInterfazAula === 3 ? <Actividades /> : null}
            {numberInterfazAula === 4 ? <AllPlanillas /> : null}
            {numberInterfazAula === 5 ? <Libros /> : null}
            {numberInterfazAula === 6 ? <Notas />  : null}
            {numberInterfazAula === 7 ? <Agenda /> : null}
            {numberInterfazAula === 8 ? <ActividadLibro /> : null}
            
            {numberInterfazAula === 9 ? <CreateActividades /> : null}
            {numberInterfazAula === 10 ? < RecursosActividad/> : null}
            {numberInterfazAula === 11 ? < TipoActividad/> : null}
            {numberInterfazAula === 12 ? < SeccionSelecion/> : null}
            {numberInterfazAula === 13 ? < SeccionGrupos/> : null}
            {numberInterfazAula === 14 ? < SeccionAbierta/> : null}
        </div>
    );
}


// lo que coloque fue la interfas 9 y 10
export default MisAulas;