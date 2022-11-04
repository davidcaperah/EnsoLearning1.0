import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import URL from '../../../URL';
const Grupos = () => {
  const [materias, setmaterias] = useState([]);
  const [Points, setPoints] = useState([]);

  const Datos_acti = useSelector(state => state.CrearActividadDatos)
  const recurso = useSelector(state => state.subirActividad)
    const dispatch = useDispatch()
    const volverActividades = () => {
        dispatch({
          type : "numberInterfazActividades",
          numberInterfazActividades : 5
        })
      }
      const addPoints = () => {
        const A = document.getElementById("a").value
        const B = document.getElementById("b").value
        if(A === ""){
            Swal.fire({
                icon:'error',
                title:"El campo A esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("a").focus();
                }
            })
            
        }else if(B === ""){
            Swal.fire({
                icon:'error',
                title:"El campo B esta vacio.",
                text:'Favor llenar todos los campos'
            }).then((resultado)=>{
                if(resultado.isConfirmed){
                    document.getElementById("b").focus();
                }
            })
            
        }else{

            const datos = ({
                a:A,
                b:B,
            })
            setPoints([
                ...Points,
                datos
            ])
        document.getElementById("a").value = ""
        document.getElementById("b").value = ""
        }
    }
    const Enviar_datos = async () =>{
      const Nombre_a = document.getElementById('Nombre_A').value
      const Des_A = document.getElementById('Des_A').value
      const materias = document.getElementById('materias').value
      const Cantidad_p = Points.length
      var urls = Object();
      if(Datos_acti.tipo_p === 2){
          urls.recurso = recurso
      }else{  
          urls.recurso = null
      }
      if(Nombre_a === ""){
          Swal.fire({
              icon:'error',
              title:"El campo Nombre actividad esta vacio.",
              text:'Favor llenar todos los campos'
          }).then((resultado)=>{
              if(resultado.isConfirmed){
                  document.getElementById("Nombre_A").focus();
              }
          })
      }else if(Des_A === ""){
          Swal.fire({
              icon:'error',
              title:"El campo Descripción esta vacio.",
              text:'Favor llenar todos los campos'
          }).then((resultado)=>{
              if(resultado.isConfirmed){
                  document.getElementById("Des_A").focus();
              }
          })
      }else if(materias === "¿Materia?"){
          Swal.fire({
              icon:'error',
              title:"El campo materias esta vacio.",
              text:'Favor llenar todos los campos'
          }).then((resultado)=>{
              if(resultado.isConfirmed){
                  document.getElementById("materias").focus();
              }
          })
      }else{
          let datos = JSON.stringify({d : 14,Puntos:Points,Nombre_a:Nombre_a,Des_A:Des_A,materias:materias,Cantidad_p:Cantidad_p,tipo_p:Datos_acti.tipo_p,tipo_s:Datos_acti.tipo_s,recurso:urls})
          const api = axios.create({baseURL : URL.servidor});
          const response = await api.post('/api-php-react/info_admin.php', datos);
          const data = response.data
          console.log(data)
          if(data === true){
              Swal.fire({
                  icon:'success',
                  title:"La actividad se a puesto el linea.",
                  text:'Se a publicado una nueva actividad de tipo selección'
              }).then((resultado)=>{
                  if(resultado.isConfirmed){
                      window.location.reload();
                  }
              })
          }else{
              Swal.fire({
                  icon:'error',
                  title:"Error al subir la actividad.",
                  text:data
              }).then((resultado)=>{
                  if(resultado.isConfirmed){
                      document.getElementById("materias").focus();
                  }
              })
          }
      }
  }
      useEffect(() => {
        const Cargar_m = async () =>{
            let datos = JSON.stringify({d : 13})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_admin.php', datos);
            const data = response.data
            console.log(data)
            setmaterias(data)
        }
        Cargar_m();
      }, []);
      console.log(Points);
    return(
      <div>
          <div className="d-flex justify-content-start" >
            <div className="shadow p-3 m-2 rounded-circle pointer" onClick={volverActividades} >
                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
            </div>
          </div>

          <div className="row" >
            <div className='col-sm-4'>
              <div className='shadow p-3 m-2'>
                <h4 className='text-center'>A</h4>
              </div>
              <div className='shadow p-3 m-2'>
              <input type="text" id="a" className="form-control mt-2"  placeholder="Ej:¿Capital de colombia?" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='shadow p-3 m-2'>
                <h4 className='text-center'>B</h4>
              </div>
              <div className='shadow p-3 m-2'>
              <input type="text" id="b" className="form-control mt-2"  placeholder="Ej:Bogota" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='position-relative'>
                <h4 className='text-center'>config</h4>
                <h6> Nombre Actividad: </h6>
                <input type="text" id="Nombre_A" className="form-control mt-2"  placeholder="Ej:Que tanto sabes de colombia" />
                <h6> Descripción de la actividad: </h6>
                <textarea type="text" id="Des_A" className="form-control mt-2"  placeholder="Ej:Conocer cuanto conoce de colombia cada estudiante" />
                <h6> Materia: </h6>
                <select className="form-control" name="Estado" id="materias">
                    <option unselectable="true" > ¿Materia? </option>
                    {materias.map(data =>
                        <option key={data.id} value={data.id} > {data.N_Materia} </option>
                    )
                    }
                  </select>
                    <div className='p-3'>
                    <h5 className='text-center text-break'> Cantidad a unir</h5>
                    <h3 className='text-center text-break'>{Points.length}</h3>
                    </div>
                  <div className='elementos 
                  d-flex 
                  flex-column 
                  justify-content-center 
                  text-center"'>
            <button className="btn btn-outline-dark mt-3 text-center" onClick={Enviar_datos}> Enviar </button>
            </div>
              </div>
              
              
            </div>
          </div>
          <div className="row" >
            <div className='col-8 elementos 
                  d-flex 
                  flex-column 
                  justify-content-center 
                  text-center"'>
            <button className="btn btn-outline-dark mt-3 text-center" onClick={addPoints} > Agregar </button>
            
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-4'>
            <div className='shadow p-3 m-2'>
                          <h4 className='text-center'>A</h4>
                        </div>
            </div>
            <div className='col-sm-4'>
              <div className='shadow p-3 m-2'>
                  <h4 className='text-center'>B</h4>
              </div>
            </div>
          </div>
          {Points.map(data => 
                    <div className='row' key={Math.random()}>
                      <div className='col-sm-4'>
                        <div className='shadow p-3 m-2'>
                          <h4 className='text-center'>{data.a}</h4>
                        </div>
                      </div>
                      <div className='col-sm-4'>
                        <div className='shadow p-3 m-2'>
                          <h4 className='text-center'>{data.b}</h4>
                        </div>
                      </div>
                    </div>
                    )}
      </div>
    )
}
 
export default Grupos;