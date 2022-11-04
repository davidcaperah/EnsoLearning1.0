import React,{useState, useEffect} from 'react';
import BannerPage from './Page/bannerPage.js';
import axios from 'axios';
import URL from '../../URL';
import Cookies from 'universal-cookie';
import '../css/aulas.css'
const Aula = () => {

    const [Aulas, setAulas] = useState([])
    let CryptoJS = require("crypto-js")
    const cookies =  new Cookies();

    const Desencriptar = (NombreCookie , Llave) => {
        let IdEncriptado =  cookies.get(NombreCookie)
        let bytes  = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let idCurso = Desencriptar("idCurso" , "A")

    const cargarAulas = async () => {
        const consulta = await axios({
            method :"post",
            url : `${URL.servidor}/api-php-react/info_estudiante.php`,
            data : {
                d :7,
                Curso: idCurso
            }
        })
        setAulas(consulta.data)
    }

    useEffect(() => {
        let circulo = document.getElementById("circulo1-aulas-estu1")
        let circulo2 = document.getElementById("circulo2-aulas-estu1")
        circulo.addEventListener('animationend', (e)=>{
            circulo.style.top = "298px"
            circulo.style.left = "401px"
            circulo2.style.top = "449px"
            circulo2.style.left = "114px"
            console.log(circulo2)
        })
        cargarAulas()
    }, [])

    console.log(Aulas)
    return (
        <div>
            <div className='cont-mis-aulas-estudiante-1'>
                <div >
                    <div className='cont-img-estu1-aulas d-flex justify-content-center aling-items-center'>
                        <img alt="robot-ciclo1" src={`${URL.servidor}Archivos_u/iconos/robot.svg`} />
                    </div>
                    <div id="circulo1-aulas-estu1" className='circulo-aulas-estu1'></div>
                    <div id="circulo2-aulas-estu1" className='circulo1-aulas-estu1'></div>
                    
                </div>
                <div className='descri-aulas-estu1'>
                    <h4>Bienvenido a tus aulas</h4>
                    <p>
                        Aqui podras encontrar todas las materias a las que asistes cada semana.
                         !Mira tus notas parciales , actividades pendientes, evaluaciones y 
                         todo lo que aprenderás en este periodo.
                    </p>
                </div>
            </div>
            <div className='con-titulo-estu-1'>
                <h3>En cada aula encontraras una aventura del conocimineto</h3>
            </div>
            <div className='cont-aulas-estu1'>
                {Aulas.map(el =>
                    <div  key={el.id} className='aulas-estu1'>
                        <div id='svg-carpetas-img'>
                            <svg width="152" height="39" viewBox="0 0 152 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_i_1179_2804)">
                                <path d="M0.976685 38.9442L28.5694 1.99958L130.07 0.762025L151.477 37.1092L0.976685 38.9442Z" fill="#868686" fillOpacity="0.9"/>
                                </g>
                                <path d="M129.502 1.76902L149.74 36.1304L2.98942 37.9196L29.0745 2.9935L129.502 1.76902Z" stroke="#2F2F2F" strokeOpacity="0.9" strokeWidth="2"/>
                                <defs>
                                <filter id="filter0_i_1179_2804" x="0.976685" y="0.762024" width="158.501" height="46.1822" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dx="12" dy="12"/>
                                <feGaussianBlur stdDeviation="4"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1179_2804"/>
                                </filter>
                                </defs>
                            </svg>  
                        </div>
                        <div id='svg-carpetas-img1'>
                            <svg width="152" height="39" viewBox="0 0 152 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_i_1179_2804)">
                                <path d="M0.976685 38.9442L28.5694 1.99958L130.07 0.762025L151.477 37.1092L0.976685 38.9442Z" fill="#868686" fillOpacity="0.9"/>
                                </g>
                                <path d="M129.502 1.76902L149.74 36.1304L2.98942 37.9196L29.0745 2.9935L129.502 1.76902Z" stroke="#2F2F2F" strokeOpacity="0.9" strokeWidth="2"/>
                                <defs>
                                <filter id="filter0_i_1179_2804" x="0.976685" y="0.762024" width="158.501" height="46.1822" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dx="12" dy="12"/>
                                <feGaussianBlur stdDeviation="4"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1179_2804"/>
                                </filter>
                                </defs>
                            </svg>  
                        </div>
                        <div>     
                            <h6>{el.materia_name}</h6>  
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Aula;