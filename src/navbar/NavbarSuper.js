import React from 'react';
import Menu from '../SuperUsuario/components/Menu';
import '../SuperUsuario/css/index.css';
import Rutas from '../SuperUsuario/router';

const NavbarSuper = () => {
    return(
        <div className="bg-fondo p-4" >
            <div className="shadow-lg" > 
                <div className="row" >
                    <div className="col-lg-3" >
                        <Menu />
                    </div>
                    <div className="col-lg-9" >
                        <div className="p-2 m-3 " >
                            <Rutas />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarSuper