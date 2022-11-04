import React from 'react';

const Footer = () => {
    return (
        <div className="bg-dark pt-5" >
            <div className="container" >
                <div className="row" >
                    <div className="col-md-4" >
                        <p className="text-white h6" >Productos </p>
                        <p className="text-secondary" > Nuestros libros </p>
                        <p className="text-secondary" > Mallas estudiantiles </p>
                        <p className="text-secondary" > Planes </p>
                        <p className="text-secondary" > Pruebas pre icfes </p>
                    </div>
                    <div className="col-md-4" >
                        <p className="text-white h6" > Atención al cliente</p>
                        <p className="text-secondary" > +57 3207832146</p>
                        <p className="text-secondary" > companyEnso@gmail.com </p>
                        <p className="text-secondary pointer" > H&G web </p>
                    </div>
                    <div className="col-md-4" >
                        <p className="text-white h6" > Servicios</p>
                        <p className="text-secondary" > Desarrollo de software </p>
                        <p className="text-secondary" > Publicidad </p>
                        <p className="text-secondary" > Desarrollo Web  </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;