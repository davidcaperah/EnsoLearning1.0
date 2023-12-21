import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import URL from "URL";
import Swal from "sweetalert2";
import AddAnuncios from "./addAnuncios";
import EditAnuncios from "./editAnuncios";
import { getAll, remove } from "services/announcements";

const AdminAnuncios = () => {
  const { id_Col } = useSelector((state) => state.user);
  const [announcements, setAnnouncements] = useState([]);
  const [interfaceNumber, setInterfaceNumber] = useState(0);
  const [announcementSingle, setAnnouncementSingle] = useState({});

  useEffect(() => {
    getAll({ d: 3, id_col: id_Col }).then((res) => {
      setAnnouncements(res.data);
    });
  }, [id_Col, interfaceNumber]);

  const removeAnnouncement = (announcement) => {
    Swal.fire({
      title: "¿Quieres eliminar este anuncio?",
      showDenybutton: true,
      confirmbuttonText: `Si`,
      denybuttonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const request = await remove({
          d: 1,
          id: announcement.id,
        });
        if (request) {
          const newAnnouncenment = announcements.filter(
            (ads) => ads.id !== announcement.id
          );
          setAnnouncements(newAnnouncenment);
        }
      }
    });
  };

  const editAnnouncement = (announcement) => {
    setInterfaceNumber(2);
    setAnnouncementSingle(announcement);
  };

  return (
    <div>
      {interfaceNumber === 0 ? (
        <div
          className="p-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {announcements.length !== 0 ? (
            announcements.map((announcement) => (
              <div
                className="p-2 m-2 shadow row bg-gris-whi border-30 rounded"
                style={{ width: "50%" }}
                key={announcement.id}
              >
                <div className="col-sm-10">
                  <img
                    src={`${URL.servidor}${announcement.imagen}`}
                    className="w-100"
                    alt={"enso learning" + announcement.titulo}
                  />
                  <h5 className="mt-3">
                    <strong> {announcement.titulo} </strong>
                  </h5>
                  <h6> {announcement.anuncio} </h6>
                  <p className="text-secondary"> {announcement.fecha} </p>
                </div>
                <div className="col-sm-2">
                  <div className="d-flex justify-content-center">
                    <div
                      className="pointer Areas bg-warning d-flex justify-content-center p-3 m-2 shadow rounded-circle"
                      onClick={() => removeAnnouncement(announcement)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-trash text-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </div>
                    <div
                      className="pointer Areas bg-warning  d-flex justify-content-center p-3 m-2 shadow rounded-circle"
                      onClick={() => editAnnouncement(announcement)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-pencil text-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No hay anuncios en este momento</h1>
          )}
          <div className="d-flex justify-content-center p-5">
            <div className="d-flex justify-content-center mr-2">
              <div
                className="bg-warning rounded-circle pointer p-3  shadow Areas"
                onClick={() => setInterfaceNumber(1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {interfaceNumber !== 0 ? (
        <div>
          <div className="d-flex justify-content-start mt-2">
            <div
              className="shadow pointer rounded-circle p-3 bg-white "
              onClick={() => setInterfaceNumber(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-arrow-left text-warning"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </div>
          </div>
          {interfaceNumber === 1 ? (
            <AddAnuncios
              idSchool={id_Col}
              handleChangeView={setInterfaceNumber}
            />
          ) : null}
          {interfaceNumber === 2 ? (
            <EditAnuncios
              announcementSingle={announcementSingle}
              handleChangeView={setInterfaceNumber}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AdminAnuncios;
