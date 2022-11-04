import React from 'react'
import {useDispatch } from 'react-redux';

function ActividadLibro() {
    const dispatch = useDispatch()
    const Volver = () => {
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: 1
        })
    }

    return (
        <div>
            <div className=" d-flex justify-content-start m-2" >
                <div className="rounded-circle pointer p-3 bg-white  shadow-lg" onClick={Volver} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </div>
            </div>
            
            <div className="p-2 w-80 m-auto" >
                    <h6 className="text-warning text-center"> Actividad del libro </h6>
                    <h6 className="text-white text-center"> Podrás agregar una actividad sobre el libro a tus estudiantes. </h6>
                    <div className="p-2" >
                        <h6 className="text-white"> Digita las caracteristicas de esta actividad. </h6>
                        <form >
                            <input name="Nombre" className="form-control my-2" placeholder="Nombre" />
                            <textarea  name="descri" className="form-control my-2" placeholder="Descripción" ></textarea>
                            <h6 className="text-white"> Fecha máxima de entrega </h6>
                            <input  name="fecha" className="form-control my-2" type="date" />
                            <h6 className="text-white"> Periodo en el que se va agregar esta actividad. </h6>
                            <select  className="form-control" name="periodo" >
                                <option value={null} >Periodo </option>
                                <option value="3" >Tercero</option>
                                <option value="2" >Segundo</option>
                                <option value="1" >Primero</option>
                            </select>
                            <div className="col text-center p-4">
                                <button className="btn btn-info" type="submit"> ACEPTAR </button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default ActividadLibro;
