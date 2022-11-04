import React from 'react'

function instituciones() {

    const colegios = [
        { id: "1", imagen: "https://files.rcnradio.com/public/2021-02/colegios_1.jpg", escudo: "https://www.montessori.edu.co/medellin/images/logo_montessori.png" ,nombre: "Institucion Educativa CEFA", desc:"Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus vivamus lacus scelerisque ante commodo morbi et, placerat taciti habitant pretium inceptos euismod.", opinion: "Los mejores, muy atentos."},
        { id: "2", imagen: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/16/15607190679268.jpg", escudo: "http://www.flacsi.net/wp-content/uploads/2011/12/berchmans-cali-300x298.png", nombre: "Colegio los cristalitos", desc:"Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus vivamus lacus scelerisque ante commodo morbi et, placerat taciti habitant pretium inceptos euismod.", opinion: "siempre estan con nosotros. nunca nos dejan solos y sus diseños son muy creactivos."},
        { id: "2", imagen: "https://culturafotografica.es/wp-content/uploads/2018/01/Vevey.jpg", escudo: "http://www.flacsi.net/wp-content/uploads/2011/12/berchmans-cali-300x298.png", nombre: "Colegio los cristalitos", desc:"Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus vivamus lacus scelerisque ante commodo morbi et, placerat taciti habitant pretium inceptos euismod.", opinion: "siempre estan con nosotros. nunca nos dejan solos y sus diseños son muy creactivos."},
        { id: "2", imagen: "https://www.anep.edu.uy/sites/default/files/images/2021/noticias/marzo/210311/210311_02.jpg", escudo: "http://www.flacsi.net/wp-content/uploads/2011/12/berchmans-cali-300x298.png", nombre: "Colegio los cristalitos", desc:"Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus vivamus lacus scelerisque ante commodo morbi et, placerat taciti habitant pretium inceptos euismod.", opinion: "siempre estan con nosotros. nunca nos dejan solos y sus diseños son muy creactivos."},

    ]
    return (
        <div>
            <div className="bg-dark">
                <div className="container p-5">
                    <div className="text-center text-white align-self-center">
                        <h1 className="font-weight-bolder">Instituciones educativas</h1>
                        <p>Colegios que confian en nuestros servicios.</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="w-75 m-auto p-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, non fermentum quis sociosqu ante cum, vehicula suscipit ullamcorper nibh sagittis curae. Tortor fermentum scelerisque vulputate duis habitasse velit dapibus, hendrerit curae lacus porta pulvinar egestas tempor diam, id blandit etiam molestie congue semper. Porttitor dignissim suspendisse gravida porta ad semper commodo velit in, ullamcorper pulvinar non faucibus odio montes nisi fringilla, lacus mauris bibendum praesent nunc sociosqu vehicula dui.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, non fermentum quis sociosqu ante cum, vehicula suscipit ullamcorper nibh sagittis curae. Tortor fermentum scelerisque vulputate duis habitasse velit dapibus, hendrerit curae lacus porta pulvinar egestas tempor diam, id blandit etiam molestie congue semper. Porttitor dignissim suspendisse gravida porta ad semper commodo velit in, ullamcorper pulvinar non faucibus odio montes nisi fringilla, lacus mauris bibendum praesent nunc sociosqu vehicula dui.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, non fermentum quis sociosqu ante cum, vehicula suscipit ullamcorper nibh sagittis curae. Tortor fermentum scelerisque vulputate duis habitasse velit dapibus, hendrerit curae lacus porta pulvinar egestas tempor diam, id blandit etiam molestie congue semper. Porttitor dignissim suspendisse gravida porta ad semper commodo velit in, ullamcorper pulvinar non faucibus odio montes nisi fringilla, lacus mauris bibendum praesent nunc sociosqu vehicula dui.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, non fermentum quis sociosqu ante cum, vehicula suscipit ullamcorper nibh sagittis curae. Tortor fermentum scelerisque vulputate duis habitasse velit dapibus, hendrerit curae lacus porta pulvinar egestas tempor diam, id blandit etiam molestie congue semper. Porttitor dignissim suspendisse gravida porta ad semper commodo velit in, ullamcorper pulvinar non faucibus odio montes nisi fringilla, lacus mauris bibendum praesent nunc sociosqu vehicula dui.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, non fermentum quis sociosqu ante cum, vehicula suscipit ullamcorper nibh sagittis curae. Tortor fermentum scelerisque vulputate duis habitasse velit dapibus, hendrerit curae lacus porta pulvinar egestas tempor diam, id blandit etiam molestie congue semper. Porttitor dignissim suspendisse gravida porta ad semper commodo velit in, ullamcorper pulvinar non faucibus odio montes nisi fringilla, lacus mauris bibendum praesent nunc sociosqu vehicula dui.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, non fermentum quis sociosqu ante cum, vehicula suscipit ullamcorper nibh sagittis curae. Tortor fermentum scelerisque vulputate duis habitasse velit dapibus, hendrerit curae lacus porta pulvinar egestas tempor diam, id blandit etiam molestie congue semper. Porttitor dignissim suspendisse gravida porta ad semper commodo velit in, ullamcorper pulvinar non faucibus odio montes nisi fringilla, lacus mauris bibendum praesent nunc sociosqu vehicula dui.</p>

                </div>
            </div>


            <div className="Pruebas">
                <div className="container">
                    <div className="row">
                        {colegios.map(colegio =>
                            <div className="col-md-4">
                                <div className="card shadow mb-5">
                                    <div className="imagen-1"><img src={colegio.imagen} alt={"Enso Learning "+colegio.nombre}/></div>
                                    <div className="imagen-2"><img src={colegio.escudo} alt={"Enso Learning "+colegio.nombre}/></div>
                                    <div className="textos">
                                        <hr></hr>
                                        <p className="font-weight-bolder text-center mt-2">{colegio.nombre}</p>
                                        <p className="text-center">{colegio.desc}</p>
                                        <hr></hr>
                                        <p className="text-center"><i>«{colegio.opinion}»</i></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default instituciones
