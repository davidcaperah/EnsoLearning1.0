import { createStore } from "redux";

const initialState = {
  user: false,
  numberInterfazGrados: 0,
  numberInterfazPensamientos: 0,
  Pensamientos: [],
  Tema: {},
  subTemas: [],
  Temas: [],
  numberInterfazActividades: 0,
  subirActividad: {},
  docente: {},
  numberInterfazAula: 0,
  aulaSeleccionada: {},
  cursosAdmin: [],
  interfazCursosAdmin: false,
  numberInterfazEstudiantes: 0,
  datosEvaluacionEstudiantes: {},
  numberInterfazVerMallas: 0,
  verMallasActividades: {},
  planillasCurso: {},
  planillasEstudiante: {},
  idMallaSeleccionada: {},
  numberInterfazCurso: 0,
  numberInterfazLibro: 0,
  infoCoordi: {},
  respuestaEvaluacion: {},
  TiempoEvaluacion: "",
  tiempoSalioEva: 0,
  horasEvaluacion: 0,
  SegundosEvaluacion: 0,
  MinutosEvaluacion: 0,
  CrearActividadDatos: {},
  CrearActividadDocente: {},
  RecursosImagen: {},
  aulasList: [],
  currNote: 0,
};

const reducer = (state = initialState, action) => {
  const {
    type,
    user,
    numberInterfazGrados,
    numberInterfazPensamientos,
    Pensamientos,
    Tema,
    subTemas,
    Temas,
    numberInterfazActividades,
    subirActividad,
    docente,
    numberInterfazAula,
    aulaSeleccionada,
    cursosAdmin,
    interfazCursosAdmin,
    numberInterfazEstudiantes,
    datosEvaluacionEstudiantes,
    numberInterfazVerMallas,
    verMallasActividades,
    respuestaEvaluacion,
    planillasCurso,
    planillasEstudiante,
    idMallaSeleccionada,
    numberInterfazCurso,
    numberInterfazLibro,
    infoCoordi,
    TiempoEvaluacion,
    tiempoSalioEva,
    horasEvaluacion,
    MinutosEvaluacion,
    SegundosEvaluacion,
    CrearActividadDatos,
    CrearActividadDocente,
    RecursosImagen,
    aulasList,
    currNote,
  } = action;

  if (type === "currNote") {
    return {
      ...state,
      currNote,
    };
  }

  if (type === "RecursosImagen") {
    return {
      ...state,
      RecursosImagen,
    };
  }
  if (type === "aulasList") {
    return {
      ...state,
      aulasList,
    };
  }
  if (type === "CrearActividadDocente") {
    return {
      ...state,
      CrearActividadDocente,
    };
  }

  if (type === "CrearActividadDatos") {
    return {
      ...state,
      CrearActividadDatos,
    };
  }
  if (type === "@addDatauser") {
    return {
      ...state,
      user,
    };
  }

  if (type === "@updateInterfazGrados") {
    return {
      ...state,
      numberInterfazGrados,
    };
  }

  if (type === "@updateInterfazPensamientos") {
    return {
      ...state,
      numberInterfazPensamientos,
    };
  }

  if (type === "@updatePensamientos") {
    return {
      ...state,
      Pensamientos,
    };
  }

  if (type === "@updateTema") {
    return {
      ...state,
      Tema,
    };
  }

  if (type === "@updatesubTemas") {
    return {
      ...state,
      subTemas,
    };
  }

  if (type === "@updateTemas") {
    return {
      ...state,
      Temas,
    };
  }
  if (type === "numberInterfazActividades") {
    return {
      ...state,
      numberInterfazActividades,
    };
  }

  if (type === "@updateSubirActividad") {
    return {
      ...state,
      subirActividad,
    };
  }

  if (type === "@uploadDocente") {
    return {
      ...state,
      docente,
    };
  }

  if (type === "@updateNumberInterfazAula") {
    return {
      ...state,
      numberInterfazAula,
    };
  }

  if (type === "@uploadAulaSeleccionada") {
    return {
      ...state,
      aulaSeleccionada,
    };
  }

  if (type === "@updateCursosAdmin") {
    return {
      ...state,
      cursosAdmin,
    };
  }

  if (type === "@updateinterfazCursosAdmin") {
    return {
      ...state,
      interfazCursosAdmin,
    };
  }

  if (type === "@updatenumberInterfazEstudiantes") {
    return {
      ...state,
      numberInterfazEstudiantes,
    };
  }

  if (type === "@updatedatosEvaluacionEstudiantes") {
    return {
      ...state,
      datosEvaluacionEstudiantes,
    };
  }

  if (type === "@updatenumberInterfazVerMallas") {
    return {
      ...state,
      numberInterfazVerMallas,
    };
  }

  if (type === "@updateverMallasActividades") {
    return {
      ...state,
      verMallasActividades,
    };
  }

  if (type === "@updateplanillasCurso") {
    return {
      ...state,
      planillasCurso,
    };
  }

  if (type === "@updateplanillasEstudiante") {
    return {
      ...state,
      planillasEstudiante,
    };
  }

  if (type === "@updateidMallaSeleccionada") {
    return {
      ...state,
      idMallaSeleccionada,
    };
  }

  if (type === "@updateInterfazCurso") {
    return {
      ...state,
      numberInterfazCurso,
    };
  }

  if (type === "@updateInterfazLibro") {
    return {
      ...state,
      numberInterfazLibro,
    };
  }

  if (type === "@updateinfoCoordi") {
    return {
      ...state,
      infoCoordi,
    };
  }

  if (type === "@updaterespuestaEvalua") {
    return {
      ...state,
      respuestaEvaluacion,
    };
  }

  if (type === "@updateTiempoEvaluacion") {
    return {
      ...state,
      TiempoEvaluacion,
      horasEvaluacion,
      SegundosEvaluacion,
      MinutosEvaluacion,
    };
  }

  if (type === "@updatetiempoSalioEva") {
    return {
      ...state,
      tiempoSalioEva,
    };
  }

  return state;
};

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
