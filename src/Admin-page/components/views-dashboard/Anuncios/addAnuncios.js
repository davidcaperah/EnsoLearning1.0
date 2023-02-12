import React, { useState } from "react";
import Swal from "sweetalert2";
import { create } from "services/announcements";

const AddAnuncios = ({ idSchool, handleChangeView }) => {
  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const agregarAnuncio = async (e) => {
    e.preventDefault();
    const request = await create({
      d: 2,
      id_col: idSchool,
      titulo: title,
      anuncio: announcement,
      imagen: "/dadasda/imagen",
    });

    if (request.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleChangeView(0);
        }
      });
    }
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleAnnouncementInput = (e) => {
    setAnnouncement(e.target.value);
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <form
        onSubmit={agregarAnuncio}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0px",
          width: "50%",
        }}
      >
        <h2 className="text-center text-warning p-2">Agregar anuncios</h2>
        <input
          id="titulo"
          type="text"
          className="form-control m-2 p-2"
          placeholder="Titulo"
          required
          onChange={handleTitleInput}
        />
        <textarea
          id="anuncio"
          className="form-control m-2 p-2"
          placeholder="Ej: Mañana se celebrará la entrega de boletines"
          required
          onChange={handleAnnouncementInput}
        ></textarea>
        <button className="btn btn-info">Agregar Anuncio</button>
      </form>
    </div>
  );
};

export default AddAnuncios;
