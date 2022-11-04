import React,  {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import URL from '../../URL.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import AdminFormTwo from './homes/adminformtwo.js';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const FormAdmin = () => {
    const [Validacion, setValidacion] = useState(true)
    const [id, setid] = useState(0)
    const [Datos, setDatos] = useState({
        "Nombres"    : "",
        "Apellidos"  : "",
        "email"      : "",
        "CC"         : "",
        "pass1"      : "",
        "pass2"      : "",
        "Codigo"     : ""
    });

    const onChange = (e)=>{
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim()
        });
    }


    const NoRecargar = async (e) => {
        e.preventDefault()

        if( Datos.Nombres !== "" && Datos.Apellidos !== "" && Datos.email !== "" && Datos.CC !== ""){
            if(Datos.pass1 === Datos.pass2){
                const consulta = await axios({
                    method : "post",
                    url : `${URL.servidor}/api-php-react/guardar_cor.php`,
                    data : Datos
                })
                console.log(consulta);

                if(consulta.data.id){
                    const id = consulta.data.id
                    setid(id)
                    setValidacion(false)
                    
                }else if(consulta.data.mensaje) {
                    Swal.fire({
                        icon: 'error',
                        text: consulta.data.mensaje
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseñas desiguales',
                    text: '¡las contraseñas no son iguales!'
                })
            }
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Campos Vacios',
                text: '¡Recuerda llenar todos los campos!'
            })
        }
    }


    const classes = useStyles();

    
    return (
        <div>
            { Validacion? 
                    <div className="container" >
                        <div className="row my-5  shadow rounded" >
                            <div className="col-md-5 bg-dark " ></div>
                            <div className="col-md-7 p-3" >
                                <h3 className="m-2" > Bienvenido </h3>
                                <p  className="m-2" > Nos da gusto que quieras usar nuestra plataforma, te pedimos que llenes los siguientes campos.</p> 
                                <form  onSubmit={NoRecargar}   > 
                                    <input className="form-control m-2"  onChange={onChange}  name="Codigo"       minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="text"     placeholder="Codigo de Validación"      />
                                    <input className="form-control m-2"  onChange={onChange}  name="Nombres"      minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="text"     placeholder="Nombres"                />
                                    <input className="form-control m-2"  onChange={onChange}  name="Apellidos"    minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text"     placeholder="Apellidos"              />
                                    <input className="form-control m-2"  onChange={onChange}  name="email"        minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"   type="email"    placeholder="Correo eléctronico"     />
                                    <input className="form-control m-2"  onChange={onChange}  name="CC"           minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="number"   placeholder="Documento de identidad" />
                                    <input className="form-control m-2"  onChange={onChange}  name="pass1"        minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="password" placeholder="Contraseña"             />
                                    <input className="form-control m-2"  onChange={onChange}  name="pass2"        minLength="5" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"  type="password" placeholder="Valida tu Contraseña"      />
                                    <p className="m-2" >  Recuerda que debes tener un codigo de validación, si no cuentas con uno, puedes conseguir uno facilmente    aquí: <span className="text-primary" > Subscripciones  </span>  </p>
                                    <Button
                                        variant="contained" type="submit" color="secondary" 
                                        className={`${classes.button} CeroBootstrap`}
                                        name="submit">
                                        Aceptar 
                                    </Button>
                                </form> 
                            </div>
                        </div>
                    </div>
            
            :
                <AdminFormTwo id={id} />
            }
        </div>
    );
}


export default FormAdmin;