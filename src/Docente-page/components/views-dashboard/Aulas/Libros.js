import React,{useState, useEffect} from 'react';
import axios from 'axios';
import URL from '../../../../URL.js';
import Estrellas from './Estrellas.js';
import Libro from './Libro.js';
import Volver from './volver.js';


const Libros = () => {

    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [DatosRecibidosDos, setDatosRecibidosDos] = useState([])
    const [DatosRecibidosTres, setDatosRecibidosTres] = useState([])
    const [Validacionbtn, setValidacionbtn] = useState(true)
    const [Campos, setCampos] = useState({})
    const [DatosLibros, setDatosLibros] = useState([])
    const [libros, setLibros] = useState([]);
    const [DatosProp, setDatosProp] = useState({})

    useEffect(()=>{
        const sendData = async ()=>{
            let DatosJson = JSON.stringify("1")
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/c_genero.php', DatosJson);
            let data = response.data
            setDatosRecibidos(
                ...DatosRecibidos,
                data
            )

            let DatoJsonA = JSON.stringify("1")
            const apiA = axios.create({baseURL : URL.servidor});
            const responseA = await apiA.post('/api-php-react/c_autor.php', DatoJsonA);
            let dataA = responseA.data

            setDatosRecibidosDos(
                ...DatosRecibidosDos,
                dataA
            )
        }

        sendData();
        //eslint-disable-next-line
      }, []);   
      
      useEffect(()=>{
        let datos = {
            d: 3
        }
        const datosJSON = JSON.stringify(datos);
        const api = axios.create({baseURL:URL.servidor});
        api.post(`/api-php-react/info_libros.php`, datosJSON).then(res=>{
            setLibros(res.data);
        })
      }, [])



    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name]: e.target.value.trim()
        }); 
    }

    const nombresLibros = async () =>{
        let datos= {
            d : 1,
            nombre : document.getElementById("nombre").value
        }
        let DatosJson = JSON.stringify(datos)

        const consulta = await axios({
            method : "post",
            url:`${URL.servidor}/api-php-react/info_libros.php`,
            data:DatosJson
        })
        let datosRecibidos = consulta.data

        if(datosRecibidos.mensaje){
            setDatosRecibidosTres([])
        }else if(datosRecibidos.length > 0){
            setDatosRecibidosTres(
                datosRecibidos
            )
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
            let res = await fetch(`${URL.servidor}/api-php-react/info_libros.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()

            if(json.mensaje){
                setDatosRecibidosTres([])
            }else if(json.length > 0){
                setDatosRecibidosTres(
                    json
                )
            }

        } catch (error) {
            console.log(error)
        }*/
    }


    const NoRecargar = async (e) => {
        e.preventDefault()
        let genero = parseInt(Campos.Genero)
        let autor = parseInt(Campos.Autor)
        let Genero = parseInt(document.getElementById("genero").value)
        let Autor = parseInt(document.getElementById("autor").value)

        if(Genero > 0 && Autor > 0){
            let data = DatosRecibidosTres.filter(data => data.estrellas === 0 && data.autor === autor && data.genero === genero)
            setDatosLibros(data)
        }
        if(Genero === 0){
            let data = DatosRecibidosTres.filter(data => data.estrellas === 0 && data.autor === autor)
            setDatosLibros(data)
        }
        if(Autor === 0 ){
            let data = DatosRecibidosTres.filter(data => data.estrellas === 0 && data.genero === genero)
            setDatosLibros(data)
        }

        if(Autor === 0 && Genero === 0){
            setDatosLibros(DatosRecibidosTres)
        }
    }

    const cargarLibro = (data , estado) => {
        setValidacionbtn(estado)
        setDatosProp(data)
    }

    return (
        <div className='container'>
            <Volver />
            {Validacionbtn ?
                <div className="p-3" >
                    <div>
                    <h3 className="text-warning text-center"> Buscar libro </h3>
                        <form onSubmit={NoRecargar}  className="row p-4" >
                            <input  type="text" id="nombre" onChange={nombresLibros} className="form-control col-md-4" placeholder="Nombre" />
                            <select name="Genero" onChange={onChange} className="form-control col-md-2 " id="genero" >
                                <option  value={0} > Género </option>
                                {DatosRecibidos.map(genero => 
                                    <option key={genero.id} value={genero.id}> {genero.genero} </option>
                                )}
                            </select>
                            <select name="Calificacion" onChange={onChange} className="form-control col-md-2" >
                                <option value={0} > Calificación </option>
                                <option value={1} > Mayor a 3 estrellas </option>
                                <option value={2} > Mayor a 4 estrellas </option>
                                <option value={3} > 5 estrellas </option>
                            </select>
                            <select name="Autor" id="autor" onChange={onChange} className="form-control col-md-2" >
                                <option value={0}> Autor </option>
                                {DatosRecibidosDos.map(Autor => 
                                    <option key={Autor.id} value={Autor.id}> {Autor.autor} </option>
                                )}
                            </select>
                            <button type="submit" className="btn btn-info col-md-2" > Buscar </button>
                        </form>
                    </div>

                    <div className="row" >
                        {
                            libros.length === 0 ?(
                                <h1>
                                    cargando...
                                </h1>
                            ):
                            DatosLibros.length === 0 ? libros.map(data=>(
                                <div className="col-md-3" key={data.id}>
                                <div className="p-3 m-2 Areas pointer shadow" onClick={()=> cargarLibro(data) } >
                                    <div className="d-flex justify-content-center" >
                                        <img alt={"Enso Learning "+data.Nombre}  className="w-100" src={data.portada} />
                                    </div> 
                                    <h6 className="text-center text-white mt-3" > Editorial {data.editorial} </h6>
                                    <p className="text-center text-white mt-3" > {data.Nombre} </p>
                                    <Estrellas data={data} />
                                </div>   
                            </div>
                            )):DatosLibros.map(data => 
                                <div className="col-md-3" key={data.id}>
                                    <div className="p-3 m-2 Areas pointer shadow" onClick={()=> cargarLibro(data) } >
                                        <div className="d-flex justify-content-center" >
                                            <img alt={"Enso Learning "+data.Nombre}  className="w-100" src={data.portada} />
                                        </div> 
                                        <h6 className="text-center text-white mt-3" > Editorial {data.editorial} </h6>
                                        <p className="text-center text-white mt-3" > {data.Nombre} </p>
                                        <Estrellas data={data} />
                                    </div>   
                                </div>
                            )
                        }
                    </div>
                </div>
            :
                <div>
                    <div id="flecha"  className="pointer m-2 p-3" onClick={() => cargarLibro(0 , true ) } >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left text-white" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>   
                    </div>
                    <Libro data={DatosProp} />
                </div>
            }
        </div>
    );
}
 
export default Libros;