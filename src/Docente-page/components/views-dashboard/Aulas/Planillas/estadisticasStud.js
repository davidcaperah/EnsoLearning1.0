import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import URL from './../../../../../URL';
function App() {

    const planillasEstudiante = useSelector(state => state.planillasEstudiante);
    const [DatosRecibidos,setDatosRecibidos] = useState([])
    const [materianame,setmaterianame] = useState(['Matematicas1444', 'Ciencias', 'Filosofia', 'Estadistica', 'Tecnologia'])
    const [promedios,setpromedios] = useState([65, 59, 80, 81, 56, 55, 40])
    let Datos = {
        d: 11,
        id:planillasEstudiante.id
    }
    useEffect(() => {
        const TraerDatos = async () => {
            let DatosJson = JSON.stringify(Datos)
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/info_docente.php', DatosJson);
            let datax = response.data;
            let materias = []
            let promedios = []
            datax.map(e=>{
                console.log(e)
                materias.push(e.N_Materia)
                promedios.push(e.promedio)
                return null;
            })
            setpromedios(
                promedios
            )
            setmaterianame(
                materias
            )
            setDatosRecibidos(
                datax
            )
        }
        TraerDatos()
        //eslint-disable-next-line
    }, [])
    const data = {
        labels: materianame,
        datasets: [
            {
                label : 'Promedio en la materia',
                data: promedios,
                backgroundColor: '(255, 206, 86, 1)' ,
                borderColor: ['yellow'],
                borderWidth: 1,
                hoverBackgroundColor: '#DDEE8B',
                hoverBorderColor: '#fff',
            }
        ]
    };
    console.log(planillasEstudiante);
    console.log(DatosRecibidos)
    return (
        <div>
            <div className="bg-dark p-3" >
                <h3 className="text-white text-center">Estadisticas con promedios por materia</h3>
                <p className="text-white text-center">El estudiante <strong className="text-warning">{planillasEstudiante.Nombre} {planillasEstudiante.Apellido} </strong> del ciclo <strong className="text-warning">{planillasEstudiante.Ciclo}</strong> tiene un promedio de: <strong className="text-warning">{planillasEstudiante.promedio}</strong></p>
                <Bar data={data} />
            </div>
        </div>
    );
}
export default App;