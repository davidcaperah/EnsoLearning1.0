import BannerPage from './bannerPage';
import award from '../img/award.svg'
import React,{useState, useEffect} from 'react';
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
    const [DatosDoc, setDatosDoc] = useState({})

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
            setDatosRecibidos(
                response.data.estu
            )
            setDatosDoc(
                response.data.profesor
            )
        }
        TraerDatos()
        //eslint-disable-next-line
    }, []);   
    
    const ArrayAwards =  [1,2,3]

    return (
        <div className="bg-pink" >
            <BannerPage welcome="Bienvenido a tu perfil!"  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?" img={DatosRecibidos.imagen} />
            <div className="container"  >
                <p className="h5 m-2" > <span className="h6"  > Nombres: {DatosRecibidos.Nombre}  </span>                 </p>
                <p className="h5 m-2" > <span className="h6"  > Apellidos:  {DatosRecibidos.Apellido} </span>               </p>
                <p className="h5 m-2" > <span className="h6"  > Email:  {DatosRecibidos.Correo}  </span>                   </p>
                <p className="h5 m-2" > <span className="h6"  > Director de curso: {DatosDoc.Nombres} {DatosDoc.Apellidos} </span>       </p>
                <p className="h5 m-2" > <span className="h6"  > Acudiente:  </span>               </p>
                <p className="h5 m-2" > <span className="h6"  > Telefono de acudiente:  </span>   </p>
                <p className="h5 m-2" > <span className="h6"  > Colegio del estudiante:  </span>   </p>
                <p className="h5 m-2" > <span className="h6"  > Promedio:  </span>   </p>
                <p className="h5 m-2" > <span className="h6"  > Diamantes:  {DatosRecibidos.Puntos} </span>   </p>
                <div className="row mt-3" >
                    {ArrayAwards.map(Premios =>
                    <div className="col-md-4"  key={Premios}  >
                        <div className="shadow rounded m-1 p-4" >
                            <h3 className="text-center" > Olimpiadas Matematicas </h3>
                            <p> <span className="h6" > Puesto:</span> 3 </p>    
                            <p> <span className="h6" > Descripción:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elEligendi non quisexercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amettemporibus asperiores quasi cupiditate.Voluptatum ducimus voluptates voluptas? </p>    
                            <div className="d-flex justify-content-center" >
                                <img alt={"Enso Learning "+DatosRecibidos.Nombre} className="w-100" src={award} />
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