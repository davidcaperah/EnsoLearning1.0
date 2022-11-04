import React,{useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../../URL.js';

const PlanillaEstudiante = () =>{
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    let IdEncriptado =  cookies.get('idEst')
    let bytes  = CryptoJS.AES.decrypt(IdEncriptado, 'A')
    let Id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    let IdMEncriptado =  cookies.get('idMateria')
    let bytesM  = CryptoJS.AES.decrypt(IdMEncriptado, 'A')
    let IdM = JSON.parse(bytesM.toString(CryptoJS.enc.Utf8))

    let IdCEncriptado =  cookies.get('idcol')
    let bytesC  = CryptoJS.AES.decrypt(IdCEncriptado, 'A')
    let IdC = JSON.parse(bytesC.toString(CryptoJS.enc.Utf8))


    let IdCsEncriptado =  cookies.get('idCurso')
    let bytesCs  = CryptoJS.AES.decrypt(IdCsEncriptado, 'A')
    let IdCs = JSON.parse(bytesCs.toString(CryptoJS.enc.Utf8))

    let Datos = {
        id : Id,
        idM : IdM,
        idC :IdC,
        idCurso : IdCs
    }

    console.log(Datos)

    const [DatosRecibidos, setDatosRecibidos] = useState([])


    useEffect(()=>{
        const TraerDatos = async () =>{
            let DatosJson = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_docente.php', DatosJson);
            let data = response.data
            let Arreglodata = Object.values(data)
            Arreglodata.splice(0, 3);
            setDatosRecibidos(
                Arreglodata
            )
            console.log(Arreglodata)
        }
            TraerDatos()
        //eslint-disable-next-line
    }, []);     

    return(
        <div>
            <div className="d-flex justify-content-between m-2" >
                <div> <h3> Actividad </h3> </div>
                <div> <h3> Nota      </h3> </div>
            </div>
            
            <div className="d-flex justify-content-between" >
                {DatosRecibidos.map(data => 
                    <div> 
                        <h6> {data} </h6>
                    </div>    
                )}
            </div>
        </div>


    )
}


export default PlanillaEstudiante;