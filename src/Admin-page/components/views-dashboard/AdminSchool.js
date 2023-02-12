import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import Calendario from "components/calendario.js";
import EditModal from "./components/EditSchool";
import { getById } from "services/school";

const AdminSchool = () => {
  //lugar donde obtengo el id del colegio
  const currCoordinator = useSelector((state) => state.user);
  //Estados para el fetching de datos del colegio
  const [currSchool, setCurrSchool] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  //Estado para editar el colegio
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isFetching) {
      getById({ d: 0, id: currCoordinator.id_Col })
        .then((res) => {
          setCurrSchool(res.data);
        })
        .finally(() => {
          setIsLoading(false);
          setIsFetching(false);
        });
    }
  }, [currCoordinator.id_Col, isFetching]);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cont-princi-docentes">
      {isOpen &&
        ReactDOM.createPortal(
          <EditModal
            onOpenModal={handleOpenModal}
            school={currSchool}
            handleFetcher={setIsFetching}
          />,
          document.getElementById("modal-container-render")
        )}
      <div className="cont-imagen-docentes1">
        <div className="titulo-Vista">
          Bienvenido coordinador o administrativo del
        </div>
        <div className="view-title-coordinator">
          {isLoading || !currSchool ? <h3>Cargando...</h3> : currSchool.nombreC}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
            onClick={handleOpenModal}
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </div>
      </div>

      <div>
        <div className="cont-info-home1 container-event">
          <div className="backdrop-home backdrop-calendar">proximamente...</div>
          <div>
            <h4>Agenda</h4>
            <div className="cont-agenda-home">
              <div>
                <p>Reunion area de ciencia</p>
                <p>13-Enero-2021</p>
              </div>
              <div>
                <p>Reunion docentes con rector</p>
                <p>20-enero-2022</p>
              </div>
              <div>
                <p>Entrega de boletines 1 periodo</p>
                <p> 02-febrero-2021</p>
              </div>
              <div className="d-flex justify-content-end ver-mas-agenda">{`Ver mas >`}</div>
            </div>
          </div>

          <div>
            <Calendario
              contenedor={`cont-calendario-home`}
              diasCale={`dias-calendario-home`}
              colorLetra={"mes-calendario-contenido"}
            />
          </div>

          <div className="container-event">
            <div className="backdrop-home backdrop-event">proximamente...</div>
            <h4>Proximos eventos intitucionales</h4>
            <ul>
              <li>Dia del idioma</li>
              <li>Dia de la tierra</li>
              <li>Semana de la ciencia</li>
              <li>Integracion halloween</li>
            </ul>
          </div>
          <div className="cont-circulares-home container-event">
            <div className="backdrop-home backdrop-circulars">
              proximamente...
            </div>
            <h4>Criculares</h4>
            <div>
              <p>
                <strong>Circular 122 de 2021</strong> <br />
                Acuerdos de convivencia institucional
              </p>
            </div>
            <div>
              <p>
                <strong>Circular 121 de 2021</strong> <br />
                Actualizacion medidad de bioseguridad
              </p>
            </div>
            <div>
              <p>
                <strong>Circular 122 de 2021</strong> <br />
                Proceso electoral estudiantil 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSchool;
