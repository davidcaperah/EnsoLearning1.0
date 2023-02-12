import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import Pagination from "components/Pagination";
import { getAll, remove } from "services/notas-aulas";
import Swal from "sweetalert2";
import "./style.css";

function Index({ idClassRoom, handleEdit, containerPagination }) {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    getAll({ d: 2, aula: idClassRoom, pagina: page })
      .then((res) => {
        setNotes(res.data.notas_aulas);
        setTotalPage(res.data.paginas.total_paginas);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al traerme las notas, por favor contacta con soporte",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, [idClassRoom, page]);

  const handleOnclickEdit = (id) => {
    handleEdit();
    dispatch({ type: "currNote", currNote: id });
  };

  const handleOnclickDelete = async (id) => {
    const temporal = Array.from(notes);
    try {
      const request = await remove({ d: 3, id });
      const indexNote = notes.findIndex((note) => note.id === id);
      temporal.splice(indexNote, 1);
      setNotes(temporal);
      if (request.data === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nota eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en el servidor",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handlePlusPage = () => {
    setPage(page + 1);
  };

  const handleRestPage = () => {
    setPage(page - 1);
  };

  if (notes.length === 0) {
    return <h3>No hay notas para las aulas</h3>;
  }
  return (
    <div className="container-body">
      <table className="table-container-modal">
        <thead>
          <tr>
            <th>Nota</th>
            <th>Fecha de creación</th>
            <th>Ultima fecha de edición</th>
            <th>Versión</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id} id={note.id}>
              <td>{note.nota}</td>
              <td>{note.fecha_crear}</td>
              <td>
                {note.fecha_editar !== null
                  ? note.fecha_editar
                  : "Esta nota no ha sido editada ultimamente"}
              </td>
              <td>{note.version > 0 ? note.version : "1"}</td>
              <td>
                <button onClick={() => handleOnclickEdit(note.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </button>
              </td>
              <td>
                <button onClick={() => handleOnclickDelete(note.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ReactDOM.createPortal(
        <Pagination
          page={page}
          totalPage={totalPage}
          plusPage={handlePlusPage}
          restPage={handleRestPage}
        />,
        containerPagination.current
      )}
    </div>
  );
}

export default Index;
