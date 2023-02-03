import { useState } from "react";
import ModalContainer from "components/ModalContainer";
import Swal from "sweetalert2";
import { edit } from "services/school";
import "./style.css";

function Index({ onOpenModal, school, handleFetcher }) {
  const [name, setName] = useState(school.nombreC);
  const [contact, setContact] = useState(school.contacto);
  const [info, setInfo] = useState(school.info);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await edit({
      d: 1,
      id: school.id,
      Nombre: name,
      contacto: contact,
      info,
      imagen: "url/data",
    });

    if (request.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Los cambios han sido guardados correctamente",
        showConfirmButton: true,
        customClass: {
          container: "z-10",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          handleFetcher(true);
          onOpenModal();
        }
      });
      return;
    }

    Swal.fire({
      position: "center",
      icon: "error",
      title: "Error al guardar los cambios",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleContactInput = (e) => {
    setContact(e.target.value);
  };
  const handleInfoInput = (e) => {
    setInfo(e.target.value);
  };
  return (
    <ModalContainer onClose={onOpenModal}>
      <form className="form-school" onSubmit={handleSubmit}>
        <div className="input-file-container">
          <label
            htmlFor="input-cover-page-image"
            className="container-cover-page-image"
          >
            <input type="file" id="input-cover-page-image" />
            <label htmlFor="input-logo-image" className="container-logo-image">
              <input type="file" id="input-logo-image" />
            </label>
          </label>
        </div>
        <div className="container-inputs">
          <label htmlFor="input-name-text" className="container-input">
            Nombre
            <input
              type="text"
              id="input-name-text"
              value={name}
              onChange={handleNameInput}
            />
          </label>
          <label htmlFor="input-contact-tel" className="container-input">
            Contacto
            <input
              type="tel"
              id="input-contact-tel"
              value={contact}
              onChange={handleContactInput}
            />
          </label>
        </div>
        <label htmlFor="textarea-contact-text" className="container-textarea">
          Información
          <textarea onChange={handleInfoInput}>{info}</textarea>
        </label>
        <div className="container-button">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </ModalContainer>
  );
}

export default Index;
