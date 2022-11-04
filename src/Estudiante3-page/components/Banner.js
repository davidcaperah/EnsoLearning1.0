import React from 'react';

const Banner = ({text, welcome , img , textw , welcomeb, nombre=""}) => {
    return (
        <div>
            <div className="container" >
                <div className="row pt-5" >
                    <div className="col-md-6">
                        <div className="m-2 p-3 mt-5" >
                            <h1 className="font-chewy text-warning" > {welcome}{nombre+"!"} <span className="text-blue" > {welcomeb} </span> </h1>
                            <p> {text} <span className="text-warning" >  {textw} </span>  </p>
                            <hr className="line w-25 bg-warning" ></hr>
                            <hr className="line w-50 bg-blue" ></hr>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2 p-3 d-flex justify-content-center mt-3" >
                            <img alt={"Enso Learning "+welcome} className="img-banner-60 rounded-circle" src={img} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Banner;