import React ,{useState}from 'react'
import '../css/calendario.css'



const Calendario = (props)=>{





    const [mes , setMes] = useState(new Date().getMonth())
    let año = new Date().getFullYear()
    let ultiDiaMes = new Date(año,mes + 1,0) // numero del ultimo dia del mes
    let fechaIni  = new Date(año,mes,1).toString() // numero primer dia del mes
    let diaSemana  = fechaIni.slice(0,3) // que dia de la semana es lunes martes o miercoles etc  en el cual inicia la semana
    let fecha = ultiDiaMes.toString()
    let diasMes =parseInt(fecha.slice(8,10)) //ultimo dia del mes como entero para el for
    let arregloDias =[]

    for(let i = 1; i<= diasMes; i++){
        arregloDias.push(i)
    }
   

    return(
        <div className={`${props.contenedor}`}>
        <div className='mes-calendario '>{
            <div className='mes-calendario-contenido2'>
                <div className='flecha-calendario' onClick={()=>{setMes(mes -1)}} >{"<"} </div>
                    <div className='meses-evaluaciones'>
                        {
                        mes === 0? <p>Enero</p>:
                        mes === 1 ?<p>Febrero</p>:
                        mes === 2? <p>Marzo</p>:
                        mes === 3?<p>Abril</p>:
                        mes === 4 ? <p>Mayo</p>:
                        mes === 5 ? <p>Junio</p>:
                        mes === 6 ? <p>Julio</p>:
                        mes === 7 ? <p>Agosto</p>:
                        mes === 8 ? <p>Septiembre</p>:
                        mes === 9 ? <p>Octubre</p>:
                        mes === 10? <p>Noviembre</p>:
                        <p>Diciembre</p>
                        }
                    </div>
                <div className='flecha-calendario' onClick={()=>{setMes(mes + 1)}} >{">"}</div>
            </div>
        }</div>
        <div className={`${props.diasCale}`}>
            {arregloDias.map(num =>
                num === 1 && diaSemana === "Tue"?
                <div key={num}style={{gridColumnStart:2,gridColumnEnd:2}}>{num}</div>:
                num ===1 && diaSemana === "Wed"?
                <div key={num}style={{gridColumnStart:3,gridColumnEnd:3}}>{num}</div>:
                num === 1 && diaSemana == "Thu"?
                <div key={num}style={{gridColumnStart:4,gridColumnEnd:4}}>{num}</div>:
                num === 1 && diaSemana == "Fri"? 
                <div key={num}style={{gridColumnStart:5,gridColumnEnd:5}}>{num}</div>:
                num === 1 && diaSemana == "Sat"?
                <div key={num}style={{gridColumnStart:6,gridColumnEnd:6}}>{num}</div>:
                num === 1 && diaSemana == "Sun"?
                <div key={num}style={{gridColumnStart:7,gridColumnEnd:7}}>{num}</div>:
                num == 1?
                <div key={num}>{num}</div>:
                <div key={num}>{num}</div>

            )}
        </div>
    </div>
    )
}


export default Calendario