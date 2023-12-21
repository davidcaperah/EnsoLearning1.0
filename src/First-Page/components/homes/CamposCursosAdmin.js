import React, { useState } from 'react';


import URL from '../../../URL.js';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CamposCursosAdmin = ({ Codigo, datos }) => {

    const dispatch = useDispatch()
    const cursosAdmin = useSelector(state => state.cursosAdmin)

    const [Campos, setCampos] = useState({
        Jornada: '',
        Curso: '',
        Dias: "",
        Horas: "",
        Materias: "",
        Estudiantes: "",
        Codigo: Codigo,
        idColegio: datos.colegio,
        Ciclo: ""
    });

    let { Jornada, Curso, Dias, Horas, Estudiantes, Materias } = Campos;

    

    const NoRecargar = (e) => {
        e.preventDefault()
        if (Curso > 0 && Dias > 0 && Horas > 0 && Materias > 0 && Estudiantes > 0) {
            if (Jornada) {
                Swal.fire({
                    title: '¿Has verificado correctamente los datos? ¡Recuerda guardar el código de usuario!',
                    showDenybutton: true,
                    showCancelbutton: true,
                    confirmbuttonText: `¡Listo!`,
                    denybuttonText: `Quiero verificar nuevamente`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        EnviarDatos()
                    }
                })

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Vacios',
                    text: '¡Recuerda llenar todos los campos!'
                })
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos Vacios',
                text: '¡Recuerda llenar todos los campos!'
            })
        }
    }


    const EnviarDatos = async () => {
        const consulta = await axios({
            method: "post",
            url: `${URL.servidor}/api-php-react/guardar_curso.php`,
            data: Campos
        })

        if (consulta.data.mensaje) {
            Swal.fire({
                icon: 'error',
                text: consulta.data.mensaje
            })
        } else if (consulta.data === true) {
            Swal.fire('¡Datos guardados!', '', 'success')
            const newCurso = [Campos]
            const newCursos = cursosAdmin.concat(newCurso)
            dispatch({
                type: "@updateCursosAdmin",
                cursosAdmin: newCursos
            })
            dispatch({
                type: "@updateinterfazCursosAdmin",
                interfazCursosAdmin: false
            })
        }
    }

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name]: e.target.value.trim()
        });
    }



    return (
        <div className="shadow rounded p-3">
            <form onSubmit={NoRecargar}>
                <select className="m-2 form-control" name="Jornada" onChange={onChange}>
                    <option unselectable="true" > jornada </option>
                    <option value="1" > Mañana </option>
                    <option value="2" > Tarde </option>
                    <option value="3" > Noche </option>
                </select>
                <select className="m-2 form-control" name="Ciclo" onChange={onChange}>
                    <option unselectable="true" > Ciclo </option>
                    <option value="dark"    > Ciclo 3 </option>
                    <option value="danger"  > Ciclo 2 </option>
                    <option value="warning" > Ciclo 1 </option>
                </select>
                <input name="Curso" value={Curso} onChange={onChange} className=" m-2 form-control" minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@]+" type="number" placeholder="Número del curso" />
                <input name="Horas" value={Horas} onChange={onChange} className=" m-2 form-control" minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@]+" type="number" placeholder="Intensidad horaria (horas)" />
                <input name="Materias" value={Materias} onChange={onChange} className=" m-2 form-control" minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@]+" type="number" placeholder="Número Materias" />
                <input name="Dias" value={Dias} onChange={onChange} className=" m-2 form-control" minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@]+" type="number" placeholder="Días de estudio (semana) " />
                <input name="Estudiantes" value={Estudiantes} onChange={onChange} className=" m-2 form-control" minLength="1" maxLength="40" required pattern="[A-Za-z0-9--- -ñ-@]+" type="number" placeholder="Número de estudiantes" />

                <p className="text-muted mt-4 " > Este es el código que debes darle al docente encargado, recuerda no darselo a nadie más! </p>
                <div className="alert alert-info icono-click" role="alert" >
                    {Codigo}
                </div>
                <button
                    variant="contained"
                    color="secondary"
                    className={` CeroBootstrap ml-2 my-3`}
                    type="submit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                </button>
            </form>

        </div>
    );
}

export default CamposCursosAdmin;