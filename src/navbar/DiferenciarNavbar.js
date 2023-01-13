import React, {useState , useEffect} from 'react';
import Navbar from './navbar';
import NavbarAdmin from './NavbarAdmin';
import NavbarAcudientes from './NavbarAcudientes';
import NavbarDocentes from './NavbarDocentes';
import NavbarCicloTres from './NavbarCicloTres';
import NavbarCicloDos from './NavbarCicloDos';
import NavbarCicloUno from './NavbarCicloUno';
import NavbarSuper from './NavbarSuper';
import Cookies from 'universal-cookie';
import URL from '../URL';


const DiferenciarNavbar = () => {
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)


    useEffect(()=>{

        const Redirigir = (RutaNoPermitida , RutaRedirigir)=>{
            let HeaderInicial = String(window.location.href)
            if( HeaderInicial === `${URL.compartido}${RutaNoPermitida}`){
                window.location.replace(`${URL.compartido}${RutaRedirigir}`);
            }
        }

        const cookies =  new Cookies();
        let estado = cookies.get('estado')
        if(estado === ''){
                        Redirigir("DocentePage"   , "")
                        Redirigir(""              , "")
                        Redirigir("login"         , "")
                        Redirigir('registro'      , "")
                        Redirigir('FormE'         , "")
                        Redirigir('Login'         , "")
                        Redirigir('FormA'         , "")
                        Redirigir('FormAA'        , "")
                        Redirigir('FormD'         , "")
                        Redirigir("adminformtwo"  , "")
                        Redirigir("adminformthree", "")
                        Redirigir("adminformfour" , "")
                        Redirigir("adminformfive" , "")
                        Redirigir("adminpage"     , "")
        }else{
            if(estado){
                let CryptoJS = require("crypto-js");
                let bytes  = CryptoJS.AES.decrypt(estado, 'B');
                let Sesion = parseInt(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
                switch (Sesion) {
                    case 1:
                        setnumeroInterfaz(1)
                        break;
                    case 2:
                        setnumeroInterfaz(4)
    
                        Redirigir("DocentePage"   , "DocenteInfo")
                        Redirigir(""              , "DocenteInfo")
                        Redirigir("login"         , "DocenteInfo")
                        Redirigir('registro'      , "DocenteInfo")
                        Redirigir('FormE'         , "DocenteInfo")
                        Redirigir('Login'         , "DocenteInfo")
                        Redirigir('FormA'         , "DocenteInfo")
                        Redirigir('FormAA'        , "DocenteInfo")
                        Redirigir('FormD'         , "DocenteInfo")
                        Redirigir("adminformtwo"  , "DocenteInfo")
                        Redirigir("adminformthree", "DocenteInfo")
                        Redirigir("adminformfour" , "DocenteInfo")
                        Redirigir("adminformfive" , "DocenteInfo")
                        Redirigir("adminpage"     , "DocenteInfo")
                        break
    
                    case 3:
                        setnumeroInterfaz(3)
                        Redirigir("DocentePage"   , "Acudientes")
                        Redirigir(""              , "Acudientes")
                        Redirigir("login"         , "Acudientes")
                        Redirigir('registro'      , "Acudientes")
                        Redirigir('FormE'         , "Acudientes")
                        Redirigir('Login'         , "Acudientes")
                        Redirigir('FormA'         , "Acudientes")
                        Redirigir('FormAA'        , "Acudientes")
                        Redirigir('FormD'         , "Acudientes")
                        Redirigir("adminformtwo"  , "Acudientes")
                        Redirigir("adminformthree", "Acudientes")
                        Redirigir("adminformfour" , "Acudientes")
                        Redirigir("adminformfive" , "Acudientes")
                        Redirigir("adminpage"     , "Acudientes")
                        break
                    case 4:
                        setnumeroInterfaz(2)
    
                        Redirigir("adminpage"     , "AdminSchool")
                        Redirigir(""              , "adminpage")
                        Redirigir("login"         , "adminpage")
                        Redirigir('registro'      , "adminpage")
                        Redirigir('FormE'         , "adminpage")
                        Redirigir('Login'         , "adminpage")
                        Redirigir('FormA'         , "adminpage")
                        Redirigir('FormAA'        , "adminpage")
                        Redirigir('FormD'         , "adminpage")
                        Redirigir("adminformtwo"  , "adminpage")
                        Redirigir("adminformthree", "adminpage")
                        Redirigir("adminformfour" , "adminpage")
                        Redirigir("adminformfive" , "adminpage")
                        break
                    case 5:
                        setnumeroInterfaz(7)
    
                        Redirigir("DocentePage"   , "EstudianteOnePage")
                        Redirigir(""              , "EstudianteOnePage")
                        Redirigir("login"         , "EstudianteOnePage")
                        Redirigir('registro'      , "EstudianteOnePage")
                        Redirigir('FormE'         , "EstudianteOnePage")
                        Redirigir('Login'         , "EstudianteOnePage")
                        Redirigir('FormA'         , "EstudianteOnePage")
                        Redirigir('FormAA'        , "EstudianteOnePage")
                        Redirigir('FormD'         , "EstudianteOnePage")
                        Redirigir("adminformtwo"  , "EstudianteOnePage")
                        Redirigir("adminformthree", "EstudianteOnePage")
                        Redirigir("adminformfour" , "EstudianteOnePage")
                        Redirigir("adminformfive" , "EstudianteOnePage")
                        Redirigir("adminpage"     , "EstudianteOnePage")
                      break
                    case 6 :
                        setnumeroInterfaz(6)
                        Redirigir("DocentePage"   , "EstudianteTwoHome")
                        Redirigir(""              , "EstudianteTwoHome")
                        Redirigir("login"         , "EstudianteTwoHome")
                        Redirigir('registro'      , "EstudianteTwoHome")
                        Redirigir('FormE'         , "EstudianteTwoHome")
                        Redirigir('Login'         , "EstudianteTwoHome")
                        Redirigir('FormA'         , "EstudianteTwoHome")
                        Redirigir('FormAA'        , "EstudianteTwoHome")
                        Redirigir('FormD'         , "EstudianteTwoHome")
                        Redirigir("adminformtwo"  , "EstudianteTwoHome")
                        Redirigir("adminformthree", "EstudianteTwoHome")
                        Redirigir("adminformfour" , "EstudianteTwoHome")
                        Redirigir("adminformfive" , "EstudianteTwoHome")
                        Redirigir("adminpage"     , "EstudianteTwoHome")
                        break;
                    case 7 :
                        setnumeroInterfaz(5)
                        Redirigir("DocentePage"   , "EstudianteThreePageHome")
                        Redirigir(""              , "EstudianteThreePageHome")
                        Redirigir("login"         , "EstudianteThreePageHome")
                        Redirigir('registro'      , "EstudianteThreePageHome")
                        Redirigir('FormE'         , "EstudianteThreePageHome")
                        Redirigir('Login'         , "EstudianteThreePageHome")
                        Redirigir('FormA'         , "EstudianteThreePageHome")
                        Redirigir('FormAA'        , "EstudianteThreePageHome")
                        Redirigir('FormD'         , "EstudianteThreePageHome")
                        Redirigir("adminformtwo"  , "EstudianteThreePageHome")
                        Redirigir("adminformthree", "EstudianteThreePageHome")
                        Redirigir("adminformfour" , "EstudianteThreePageHome")
                        Redirigir("adminformfive" , "EstudianteThreePageHome")
                        Redirigir("adminpage"     , "EstudianteThreePageHome")
                        break;
    
                    case 8 : 
                        setnumeroInterfaz(8)
                        Redirigir("DocentePage"   , "AdminInicio")
                        Redirigir(""              , "AdminInicio")
                        Redirigir("login"         , "AdminInicio")
                        Redirigir('registro'      , "AdminInicio")
                        Redirigir('FormE'         , "AdminInicio")
                        Redirigir('Login'         , "AdminInicio")
                        Redirigir('FormA'         , "AdminInicio")
                        Redirigir('FormAA'        , "AdminInicio")
                        Redirigir('FormD'         , "AdminInicio")
                        Redirigir("adminformtwo"  , "AdminInicio")
                        Redirigir("adminformthree", "AdminInicio")
                        Redirigir("adminformfour" , "AdminInicio")
                        Redirigir("adminformfive" , "AdminInicio")
                        Redirigir("adminpage"     , "AdminInicio")
                        break;        
                    
                    default : 
                        setnumeroInterfaz(1)
                  }
            }else{
                setnumeroInterfaz(1)
                Redirigir("adminpage", "")
                Redirigir("DocentePage", "")
                Redirigir("Acudientes", "")
                Redirigir("EstudianteOnePage/Principal", "")
                Redirigir("EstudianteTwoHome", "")
                Redirigir("EstudianteThreePageHome", "")
        }
       
        
        }
    },[])
  
    return (
        <div>  
            {numeroInterfaz === 1 ? <Navbar/>       : null    }
            {numeroInterfaz === 2 ? <NavbarAdmin /> : null    }
            {numeroInterfaz === 3 ? <NavbarAcudientes /> : null }
            {numeroInterfaz === 4 ? <NavbarDocentes /> : null }
            {numeroInterfaz === 5 ? <NavbarCicloTres /> : null }
            {numeroInterfaz === 6 ? <NavbarCicloDos /> :null}
            {numeroInterfaz === 7 ? <NavbarCicloUno /> :null}
            {numeroInterfaz === 8 ? <NavbarSuper /> :null}
        </div>
    );
}
 
export default DiferenciarNavbar;