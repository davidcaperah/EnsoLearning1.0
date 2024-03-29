
import React,{useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../URL.js';


const Info = () => {


    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    let IdAdminEncriptado =  cookies.get('idcol')
    let bytesadmin  = CryptoJS.AES.decrypt(IdAdminEncriptado, 'A')
    let Idcol = JSON.parse(bytesadmin.toString(CryptoJS.enc.Utf8))

    const Datos = {
        id : Idcol
    }

    const [DatosRecibidos, setDatosRecibidos] = useState({});
    const [datosDocentes, setdatosDocentes] = useState([])

    useEffect(()=>{
        const sendData = async ()=>{
            let DatosJson = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/Cargar_colid.php', DatosJson);
            setDatosRecibidos(
                response.data
            )
            console.log(response.data);
        }

        const cargarDocentes = async ()=>{
            let DatosJson = JSON.stringify({ d: 5, col : Idcol})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', DatosJson);
            setdatosDocentes(response.data)
        }

        cargarDocentes()
        sendData();
        //eslint-disable-next-line
      }, []);  

    
    const ArregloEst = [
        {id : "1" ,cargo :"Personero", name:"Luis",  info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "2" ,cargo :"Representate del colegio", name:"Jorge",   info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "3" ,cargo :"Representate estudiantil", name:"Manuel",  info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
    ]
    

    return (
        <div>
            <h1 className="text-center text-blue font-chewy mt-5" > Mi institución educativa </h1>
            <div className="d-flex justify-content-center" >
                <img className="img-logo w-25" alt={"Enso Learning "+ArregloEst.cargo} src="https://image.freepik.com/vector-gratis/escuela-logotipo-universidad_20448-163.jpg" />
            </div>
            <div className="container mt-3" >
            <h6 className="text-center" > {DatosRecibidos.nombreC}  </h6>
                    <p> <span className="h6" > Descripción: </span>  {DatosRecibidos.info}  </p>
                    <p> <span className="h6" > Teléfono: </span> {DatosRecibidos.contacto} </p>
                    <p> <span className="h6" > Mi curso:</span> 65203 </p>
            </div>
            <div className="container" >
                <h4 className="text-center" > Rectoría y Coordinación</h4>
                <div className="row" >
                    {datosDocentes.map(Doc =>
                            <div className="col-md-4" key={Doc.Nombre} >
                                <div className="m-2 p-3 shadow rounded" >
                                    <div className="d-flex justify-content-center m-2" > 
                                        <img alt="logo" className="img-card rounded-circle" src={`${URL.servidor}${Doc.imagen}`} />
                                    </div> 
                                    <h6 className="text-center" > {Doc.Nombre} {Doc.apellido} </h6>
                                    <p> <span className="h6" > Información: </span> {Doc.estudios} </p>
                                    <p> <span className="h6" > Cargo: </span> Abogado </p>
                                </div>
                            </div>
                        )}
                </div>
                
            </div>
        </div>
    );
}
 
export default Info;