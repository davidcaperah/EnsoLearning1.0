import React, { useState, forwardRef } from "react";
import Swal from "sweetalert2";
import NoteForm from "./../NoteForm";
import { edit } from "services/notas-aulas";
import { useSelector } from "react-redux";

const Index = forwardRef(function ({ handleStateForm }, ref) {
  const [note, setNote] = useState("");
  const idNote = useSelector((state) => state.currNote);

  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await edit({ d: 1, id: idNote, nota: note });
      if (request.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La nota fue editada correctamente",
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
        title: "Error al editar la nota, por favor contacta con soporte",
        showConfirmbutton: false,
        timer: 1500,
      });
    }
  };
  return (
    <NoteForm
      ref={ref}
      title={"Editar nota"}
      titlebutton={"Editar"}
      handleInput={handleNoteInput}
      handleSubmit={handleSubmit}
    />
  );
});

export default Index;
