import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "./../../../URL";
import Swal from "sweetalert2";

function Cargarlista(datos) {
  const [DatosRecibidos, setDatosRecibidos] = useState([]);

  const Sumarp = async (id) => {
    DatosRecibidos.forEach((element) => {
      let p = parseInt(document.getElementById(id).innerHTML);
      let psuma = 0;
      console.log(p);
      if (p === 0) {
        if (element.id === id) {
          psuma = 1;
          document.getElementById(id).innerHTML = psuma;
        } else {
          console.log("no suma");
        }
      } else {
        if (element.id === id) {
          psuma = p + 1;
          document.getElementById(id).innerHTML = psuma;
        } else {
          console.log("no suma");
        }
      }
    });
  };
  const Restarp = async (id) => {
    DatosRecibidos.forEach((element) => {
      let p = parseInt(document.getElementById(id).innerHTML);
      let psuma = 0;
      console.log(p);
      if (p === 0) {
        if (element.id === id) {
          psuma = 0;
          document.getElementById(id).innerHTML = psuma;
        } else {
        }
      } else {
        if (element.id === id) {
          psuma = p - 1;
          document.getElementById(id).innerHTML = psuma;
        } else {
        }
      }
    });
  };
  const Guardarp = async (id) => {
    console.log(id);
    let p = parseInt(document.getElementById(id).innerHTML);
    let datosd = {
      d: 12,
      id: id,
      evento: datos.id,
      result: p,
    };
    let DatosJson = JSON.stringify(datosd);
    const api = axios.create({ baseURL: URL.servidor });
    const response = await api.post(
      "/api-php-react/CRUD_eventos.php",
      DatosJson
    );
    let datad = response.data;
    console.log(datad);
    if (datad === true) {
      Swal.fire({
        icon: "success",
        title: "Se a sumando el puntaje",
        text: "Se an guardado los cambios",
        timer: 2000,
        timerProgressBar: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "error al cargar",
        text: "Ocurrio un error",
        timer: 2000,
        timerProgressBar: 2000,
      });
    }
  };
  useEffect(() => {
    const CargarDatos = async () => {
      let datosd = {
        d: 11,
        evento: datos.id,
      };
      let DatosJson = JSON.stringify(datosd);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/CRUD_eventos.php",
        DatosJson
      );
      let datad = response.data;
      console.log(datad);
      setDatosRecibidos(datad);
    };
    CargarDatos();
  }, [datos]);
  console.log(DatosRecibidos);
  return (
    <div>
      <h3 className="text-center text-warning font-weight-bold">
        Descripción del evento
      </h3>
      <div>
        <p>{datos.Nombre}</p>
        <p>
          Bienvenido al evento{" "}
          <strong className="text-warning">{datos.Nombre}</strong>
        </p>
        <p>
          <strong className="text-warning">Descripción: </strong>
          {datos.des}
        </p>
        <p>
          fecha fin <strong className="text-warning">{datos.fecha_f}</strong> y
          fue creada el dia{" "}
          <strong className="text-warning">{datos.fecha_i}</strong>.
        </p>
        <div>
          <h4 className="text-center text-warning font-weight-bold">
            Tabla de clasificación
          </h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Puntos</th>
                <th scope="col">Colegio</th>
              </tr>
            </thead>
            <tbody>
              {DatosRecibidos.length === 0 ? (
                <td>No hay parcitipantes</td>
              ) : (
                DatosRecibidos.map((p) => (
                  <tr>
                    <th scope="row" key={p.id}>
                      {p.id}
                    </th>
                    <td>
                      {p.Nombre} {p.Apellido}
                    </td>
                    <td id={p.id} Value={p.result}>
                      {p.result}
                    </td>
                    <td>{p.nombreC}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-center ml-2">
                          <div
                            className="bg-success rounded-circle pointer p-2  shadow-lg"
                            onClick={() => Sumarp(p.id, p.result)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-plus-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-center ml-2">
                          <div
                            className="bg-danger rounded-circle pointer p-2  shadow-lg"
                            onClick={() => Restarp(p.id, p.result)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-dash-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-center ml-2">
                          <div
                            className="bg-primary rounded-circle pointer p-2  shadow-lg"
                            onClick={() => Guardarp(p.id, datos.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-check-lg"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Cargarlista;
