import React from 'react';
import logo from '../../../assets/img/logomallas.png'

const Navbar = () => {
    return (
        <div className="row w-100">
            <div className="col-md-3" >
                <div  className="d-flex justify-content-start" >
                    <img  className="img-logo-mallas" src={logo} alt="" />
                    <h5 className="text-blue-mallas mt-4 ml-2" > Editorial H&G SAS </h5>
                </div>
            </div>
            <div className="col-md-6" >
                <h2 className="text-center text-blue-mallas"> MALLA CURRICULAR PROYECTO EXPLORER 2022  </h2>
            </div>
            <div className="col-md-3" >
                <div className="border-green p-3 m-2 rounded" >
                    <h5 className="text-blue-mallas text-center" >CICLO 3: 5 A 7 GRADO </h5>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;