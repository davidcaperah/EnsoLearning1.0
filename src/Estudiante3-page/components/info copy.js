import React from 'react';

const Info = () => {

    const ArregloDoc = [
        {id : "1" ,cargo :"Rector", name:"Luis",  img : "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "2" ,cargo :"Coordinador academico", name:"Jorge",  img : "https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "3" ,cargo :"Coordinador Convivencial", name:"Manuel",  img : "https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "4" ,cargo :"Coordinadora academica", name:"Catalina",  img : "https://images.pexels.com/photos/3366753/pexels-photo-3366753.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "5" ,cargo :"Coordinadora Convivencial", name:"Aura",  img : "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}
    ]
    
    const ArregloEst = [
        {id : "1" ,cargo :"Personero", name:"Luis",  info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "2" ,cargo :"Representate del colegio", name:"Jorge",   info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
        {id : "3" ,cargo :"Representate estudiantil", name:"Manuel",  info :"Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"}, 
    ]
    

    return (
        <div>
            <h1 className="text-center text-blue font-chewy mt-5" > Mi institución educativa </h1>
            <div className="d-flex justify-content-center" >
                <img className="img-logo w-25" alt={"Enso Learning "+ArregloEst.cargo} src="https://image.freepik.com/vector-gratis/escuela-logotipo-universidad_20448-163.jpg" />
            </div>
            <div className="container mt-3" >
                <h6 className="text-center" > Sapitos Prueba </h6>
                <p> <span className="h6" > Descripción: </span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? </p>
                <p> <span className="h6" > Teléfono: </span> 3215467821 </p>
                <p> <span className="h6" > Mi curso: </span> 1002 </p>
            </div>
            <div className="container" >
                <h4 className="text-center" > Rectoría y Coordinación</h4>
                <div className="row" >
                    {ArregloDoc.map(Doc =>
                            <div className="col-md-4" key={Doc.id} >
                                <div className="m-2 p-3 shadow rounded" >
                                    <div className="d-flex justify-content-center m-2" > 
                                        <img alt="logo" className="img-card rounded-circle" src={Doc.img} />
                                    </div> 
                                    <h6 className="text-center" > {Doc.name} </h6>
                                    <p> <span className="h6" > Información: </span> {Doc.info} </p>
                                    <p> <span className="h6" > Cargo: </span> {Doc.cargo} </p>
                                </div>
                            </div>
                        )}
                </div>

                <div className="container my-3" >
                    <h4 className="text-center" > Consejo Estudiantíl</h4>
                    <div className="row" >
                    {ArregloEst.map(Doc =>
                            <div className="col-md-4" key={Doc.id} >
                                <div className="m-2 p-3 shadow rounded" >
                                    <h6 className="text-center" > {Doc.name} </h6>
                                    <p> <span className="h6" > Información: </span> {Doc.info} </p>
                                    <p> <span className="h6" > Cargo: </span> {Doc.cargo} </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Info;