import React,{useState} from 'react';
import './navbar.css';
import Logo from '../assets/img/VBBV.svg'

const Navbar = () => {

  const [MenuRes, setMenuRes] = useState(false)

  return (
      <div className="bg-light px-5" >

        <div className="containerMenuResponsive p-3" >
            <div className="row" >
                <div className="col-4" >
                  <div className="d-flex justify-content-start" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list pointer" viewBox="0 0 16 16" onClick={()=>  MenuRes? setMenuRes(false): setMenuRes(true) } >
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </div>
                </div>
                <div className="col-8" >
                  <h6 className="mt-2 text-lucky h5" > Enso Learning </h6>
                </div>
            </div>
        </div>

          <div className="row  containerMenu" > 
              <div className="col-lg-4" >
                <div className="d-flex justify-content-center pointer" onClick={()=> window.location.replace("/") } >
                    <img src={Logo} className="w-25" alt="Enso learning logo" />
                </div>
              </div>
              <div className="col-lg-4" >
                  <div className="d-flex justify-content-center mt-1">
                      <p className="p-3 mt-4 pointer Areas text-center" onClick={()=> window.location.replace("/Nosotros") } > Nosotros </p>
                      <p className="p-3 mt-4 pointer Areas text-center" onClick={()=> window.location.replace("/Servicios") } > Servicios    </p>
                      <p className="p-3 mt-4 pointer Areas text-center" onClick={()=> window.location.replace("/Contacto") } > Contáctanos    </p>
                  </div>
              </div>
              <div className="col-lg-4" >
                <div className="d-flex justify-content-center mt-4" >
                  <button className="btn btn-outline-dark m-2" onClick={()=> window.location.replace("/login") } > Inicia Sesión </button>
                  <button className="btn btn-outline-dark m-2" onClick={()=> window.location.replace("/registro") } > Registrate </button>
                </div>
              </div>
          </div>

          {MenuRes ? 
            <div className="MenuResContainer bg-light " >
              <div className="col-lg-4" >
                  <p className="p-2 pointer Areas " onClick={()=> window.location.replace("/Nosotros") } > Nosotros </p>
                  <p className="p-2 pointer Areas " onClick={()=> window.location.replace("/Servicios") } > Servicios    </p>
                  <p className="p-2 pointer Areas " onClick={()=> window.location.replace("/Contacto") } > Contáctanos    </p>
              </div>
              <div className="col-lg-4" >
                  <button className="btn btn-outline-dark m-2" onClick={()=> window.location.replace("/login") } > Inicia Sesión </button>
                  <button className="btn btn-outline-dark m-2" onClick={()=> window.location.replace("/registro") } > Registrate </button>
              </div>
            </div>
          : null}

      </div>
  );
}
 
export default Navbar;

 