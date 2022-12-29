/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React, { useState} from 'react';
const CrearColegio = () => {
    const [estado, setestado] = useState(0)
    console.log("🚀 ~ file: CrearColegio.jsx:12 ~ CrearColegio ~ estado", estado)
    return (
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
export default CrearColegio;