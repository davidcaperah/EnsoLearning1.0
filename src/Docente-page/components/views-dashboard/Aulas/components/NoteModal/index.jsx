import React, { useState } from "react";
import { useSelector } from "react-redux";
import NoteFormAdd from "./components/NoteFormAdd";
import NoteFormEdit from "./components/NoteFormEdit";
import NotesTable from "./components/NotesTable";
import "./style.css";

function Index({ handleStateModal }) {
  const currClassRoom = useSelector((state) => state.aulaSeleccionada);
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false);
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);

  const handleStateFormCreate = () => {
    setIsOpenFormCreate(!isOpenFormCreate);
  };

  const handleStateFormEdit = (e) => {
    setIsOpenFormEdit(!isOpenFormEdit);
  };

  const handleClose = () => {
    setIsOpenFormCreate(false);
    setIsOpenFormEdit(false);
  };

  return (
    <div className="background-modal">
      <div className="modal-container">
        <header className="header-container-modal">
          <div
            className="btns-action"
            onClick={
              isOpenFormCreate || isOpenFormEdit
                ? handleClose
                : handleStateFormCreate
            }
          >
            {isOpenFormCreate || isOpenFormEdit ? (
              <>
                <div style={{ backgroundColor: "rgb(249, 26, 26)" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="#fff"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </div>
                <span>Cancelar</span>
              </>
            ) : (
              <>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="#fff"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
                <span>Añadir nota</span>
              </>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
            onClick={handleStateModal}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </header>
        {isOpenFormCreate ? (
          <NoteFormAdd
            idClassRoom={currClassRoom.id}
            handleStateForm={handleStateFormCreate}
          />
        ) : isOpenFormEdit ? (
          <NoteFormEdit handleStateForm={handleStateFormEdit} />
        ) : (
          <NotesTable
            idClassRoom={currClassRoom.id}
            handleEdit={handleStateFormEdit}
          />
        )}
      </div>
    </div>
  );
}

export default Index;
