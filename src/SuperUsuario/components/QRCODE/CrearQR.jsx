import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
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
    const gdatos = (e)=>{
        setDatos({...Datos,
            user:iduser,
            d:0,
            [e.target.name]: 
                e.target.value.trim()
            });
    }
    const Crearqr = async () => {
        const consulta = await axios({
            method: "post",
            url: `${URL.servidor}/api-php-react/admin/cr_QR.php`,
            data: Datos
        })
        if(consulta.data){
            Swal.fire({
                icon: 'success',
                title: 'Exitoso!',
                text: 'Se a creado el nuevo link',
                confirmButtonText: 'Entendido'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    document.location.reload();
                }
              })
        }
    }
    console.log(Datos);
    return(
        <div className="row">
               <div className="col-md-12">
               <form>
                <div class="mb-3">
                    <label for="Nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name='Nombre' id="Nombre" aria-describedby="Nombre" onChange={gdatos}/>
                    <div id="Nombre" class="form-text">Coloque el nombre del qr este sera solo para el sistema </div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Link</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" name='link' onChange={gdatos}/>
                </div>
                <div class="mb-3">
                <textarea class="form-control" placeholder="Descripción de link" id="Descripción" name='caracter' onChange={gdatos}></textarea>
                <label for="Descripción">Descripción</label>
                </div>
                <div class="mb-3 form-check">
                    <input type="radio" class="form-check-input" id="exampleCheck1" value={1} name="tipo" onChange={gdatos}/>
                    <label class="form-check-label" for="exampleCheck1">Video</label> <br/>
                    <input type="radio" class="form-check-input" id="exampleCheck1" value={2} name="tipo" onChange={gdatos}/>
                    <label class="form-check-label" for="exampleCheck1">Documento</label><br/>
                    <input type="radio" class="form-check-input" id="exampleCheck1" value={3} name="tipo" onChange={gdatos}/>
                    <label class="form-check-label" for="exampleCheck1">otros</label><br/>
                </div>
                <div class="mb-3 text-center">
                    <button type="button" class="btn btn-primary" onClick={Crearqr}>Crear</button>
                </div>
                </form>
                </div> 
            </div> 
    )
}
export default Crear;