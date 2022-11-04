import React from 'react'

function BannerNostros({imagen, titulo, texto,}) {
    return (
        <div>
            <div className="bg-dark">
                <div className="container p-2">
                    <div className="row">
                        <div className="col-md-6 text-center text-white align-self-center">
                            <h1>{titulo}</h1>
                            <p>{texto}</p>
                        </div>
                        <div className="col-md-6">
                            <img src={imagen} alt={"Enso Learning "+titulo} className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerNostros
