import axios from 'axios';
import React,{useEffect,useState} from 'react';
import Cookies from 'universal-cookie';
import URL from '../../URL.js';



const Posiciones = () => {

    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    let IdAdminEncriptado =  cookies.get('idcol')
    let bytesadmin  = CryptoJS.AES.decrypt(IdAdminEncriptado, 'A')
    let Idcol = JSON.parse(bytesadmin.toString(CryptoJS.enc.Utf8))

    const [posiciones, setPosiciones] = useState([])


    useEffect(() => {
        const traerPosiciones = async () => {
            let infoEnviar = JSON.stringify({               
                d : 6,
                col : Idcol
            })
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_estudiante.php', infoEnviar);
            const data = response.data
            console.log(data)
            if (data.length > 0) {
                setPosiciones(data)
            } else {
                setPosiciones([])
            }
        }
        traerPosiciones()
    }, [Idcol]);

 
    return (
        <div className="container" >
            <div className="py-3" >
                <h4 className="text-center py-2 font-chewy" > Los mejores estudiantes de tu institución educativa </h4>
                <div className="shadow m-2 bg-dark" >
                    <div className="row" >
                        <div className="col-md-4" >
                            <p className="text-center mt-3 text-white"  > Nombre </p>
                        </div>
                        <div className="col-md-4" >
                        <p className="text-center mt-3 text-white"  > Curso </p>
                        </div>
                        <div className="col-md-4" >
                            <p className="text-center mt-3 text-white" >Promedio </p>
                        </div>
                    </div>
                </div>

                {posiciones.map(Estu =>
                    <div className="shadow m-2" key={Estu.id} >
                        <div className="row" >
                            <div className="col-md-4" >
                                <p className="text-center mt-3"  > {Estu.Nombre} </p>
                            </div>
                            <div className="col-md-4" >
                            <p className="text-center mt-3"  > {Estu.Curso_Nu} </p>
                            </div>
                            <div className="col-md-4" >
                                <p className="text-center mt-3" > {Estu.Promedio} </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
 
export default Posiciones;