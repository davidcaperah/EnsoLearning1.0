import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import URL from "../../../URL.js";
import Swal from "sweetalert2";

const AdminDocenteCursos = () => {
  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

  const [DatosRecibidos, setDatosRecibidos] = useState([]);
  const [Materias, setMaterias] = useState([]);

  let IdDocEncriptado = cookies.get("idDoc");
  let bytesDoc = CryptoJS.AES.decrypt(IdDocEncriptado, "A");
  let DocId = JSON.parse(bytesDoc.toString(CryptoJS.enc.Utf8));

  const DatosDocente = {
    id: DocId,
  };

  let IdcolEncriptado = cookies.get("idcol");
  let bytescol = CryptoJS.AES.decrypt(IdcolEncriptado, "A");
  let colId = JSON.parse(bytescol.toString(CryptoJS.enc.Utf8));

  const Datos = {
    id: colId,
  };

  useEffect(() => {
    const sendData = async () => {
      let DatosJson = JSON.stringify(Datos);
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_cursos.php",
        DatosJson
      );
      setDatosRecibidos(...DatosRecibidos, response.data);
    };

    const CargarMaterias = async () => {
      let DatosJson = JSON.stringify("1");
      const api = axios.create({ baseURL: URL.servidor });
      const response = await api.post(
        "/api-php-react/Cargar_mat.php",
        DatosJson
      );
      setMaterias(response.data);
    };

    CargarMaterias();
    sendData();
    //eslint-disable-next-line
  }, []);

  const [Campos, setCampos] = useState({
    idDocente: DatosDocente.id,
    materias: "",
    curso: "",
  });

  const onChange = (e) => {
    setCampos({
      ...Campos,
      [e.target.name]: e.target.value.trim(),
    });
  };

  async function NoRecargar(e) {
    e.preventDefault();
    const result = DatosRecibidos.filter(
      (data) => data.id === parseInt(Campos.curso)
    );
    const resultmap = result.map((dato) => dato.Curso_Nu);
    const Curso_Nu = String(resultmap[0]);
    let Datos = Campos;
    Datos.NumeroCurso = Curso_Nu;
    let DatosJson = JSON.stringify(Datos);
    console.log(DatosJson);

    const consulta = await axios({
      method: "post",
      url: `${URL.servidor}/api-php-react/Consulta_procursos.php`,
      data: DatosJson,
    });
    let datosRecibidos = consulta.data;

    if (datosRecibidos.mensaje === "Cambio guardado correctamente") {
      Swal.fire({
        icon: "success",
        text: datosRecibidos.mensaje,
      });
      cookies.remove("idDoc");
      window.location.replace("/AdminTeacher");
    } else {
      Swal.fire({
        icon: "error",
        text: datosRecibidos.mensaje,
      });
    }
    /*try {
            //Envía configuración de json 
            let Configuracion = {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body :  DatosJson
            }
            //Envía datos de json a la api
            let res = await fetch(`${URL.servidor}/api-php-react/Consulta_procursos.php`, Configuracion)
            let json = await res.json()
            // let json = await res.text()
            console.log(json)
            if(json.mensaje === "Cambio guardado correctamente" ){
                Swal.fire({
                    icon: 'success',
                    text: json.mensaje
                })
                cookies.remove("idDoc")
                window.location.replace("/AdminTeacher");
            }else{
                Swal.fire({
                    icon: 'error',
                    text: json.mensaje
                })
            }
        } catch (error) {
            console.log(error)
        }*/
  }

  return (
    <div className="p-4">
      <h5>
        {" "}
        Aquí podrás selecionar la materia y el curso que este docente dictará en
        tu colegio, podrás agregar más de un curso y más de una materia a cada
        docente.{" "}
      </h5>
      <form className="mt-2" onSubmit={NoRecargar}>
        <p className="m-2">
          {" "}
          Seleciona el curso que le quieres asignar a este docente.{" "}
        </p>
        <select className="form-control m-2" onChange={onChange} name="curso">
          <option> Curso </option>
          {DatosRecibidos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {" "}
              {curso.Curso_Nu}{" "}
            </option>
          ))}
        </select>
        <p className="m-2"> Seleciona la materia que dictará el docente. </p>
        <select
          className="form-control m-2"
          onChange={onChange}
          name="materias"
        >
          <option> Materias </option>
          {Materias.map((data) => (
            <option key={data.id} value={data.id}>
              {" "}
              {data.N_Materia}{" "}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary m-2">
          Enviar{" "}
        </button>
      </form>
    </div>
  );
};

export default AdminDocenteCursos;
