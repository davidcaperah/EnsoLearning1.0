import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import URL from './../../../URL'
const Crear =() =>{
    const cookies =  new Cookies();
    let Usuario = cookies.get('iduser');
    console.log(Usuario)
    let CryptoJS = require("crypto-js");
    let bytes  = CryptoJS.AES.decrypt(Usuario, 'A');
    let iduser = parseInt(bytes.toString(CryptoJS.enc.Utf8));
    const [Datos, setDatos] = useState({});
    let estado = "hgolaaaaadasdsadasdasas"
    // const Copiar_QR = (e) =>{
    //     console.log("entraaaa")
    //     e.preventDefault()
    //     e.clipboardData.setData("Text",estado)
    //     console.log( e.clipboardData.setData("Text",estado))
    // }
    useEffect(() => {
        const TraerQr =  async () => {
            let idCurso = JSON.stringify({d:1})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/admin/cr_QR.php', idCurso);
            const data = response.data
            console.log(data);
            if(data.length > 0){
                setDatos({data})
            }else {
                setDatos([])
            }
        }
        TraerQr()
    }, [])

    console.log(Datos);
    return(
        <div className="row">
               <div className="col-md-12">
                {Datos.data ? 
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Link</th>
                        <th scope="col">estado</th>
                        <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Datos.data.map( item=>
                        <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.Nombre}</td>
                        <td>{item.link}</td>
                        <td>{item.fecha}</td>
                        <td>
                        <div className='row'>
                            <div className="col-md-4">
                            <span className='cursorp' onClick={() => navigator.clipboard.writeText(URL.local+"Acortador/"+item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-qr-code" viewBox="0 0 16 16">
                                <path d="M2 2h2v2H2V2Z"/>
                                <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"/>
                                <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"/>
                                <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"/>
                                <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"/>
                            </svg>
                             </span>
                            </div>
                            <div className='col-md-4' >
                                <span className='cursorp'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                                </span>
                            </div>
                            <div className="col-md-4">
                            <span className='cursorp'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </span>
                            </div>
                        </div>
                        </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                :
                <h1>N hay datos</h1>
                }
                </div> 
            </div> 
    )
}
export default Crear;