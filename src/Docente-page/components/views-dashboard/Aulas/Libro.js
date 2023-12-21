/**
 * ==================================================
 * Sistema de planeación de recursos empresariales
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import RateBook from "./components/RateBook";
import { assingBook } from "services/books";

const Libro = ({ book }) => {
  const aulaSeleccionada = useSelector((state) => state.aulaSeleccionada);
  const docente = useSelector((state) => state.docente);

  // let idCol = docente.colegio
  let idCurso = aulaSeleccionada.id_curso;
  let iduser = docente.id;
  let idMateria = aulaSeleccionada.id_materia;

  const doToRequest = () => {
    assingBook({
      d: 8,
      id_libro: book.id,
      Id_curso: idCurso,
      id_Pro: iduser,
      id_Mat: idMateria,
    }).then((res) => {
      if (res.data.estado) {
        Swal.fire({
          title: "Se ha agregado este libro",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error al agregar libro",
          icon: "error",
          text: res.data.mensaje,
        });
      }
    });
  };

  const handleOnClick = () => {
    Swal.fire({
      title: `Seguro que quieres asignar este libro?`,
      showDenybutton: true,
      showCancelbutton: true,
      confirmbuttonText: `Si`,
      denybuttonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        doToRequest();
      }
    });
  };

  return (
    <div>
      <div className="row p-4">
        <div className="col-md-6">
          <img
            alt={"Enso Learning " + book.intro}
            className="w-75"
            src={book.portada}
          />
        </div>
        <div className="col-md-6">
          <h6 className="text-warning"> Introducción del libro : </h6>
          <p className="text-dark"> {book.intro} </p>
          <h6 className="text-warning"> Objetivo del libro :</h6>
          <p className="text-dark"> {book.objetivo} </p>
          <h6 className="text-warning"> Público permitido: </h6>
          {book.publico === 1 ? <p className="text-dark"> Ciclo Uno </p> : null}
          {book.publico === 2 ? <p className="text-dark"> Ciclo Dos</p> : null}
          {book.publico === 3 ? (
            <p className="text-dark"> Ciclo Tres </p>
          ) : null}
          {book.publico === 4 ? (
            <p className="text-dark"> Para todos </p>
          ) : null}
          <h6 className="text-warning"> Género:</h6>
          <p className="text-dark"> {book.genero} </p>
          <h6 className="text-warning"> Reseña </h6>
          <p className="text-dark"> {book.rese} </p>
          <p className="text-warning">Calificación</p>
          <RateBook book={book} style={{ margin: "10px 0px" }} />
          <button className="btn btn-warning my-2" onClick={handleOnClick}>
            Agregar libro al curso
          </button>
          <br />
          <a
            href={book.libro}
            target={"_blank"}
            rel="noreferrer"
            className="btn btn-info my-2"
          >
            Ver libro
          </a>
        </div>
      </div>
    </div>
  );
};

export default Libro;
