import React, { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
const Cronometro = ({ minutosx}) => {

    const intervalRef = useRef(null)
    const dispatch = useDispatch();
    const [tiempo, setTiempo] = useState('00:00:00')
    const [contador, setContador] = useState(0)


    var contar = 0;
    const focus = () => {
        if (document.hasFocus()) {
            return;
        } else {
            contar = contar + 60;
            setContador(contar);
            Swal.fire({
                icon : 'warning',
                title : 'Te haz salido de la pagina',
                text : 'Se te ha restado: '+contar+' seg.'
            })         
        }
    }
    useEffect(() => {
        dispatch({
            type: "@updatetiempoSalioEva",
            tiempoSalioEva: contador
        })
    }, [contador])  

    const getTimeReimining = (endtime) => {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const segund = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const horas = Math.floor(total / 1000 / 60 / 60) % 24;
        const days = Math.floor((total / 1000 * 60 * 60 * 24));
        return {
            total, segund, minutes, horas, days
        };
    }

    const start = (deadline) => {
        let { total, segund, minutes, horas } = getTimeReimining(deadline)
        if (total >= 0) {
            setTiempo((horas > 9 ? horas : '0' + horas) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':' +
                (segund > 9 ? segund : '0' + segund))
        } else {
            Swal.fire({
                icon : 'info',
                title : 'Se ha acado el tiempo',
                text : '¡Muchos exitos!'
            })
            clearInterval(intervalRef.current)
        }
    }

    useEffect(() => {
        dispatch({
            type: "@updateTiempoEvaluacion",
            horasEvaluacion : tiempo.substr(0,2),
            MinutosEvaluacion : tiempo.substr(3,2),
            SegundosEvaluacion : tiempo.substr(6,7)
        })
    }, [tiempo.substr(0,2),tiempo.substr(3,2),tiempo.substr(6,7)])  
    
    const clearTimer = (endTime) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const id = setInterval(() => {
            start(endTime);
        }, 1000)
        intervalRef.current = id;
    };


    const minutos = (minutosx * 60);

    const getDeadLineTime = () => {   
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds()+minutos);
        return deadline;
    }


    useEffect(() => {
        clearTimer(getDeadLineTime());
        const interval = setInterval(() => {
            focus()           
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
     
        <div className="rounded d-flex justify-content-center align-items-center text-center" >
            <h4 className="text-center text-white" >

                {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                </svg> */}
            </h4>
            <h4><strong className="text-white">{minutosx} Minutos / <span className="text-danger">  {tiempo}</span></strong></h4>
        </div>
    );
}

export default Cronometro;