import React, { useEffect, useState, useMemo } from 'react';
import URL from '../../URL'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Logo from '../../assets/img/VBBV.svg';
import { useDispatch, useSelector } from 'react-redux';
import decode from '../../utils/decode';


const Header = ()=>{
    const dispatch = useDispatch();

    const Docente = useSelector(state => state.user);

    const [abrirMenu , setAbrirMenu] = useState(0);

    const cookies = new Cookies();

    let IdDoc = decode('iduser', 'A');

    const DatosDoc = useMemo(()=>({
        id: IdDoc
    }), [IdDoc])
    
    useEffect(() => {
        const EnviarDocente = async () => {
            let idDocente = JSON.stringify(DatosDoc)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/Cargar_proid.php', idDocente);
            dispatch({
                type: "@addDatauser",
                user: response.data
            })
        }

        EnviarDocente()
    }, [dispatch, DatosDoc]);


    const CerrarSesion = () =>{
        cookies.remove("estado")
        cookies.remove("iduser")
        cookies.remove("colid")
        cookies.remove("idcol")
        cookies.remove("idCurso")
        cookies.remove("idMateria")
        window.location.replace(URL.compartido);
    }

    const menu  = ()=>{
      abrirMenu === 0 ?setAbrirMenu(1):setAbrirMenu(0)
        
    }

    return(
        <div className='cont-header'>
            <div>
                <img src={Logo} className='logo' alt='logo'/>
            </div>
            <div className='con-ico-header-pri'>
                <div className='cont-ico-header'>
                    <img src={`${URL.servidor}Archivos_u/iconos/mensajes.svg`} alt="message"/>  
                </div>
               <div className='cont-ico-header' >
                    <img src={`${URL.servidor}Archivos_u/iconos/campana1.svg`} alt="campana"/>  
                </div>   
            </div>
            <div className='cont-infoDocente'>
                <div >
                {Docente.imagen?
                            <div>
                                <img className="foto-perfilDoce" src={`${URL.servidor}${Docente.imagen}` } alt="Logo" />
                            </div>
                            :
                            <div>
                                <img className="foto-perfilDoce" src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`} alt="logo student"/> 
                            </div>
                        } 
                </div>
                <div className='cont-nombreDocente'>
                    <p>{`${Docente.Nombre} ${Docente.apellido}`} <br/> Coordinador</p>
                </div>
                <div className='sub-menu-header'>
                    <img onClick={menu} src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`} alt="logo arrow down"/>
                </div>
                    {
                        abrirMenu === 1 ?
                        <div className='menu-des-header'>
                            <div>
                                <img src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`} alt="logo arrow up"/>
                                <a href='/DocenteInfo'>Mi perfil</a>
                            </div>
                            <div>
                                <img src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`} alt="logo arrow down"/>
                                <p onClick={CerrarSesion} >CerrarSesion</p>
                            </div>
                        </div>
                        : null
                    }
            </div>
        </div>
    )
}

export default Header