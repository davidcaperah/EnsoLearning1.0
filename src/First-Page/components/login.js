import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Cookies from "universal-cookie";
import URL from "../../URL.js";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * ": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const history = useNavigate();

  const [Datos, setDatos] = useState({});

  const Escribir = (e) => {
    setDatos({
      ...Datos,
      [e.target.name]: e.target.value.trim(),
    });
  };

  async function NoRecargar(e) {
    e.preventDefault();

    const consulta = await axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/login.php`,
      data: Datos,
    });
    const Usuario = consulta.data;
    // console.log(consulta)
    // console.log(consulta.data);

    if (Usuario.mensaje) {
      Swal.fire({
        icon: "error",
        text: Usuario.mensaje,
      });
    } else if (Usuario.id) {
      const cookies = new Cookies();
      const CryptoJS = require("crypto-js");
      if (Usuario.id_col) {
        let idCol = Usuario.id_col;
        let idColEncriptado = CryptoJS.AES.encrypt(
          JSON.stringify(idCol),
          "A"
        ).toString();
        cookies.set("idcol", idColEncriptado, {
          path: "/",
          expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
        });
      }

      if (Usuario.id_m) {
        let idmateria = Usuario.id_m;
        let idmatEncry = CryptoJS.AES.encrypt(
          JSON.stringify(idmateria),
          "A"
        ).toString();
        cookies.set("id1080M", idmatEncry, {
          path: "/",
          expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
        });
      }

      let id = Usuario.id;
      let idEncriptado = CryptoJS.AES.encrypt(
        JSON.stringify(id),
        "A"
      ).toString();
      cookies.set("iduser", idEncriptado, {
        path: "/",
        expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
      });

      if (Usuario.Id_curso) {
        let idCurso = Usuario.Id_curso;
        let idCursoEncriptado = CryptoJS.AES.encrypt(
          JSON.stringify(idCurso),
          "A"
        ).toString();
        cookies.set("idCurso", idCursoEncriptado, {
          path: "/",
          expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
        });
      }

      let sesion = Usuario.estado;
      let sesionEncriptado = CryptoJS.AES.encrypt(
        JSON.stringify(sesion),
        "B"
      ).toString();
      cookies.set("estado", sesionEncriptado, {
        path: "/",
        expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
      });
      console.log(Usuario.estado);

      if (sesion === "1") {
        window.location.replace("/");
      } else if (sesion === "2") {
        window.location.replace("/DocenteInfo");
      } else if (sesion === "3") {
        window.location.replace("/Acudientes");
      } else if (sesion === "4") {
        window.location.replace("/AdminSchool");
      } else if (sesion === "5") {
        window.location.replace("/EstudianteOnePage");
      } else if (sesion === "6") {
        window.location.replace("/EstudianteTwoHome");
      } else if (sesion === "7") {
        window.location.replace("/EstudianteThreeHome");
      } else {
        window.location.replace("/");
      }
    }
  }

  return (
    <div className="mb-5">
      <div className="container pt-4">
        <div className="row shadow-lg rounded ">
          <div className="col-md-7 bg-dark"></div>

          <div className="col-md-5 p-4">
            <div className="m-2">
              <h3>
                {" "}
                <strong> Bienvenido </strong>{" "}
              </h3>
              <p> ¡Hola! Nos da gusto tenerte de vuelta. </p>
            </div>

            <form
              onSubmit={NoRecargar}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <select
                className="m-2 form-control"
                name="Estado"
                onChange={Escribir}
              >
                <option unselectable="true"> ¿Eres? </option>
                <option value="1"> Estudiantes </option>
                <option value="2"> Docente </option>
                <option value="3"> Acudiente </option>
                <option value="4"> Coordinador </option>
              </select>
              <input
                type="email"
                placeholder="Correo eléctronico"
                onChange={Escribir}
                className="form-control"
                name="Email"
                minLength="1"
                maxLength="40"
                required
                pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="form-control"
                name="Pass"
                autoComplete="on"
                onChange={Escribir}
                minLength="1"
                maxLength="40"
                required
                pattern="[A-Za-z0-9--- -ñ-@-á-é-í-ó-ú]+"
              />

              <div className="pt-3 row">
                <div className="">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={`${classes.button} CeroBootstrap  link-button`}
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
                </div>
              </div>
            </form>
            <div className="">
              <p> ¿Olvidaste tú contraseña? </p>
              <a href="/Recuperar" class="stretched-link">
                Recuperala
              </a>
              {/* <button className="text-primary link pointer btn-link-cero" onClick={handleClick}> Recuperala  </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
