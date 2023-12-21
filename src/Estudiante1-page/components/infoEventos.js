import axios from 'axios';
import Cookies from 'universal-cookie';
import URL from './../../URL';

import Swal from 'sweetalert2';
import React, {useEffect, useState } from 'react'; 

function InfoEventos({idEvento}) {
    const [DatosRecibidos, setDatosRecibidos] = useState([])
    const [estadod, setestadod] = useState(true)
    const [puestos, setpuestos] = useState([])
    const [eventop, seteventop] = useState(false)
    

    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();


    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }
    let iduser = Desencriptar("iduser" , "A")

    const unirevento = async() =>{
        let datosd = {
            d:10,
            evento:DatosRecibidos.id
        }
        let DatosJson = JSON.stringify(datosd)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/CRUD_eventos.php', DatosJson);
            let datad = response.data;
            console.log(datad)
        if(datad === DatosRecibidos.cupos){
            Swal.fire({
                icon: "info",
                title: "Upss!",
                text: "El evento a alcanzado su límite de cupos",
                timer: 2000
            })
        }else{
            let datos = {
                d:3,
                id:iduser,
                id_E:DatosRecibidos.id,
                r:0
            }
            let DatosJson = JSON.stringify(datos)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/CRUD_eventos.php', DatosJson);
            let data = response.data;
            console.log(data)
            if(data === true ){
                Swal.fire({
                    icon : "success",
                    title : "Su regsitro al evento fue exitoso",
                    text : `Desde este momento estas participando en el evento!`,
                    showDenybutton: true,
                    confirmbuttonText: 'confirmar',
                }).then((r)=>{
                    if(r.isConfirmed){
                        window.location.replace("EstudianteOneEventos")
                    }else{
                        window.location.replace("EstudianteOneEventos")
                    }
                })
               
            }else{
                console.log("error en "+data)
            }
        }
    }
    useEffect(() => {
        const CargarDatos = async() =>{
            let Datosx = {
                d:7,
                id_E:idEvento
            }
            let DatosJson = JSON.stringify(Datosx)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/CRUD_eventos.php', DatosJson);
            let datax = response.data;
            setestadod(false)
            setDatosRecibidos(
                datax
            )
        }
        const Cargar_list = async() =>{
            let Datosx = {
                d:9,
                id:iduser,
                evento:idEvento
            }
            let DatosJson = JSON.stringify(Datosx)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/CRUD_eventos.php', DatosJson);
            let datax = response.data;
            setpuestos(
                datax
            )
        }
        const verificar = async() =>{
            let Datosx = {
                d:8,
                id:iduser,
                evento:idEvento
            }
            let DatosJson = JSON.stringify(Datosx)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/CRUD_eventos.php', DatosJson);
            let datax = response.data;
            console.log(datax)
            if(datax === 0){
                seteventop(false)
            }else{
                seteventop(true)
            }
        }
        CargarDatos()
        verificar()
        Cargar_list()
    }, [])
    console.log(idEvento)
    console.log(DatosRecibidos)
    console.log(puestos)
    return (
        <div>
            <p>{idEvento}</p>
            <div>
            <h3 className="text-center text-warning font-weight-bold">Descripción del evento</h3>
                {estadod === false ? 
                    <div >
                                <p>{DatosRecibidos.Nombre}</p>
                                <p>
                                Bienvenido al evento <strong className="text-warning">{DatosRecibidos.Nombre}</strong>
                                </p>
                                <p>
                                <strong className="text-warning">Descripción: </strong>{DatosRecibidos.des} 
                                </p>
                                <p>fecha fin <strong className="text-warning">{DatosRecibidos.fecha_f}</strong> y fue creada el dia <strong className="text-warning">{DatosRecibidos.fecha_i}</strong>.
                                </p>
                               {eventop === false ?
                                <button variant="contained" type="submit" color="primary" name="submit" onClick={() => unirevento()} className="text-center w-50 m-auto">Entrar</button>
                                :
                                <h3 className="text-center text-warning font-weight-bold">Ya estas parcipando en el evento</h3>
                               }
                                <div>
                                <h4 className="text-center text-warning font-weight-bold">Tabla de clasificación</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Puntos</th>
                                        <th scope="col">Colegio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {puestos.length === 0 ?
                                        <td>No hay parcitipantes</td>
                                        :
                                        puestos.map((p)=>
                                            <tr>
                                            <th scope="row"key={p.id}>{p.Puesto}</th>
                                            <td>{p.Nombre} {p.Apellido}</td>
                                            <td>{p.result}</td>
                                            <td>{p.nombreC}</td>
                                            </tr>
                                            )   
                                        }
                                    </tbody>
                                    </table>
                                </div>
                    </div>

                                :
                                <p>Cargando info de evento</p>
                }
            </div>
        </div>
    )
}

export default InfoEventos;
