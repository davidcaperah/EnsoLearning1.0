import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Carga from "./pantallaCarga";
import Rutas from "../router";
import axios from "axios";
import URL from "../../URL.js";
import Header from "./header";
import HeaderHome from "./headerHome";
import decode from "../../utils/decode";
const Navbar = () => {
  const [load, setLoad] = useState(0);
  const [currStudent, setCurrStudent] = useState({});
  const path = window.location.pathname;
  const idStudent = decode("iduser", "A");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000${path}`).then((response) => {
      if (response.status === 200) {
        setLoad(200);
      }
    });
  }, []);

  useEffect(() => {
    const data = JSON.stringify({ d: 11, id: idStudent });
    const api = axios.create({ baseURL: URL.servidor });
    api.post("/api-php-react/info_estudiante.php", data).then((res) => {
      setCurrStudent(res.data);
      dispatch({ type: "@addDatauser", user: res.data });
    });
  }, [idStudent, dispatch]);

  if (load === 200) {
    return (
      <div
        className={path == "/EstudianteTwoHome" ? "cont-home-menu-estu1" : ""}
      >
        {path == "/EstudianteTwoHome" ? (
          <HeaderHome currStudent={currStudent} />
        ) : (
          <Header currStudent={currStudent} />
        )}
        <Rutas />
      </div>
    );
  } else {
    return <Carga />;
  }
};

/*
    <div className="container pt-2">
                <div className="d-flex justify-content-between align-items-center" >
                    <div>
                        <h1> <a href="/EstudianteTwoHome" className="font-chewy text-orange p-2 link-formateado" > Enso learning </a></h1>
                    </div>

                    <div className="opcionesNav" >
                        <a className="pointer m-2 link-navbar link-formateado text-dark "  href="/EstudianteTwoAula" > Mis Aulas </a>
                        <a className="pointer m-2 link-navbar link-formateado text-dark "  href="/EstudianteTwoEvaluaciones" > Mis evaluaciones </a>
                        <a className="pointer m-2 link-navbar link-formateado text-dark "  href="/EstudianteTwoActividades" > Mis actividades </a>
                        <a className="pointer m-2 link-navbar link-formateado text-dark "  href="/EstudianteTwoCurso" > Mi curso </a>
                        <a className="pointer m-2 link-navbar link-formateado text-dark "  href="/EstudianteTwoEventos" > Eventos </a>
                        <a className="pointer m-2 link-navbar link-formateado text-dark "  href="/EstudianteTwoLecturas" > Lecturas </a>
                        
                    </div>

                    <div className="botonNav" >
                        <Button  variant="contained" color="secondary" onClick={DesplegarMenu} >
                            <div className="d-flex align-items-center" >
                                <p className="m-1 mr-2" > {infoEstudiante.Nombre} </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </div>
                        </Button>
                        <div className="Desplegable Eliminar" id="Desplegable" >
                            <ul className="list-group">
                                <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteTwoAula" > Mis Aulas </a> </li>
                                <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteTwoEvaluaciones" > Mis evaluaciones </a> </li>
                                <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteTwoActividades" > Mis actividades </a> </li>
                                <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteTwoCurso" > Mi curso </a> </li>
                                <li className="Aparecer list-group-item pointer link-desplegable"><a className="link-formateado text-dark "  href="/EstudianteTwxoCurso" > Eventos </a> </li>
                                <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteTwoUser" > Mi perfil </a></li>
                                <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteTwoConfiguracion" > Configuración  </a></li>
                                <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteTwoEventos" > Eventos  </a></li>
                                <li className="list-group-item pointer link-desplegable"><a className="link-formateado text-dark  " href="/EstudianteTwoLecturas" > Lecturas  </a></li>
                                <li className="list-group-item pointer link-desplegable"><p className="text-dark  " onClick={Salir} > Salir  </p></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
*/
export default Navbar;
