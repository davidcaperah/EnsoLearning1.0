import React, { useState, forwardRef } from "react";
import { create } from "services/notas-aulas";
import NoteForm from "../NoteForm";
import Swal from "sweetalert2";

const Index = forwardRef(function ({ idClassRoom, handleStateForm }, ref) {
  const [note, setNote] = useState("");

  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await create({ d: 0, nota: note, aula: idClassRoom });
      if (request.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La nota fue guardada correctamente",
          showConfirmbutton: false,
          timer: 1500,
        }).then((res) => {
          handleStateForm();
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al guardar la nota, por favor contacta con soporte",
        showConfirmbutton: false,
        timer: 1500,
      });
    }
  };
  return (
    <NoteForm
      ref={ref}
      title={"Añadir una nota a esta aula"}
      titlebutton={"Crear"}
      handleInput={handleNoteInput}
      handleSubmit={handleSubmit}
    />
  );
});

export default Index;
