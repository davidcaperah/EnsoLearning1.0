import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InfoEventos from "./infoEventos";
import axios from "axios";
import URL from "../../URL";
import Cookies from "universal-cookie";
import BannerPage from "./bannerPage";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [cambiarPage, setcambiarPage] = useState(1);
  const [evento, setevento] = useState(0);
  const navigate = useNavigate();

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  let IdEncriptado = cookies.get("idCurso");
  let bytes = CryptoJS.AES.decrypt(IdEncriptado, "A");
  let Idcurso = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const Datos = {
    id: Idcurso,
  };

  useEffect(() => {
    const traerEventos = async () => {
      let idCurso = JSON.stringify({
        curso: Datos.id,
        d: 2,
      });
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/CRUD_eventos.php",
        idCurso
      );
      const data = response.data;
      console.log(data);
      if (data.length > 0) {
        setEventos(data);
      } else {
        setEventos([]);
      }
    };
    traerEventos();
  }, []);
  console.log(eventos);
  const verEvento = (h) => {
    setevento(h);
    setcambiarPage(2);
  };
  const regresar = () => {
    setcambiarPage(1);
  };
  return (
    <div>
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
        img="hola"
        welcome="Bienvenido, podrás ver los eventos disponibles para ti."
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
      />
      <div className="Pruebas">
        {cambiarPage === 1 ? (
          <div className="container">
            <h2 className="font-chewy text-warning text-center mb-3">
              EVENTOS
            </h2>
            <div className="row ">
              {eventos.map((prueba) => (
                <div className="col-md-6 col-lg-5 col-xl-4 col-sm">
                  <div className="card shadow mb-5">
                    <div className="imagen-1">
                      <img
                        src={prueba.img}
                        alt={"Enso Learning " + prueba.Nombre}
                      />
                    </div>
                    <div className="textos">
                      <h2 className="font-chewy text-blue text-center mt-2">
                        {prueba.Nombre}
                      </h2>
                      <p>{prueba.des}</p>
                      <hr></hr>
                      {prueba.asignatura === 1 && (
                        <p className="font-chewy text-orange text-center">
                          Ciencias
                        </p>
                      )}
                      {prueba.asignatura === 2 && (
                        <p className="font-chewy text-blue text-center">
                          Matematicas
                        </p>
                      )}
                      {prueba.asignatura === 3 && (
                        <p className="font-chewy text-blue text-center">
                          Español
                        </p>
                      )}
                      {prueba.asignatura === 4 && (
                        <p className="font-chewy text-blue text-center">
                          Tecnologia
                        </p>
                      )}
                      {prueba.asignatura === 5 && (
                        <p className="font-chewy text-blue text-center">
                          Economia
                        </p>
                      )}
                      {prueba.asignatura === 6 && (
                        <p className="font-chewy text-blue text-center">
                          Filosofia
                        </p>
                      )}
                      {prueba.asignatura === 7 && (
                        <p className="font-chewy text-blue text-center">
                          Quimica
                        </p>
                      )}
                      <p>
                        Fecha inicio: <span>{prueba.fecha_i}</span>
                      </p>
                      <p>
                        Fecha final: <span>{prueba.fecha_f}</span>
                      </p>
                    </div>
                    {parseInt(prueba.estado) === 1 ? (
                      <div>
                        <div className="alert alert-success w-75 m-auto text-center p-2">
                          {" "}
                          Activo{" "}
                        </div>
                        <hr></hr>
                        <div className="d-flex justify-content-center m-3">
                          <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            name="submit"
                            onClick={() => verEvento(prueba.id)}
                            className="text-center w-50 m-auto"
                          >
                            Participar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center m-3">
                        <div className="alert alert-danger w-75 m-auto text-center p-2">
                          {" "}
                          No Activo{" "}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {eventos.length === 0 && (
                <div className="shadow p-3 m-2 w-50 m-auto">
                  <h6 className="text-center">
                    {" "}
                    En el momento no tenemos eventos para ti.
                  </h6>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="p-3 m-2 shadow">
              <div className="d-flex justify-content-start">
                <div className="pointer rounded-circle shadow  p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    onClick={regresar}
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </div>
              </div>

              <InfoEventos idEvento={evento} />
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default Eventos;
