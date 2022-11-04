import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../URL.js';
import 'chart.piecelabel.js'
import '../../css/estadisticas.css'
import { DataUsageOutlined } from '@material-ui/icons';
const Estadisticas =  () => {

  const dispatch = useDispatch()
  const CryptoJS = require("crypto-js")
  const cookies = new Cookies();
  const Desencriptar = (NombreCookie , Llave) => {
    let IdEncriptado =  cookies.get(NombreCookie)
    let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
    let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return Datos
  }

  const idCol = Desencriptar("idcol" , "A")
  const iduser = Desencriptar("iduser" , "A")
  const [valid, setValid] = useState(false)
  const [load, setLoad] = useState(0);
  const [estadisticaGene, setEstadisticaGene] = useState(0);
  const opcioGrados = ["0","1","2","3","4","5","6","7","8","9","10","11"]
  const [cursoSelect , setCursoSelect] = useState({})
  const [ValidacionCursos, setValidacionCursos] = useState(false)
  const [CodMateria, setCodMateria] = useState([])
  const [cursoSelecionado , setCursoSelecionado] = useState([])
  const [ promedio , setPromedio] = useState(0)
  const [filGrado , setFilGrado] = useState(null)
  const [promEstuIndividual , setPromEstuIndividual] = useState({})
  const docente = useSelector(state => state.docente)

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
    

  const cambiarEstadistica = ()=>{
    estadisticaGene === 0? setEstadisticaGene(1) : setEstadisticaGene(0)
  }
 
  useEffect(() => {

    fetch('http://localhost:3000/DocenteEstadisticas')
    .then((response) => {
      if(response.status === 200){
        setLoad(200)
      }
    }) 

    const EnviarDocente = async () => {
      const idDocente = JSON.stringify({ id: docente.id })
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post('/api-php-react/Cargar_Curaula.php', idDocente);
      if (!response.data) {
        setValidacionCursos(true)
      } else {
        setCodMateria(response.data)
      }
    }

    EnviarDocente()

  }, []);
  
  const cargarEstudiantes = async (id_curso) => {
    const consulta = await axios({
        method : "post",
        url  : `${URL.servidor}/api-php-react/info_estudiante.php`,
        data : {
            d : 9 ,
            Curso: id_curso
        }
    })
    console.log(consulta)
    const estudiantesCurso = consulta.data
    let promedio = 0
    estudiantesCurso.map(el =>{
      promedio = promedio + el.promedio ;
    })
    setPromedio(promedio)
    console.log(consulta.data)
    setCursoSelecionado(consulta.data)

  }

  const selecionarCurso = (el)=>{
    console.log(el)
    setCursoSelect(el)
    cargarEstudiantes(el.id_curso)
  }

  const filtrarlCiclo =  (e)=>{
    let grado = e.target.value
    console.log(grado)
    setFilGrado(grado)
  }
  const DatosEstudiante = (el)=>{
    console.log(el)
    setPromEstuIndividual(el)
  }
  try{
    console.log(CodMateria[0])
  }catch(e){}
  

  if(load === 200 ){
    return (   
      <div>
        <div className='cont-header-estadisticas'>

          <div className='header'>
            <p>{`Estadisticas >`}</p>
            <h2>Estadisticas</h2>
            <svg width="430" height="350" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>Layer 1</title>
                <path fill="#9bc94e" stroke="#000" opacity="undefined" d="m136.15592,204.97428c-61.40875,-29.87699 -143.30455,5.44752 -137.26003,-76.90065c6.04452,-82.34817 89.60334,-94.66375 171.82247,-78.7264c82.21913,15.93736 131.994,92.17336 115.55868,147.40977c-16.43531,55.23641 -88.71237,38.09426 -150.12112,8.21727l0,0.00001z" id="svg_1" transform="rotate(42.3141, 143.992, 138.101)" strokeWidth="0"/>
                <line fill="none" stroke="#000" x1="334" y1="358" x2="331" y2="358" id="svg_2"/>
                <line fill="none" stroke="#000" x1="42" y1="360" x2="41" y2="360" id="svg_3"/>
                <path fill="#9bc94e" stroke="#000" opacity="undefined" d="m86.45571,265.53702c-54.73653,-1.41292 -154.02771,86.02351 -159.12254,-46.73289c-5.09483,-132.7564 121.75354,-125.98235 196.07483,-30.27566c74.32129,95.70669 161.53718,-24.60141 105.57006,68.49544c-55.96712,93.09685 -87.78581,9.92603 -142.52235,8.51311z" id="svg_6" transform="rotate(3.44996, 86.9871, 209.42)" strokeWidth="0"/>
                <path fill="rgb(26,157,230,0.9)" stroke="#000" strokeWidth="0" opacity="undefined" d="m255.64946,237.14642c-56.53371,-2.38947 -102.74717,73.20136 -110.27689,-20.95875c-7.52972,-94.1601 42.4552,-145.08178 98.58667,-139.62287c56.13147,5.45892 140.65277,38.24618 141.31992,96.70895c0.66715,58.46276 -73.09599,66.26213 -129.6297,63.87267z" id="svg_7" transform="rotate(8.65267, 264.951, 169.881)"/>
              </g>
            </svg>
          </div>

          <div className='cont-filtros-header'>
            <div>
              <h4>Grado</h4>
              <div className='cont-lista'>
                <select className="form-control " name="estado" >
                    <option value={null} onClick={()=>{setFilGrado(null)}}> Seleciona el grado </option>
                    {opcioGrados.map( el =>
                      <option onClick={filtrarlCiclo} value={el} key={el} > {el} </option>
                    )}
                </select> 
              </div>
            </div>

            <div>
              <h4>Curso</h4>
              <div className='cont-lista'>
                <select className="form-control " name="estado" >
                    <option unselectable="true"  > Seleciona el Curso </option>
                    {CodMateria.map( el =>
                     filGrado === null ?
                      <option value={el} key={el.id} onClick={()=>{selecionarCurso(el)}}  > {el.Curso_Nu} </option>
                      :filGrado === el.Curso_Nu.toString()[0] ? 
                      <option value={el} key={el.id} onClick={()=>{selecionarCurso(el)}}  > {el.Curso_Nu} </option>
                      :null
                    )}
                </select> 
              </div>
            </div>

            {estadisticaGene === 1 ?
              <div>
                <h4>Estudiante</h4>
                <div className='cont-lista1'>
                  <select className="form-control " name="estado" >
                      <option value={null} onClick={()=>{setFilGrado(null)}}> Seleciona el Estudiante </option>
                      {cursoSelecionado.map( el =>
                        <option onClick={()=>{DatosEstudiante(el)}} value={el.Nombre} key={el.id} > {`${el.Nombre} ${el.Apellido}`} </option>
                      )}
                  </select> 
                </div>
              </div>:null
            }
          </div>
        </div>

        { estadisticaGene === 0 ?
          <div className="cont-estadisticas">
            <div className='secciones'>
              <div className="individual" onClick={cambiarEstadistica}>Individual </div> 
              <div className="general" >General</div>
            </div>
            <div className='estadisticas'>
              <div className='titulo-estadisticas'>
                <h3>Curso {cursoSelect.Curso_Nu}</h3>
              </div>
              <div className='datos-estudiantes'>
                <div className='cont-datos'>
                  <p>Cantidad estudiantes       {cursoSelecionado.length}</p>
                  <p>Estudiantes aprobados       30</p>
                  <p>Evaluaciones realizadas      2</p>
                </div>
              </div> 
              <div className='grafica-estudiantes'>
                <div className='grafica-datos'>
                  <h3>Promedio general</h3>
                  <div className='grafica-circular'>
                    {promedio} / 100
                  </div>
                  <p>ver top 10</p>
                </div>
              </div>
            </div>
          </div>: null
        }
      
    

        { estadisticaGene === 1 ?
          <div className="cont-estadisticas">
            <div className='secciones'>
              <div className="individual">Individual </div> 
              <div className="general" onClick={cambiarEstadistica} >General</div>
            </div>

            <div className='estadisticas1'>
              <div className='titulo-estadisticas1'>
                <h3>Estudiante</h3>
                {promEstuIndividual.Nombre == undefined ?
                  <h4>Seleciona un estudiante </h4>:
                  <h4>{`${promEstuIndividual.Nombre} ${promEstuIndividual.Apellido}`} </h4>
              }
                
              </div>
              <div className='datos-estudiantes'>
                <div className='cont-datos1'>
                  <h4>Total evaluaciones     1</h4>
                  <p>Evaluaciones aprobadas      35</p>
                  <p>Evaluaciones no aprobadas       30</p>
                  <p>Evaluaciones no presentadas      2</p>
                </div>
                <div className='btn-datos-estudiantes'>
                  Actividades sugeridas para el estudiante
                </div>
              </div> 
              <div className='grafica-estudiantes1'>
                <div className='grafica-datos1'>
                  <h3>Promedio individual</h3>
                  <div className='grafica-circular1'>
                    {promEstuIndividual.promedio} / 100
                  </div>
                  <p>Ver detalle</p>
                </div>
              </div>
            </div>
          </div>: null
        }
        
      </div>
    ); 
  }
  else{
    return(
      <div>
        <h1>cargando...</h1>
      </div>
    )
  }
    
}

export default Estadisticas;