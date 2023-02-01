import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import Logo from "assets/img/VBBV.svg";
import decode from "utils/decode";
import { getById } from "services/coordinator";
import URL from "URL";

const Header = () => {
  const dispatch = useDispatch();

  const [currCoordinator, setCurrCoordinator] = useState({});

  const [abrirMenu, setAbrirMenu] = useState(0);

  const cookies = new Cookies();

  const idUser = decode("iduser", "A");

  useEffect(() => {
    getById({ d: 1, id: idUser }).then((res) => {
      setCurrCoordinator(res.data[0]);
      dispatch({ type: "@addDatauser", user: res.data[0] });
    });
  }, [dispatch, idUser]);

  const CerrarSesion = () => {
    cookies.remove("estado");
    cookies.remove("iduser");
    cookies.remove("colid");
    cookies.remove("idcol");
    cookies.remove("idCurso");
    cookies.remove("idMateria");
    dispatch({ type: "@addDatauser", user: {} });
    window.location.replace(URL.compartido);
  };

  const menu = () => {
    abrirMenu === 0 ? setAbrirMenu(1) : setAbrirMenu(0);
  };

  return (
    <div className="cont-header">
      <div>
        <img src={Logo} className="logo" alt="logo" />
      </div>
      <div className="con-ico-header-pri">
        <div className="cont-ico-header">
          <img
            src={`${URL.servidor}Archivos_u/iconos/mensajes.svg`}
            alt="message"
          />
        </div>
        <div className="cont-ico-header">
          <img
            src={`${URL.servidor}Archivos_u/iconos/campana1.svg`}
            alt="campana"
          />
        </div>
      </div>
      <div className="cont-infoDocente">
        <div>
          {currCoordinator.imagen ? (
            <div>
              <img
                className="foto-perfilDoce"
                src={`${URL.servidor}${currCoordinator.imagen}`}
                alt="Logo"
              />
            </div>
          ) : (
            <div>
              <img
                className="foto-perfilDoce"
                src={`${URL.servidor}/Archivos_u/Logos_estu/F1.png`}
                alt="logo student"
              />
            </div>
          )}
        </div>
        <div className="cont-nombreDocente">
          <p>
            {`${currCoordinator.nombre} ${currCoordinator.apellido}`}
            <br />
            Coordinador
          </p>
        </div>
        <div className="sub-menu-header">
          <img
            onClick={menu}
            src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}
            alt="logo arrow down"
          />
        </div>
        {abrirMenu === 1 ? (
          <div className="menu-des-header-coordinador">
            {/* <div>
              <img
                src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}
                alt="logo arrow up"
              />
              <a href="/DocenteInfo">Mi perfil</a>
            </div> */}
            <div>
              <img
                src={`${URL.servidor}Archivos_u/iconos/flecha-hacia-abajo.svg`}
                alt="logo arrow down"
              />
              <p onClick={CerrarSesion}>Cerrar sesión</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
