import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import URL from "./../../../URL";
import Swal from "sweetalert2";
const Crear = (e) => {
    const [form, setform] = useState({link:e.datos.link,Nombre:e.datos.Nombre, d: 4, id: e.datos.id})
    console.log("🚀 ~ file: Editar_QR.jsx:8 ~ Crear ~ form", form)
    const cookies = new Cookies();
    let Usuario = cookies.get("iduser");
    let CryptoJS = require("crypto-js");
    let bytes = CryptoJS.AES.decrypt(Usuario, "A");
    let iduser = parseInt(bytes.toString(CryptoJS.enc.Utf8));
    const EnviarDatos = async (es) =>{
        es.preventDefault();
        let idCurso = JSON.stringify(form);
        const api = axios.create({ baseURL: URL.servidor });
        const response = await api.post(
          "/api-php-react/admin/cr_QR.php",
          idCurso
        );
        const data = response.data;
        if(data){
            Swal.fire({
                icon: 'success',
                title: 'Exitoso!',
                text: 'Se a editado el link correctamente',
                confirmbuttonText: 'Entendido'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    e.vista(1);
                }
              })
        }
    }
    const gdatos = (e) =>{
        setform({...form,
            [e.target.name]:e.target.value,
        })
    }
    return (
        <div className="row">
            <div className="col-md-12">
                {e.datos ? (
                    <div>
                        <form onSubmit={EnviarDatos}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Link</label>
                                <input type="text" onChange={gdatos} name="link" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={e.datos.link} />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Nombre</label>
                                <input type="text" onChange={gdatos} name="Nombre" className="form-control" id="exampleInputPassword1" placeholder={e.datos.Nombre}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                ) : (
                    <h1>No hay datos</h1>
                )}
            </div>
        </div>
    );
};
export default Crear;
