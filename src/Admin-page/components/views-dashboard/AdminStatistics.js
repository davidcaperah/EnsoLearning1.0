import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Cookies from "universal-cookie";
import axios from "axios";
import URL from "../../../URL.js";

const Adminstatistics = () => {
  const [info, setinfo] = useState([]);

  let CryptoJS = require("crypto-js");
  const cookies = new Cookies();

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
      estadisticas(response.data);
      console.log(response.data);
    };
    const estadisticas = async (res) => {
      const dataCicloUno = {
        labels: ["Primer Periodo"],
        datasets: [],
      };
      res.map((data) =>
        dataCicloUno.datasets.push({
          label: String(data.Curso_Nu),
          fill: false,
          lineTension: 0.5,
          backgroundColor:
            "rgba(" +
            Math.floor(Math.random() * (150 - 250) + 150) +
            "," +
            Math.floor(Math.random() * (250 - 300) + 250 + data.id) +
            ", " +
            Math.floor(Math.random() * (250 - 400) + 250 + data.id) +
            ", 0.5)",
          borderWidth: 2,
          data: [data.promedio],
        })
      );
      setinfo(dataCicloUno);
      console.log(dataCicloUno.datasets);
      console.log(res);
    };

    sendData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="text-white">
      <div className="bg-dark">
        <h3 className="text-white text-center p-2">Promedios por curso</h3>
        {info.datasets === "" ? (
          <h6>No hay promedios</h6>
        ) : (
          <Bar
            data={info}
            options={{
              title: {
                display: true,
                text: "Ciclo Uno",
                fontSize: 20,
                color: "white",
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Adminstatistics;
