import { useState } from "react";
import Swal from "sweetalert2";
import { edit } from "services/announcements";

const EditAnuncios = ({ announcementSingle, handleChangeView }) => {
  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const editarAnuncio = async (e) => {
    e.preventDefault();
    const consulta = await edit({
      d: 0,
      id: announcementSingle.id,
      titulo: title,
      anuncio: announcement,
    });
    if (consulta.data) {
      handleChangeView(0);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
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
    <div>
      <form onSubmit={editarAnuncio} className="w-75 m-auto">
        <h2 className="text-center text-warning p-2">Editar anuncio</h2>
        <p className="text-center text-white">{announcementSingle.titulo}</p>
        <input
          id="titulo"
          type="text"
          className="form-control m-2"
          required
          defaultValue={announcementSingle.titulo}
          onChange={handleTitleInput}
        />
        <textarea
          id="anuncio"
          className="form-control m-2"
          required
          defaultValue={announcementSingle.anuncio}
          onChange={handleAnnouncementInput}
        ></textarea>
        <div className="col text-center p-3">
          <button className="btn btn-info w-25"> Editar Anuncio </button>
        </div>
      </form>
    </div>
  );
};

export default EditAnuncios;
