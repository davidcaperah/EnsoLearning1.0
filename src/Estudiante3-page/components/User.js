import React,{useState, useEffect} from 'react';
import Banner from './Banner';
import user from '../img/kid.svg';
import award from '../img/kid.svg'
import Cookies from 'universal-cookie';
import axios from 'axios';
import URL from '../../URL.js';

const User = () => {
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    const Desencriptar = (Nombre , key ) => {
        let IdEncriptado =  cookies.get(Nombre)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, key)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }

    let iduser = Desencriptar('iduser' , 'A')
    let idCurso = Desencriptar('idCurso' , 'A')

    const [DatosRecibidos, setDatosRecibidos] = useState({})
    // const [DatosDoc, setDatosDoc] = useState({})


    const Datos = {
        id : iduser ,
        d: 0 ,
        idcurso : idCurso
    }

    useEffect(()=>{
        const TraerDatos = async () =>{
            let idCurso = JSON.stringify(Datos)
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/info_estudiante.php', idCurso);
            console.log(response)
            setDatosRecibidos(
                response.data.estu
            )
            // setDatosDoc(
            //     response.data.profesor
            // )
        }
        TraerDatos()
        //eslint-disable-next-line
    }, []);   
    const ArrayAwards =  [1,2,3]

    return (
        <div className="bg-light" >
            <Banner welcome="Bienvenido a tu perfil, " nombre={DatosRecibidos.Nombre}  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?" img={user} />
            <div className="container" >
                <p> <span className="h6 ml-3" > Nombres:  </span>          {DatosRecibidos.Nombre}       </p>
                <p> <span className="h6 ml-3" > Apellidos:  </span>      {DatosRecibidos.Apellido}         </p>
                <p> <span className="h6 ml-3" > Email:  </span>     {DatosRecibidos.Correo}                 </p>
                <p> <span className="h6 ml-3" > Director de curso:  </span>          </p>
                <p> <span className="h6 ml-3" > Acudiente:  </span>               </p>
                <p> <span className="h6 ml-3" > Telefono de acudiente:  </span>   </p>
                <p> <span className="h6 ml-3" > Colegio del estudiante:  </span>   </p>
                <p> <span className="h6 ml-3" > Promedio:  </span>   </p>
                <p> <span className="h6 ml-3" > Diamantes:  </span>   {DatosRecibidos.Puntos}   </p>
                <div className="row mt-3" >
                            {ArrayAwards.map(Premios =>
                            <div className="col-md-4" >
                                <div className="shadow rounded m-2 p-4"  key={Premios} >
                                    <h3 className="text-center" > Olimpiadas Matematicas </h3>
                                    <p> <span className="h6" > Puesto:</span> 3 </p>    
                                    <p> <span className="h6" > Descripción:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elEligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amettemporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? </p>    
                                    <div className="d-flex justify-content-center" >
                                        <img className="w-100" src={award} alt={"Enso Learning "} />
                                    </div>
                                </div>    
                            </div>
                            )}
                </div>
            </div>
        </div>
    );
}
 
export default User;