import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function Ayuda() {

    const [Datos, setDatos] = useState({});


    const Escribir = (e) => {
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value.trim(),
        });
    }
    return (
        <div className="col-md-8" >
            <div className="shadow m-2 p-3 pt-5 bg-light " >
                <h2 className="font-chewy  text-warning p-2 text-center">¡Estamos contigo!</h2>
                <p className="text-center">Si deseas contactarnos por favor dejanos tu dificultad o duda y con mucho gusto te la resolvemos.</p>
                <div className="m-5 w-100 h-5 m-auto  mt-7" >
                    <form className=" w-75 m-auto mt-7 p-2 text-center" >
                        <textarea className="form-control m-2 hei-text-area" name="Apellidos" onChange={Escribir} minLength="5" required pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+" type="text" placeholder="Problema, duda o dificultad que tengas..." />                                                <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            name="submit"
                            className="mt-4 mb-4 text-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="80"
                                height="30"
                                fill="currentColor"
                                className=" bi bi-arrow-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                />
                            </svg>
                        </Button>
                    </form>
                </div>
                <div className="pt-5 mt-5">
                    <h2 className="font-chewy text-warning p-2 text-center">Preguntas frecuentes</h2>
                    <ol>
                        <li className="font-chewy lead"> ¿Quien eres?</li>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, elementum lacus non hendrerit lectus habitant curae velit, netus mauris tempus rhoncus himenaeos vel. Volutpat pulvinar congue morbi nibh magnis maecenas at curae pretium nec rhoncus hendrerit massa, tempus dictum euismod erat auctor ut curabitur varius ante velit ullamcorper. Mauris porta eget vivamus nam class nisl consequat gravida tempus orci, malesuada dictum per etiam integer condimentum torquent tempor. Mattis eget curae massa nibh aliquet urna tristique sociosqu tortor, quis laoreet dignissim leo magna ut non fames maecenas, ultricies lacus litora viverra suspendisse interdum magnis egestas.</p>
                        <li className="font-chewy lead"> ¿Quien eres?</li>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, elementum lacus non hendrerit lectus habitant curae velit, netus mauris tempus rhoncus himenaeos vel. Volutpat pulvinar congue morbi nibh magnis maecenas at curae pretium nec rhoncus hendrerit massa, tempus dictum euismod erat auctor ut curabitur varius ante velit ullamcorper. Mauris porta eget vivamus nam class nisl consequat gravida tempus orci, malesuada dictum per etiam integer condimentum torquent tempor. Mattis eget curae massa nibh aliquet urna tristique sociosqu tortor, quis laoreet dignissim leo magna ut non fames maecenas, ultricies lacus litora viverra suspendisse interdum magnis egestas.</p>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Ayuda
