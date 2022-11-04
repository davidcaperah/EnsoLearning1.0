import React,  {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import uuid from 'react-uuid';
import URL from '../../../URL.js';
import Swal from 'sweetalert2'
import axios from 'axios';
import AdminFormFour from './adminformfour.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const AdminFormTwo = ({id}) => {

    const classes = useStyles();
    const [datosProps, setdatosProps] = useState({})
    const [Validacion, setValidacion] = useState(true)

    const [Datos, setDatos] = useState({
        Nombre : "",
        Info : "",
        Telefono : "",
        Codigo : uuid(),
        id
    })

    const onChange = (e)=>{
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim()
        });
    }

    const {Nombre, Telefono , Info} = Datos;


    const NoRecargar = async (e) => {
        e.preventDefault()
        if(Nombre && Telefono && Info){
            const consulta = await axios({
                method : "post",
                url : `${URL.servidor}/api-php-react/guardar_col.php`,
                data : Datos
            })
            if(consulta.data.id){
                const idCol = consulta.data.id
                setdatosProps({
                    id,
                    colegio : idCol
                })
                setValidacion(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Datos guardados correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })

            }else{
                Swal.fire({
                    icon: 'error',
                    text: consulta.data.mensaje
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



    return (
        <div>
            { Validacion? 
                <div className="container " >
                    <div className="mt-3 row shadow-lg rounded" >
                        <div className="col-md-6 p-5" >
                            <h3 className="text-center" > Bienvenido a kid school </h3>
                            <p className="text-center"  > Por favor llena los siguientes campos, para continuar con el registro. </p>
                            <form  onSubmit={NoRecargar}  >
                                <hr className="line bg-pink" ></hr>
        
                                <input  className=" form-control mb-2 "        name="Nombre"  onChange={onChange}  type="text" minLength="1" maxLength="40"     required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"   placeholder="Nombre de la institución" />
                                <input  className=" form-control mb-2 "        name="Telefono"  onChange={onChange}  type="number" minLength="6" maxLength="13" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"   placeholder="Telefono de la institución" />
                                <textarea placeholder="Info de la institución" name="Info"  onChange={onChange}  type="text" minLength="30" maxLength="250"     required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"    className="form-control col-sm-12 mb-2"
                                > 
                                </textarea>
        
                                <p className="text-muted" > ¡No le envies este codigo a nadie, puesto a que este código hará que puedas iniciar sesión como único administrador!</p>
                                <div className="alert alert-info" > 
                                    {Datos.Codigo}
                                </div>
        
                                <Button 
                                variant="contained"
                                color="secondary"
                                className={`${classes.button} CeroBootstrap ml-2 my-3`}
                                type="submit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" className=" bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                    </svg>                       
                                </Button>
                            </form>    
        
        
                        </div>
        
                        <div className=" col-md-6 bg-dark" >
                        </div>
        
                    </div>
                </div>
            :
                <AdminFormFour  datos={datosProps} />
            }
        </div>

    );
}
 
export default AdminFormTwo;