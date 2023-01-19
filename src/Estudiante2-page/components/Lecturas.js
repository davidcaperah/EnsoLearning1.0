import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerPage from "./bannerPage";
import kids from "../img/kids.svg";
import axios from "axios";
import URL from "../../URL";
import Cookies from "universal-cookie";

const Aula = () => {
  const [Aulas, setAulas] = useState([]);
  const navigate = useNavigate();
  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  const Desencriptar = (NombreCookie, Llave) => {
    let IdEncriptado = cookies.get(NombreCookie);
    let bytes = CryptoJS.AES.decrypt(IdEncriptado, Llave);
    let Datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return Datos;
  };

  let idCurso = Desencriptar("idCurso", "A");

  const cargarAulas = async () => {
    const consulta = await axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/info_estudiante.php`,
      data: {
        d: 7,
        Curso: idCurso,
      },
    });
    setAulas(consulta.data);
  };
  const cargarlibro = async (d) => {
    const consulta = await axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/info_estudiante.php`,
      data: {
        d: 10,
        id: d,
      },
    });
    console.log(consulta);
    var url = consulta.data[0];
    var url1 = url.libro;
    var url2 = "https://books.enso-learning.com.co/?direc=" + url1;
    window.location.replace(url2);
  };
  useEffect(() => {
    cargarAulas();
  }, []);

  return (
    <div className="bg-pink pb-5">
      <div
        onClick={() => navigate("/EstudianteTwoHome")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          border: "2px solid #000",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
        }}
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Layer 1</title>
            <line
              id="svg_2"
              y2="358"
              x2="331"
              y1="358"
              x1="334"
              stroke="#000"
              fill="none"
            />
            <line
              id="svg_3"
              y2="360"
              x2="41"
              y1="360"
              x1="42"
              stroke="#000"
              fill="none"
            />
            <line
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              id="svg_1"
              y2="14.93243"
              x2="7.29732"
              y1="6.14868"
              x1="14.86486"
              stroke="#00639A"
              fill="none"
            />
            <path
              id="svg_4"
              d="m16.75675,3.71625l-9.45943,11.21618"
              opacity="undefined"
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              strokeWidth="4"
              stroke="#00639A"
              fill="none"
            />
            <path
              id="svg_6"
              d="m7.02705,12.36487l9.3243,10.94591"
              opacity="undefined"
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              strokeWidth="4"
              stroke="#00639A"
              fill="none"
            />
          </g>
        </svg>
      </div>
      <BannerPage
        text="Acá encontraras todas las lecturas dejadas por tus docentes de cada materia divierte."
        welcome="¡Bienvenido a tus lecturas!"
        img={kids}
      />
      <div>
        {Aulas.length === 0 ? (
          <div className="shadow p-3 m-5 w-50 m-auto">
            <h6 className="text-center">
              {" "}
              <strong>No tienes aulas asignadas en el momento!</strong>{" "}
            </h6>
          </div>
        ) : (
          <div className="container mt-3">
            {Aulas.map((math) => (
              <div key={math.id} id={math.id}>
                <div className="shadow p-3 m-2">
                  <div className="p-3 rounded bg-pink-2 my-2">
                    <p className="h1 text-center text-lucky">
                      {" "}
                      <strong> {math.materia_name} </strong>{" "}
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="p-2">
                        <p className="h5 mt-3">
                          {" "}
                          <strong>
                            {" "}
                            {math.Pro_name} {math.Pro_apellidos}{" "}
                          </strong>
                        </p>
                        <p> {math.descr} </p>
                      </div>
                    </div>

                    <div className="col-md-8 row">
                      {math.libro === 0 ? (
                        <div className="col-md-6">
                          <h6 className="text-center">
                            {" "}
                            <strong>No tienes lecturas{math.libro}</strong>{" "}
                          </h6>
                        </div>
                      ) : (
                        <div className="col-md-6">
                          <div
                            className="shadow m-1 pointer Areas"
                            onClick={() => cargarlibro(math.libro)}
                          >
                            <img
                              className="w-100"
                              src="https://image.freepik.com/foto-gratis/arreglo-libros-antiguos-espacio-copia_23-2148898331.jpg"
                              alt="libro"
                            />
                            <h6 className="text-center my-2">
                              {" "}
                              <strong>tienes una lectura</strong>{" "}
                            </h6>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Aula;
