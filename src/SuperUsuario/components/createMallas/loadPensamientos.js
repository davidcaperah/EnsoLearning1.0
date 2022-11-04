import React,{useEffect, useState} from 'react';
import URL from '../../../URL.js';
import CreatePensamientos from './createPensamientos.js';
import Diferenciador from './Diferenciador.js';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';

const LoadPensamientos = ({Datos}) => {

    const numberInterfazPensamientos = useSelector(state => state.numberInterfazPensamientos)
    const dispatch = useDispatch()

    const Pensamientos = useSelector(state => state.Pensamientos)
    const [Pensamiento, setPensamiento] = useState({})


    useEffect(() => {
        const cargarPensamientos = async() => {
            const DatosJson = JSON.stringify(Datos)

            const consulta = await axios({
                method : "post",
                url:`${URL.servidor}/api-php-react/CRUD_Mallas.php`,
                data:DatosJson
            })
    
            let datosRecibidos = consulta.data

            dispatch({
                type : "@updatePensamientos",
                Pensamientos : datosRecibidos
            })
            document.getElementById("materiasInterfaz-arrow").classList.add("Eliminar")

           /* try {
                let Configuracion = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body :  DatosJson
                }
                let res = await fetch( `${URL.servidor}/api-php-react/CRUD_Mallas.php`, Configuracion)
                let json = await res.json()
                dispatch({
                    type : "@updatePensamientos",
                    Pensamientos : json
                })
                document.getElementById("materiasInterfaz-arrow").classList.add("Eliminar")
              } catch (error) {
                  console.log(error)
              }*/
        }
        cargarPensamientos()
    }, [Datos,dispatch])


    const changeInterfaz = (num , data) => {
        if(num === 0){
            document.getElementById("periodosInterfaz-arrow").classList.remove("Eliminar")
            dispatch({
                type : "@updateInterfazPensamientos",
                numberInterfazPensamientos : num
            })
            setPensamiento(data)
        }else{
            dispatch({
                type : "@updateInterfazPensamientos",
                numberInterfazPensamientos : num
            })
            setPensamiento(data)
            document.getElementById("periodosInterfaz-arrow").classList.add("Eliminar")
        }

    }


    const eliminarPensamiento = async (pensamiento) => {
        const DatosJson = JSON.stringify({id : pensamiento.id , d : 2})

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/CRUD_Mallas.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos){
            const newPensamientos = Pensamientos.filter(data => data.id !== pensamiento.id)
            dispatch({
                type : "@updatePensamientos",
                Pensamientos : newPensamientos
            })
        }
        /*try {
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            let res = await fetch( `${URL.servidor}/api-php-react/CRUD_Mallas.php`, Configuracion)
            let json = await res.json()
            console.log(json);
            if(json){
                const newPensamientos = Pensamientos.filter(data => data.id !== pensamiento.id)
                dispatch({
                    type : "@updatePensamientos",
                    Pensamientos : newPensamientos
                })
            }

          } catch (error) {
              console.log(error)
          }*/
    }

    return (
        <div>
            {numberInterfazPensamientos === 0 ? 
                <div className="row" >
                    {Pensamientos.map(mat =>
                        <div className="col-md-4" key={mat.id} >
                            <div className="p-3 Areas shadow  m-2 d-flex justify-content-between"  >
                                <h2 className="text-center  pointer" onClick={()=> changeInterfaz(2 , mat) }  > {mat.Nombre}  </h2>
                                <svg onClick={() => eliminarPensamiento(mat) } xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="pointer bi bi-trash" viewBox="0 0 16 16">
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
            : null}

            {numberInterfazPensamientos !== 0 ? 
                <div>
                    <div className="d-flex justify-content-start"  >
                        <div id="pensamientosInterfaz-arrow" className="shadow p-3 pointer rounded-circle m-2 p-3" onClick={()=> changeInterfaz(0, {}) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    {numberInterfazPensamientos === 1 ? <CreatePensamientos Datos={Datos}  /> :null }
                    {numberInterfazPensamientos === 2 ? <Diferenciador  Datos={Pensamiento} /> :null }
                </div>
            :null}

        </div>
    );
}
 
export default LoadPensamientos;