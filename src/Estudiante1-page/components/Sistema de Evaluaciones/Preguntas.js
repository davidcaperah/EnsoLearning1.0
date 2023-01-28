import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Preguntas = ({ opciones, numero, id, carga }) => {
  const opcion = JSON.parse(opciones.respuestas);
  const dispatch = useDispatch();
  const [seleccion, setSeleccion] = useState(0);
  console.log("🚀 ~ file: Preguntas.js:9 ~ Preguntas ~ seleccion", seleccion);
  const [correcta, setcorrecta] = useState(carga);
  console.log("🚀 ~ file: Preguntas.js:11 ~ Preguntas ~ correcta", correcta);
  const [Onselect, setOnselect] = useState([]);
  const [Onsubselect, setOnsubselect] = useState();
  const [Onsubestado, setOnsubestado] = useState(0);
  const [OnA, setOnA] = useState([]);
  const [OnB, setOnB] = useState([]);
  useEffect(() => {
    dispatch({
      type: "@updaterespuestaEvalua",
      respuestaEvaluacion: seleccion,
    });
  }, [seleccion]);
  if (
    opciones.Tipo === 3 &&
    carga === 1 &&
    OnA.length <= 0 &&
    OnB.length <= 0
  ) {
    let A = [];
    let B = [];
    opcion.forEach((element) => {
      for (const property in element) {
        let temp = element[property];
        if (property[0] === "A") {
          A = [...A, { property, temp }];
        } else if (property[0] === "B") {
          B = [...B, { property, temp }];
        }
      }
    });
    setOnA(A);
    setOnB(B);
  }
  const selector = (e) => {
    setcorrecta(0);
    switch (Onsubestado) {
      case 0:
        setcorrecta(e.target.id);
        setOnsubselect(e.target.id);
        setOnsubestado(1);
        break;
      case 1:
        let a = [Onsubselect, e.target.id];
        setOnselect([...Onselect, [a]]);
        setOnsubestado(0);
        Ver(a);
        break;
      default:
        break;
    }
  };
  const Ver = (esta) => {
    let A = OnA;
    let B = OnB;
    let esta1 = esta[0];
    let esta2 = esta[1];
    for (let i = 0; i < A.length; i++) {
      let estadoA = A[i];
      let estA = esta1.indexOf(estadoA.property);
      let estB = esta1.indexOf(estadoA.property);
      let estA2 = esta2.indexOf(estadoA.property);
      let estB2 = esta2.indexOf(estadoA.property);
      if (estA !== -1) {
        A.splice(i, 1);
      }
      if (estB !== -1) {
        B.splice(i, 1);
      }
      if (estA2 !== -1) {
        A.splice(i, 1);
      }
      if (estB2 !== -1) {
        B.splice(i, 1);
      }
    }
    for (let i = 0; i < B.length; i++) {
      let estadoB = B[i];
      let estA = esta2.indexOf(estadoB.property);
      let estB = esta2.indexOf(estadoB.property);
      let estA2 = esta1.indexOf(estadoB.property);
      let estB2 = esta1.indexOf(estadoB.property);
      if (estA !== -1) {
        A.splice(i, 1);
      }
      if (estB !== -1) {
        B.splice(i, 1);
      }
      if (estA2 !== -1) {
        A.splice(i, 1);
      }
      if (estB2 !== -1) {
        B.splice(i, 1);
      }
    }

    setOnA(A);
    setOnB(B);
    // B.map( item =>
    //     console.log(item.property)
    //     )
    // console.log(A);
    // console.log(B);
    // console.log(Onselect);
  };
  const handleChange = (e) => {
    setcorrecta(e.target.id);
    setSeleccion({
      ...seleccion,
      [e.target.name]: [opciones.id, e.target.value.trim()],
    });
  };
  return (
    <div className="row p-4 d-flex col-md-12 align-items-center justify-content-center ">
      {/* tipo 1  */}
      {opciones.Tipo === 1 ? (
        <div
          className="btn-group btn-group-toggle col-md-12 d-flex"
          data-toggle="buttons"
        >
          {Object.keys(opcion).map((e) => (
            <label
              className={`btn rounded  text-white ${
                e + numero === correcta ? "bg-success" : "bg-info"
              }  col-md-6  m-2 d-flex align-items-center align-self-center align-content-center w-100`}
            >
              <input
                type="radio"
                name={numero}
                id={e + numero}
                value={e}
                onChange={handleChange}
                autoComplete="off"
              />{" "}
              {opcion[e]}
            </label>
          ))}
          {/* {tipo 2} */}
        </div>
      ) : opciones.Tipo === 2 ? (
        <div
          className="btn-group btn-group-toggle col-md-12 d-flex"
          data-toggle="buttons"
        >
          <textarea
            name={numero}
            rows="5"
            cols="100"
            onChange={handleChange}
          ></textarea>
          {/* {tipo 3} */}
        </div>
      ) : opciones.Tipo === 3 ? (
        <div className="col-md-12">
          <div className="row">
            <div
              className="btn-group-vertical btn-group-toggle col-md-6 d-flex "
              data-toggle="buttons"
            >
              {OnA.map((d) => (
                <label
                  className={`btn rounded  text-white ${
                    d.property === correcta ? "bg-success" : "bg-info"
                  } col-md-6  m-2 d-flex align-items-center align-self-center align-content-center w-100`}
                >
                  <input
                    type="radio"
                    name="hi"
                    id={d.property}
                    value={d.temp}
                    autoComplete="off"
                    onChange={selector}
                  />{" "}
                  {d.temp}
                </label>
              ))}
            </div>
            <div
              className="btn-group-vertical btn-group-toggle col-md-6 d-flex "
              data-toggle="buttons"
            >
              {OnB.map((d) => (
                <label
                  className={`btn rounded  text-white ${
                    d.property === correcta ? "bg-success" : "bg-info"
                  } col-md-6  m-2 d-flex align-items-center align-self-center align-content-center w-100`}
                >
                  <input
                    type="radio"
                    name="hi"
                    id={d.property}
                    value={d.temp}
                    autoComplete="off"
                    onChange={selector}
                  />{" "}
                  {d.temp}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Preguntas;
