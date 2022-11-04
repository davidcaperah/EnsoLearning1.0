import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import URL from '../../URL'
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const FormAcudiente = () => {
    const classes = useStyles();

    const [Datos, setDatos] = useState({});

    const onChange = (e)=>{
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value
        });
    }

    async function NoRecargar (e) {
        e.preventDefault()
         let DatosJson = JSON.stringify(Datos)
         console.log(DatosJson)

         
             //Envía configuración de json 
             let Configuracion = {
                 method : 'POST',
                 headers : {
                     'Accept' : 'application/json',
                     'Content-Type' : 'application/json'
                 },
                 body : DatosJson
             }
             
            //Envía datos de json a la api
            let res = await fetch(`${URL.servidor}/api-php-react/guardar_col.php`, Configuracion)
            console.log(res)
            let json1 = res.json()

            console.log(json1)

        
    }


    return (
        <div className="container" >
            <h3> Bienvenido </h3>
            <p> Nos da gusto que quieras usar nuestra plataforma, te pedimos que llenes los siguientes campos </p> 
            <div className="row shadow rounded my-4" > 
                <div className="col-md p-4" >
                    <form  onSubmit={NoRecargar} > 
                        <input className="form-control m-2" name="Nombres"   onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="text"     placeholder="Nombres" />
                        <input className="form-control m-2" name="Apellidos" onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="text"     placeholder="Apellidos" />
                        <input className="form-control m-2" name="Email"     onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="email"     placeholder="Correo eléctronico" />
                        <input className="form-control m-2" name="CC"        onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="number"   placeholder="Documento de identidad" />
                        <input className="form-control m-2" name="pass1"     onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="password" placeholder="Contraseña" />
                        <input className="form-control m-2" name="pass2"     onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="password" placeholder="Valida tu Contraseña" />
                        <input className="form-control m-2" name="Codigo"    onChange={onChange} minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="text"     placeholder="Codigo de Validación" />
                        <p className="text-muted" > Recuerda que debes tener un codigo de validación, si no cuentas con uno, comunicate con tu docente acargo.</p>

                        <Button
                            variant="contained" 
                            type="submit"
                            color="primary"
                            className={`${classes.button} CeroBootstrap`}
                            name="submit"
                        >
                            Aceptar 
                        </Button>
                    </form> 
                </div>
                <div className="col-md bg-dark" > 
                </div>
            </div>

        </div>
    );
}
 
export default FormAcudiente;