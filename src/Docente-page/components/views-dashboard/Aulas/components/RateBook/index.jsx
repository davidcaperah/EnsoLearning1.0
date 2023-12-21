/**
 * ==================================================
 * Sistema de planeación de recursos empresariales
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Start from "../start";
import Swal from "sweetalert2";
import { loadRate } from "services/books";
import "./style.css";

function Index({ book, style }) {
  const docente = useSelector((state) => state.docente);

  //Seteo la cantidad estrellas que van a estar
  const VALUES = [1, 2, 3, 4, 5];
  //Este valor es el que va ir a la base datos
  const [starts, setStarts] = useState(0);
  /*Este valor me avisa cuando se halla clikeado
   cualquier estrella esto para que el resto de las
  estrellas se activen y queden marcadas*/
  const [isClicked, setIsClicked] = useState(false);

  /*Este valor es cuando se está haciendo hover en uno de los componentes,
  se coloca en el componente padre para que este sea utilizado por sus
  componentes hermanos y a su vez se activen en modo hover para dar el efecto
  del hover de las otras estrellas anteriores*/
  const [isHover, setIsHover] = useState(false);

  /*Valida si el fetching datos ya se finalizó */
  const [isFetch, setIsFetch] = useState(false);

  /*Este useEffect valida cuando se monta el componente, si este fue ya calificado
  entonces llenará las estrellas con base al valor que hay en la prop book.estrellas */
  useEffect(() => {
    if (book.estrellas) {
      setStarts(Math.round(book.estrellas / book.personas));
      setIsFetch(true);
      setIsClicked(true);
    }
  }, [book]);

  /*Esta función es la encargada hacer el fetching de datos, es decir de enviar
  puntuación de las estrellas */
  const doToRequest = (rate) => {
    loadRate({
      id: book.id.toString(),
      estre: rate,
      d: 2,
      iduser: docente.id,
    })
      .then((res) => {
        const response = res.data;
        if (response.estado === true) {
          Swal.fire({
            title: "Se ha agregado este libro",
            icon: "success",
          });
        } else if (response.estado === false) {
          Swal.fire({
            title: "Error al agregar libro",
            icon: "error",
            text: response.mensaje,
          });
        }
      })
      .finally(() => {
        setIsFetch(true);
      });
  };
  /*Esta función cumple con setear el numero de estrellas a un estado 
  a su vez lanza un alerta donde pasará a setear el estado de isClicked
  Este función se le pasa al componente para que por dentro 
  me pase valor de la entrella que fue clickeada por individual*/
  const handleOnClick = (value) => {
    if (!isFetch) {
      setStarts(value);

      Swal.fire({
        title: `¿Quieres calificar con ${value} estrellas este libro?`,
        showDenybutton: true,
        showCancelbutton: true,
        confirmbuttonText: `Si`,
        denybuttonText: `No`,
      }).then((res) => {
        if (res.isConfirmed) {
          setIsClicked(true);
          doToRequest(value);
        }
      });
    }
  };

  /*Estos dos metodos son eventos el cual se activan cuando se le hace
  hover a alguna de las estrellas cuando entra al evento se le setea el
  valor de la estrella para así identificar en que estrella va y dependiendo
  de esa pues sus componentes hermanos se ponen en estado hover */
  const handleMouseEnter = (value) => {
    if (!isFetch) {
      setStarts(value);
      setIsHover(true);
    }
  };

  const handleMoseOut = () => {
    if (!isFetch) {
      setIsHover(false);
    }
  };
  return (
    <div className="d-flex" style={style}>
      {VALUES.map((value) => (
        <Start
          key={value}
          value={value}
          OnClick={handleOnClick}
          onMouseEnter={handleMouseEnter}
          onMouseOut={handleMoseOut}
          isHover={starts >= value ? isHover : false}
          isClicked={starts >= value ? isClicked : false}
          isFetch={isFetch}
        />
      ))}
    </div>
  );
}

export default Index;
