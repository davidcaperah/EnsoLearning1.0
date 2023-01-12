import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import URL from '../../../URL';

const Index = () =>{
    const [Ventana, setVentana] = useState(0);
    const [materias, setmaterias] = useState({})
    const [generos, setgeneros] = useState({})
    const [autor, setautor] = useState({})
    const [datos, setdatos] = useState({})
    const [Editar, setEditar] = useState({})
    const [cargar, setcargar] = useState(false)

const Estado = (tipo,materia) =>{
    setVentana(tipo)
    if(materia !== 0){
        setEditar(materia)
    }
}
var tt = cargar ? false : true;
const GuardarForm = (e) =>{
    if(e.target.id === 'formFile'){
        setdatos({
            ...datos,
            [e.target.name]:e.target.files[0]
        })
    }else{
        setdatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }
}
const guardarautor = async () =>{
    if(Editar.id){
        let edita = datos.Nombre ? datos.Nombre : Editar.genero ;
        let gen = datos.genero ? datos.genero : Editar.idgenero ;
        let idCurso = JSON.stringify({d:2 ,id:Editar.id,Nombre:edita,genero:gen})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_autor.php', idCurso);
        const data = response.data;
        if(data){
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Subido correctamente'
              })
              setEditar({}); 
              setcargar(tt)
    }
    }else{
        let idCurso = JSON.stringify({d:1,Nombre:datos.Nombre,genero:datos.genero})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_autor.php', idCurso);
        const data = response.data;
        if(data){
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Editado correctamente'
              })
              setcargar(tt)
    }
    }
    
}
const guardargenero = async () =>{
    if(Editar.id){
        let edita = datos.Nombre ? datos.Nombre : Editar.genero ;
        let idCurso = JSON.stringify({d:2 ,id:Editar.id,Nombre:edita})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_genero.php', idCurso);
        const data = response.data;
        if(data){
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Subido correctamente'
              })
            setEditar({}); 
            setcargar(tt)
    }
    }else{
        let idCurso = JSON.stringify({d:1,Nombre:datos.Nombre})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_genero.php', idCurso);
        const data = response.data;
        if(data){
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Editado correctamente'
              })
              setcargar(tt)
    }
    }
    
}
const GuardarCambios = async () =>{
    if(Editar.id){
        let archivo = "";
        if(datos.formFile){
            const formDatos = new FormData();
            formDatos.append('archivo',datos.formFile  )
            const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_materia.php`, formDatos, {
              headers: {
                  'content-type': 'multipart/form-data'
              }
        
          }) 
          archivo = consulta;  
        }
        let url = archivo.data.url ? archivo.data.url : Editar.imagen;
        let Nombre = datos.Nombre? datos.Nombre : Editar.N_Materia ;
            console.log(archivo.data.url);
            let idCurso = JSON.stringify({d:2,Nombre:Nombre,imagen:url,id:Editar.id})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/CRUD_materias.php', idCurso);
            const data = response.data
            if(data){
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Cambios realizados correctamente'
                  })
                  setcargar(tt)
            }
    }else{
        const formDatos = new FormData();
        formDatos.append('archivo',datos.formFile)
        const consulta = await axios.post(`${URL.servidor}/api-php-react/Subir_archivo_materia.php`, formDatos, {
          headers: {
              'content-type': 'multipart/form-data'
          }
    
      })
      if(consulta.data.error){
        Swal.fire({
            icon: 'warning',
            title: consulta.menssage,
            text: 'Volver a subir o llamar al soporte'
          })
        }else{
            console.log(consulta.data.url);
            let idCurso = JSON.stringify({d:1,Nombre:datos.Nombre,imagen:consulta.data.url})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/CRUD_materias.php', idCurso);
            const data = response.data;
            if(data){
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Subido correctamente'
                  })
                  setcargar(tt)
            }
        }
    }

}
useEffect(() => {
    const TraerMaterias =  async () => {
        let idCurso = JSON.stringify({d:0})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_materias.php', idCurso);
        const data = response.data
        console.log(data);
        if(data.length > 0){
            setmaterias(data)
        }else {
            setmaterias([])
        }
    }
    const TraerGeneros =  async () => {
        let idCurso = JSON.stringify({d:0})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_genero.php', idCurso);
        const data = response.data
        console.log(data);
        if(data.length > 0){
            setgeneros(data)
        }else {
            setgeneros([])
        }
    }
    const TraerAutor =  async () => {
        let idCurso = JSON.stringify({d:0})
        const api = axios.create({baseURL : URL.servidor});
        const response = await api.post('/api-php-react/CRUD_autor.php', idCurso);
        const data = response.data
        console.log(data);
        if(data.length > 0){
            setautor(data)
        }else {
            setautor([])
        }
    }
    TraerAutor()
    TraerMaterias()
    TraerGeneros()
    console.log("🚀 ~ file: index.jsx:204 ~ Index ~ cargar", cargar)
}, [cargar])
console.log(Editar);
    return(
        <div className="col-md-12">
            <div className="row center">
                <div className="col-md-6">
                    <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> Estado(2,0) }>Agregar genero</p>
                </div>
                <div className="col-md-6">
                     <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> Estado(1,0) }>Agregar Autor</p>
                </div>            
            </div>
            <div className="row center">
                <div className="col-md-6">
                    <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> Estado(3,0) }>Configurar materias</p>
                </div>
                <div className="col-md-6">
                     <p class="card-text text-center shadow p-3 m-2 Areas pointer" onClick={()=> Estado(4,0) }>ver libros</p>
                </div>            
            </div>
            {Ventana === 2 ? 
            <div className="row">
                {generos.map(genero =>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{genero.genero}</h5>
                                <p className="card-text">id :{genero.id}</p>
                                <a  className="btn btn-primary" onClick={()=> Estado(6,genero)}>Editar Genero</a>
                            </div>
                        </div>
                    </div>
                )

                }
                
                <div className="col-md-3">
                <div className="card text-center">
                            <div className="card-body">
                                <a href="#" className="btn btn-primary" onClick={()=> Estado(6,0)}>+</a>
                            </div>
                        </div>
                </div> 
            </div> 
            :null }
            {Ventana === 1 ? 
            <div className="row">
                {autor.map(autores =>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{autores.autor}</h5>
                                <p className="card-text">id :{autores.id}</p>
                                <p className="card-text">Genero :{autores.genero}</p>
                                <a  className="btn btn-primary" onClick={()=> Estado(7,autores)}>Editar Autor</a>
                            </div>
                        </div>
                    </div>
                )

                }
                
                <div className="col-md-3">
                <div className="card text-center">
                            <div className="card-body">
                                <a href="#" className="btn btn-primary" onClick={()=> Estado(7,0)}>+</a>
                            </div>
                        </div>
                </div> 
            </div> 
            :null }
            {Ventana === 3 ? 
            <div className="row">
                {materias.map(materia =>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={`${URL.servidor}Archivos_u/iconos/${materia.imagen}`} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{materia.N_Materia}</h5>
                                <p className="card-text">id :{materia.id}</p>
                                <a  className="btn btn-primary" onClick={()=> Estado(5,materia)}>Editar Materia</a>
                            </div>
                        </div>
                    </div>
                )

                }
                
                <div className="col-md-3">
                <div className="card text-center">
                            <div className="card-body">
                                <a href="#" className="btn btn-primary" onClick={()=> Estado(5,0)}>+</a>
                            </div>
                        </div>
                </div>
            </div> 
            :null }
            {Ventana === 4 ? 
            <div className="row">
                ver lista de libros
            </div> 
            :null }
            {Ventana === 5 ? 
            <div className="row text-center">
                <div className="col-md-12">
                <form className="g-3" >
                    <div className="row">
                        <div className="col-md-12">
                            <label for="formNombre" className="form-label">Nombre materia:</label>
                            <input type="text" className="form-control" id='formNombre' name='Nombre' onChange={GuardarForm} placeholder={Editar.N_Materia ? Editar.N_Materia: null}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                             {Editar.imagen?
                               <img src={`${URL.servidor}Archivos_u/iconos/${Editar.imagen}`} className="card-img-top" alt={Editar.N_Materia}/>
                                :
                                <div>
                                <label for="formFile" className="form-label">Imagen en formato SVG para las materias en la plataforma</label>
                                <input className="form-control" type="file" id="formFile" name="formFile" onChange={GuardarForm}/>
                                </div>
                             }
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className='row'>
                        <div className="col-md-12">
                        <button type="button" onClick={GuardarCambios} class="btn btn-primary center">Guardar</button>
                        </div>
                    </div>
                </form>
               
                </div>
            </div> 
            :null }
            {Ventana === 6 ? 
            <div className="row text-center">
                <div className="col-md-12">
                <form className="g-3" >
                    <div className="row">
                        <div className="col-md-12">
                            <label for="formNombre" className="form-label">Nombre Genero:</label>
                            <input type="text" className="form-control" id='formNombre' name='Nombre' onChange={GuardarForm} placeholder={Editar.genero ? Editar.genero: null}/>
                        </div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className="col-md-12">
                        <button type="button" onClick={guardargenero} class="btn btn-primary center">Guardar</button>
                        </div>
                    </div>
                </form>
               
                </div>
            </div> 
            :null }
            {Ventana === 7 ? 
            <div className="row text-center">
                <div className="col-md-12">
                <form className="g-3" >
                    <div className="row">
                        <div className="col-md-12">
                            <label for="formNombre" className="form-label">Nombre Autor:</label>
                            <input type="text" className="form-control" id='formNombre' name='Nombre' onChange={GuardarForm} placeholder={Editar.autor ? Editar.autor: null}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label for="formNombre" className="form-label">Genero: {Editar.genero?Editar.genero:null}</label>
                            <select name="genero" id="genero" className="form-control"  onChange={GuardarForm}>
                                <option value="0">selecione</option>
                                {generos.map( genero =>
                                    <option selected={Editar.idgenero === genero.id ? true : false} value={genero.id}>{genero.genero}</option>
                                )
                                }
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className="col-md-12">
                        <button type="button" onClick={guardarautor} class="btn btn-primary center">Guardar</button>
                        </div>
                    </div>
                </form>
               
                </div>
            </div> 
            :null }
         
        </div>
    )
}
export default Index;