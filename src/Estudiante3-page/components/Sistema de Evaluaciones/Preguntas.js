import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Preguntas = ({ opciones, numero, id }) => {
  const dispatch = useDispatch();
  const [seleccion, setSeleccion] = useState(0);
  const [answers, setAnswers] = useState(JSON.parse(opciones.respuestas));

  useEffect(() => {
    dispatch({
      type: "@updaterespuestaEvalua",
      respuestaEvaluacion: seleccion,
    });
  }, [seleccion]);

  const handleChange = (e) => {
    setSeleccion(
      // [varId] :
      {
        ...seleccion,
        [e.target.name]: [opciones.id, e.target.value.trim()],
      }
    );
    Swal.fire({
      icon: "success",
      text: "Haz seleccionado",
    });
    dispatch({
      type: "@updaterespuestaEvalua",
      respuestaEvaluacion: seleccion,
    });
  };

  const handleTextArea = (e) => {
    setSeleccion(
      // [varId] :
      {
        ...seleccion,
        [e.target.name]: [opciones.id, e.target.value.trim()],
      }
    );
    dispatch({
      type: "@updaterespuestaEvalua",
      respuestaEvaluacion: seleccion,
    });
  };
  return (
    <div className="row p-4 d-flex col-md-12 align-items-center justify-content-center ">
      {opciones.Tipo === 2 ? (
        <div
          className="btn-group btn-group-toggle col-md-12 d-flex"
          data-toggle="buttons"
        >
          <textarea
            name={numero}
            rows="5"
            cols="100"
            onChange={handleTextArea}
          ></textarea>
          {/* {tipo 3} */}
        </div>
      ) : (
        <>
          <div
            className="btn-group btn-group-toggle p-2 col-md-12 d-flex"
            data-toggle="buttons"
          >
            <label className="btn rounded col-md-6  text-white bg-dark d-flex m-2 align-items-center align-self-center align-content-center w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-dice-1-fill mr-3 d-none d-sm-block"
                viewBox="0 0 16 16"
              >
                <path d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
              <input
                type="radio"
                name={numero}
                id="radio1"
                value="a"
                className="p-3"
                onChange={handleChange}
                autocomplete="off"
              />
              {answers.A}
            </label>
            <label className="btn rounded  text-white bg-success  col-md-6  m-2 d-flex align-items-center align-self-center align-content-center w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-dice-2 mr-3 d-none d-sm-block"
                viewBox="0 0 16 16"
              >
                <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z" />
                <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
              <input
                type="radio"
                name={numero}
                id="radio2"
                value="b"
                onChange={handleChange}
                autocomplete="off"
              />{" "}
              {answers.B}
            </label>
          </div>
          {/* OPCIONES C Y D  */}
          <div
            className="btn-group btn-group-toggle p-2 col-xs-12 col-md-12 d-flex"
            data-toggle="buttons"
          >
            <label className="btn rounded  text-white bg-warning d-flex m-2 align-items-center align-self-center align-content-center w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-dice-3  mr-3 d-sm-none d-none d-sm-block"
                viewBox="0 0 16 16"
              >
                <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z" />
                <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
              <input
                type="radio"
                name={numero}
                id="radio3"
                value="c"
                className="p-3"
                onChange={handleChange}
                autocomplete="off"
              />{" "}
              {answers.C}
            </label>
            <label className="btn rounded text-white bg-danger  m-2 d-flex  align-items-center align-self-center align-content-center w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-dice-4-fill mr-3 d-sm-none d-none d-sm-block"
                viewBox="0 0 16 16"
              >
                <path d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm1 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM4 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
              <input
                type="radio"
                name={numero}
                id="radio4"
                value="d"
                onChange={handleChange}
                autocomplete="off"
              />
              {answers.D}
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default Preguntas;
