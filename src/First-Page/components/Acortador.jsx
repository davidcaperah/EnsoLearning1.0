import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import URL from '../../URL';
const Crear =() =>{
    const id = useParams();
    useEffect(() => {
        const TraerQr =  async () => {
            let idCurso = JSON.stringify({d:2,id:id.id})
            const api = axios.create({baseURL : URL.servidor});
            const response = await api.post('/api-php-react/admin/cr_QR.php', idCurso);
            const data = response.data
            console.log(data);
            if(data.length > 0){
                console.log(data[0].link);
                window.location.href = data[0].link;
            }
        }
        TraerQr()
    }, [])
    return(
        <h1>Cargando.....</h1>
    )
}
export default Crear;
