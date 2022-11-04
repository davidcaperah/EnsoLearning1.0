import React from 'react';
// import URL from '../../URL.js';


const BannerPage = ({img , welcome , text}) => {
    return (
        <div>
            <div className="container" >
                <div className="row pt-5" >
                    <div className="col-md-6">
                        <div className="m-2 p-3 mt-5" >
                            <h1 className="font-chewy" > {welcome} </h1>
                            <p> {text} </p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2 p-3 d-flex justify-content-center mt-3" >
                            <img alt={"Enso Learning "+welcome} className="img-banner-60 rounded-circle" src={img} />
                            {/*  src={`${URL.servidor}${img}`} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default BannerPage;