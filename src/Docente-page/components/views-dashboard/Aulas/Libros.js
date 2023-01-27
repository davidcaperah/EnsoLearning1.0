/**
 * ==================================================
 * Sistema de planeación de recursos empresariales
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../../../URL.js";
import Libro from "./Libro.js";
import Volver from "./volver.js";
import Pagination from "components/Pagination";
import RateBook from "./components/RateBook";
import { getBooks } from "services/books";

const Libros = () => {
  const [DatosRecibidos, setDatosRecibidos] = useState([]);
  const [DatosRecibidosDos, setDatosRecibidosDos] = useState([]);
  const [Validacionbtn, setValidacionbtn] = useState(true);
  const [genero, setGenero] = useState(0);
  const [autor, setAutor] = useState(0);
  const [name, setName] = useState("");
  const [DatosLibros, setDatosLibros] = useState([]);
  const [libros, setLibros] = useState([]);
  const [DatosProp, setDatosProp] = useState({});

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const sendData = async () => {
      let DatosJson = JSON.stringify("1");
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post("/api-php-react/c_genero.php", DatosJson);
      let data = response.data;
      setDatosRecibidos(...DatosRecibidos, data);

      let DatoJsonA = JSON.stringify("1");
      const apiA = axios.create({ baseURL: URL.servidor });
      const responseA = await apiA.post(
        "/api-php-react/c_autor.php",
        DatoJsonA
      );
      let dataA = responseA.data;

      setDatosRecibidosDos(...DatosRecibidosDos, dataA);
    };

    sendData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let data = {
      d: 3,
      pagina: page,
    };
    getBooks(data).then((res) => {
      setLibros(res.data.libros);
      setTotalPage(res.data.paginas.total_paginas);
    });
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let datos = {
      d: 1,
      nombre: name,
    };
    let DatosJson = JSON.stringify(datos);

    const consulta = await axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/info_libros.php`,
      data: DatosJson,
    });
    let datosRecibidos = consulta.data;

    if (!datosRecibidos.mensaje) {
      setDatosLibros(datosRecibidos);
    }
  };

  const handlePlusPage = () => {
    setPage(page + 1);
  };

  const handleRestPage = () => {
    setPage(page - 1);
  };

  const handleSearch = (e) => {
    setName(e.target.value);
  };

  const handleAutor = (e) => {
    setAutor(parseInt(e.target.value));
  };

  const handleGenero = (e) => {
    setGenero(parseInt(e.target.value));
  };

  const cargarLibro = (data, estado) => {
    setValidacionbtn(estado);
    setDatosProp(data);
  };

  return (
    <div className="container">
      <Volver />
      {Validacionbtn ? (
        <div
          className="d-flex flex-column p-3"
          style={{ alignItems: "center" }}
        >
          <div style={{ width: "100%" }}>
            <h3 className="text-warning text-center"> Buscar libro </h3>
            <form
              className="row p-4"
              onSubmit={handleSubmit}
              style={{
                justifyContent: "space-between",
                width: "100%",
                margin: "0",
              }}
            >
              <input
                type="text"
                id="nombre"
                onChange={handleSearch}
                className="form-control col-md-4"
                placeholder="Nombre"
              />
              <select
                name="Genero"
                onChange={handleGenero}
                className="form-control col-md-2 "
                id="genero"
              >
                <option value={0}> Género </option>
                {DatosRecibidos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {" "}
                    {genero.genero}{" "}
                  </option>
                ))}
              </select>
              {/* <select
                name="Calificacion"
                onChange={handleStart}
                className="form-control col-md-2"
              >
                <option value={0}> Calificación </option>
                <option value={3}> Mayor a 3 estrellas </option>
                <option value={4}> Mayor a 4 estrellas </option>
                <option value={5}> 5 estrellas </option>
              </select> */}
              <select
                name="Autor"
                id="autor"
                onChange={handleAutor}
                className="form-control col-md-2"
              >
                <option value={0}> Autor </option>
                {DatosRecibidosDos.map((Autor) => (
                  <option key={Autor.id} value={Autor.id}>
                    {" "}
                    {Autor.autor}{" "}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-info col-md-2">
                {" "}
                Buscar{" "}
              </button>
            </form>
          </div>

          <div className="row" style={{ width: "100%" }}>
            {libros.length === 0 ? (
              <h1>cargando...</h1>
            ) : DatosLibros.length === 0 ? (
              autor !== 0 || genero !== 0 ? (
                libros.map((data) => {
                  if (
                    (autor === data.autor && genero === data.genero) ||
                    autor === data.autor ||
                    genero === data.genero
                  ) {
                    return (
                      <div className="col-md-3" key={data.id}>
                        <div
                          className="p-3 m-2 Areas pointer shadow"
                          onClick={() => cargarLibro(data)}
                        >
                          <div className="d-flex justify-content-center">
                            <img
                              alt={"Enso Learning " + data.Nombre}
                              className="w-100"
                              src={data.portada}
                            />
                          </div>
                          <h6 className="text-center mt-3">
                            {" "}
                            Editorial {data.editorial}{" "}
                          </h6>
                          <p className="text-center mt-3"> {data.Nombre} </p>
                          <RateBook
                            book={data}
                            style={{ justifyContent: "center" }}
                          />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                libros.map((data) => {
                  return (
                    <div className="col-md-3" key={data.id}>
                      <div
                        className="p-3 m-2 Areas pointer shadow"
                        onClick={() => cargarLibro(data)}
                      >
                        <div className="d-flex justify-content-center">
                          <img
                            alt={"Enso Learning " + data.Nombre}
                            className="w-100"
                            src={data.portada}
                          />
                        </div>
                        <h6 className="text-center mt-3">
                          {" "}
                          Editorial {data.editorial}{" "}
                        </h6>
                        <p className="text-center mt-3"> {data.Nombre} </p>
                        <RateBook
                          book={data}
                          style={{ justifyContent: "center" }}
                        />
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              DatosLibros.map((data) => (
                <div className="col-md-3" key={data.id}>
                  <div
                    className="p-3 m-2 Areas pointer shadow"
                    onClick={() => cargarLibro(data)}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        alt={"Enso Learning " + data.Nombre}
                        className="w-100"
                        src={data.portada}
                      />
                    </div>
                    <h6 className="text-center mt-3">
                      {" "}
                      Editorial {data.editorial}{" "}
                    </h6>
                    <p className="text-center mt-3"> {data.Nombre} </p>
                    <RateBook
                      book={data}
                      style={{ justifyContent: "center" }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            page={page}
            totalPage={totalPage}
            plusPage={handlePlusPage}
            restPage={handleRestPage}
          />
        </div>
      ) : (
        <div>
          <div
            id="flecha"
            className="pointer m-2 p-3"
            onClick={() => cargarLibro(0, true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left text-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </div>
          <Libro book={DatosProp} />
        </div>
      )}
    </div>
  );
};

export default Libros;
