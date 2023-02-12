import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLearn from "./views-dashboard/AdminLearn";
import AdminSchool from "./views-dashboard/AdminSchool";
import AdminStatistics from "./views-dashboard/AdminStatistics";
import AdminStudent from "./views-dashboard/AdminStudent";
import AdminTeacher from "./views-dashboard/AdminTeacher";
import AdminDocenteCursos from "./views-dashboard/AdminDocenteCursos";
import AdminAnuncios from "./views-dashboard/Anuncios/AdminAnuncios";
import addEventos from "./views-dashboard/addEventos";
import BucadorDocentesCoord from "./views-dashboard/AdminDocenteBuscador";
import RegistroDocente from "./views-dashboard/adminBuscaDocente";
import RegistroEstudiante from "./views-dashboard/AdminRegistroEstudi";
import CoursesView from "./views-dashboard/Cursos/CoursesView";
import ClassroomView from "./views-dashboard/Classroom/ClassroomView";
import CourseView from "./views-dashboard/Cursos/CourseView";
const Rutas = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/AdminLearn" element={<AdminLearn />} />
      <Route exact path="/AdminLearn/courses" element={<CoursesView />} />
      <Route exact path="/AdminLearn/courses/:id" element={<CourseView />} />
      <Route exact path="/AdminLearn/classroom" element={<ClassroomView />} />
      <Route exact path="/AdminSchool" element={<AdminSchool />} />

      {/* <Route exact path="/AdminStatistics" element={<AdminStatistics/>} /> */}
      <Route exact path="/AdminStudent" element={<AdminStudent />} />
      {/* <Route exact path="/AdminTeacher" element={<AdminTeacher/>} /> */}
      <Route path="/AdminDocenteCursos" element={<AdminDocenteCursos />} />
      <Route exact path="/AdminAnuncios" element={<AdminAnuncios />} />
      <Route exact path="/AdminEventos" element={<addEventos />} />
      <Route
        exact
        path="/AdminBuscadorDocente"
        element={<BucadorDocentesCoord />}
      />
      <Route exact path="/AdminRegistroDocente" element={<RegistroDocente />} />
      <Route
        exact
        path="/AdminRegistroEstudiante"
        element={<RegistroEstudiante />}
      />
    </Routes>
  </BrowserRouter>
);

export default Rutas;
