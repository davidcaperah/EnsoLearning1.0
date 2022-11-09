import { green, red } from '@material-ui/core/colors'
import React ,{useState}from 'react'
import '../css/calendario.css'

const Calendario = (props)=>{

    const [mes , setMes] = useState(new Date().getMonth())
    const mesa = new Date().getMonth()
    const dia = (new Date().getDate())
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
    const CambiarMes = (cuanto)=>{
        let esta = mes;
        if(cuanto === 1 && esta > 0){
            esta--;
        }else if(esta < 11){
            esta++;
        }
        setMes(esta)
    }
   console.log(dia);
   console.log(props.diasCale);

    return(
        <div className='cont-calendario-home'>
        <div className='mes-calendario'>{
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row'>
                    {mes !== 0?
                        <div className='col-md-4 flecha-calendario' onClick={()=>CambiarMes(1)} >{"<"} </div>
                        :
                        <div className='col-md-4 flecha-calendario' > </div>
                    }
                    <div className='col-md-4 meses-evaluaciones'>
                        {
                        mes === 0 ? <p>Enero</p>:
                        mes === 1 ?<p>Febrero</p>:
                        mes === 2 ? <p>Marzo</p>:
                        mes === 3 ?<p>Abril</p>:
                        mes === 4 ? <p>Mayo</p>:
                        mes === 5 ? <p>Junio</p>:
                        mes === 6 ? <p>Julio</p>:
                        mes === 7 ? <p>Agosto</p>:
                        mes === 8 ? <p>Septiembre</p>:
                        mes === 9 ? <p>Octubre</p>:
                        mes === 10? <p>Noviembre</p>:
                        mes === 11? <p>Diciembre</p>:
                        null
                        }
                    </div>
                    {mes !== 11?
                       <div className='col-md-4 flecha-calendario' onClick={()=>CambiarMes(2)} >{">"}</div>
                        :
                        <div className='col-md-4 flecha-calendario' > </div>
                    }
                    </div>
                </div>
            </div>
        }</div>
        <div className="dias-calendario">
            <div>L</div>
            <div>M</div>
            <div>M</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
            <div>D</div>
            {arregloDias.map(num =>
            num === 1 && diaSemana === "Tue"?
            <div key={num}style={{gridColumnStart:2,gridColumnEnd:2}}>{num}</div>:
            num === 1 && diaSemana === "Wed"?
            <div key={num}style={{gridColumnStart:3,gridColumnEnd:3}}>{num}</div>:
            num === 1 && diaSemana === "Thu"?
            <div key={num}style={{gridColumnStart:4,gridColumnEnd:4}}>{num}</div>:
            num === 1 && diaSemana === "Fri"? 
            <div key={num}style={{gridColumnStart:5,gridColumnEnd:5}}>{num}</div>:
            num === 1 && diaSemana === "Sat"?
            <div key={num}style={{gridColumnStart:6,gridColumnEnd:6}}>{num}</div>:
            num === 1 && diaSemana === "Sun"?
            <div key={num}style={{gridColumnStart:7,gridColumnEnd:7}}>{num}</div>:
            num == 1?
            <div key={num}>{num}</div>:
            dia === num && mes === mesa?
            <div key={num} className='Dia'>{num}</div>:
            <div key={num}>{num}</div>
            )}
        </div>
    </div>
    )
}


export default Calendario