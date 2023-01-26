import React, { useState } from "react";
import { useSelector } from "react-redux";
import Start from "../start";
import Swal from "sweetalert2";
import { loadRate } from "services/books";
import "./style.css";

function Index({ book }) {
  const docente = useSelector((state) => state.docente);

  //Seteo la cantidad estrellas que van a estar
  const VALUES = [1, 2, 3, 4, 5];
  //Este valor es el que va ir a la base datos
  const [starts, setStarts] = useState(0);
  /*Este valor me avisa cuando se halla clikeado
   cualquier estrella esto para que el resto de las
  estrellas se activen y queden marcadas*/
  const [isClicked, setIsClicked] = useState(false);
  /*Este función se le pasa al componente para que por dentro 
  me pase valor de la entrella que fue clickeada por individual*/

  const [isFetch, setIsFetch] = useState(false);

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
  a su vez lanza un alerta donde pasará a setear el estado de isClicked */
  const handleOnClick = (value) => {
    if (!isFetch) {
      setStarts(value);

      Swal.fire({
        title: `¿Quieres calificar con ${value} estrellas este libro?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
      }).then((res) => {
        if (res.isConfirmed) {
          setIsClicked(true);
          doToRequest(value);
        }
      });
    }
  };
  return (
    <div className="d-flex justify-content-center">
      {VALUES.map((value) => (
        <Start
          key={value}
          value={value}
          OnClick={handleOnClick}
          isFetch={isFetch}
          isClicked={starts >= value ? isClicked : false}
        />
      ))}
    </div>
  );
}

export default Index;
