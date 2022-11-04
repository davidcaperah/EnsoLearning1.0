import React,{useState} from 'react'
import '../../css/homeDocentes.css'
import Calendario from '../../calendario'

const HomeDocentes = ()=>
{
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

    <div className='cont-princi-docentes'>
        <div className='cont-imagen-docentes1'>
            <div className='titulo-Vista'>Bienvenido docentes</div>
            <div className='titulo-Vista1'> I.E.D Gonzalo Arango  </div>
        </div>

        <div className=''>
            <div className='cont-info-home'>
                <div >
                    <h4>Agenda</h4>
                    <div className='cont-agenda-home'>
                        <div>
                            <p>Reunion area de ciencia</p>
                            <p>13-Enero-2021</p>
                        </div>
                        <div>
                            <p>Reunion docentes con rector</p>
                            <p>20-enero-2022</p>
                        </div>
                        <div>
                            <p>Entrega de boletines 1 periodo</p>
                            <p> 02-febrero-2021</p>
                        </div> 
                        <div className='d-flex justify-content-end ver-mas-agenda'>{`Ver mas >`}</div>   
                    </div>
                </div>

                <div >
                    <Calendario contenedor={`cont-calendario-home`} diasCale={`dias-calendario-home`}/>
                </div>

                <div>
                   <h4>Proximos eventos intitucionales</h4> 
                   <ul>
                       <li>Dia del idioma</li>
                       <li>Dia de la tierra</li>
                       <li>Semana de la ciencia</li>
                       <li>Integracion halloween</li>
                   </ul>
                </div>
                <div className='cont-circulares-home'>
                    <h4>Criculares</h4>
                    <div>
                        <p><strong>Circular 122 de 2021</strong> <br/>
                        Acuerdos de convivencia institucional
                        </p>
                    </div>
                    <div>
                        <p><strong>Circular 121 de 2021</strong> <br/>
                        Actualizacion medidad de bioseguridad
                        </p>
                    </div>
                    <div>
                        <p><strong>Circular 122 de 2021</strong> <br/>
                        Proceso electoral estudiantil 2021
                        </p>
                    </div>
                </div>
            </div> 
        </div>
     </div>
    )
}

export default HomeDocentes