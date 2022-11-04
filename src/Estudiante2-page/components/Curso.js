import React,{useEffect,useState} from 'react';
import BannerPage from './bannerPage';
import team from "../img/kids.svg";
import axios from 'axios';
import URL from '../../URL';
import Cookies from 'universal-cookie';
import '../css/curso.css'

const Curso = () => {

    const [DatosCurso, setDatosCurso] = useState({})
    const [Estudiantes, setEstudiantes] = useState([])

    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let idCurso = Desencriptar("idCurso" , "A")


    const cargarDatosCurso = async () => {
        const consulta = await axios({
            method : "post",
            url  : `${URL.servidor}/api-php-react/info_estudiante.php`,
            data : {
                d : 8 ,
                Curso: idCurso
            }
        })
        setDatosCurso(consulta.data[0])
    }

    const cargarEstudiantes = async () => {
        const consulta = await axios({
            method : "post",
            url  : `${URL.servidor}/api-php-react/info_estudiante.php`,
            data : {
                d : 9 ,
                Curso: idCurso
            }
        })
        setEstudiantes(consulta.data)
    }
    

    useEffect(() => {
        cargarEstudiantes()
        cargarDatosCurso()
    }, [])



    return (
        <div>
            <img id="fondo-curso-estu2" src={`${URL.servidor}Archivos_u/iconos/rombo-fondo-estu2.svg`}/>
            <div className='con-info-aulas2'>
                <div>
                    <h4 className='titu-estu2-evalu'>Bienvenido a tus Curso</h4>
                    <p className='con-descri-evaluaciones-estu2'>
                        En este espacio podrás encontrar a tus compañeros de curso
                        ver tu promedio e interactuar con tu docente director de curso
                    </p>
                </div>
            </div>
      

        <div className='curso-info-estu2' >
            <div className='cont-info-curso-estu2'>
                <div> 
                    <h5>Tu Curso</h5>
                    <p>{DatosCurso.Curso_Nu}</p>
                </div>
                <div className='borde-curso-info'>
                    <h5> Jornada</h5>
                    <p>{DatosCurso.jornada === 1 ? "Tarde" : "Mañana"}</p>
                </div>
                <div>
                    <h5>Total Estudiantes</h5>
                    <p> {DatosCurso.Can_Est}</p>
                </div>
            </div>
            <div className='cont-contac-curso-estu2' >
                <h5>Director de curso</h5>
                <p>Juan andres quintero</p>
                <div>
                    <img src={`${URL.servidor}Archivos_u/iconos/mensaje-estu.svg`}/>
                    Enviar mensaje
                </div>
            </div>
        </div>

        <div className="tablero-estu2-curso">
            <div className="tablero-curso2-circulo-estu2">
                <img src={`${URL.servidor}Archivos_u/iconos/tornillo.svg`} />
                <img src={`${URL.servidor}Archivos_u/iconos/tornillo.svg`} />
                <img src={`${URL.servidor}Archivos_u/iconos/tornillo.svg`} />
            </div>
            <div className="cont-info-tablero-estu2">
            <div className='titu-rankig-curso-estu1'>
                <h4>Tablero curso</h4>
                <p>
                *Estas viendo el ranking de tus compañeros recuerda
                 que puedes acumular tus diamantes para canje en la 
                 seccion de juegos interactivos.
                </p>
            </div>

            <div className='cont-list-ranking-curso-estu1'>
                    <div className='ul-nombre-curso-estu1'>
                        <ul>
                        {Estudiantes.map((Compa,index) =>
                            <li  key={index}>{Compa.Nombre} {Compa.Apellido}</li>
                        )}
                        </ul>
                    </div>
                    <div className='ul-puntos-curso-estu1'>
                        <ul>
                        {Estudiantes.map((Compa,index) =>
                            <li key={index}>{Compa.Puntos} <img src={`${URL.servidor}Archivos_u/iconos/diamante-azul.svg`}/></li>
                        )}
                                
                        </ul>
                    </div>
                </div>

            
            </div>
      </div>
            

            
        
    </div>
    );
}

/*

<div className="bg-pink pb-5" >
            <BannerPage img={team} welcome="Bienvenido, aquí podrás ver tu curso y ver su promedio y tu docente director de curso." text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?" />
            <div className="container" >
                <div className="shadow rounded p-4 m-2" key={DatosCurso.idCurso} >
                    <p><span className="h6" > Tú curso: </span> {DatosCurso.Curso_Nu} </p>
                    <p><span className="h6" > Número de estudiantes: </span> {DatosCurso.Can_Est} </p>
                    <p><span className="h6" > Promedio: </span> {DatosCurso.promedio}  </p>
                </div>

                <div className="shadow rounded mt-5 p-3" >
                    <h5 className="text-center font-chewy h3" > Mis Compañeros </h5>
                    <div className="m-2 mt-5 " >   
                        {Estudiantes.map((Compa) =>
                        <div key={Compa.id}className="d-flex justify-content-between" > 
                            <p className="w-25" > - {Compa.Nombre} {Compa.Apellido} </p>
                            <p> {Compa.promedio} </p>
                            <div className="d-flex" >
                                <p className="text-center" > {Compa.Puntos} </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ml-2 bi bi-gem" viewBox="0 0 16 16">
                                    <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
                                </svg>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            
            </div>
        </div>
*/
 
export default Curso;