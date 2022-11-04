import React from "react";
import {Link} from 'react-router-dom'

// Estilos
import './r404.css';

// Material
import Button from '@material-ui/core/Button';
// revisar la compatibilidad de este boton ya que es el que causa el error
console.log(Button)



const NotFound = () => (
    <div className="error">
        <h1>Página no encontrada</h1>
        <h2 className="e404">Error 404</h2>
        <Button variant="contained" component={Link} to="/" color="primary">Ir al inicio</Button>
    </div>
);

export default NotFound;