import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import URL from './../../URL'

const Evaluacion = ({ idEvaluacion, iduser }) => {

    const dispatch = useDispatch()

    const [validacion, setValidacion] = useState({})

    const empezarEvaluacion = () => {
        dispatch({
            type: "@updatenumberInterfazEstudiantes",
            numberInterfazEstudiantes: 2
        })

        dispatch({
            type: "@updatedatosEvaluacionEstudiantes",
            datosEvaluacionEstudiantes: {
                evaluacion: idEvaluacion,
                estudiante: iduser
            }
        })
    }
    //Id_eva y id
    useEffect(() => {
        const validarEstado = async ()  => {
            const DatosJson = JSON.stringify({
                id_eva :idEvaluacion.id,
                id : iduser,
                d : 5
            })
            console.log(DatosJson)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_evaluacion_m.php', DatosJson);
            const data = response.data
            console.log(data);
            setValidacion(data)
            // dispatch({
            //     type: "@updatenumberInterfazEstudiantes",
            //     numberInterfazEstudiantes: num
            // })
            console.log(idEvaluacion)
        }
        validarEstado()
    }, [])
    return (
        <div className="p-3" >
            {validacion.estado ?

                <div>
                    <h5> <strong> ¿Quieres empezar la evaluación? </strong> </h5>
                    <p> Antes de empezar te daremos algunas indicaciones sobre las reglas de nuestras evaluaciones. </p>
                    <h6><strong>  - No puedes cambiar de pestaña ni ventana, en caso de que lo hagas se restará 1 minuto a tu evaluación. </strong> </h6>
                    <h6><strong>  - Al docente se le enviará la nota de tu evaluación y un comentario respectivo a como organizaste tu tiempo y si saliste de tu evaluación. </strong> </h6>
                    <h6><strong>  - Verifica tú conexión a internet antes de empezar la prueba, puesto a que solo tendrás una oportunidad para presentarla. </strong> </h6>
                    <button className="btn btn-outline-dark" onClick={empezarEvaluacion} > Empezar Evaluación </button>
                </div>

                :
                <div>
                    <h5> <strong> Ya haz realizado esta evaluación!</strong> </h5>
                    {validacion.estado_n === 5 ? <p>Calificado y revisado por el docente: y su nota es de: <strong>{validacion.nota}</strong></p> :<p>Calificado pero sin revision por el docente pero su nota es: <strong>{validacion.nota}</strong></p> }
                </div>
            }

        </div>
    );
}

export default Evaluacion;