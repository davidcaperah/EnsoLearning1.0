import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import URL from '../../../URL'
import Swal from 'sweetalert2';
import EditEventosPage from './editEventos';
import Eventoslist from './ListapEventos';



function ListaEventos() {
    const [eventos, setEventos] = useState([])
    const [cambiarPage, setCambiarPage] = useState(1)
    const [datosEnviar, setDatosEnviar] = useState({})

    useEffect(() => {
        const traerEventos = async () => {
            let idCurso = JSON.stringify({               
                d: 2
            })
            const api = axios.create({ baseURL: URL.servidor });
            const response = await api.post('/api-php-react/CRUD_eventos.php', idCurso);
            const data = response.data
            console.log(data)
            if (data.length > 0) {
                setEventos(data)
            } else {
                setEventos([])
            }
        }
        traerEventos()
    }, []);


    const cambiarPagina = (n, datos) =>{
        setCambiarPage(n)
        setDatosEnviar(datos)
    }

    const eliminarEvento = async (evento) => {
        Swal.fire({
            title: '¿Quieres eliminar este evento?',
            showDenyButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                let infoEvento = JSON.stringify({               
                    d: 6,
                    id : evento.id
                })
                const api = axios.create({ baseURL: URL.servidor });
                const response = await api.post('/api-php-react/CRUD_eventos.php', infoEvento);
                const data = response.data
                console.log(data)
                Swal.fire({
                    icon : 'success',
                    text : "Se ha eliminado el evento."
                  })
                if(data){
                    const nuevosEventos = eventos.filter(data => data.id !== evento.id)
                    setEventos(nuevosEventos)
                }
                
            } 
          })
    }
    return (
        <div>
            {cambiarPage === 1 &&
                <div className="row">
                    {eventos.map(event =>
                        <div className="col-md-4" key={event.id}>
                            <div className="card shadow mb-5">
                                <div className="imagen-1"><img src={event.img} alt={"Enso Learning " + event.Nombre} /></div>
                                {/* <div className="imagen-2"><img src="https://previews.123rf.com/images/yupiramos/yupiramos1504/yupiramos150401815/38276452-dise%C3%B1o-persona-avatar.jpg"/></div> */}
                                <div className="textos">
                                    <h2 className="font-chewy text-blue text-center mt-2">{event.Nombre}</h2>
                                    <p>{event.des}</p>
                                    <hr></hr>
                                </div>

                                <div className="d-flex justify-content-center" >
                                    <div className="d-flex align-items-center m-2">
                                        <div className="d-flex justify-content-center" >
                                            <div className="bg-warning rounded-circle pointer p-3  shadow-lg" onClick={() => cambiarPagina(2,event)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex justify-content-center ml-2" >
                                            <div className="bg-danger rounded-circle pointer p-3  shadow-lg" onClick={() => eliminarEvento(event)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex justify-content-center ml-2" >
                                            <div className="bg-info rounded-circle pointer p-3  shadow-lg" onClick={() => cambiarPagina(3,event)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                                                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}{eventos.length === 0 &&
                        <div className="shadow p-3 m-2 w-50 m-auto" >
                            <h6 className="text-center"> En el momento no haz realizado eventos.</h6>
                        </div>
                    }

                </div>
            }
            {cambiarPage === 2 &&
             <div>
             {/* <div className="d-flex justify-content-start mt-2" >
                 <div className="shadow pointer rounded-circle p-3" onClick={() => cambiarPagina(1)} >
                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                         <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                     </svg>
                 </div>
             </div> */}
            <EditEventosPage datos={datosEnviar}/> 
         </div>
            }
            {cambiarPage === 3 &&
             <div>
             {/* <div className="d-flex justify-content-start mt-2" >
                 <div className="shadow pointer rounded-circle p-3" onClick={() => cambiarPagina(1)} >
                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                         <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                     </svg>
                 </div>
             </div> */}
            <Eventoslist datos={datosEnviar}/> 
         </div>
            }
        </div>

    )
}

export default ListaEventos;
