import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../URL';
import Cookies from 'universal-cookie';
import '../css/aulas.css' 
const Aula = () => {

    const [Aulas, setAulas] = useState([])
    let CryptoJS = require("crypto-js")
    const cookies = new Cookies();

    const Desencriptar = (NombreCookie, Llave) => {
        let IdEncriptado = cookies.get(NombreCookie)
        let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave)
        let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return Datos
    }

    let idCurso = Desencriptar("idCurso", "A")

    const cargarAulas = async () => {
        const consulta = await axios({
            method: "post",
            url: `${URL.servidor}/api-php-react/info_estudiante.php`,
            data: {
                d: 7,
                Curso: idCurso
            }
        })
        setAulas(consulta.data)
    }

    useEffect(() => {
        cargarAulas()
    }, [])

    return (
        <div>
            <div id="deco-engranaje1-aula">
                <img src={`${URL.servidor}Archivos_u/iconos/engranaje-deco.svg`}/>
            </div>
            <div id="deco-engranaje2-aula">
                <img src={`${URL.servidor}Archivos_u/iconos/engranaje-deco.svg`}/>
            </div>
            <div id="deco-engranaje3-aula">
                <img src={`${URL.servidor}Archivos_u/iconos/engranaje-deco.svg`}/>
            </div>
            <div id="deco-engranaje4-aula">
                <img src={`${URL.servidor}Archivos_u/iconos/engranaje-deco.svg`}/>
            </div>
            
            <div className='con-info-aulas2'>
                <div>
                    <h4>Bienvenido a tus aulas</h4>
                    <p>
                        Aquí podrás encontrar todas las materias a las que asistes cada semana. 
                        ¡Mira tus notas parciales, actividades pendientes, evaluaciones y todo 
                        lo que aprenderás en este periodo
                    </p>
                </div>
            </div>
            <div className='cont-aulas-estu2'>
                {Aulas.map(math =>
                <div key={math.id}>
                    <div>Aula de {math.materia_name}</div>
                </div>
                )}   
            </div>
        </div>

    );
}


/*

    <div className="bg-pink pb-5" >
            <BannerPage text="Aquí podrás encontrar todas las materias a las que asistes cada semana. ¡Mira tus notas parciales, actividades pendientes, evaluaciones y todo lo que aprenderás en este periodo!" welcome="¡Bienvenido a tus aulas!" img={kids} />
            <div>
                {Aulas.length === 0 ?
                    <div className="shadow p-3 m-5 w-50 m-auto" >
                        <h6 className="text-center"> <strong>No tienes aulas asignadas en el momento!</strong> </h6>
                    </div>
                    :
                    <div className="container mt-3" >
                        {Aulas.map(math =>
                            <div key={math.id} id={math.id} >
                                <div className="shadow p-3 m-2" >
                                    <div className="p-3 rounded bg-pink-2 my-2" >
                                        <p className="h1 text-center text-lucky" > <strong> {math.materia_name} </strong>   </p>
                                    </div>

                                    <div className="row" >
                                        <div className="col-md-4" >
                                            <div className="p-2" >
                                                <p className="h5 mt-3" > <strong> {math.Pro_name} {math.Pro_apellidos} </strong></p>
                                                <p> {math.descr} </p>
                                            </div>
                                        </div>

                                        <div className="col-md-8 row" >
                                            <div className="col-md-6">
                                                <div className="shadow m-1 pointer Areas" >
                                                    <img className="w-100" src="https://img.freepik.com/free-vector/tiny-people-analysts-evaluating-ability-prospective-debtor-pay-debt-credit-rating-credit-risk-control-credit-rating-agency-concept-illustration_335657-2393.jpg?size=626&ext=jpg&ga=GA1.2.2040533175.1630454400" alt="" />
                                                    <h6 className="text-center my-2" >  <strong>  Planilla Estudiantil </strong> </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="shadow m-1 pointer Areas" >
                                                    <img className="w-100" src="https://en.pimg.jp/060/737/731/1/60737731.jpg" alt="" />
                                                    <h6 className="text-center my-2" >  <strong>  Malla Curricular </strong> </h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
*/
export default Aula;