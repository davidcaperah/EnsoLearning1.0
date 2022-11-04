import React from 'react';
import {BrowserRouter, Route, Routes,useParams } from 'react-router-dom';
import Login from './First-Page/components/login';
import Register from './First-Page/components/register';
import PaginaUno from './First-Page/components/page';
import Planes from './First-Page/components/Planes'
import Empezar from './First-Page/components/info_contactos/comoempezar';
import Instituciones from './First-Page/components/info_contactos/instituciones';
import Nosotros from './First-Page/components/info_contactos/nosotros';
import Servicios from './First-Page/components/info_contactos/Servicios';
import Terminos from './First-Page/components/info_contactos/terminosycondiciones';
import Contacto from './First-Page/components/info_contactos/contactenos'

import FormAcudiente from './First-Page/components/FormAcudiente';
import FormAdmin from './First-Page/components/FormAdmin';
import FormDocente from './First-Page/components/FormDocente';
import FormEstudiante from './First-Page/components/FormEstudiante';

import AdminFormTwo  from "./First-Page/components/homes/adminformtwo";
import AdminFormFour  from "./First-Page/components/homes/adminformfour";

import DocenteFormOne  from "./First-Page/components/homes/DocenteFormOne";
import AdminPage from "./Admin-page/admin-page";

import AdminRecuperarContra from "./Admin-page/recuperarcontraseña";
import AdminCambiarContra from "./Admin-page/cambiarcontraseña";
import ClaveDocente from './First-Page/recuperarcontrasena_todos/ClaveDocente';
import ClaveEstudiante from './First-Page/recuperarcontrasena_todos/ClaveEstudiante';
import ClaveAcudiente from './First-Page/recuperarcontrasena_todos/ClaveAcudiente';
import ClaveAdmin from './First-Page/recuperarcontrasena_todos/ClaveAdministrador';
import ClaveSuperUsuario from './First-Page/recuperarcontrasena_todos/ClaveSuperUsuario';
import EstudianteCambiarContra from './First-Page/recuperarcontrasena_todos/cambiarcontraseñaEstudiante';
import DocenteCambiarContra from './First-Page/recuperarcontrasena_todos/cambiarcontraseñaDocente';
import AdministradorCambiarContra from './First-Page/recuperarcontrasena_todos/cambiarcontraseñaAdmin';
import AcudienteCambiarContra from './First-Page/recuperarcontrasena_todos/cambiarcontraseñaAcudiente';


import DocentePage from "./Docente-page/DocentePage";
import EstudianteOnePage from './Estudiante1-page/EstudiantePage';
import EstudianteTwoPage from './Estudiante2-page/Estudiantetwopage';
import EstudianteThreePage from './Estudiante3-page/EstudianteThreePage';

import R404 from './404-page/r404.js';
import LoginSuperUsuario from './First-Page/components/homes/LoginSuperUsuario';
import SuperUsuario from './SuperUsuario/index'
import Acortador from './First-Page/components/Acortador'
const Router = () => (
    <BrowserRouter>
        <Routes >
            <Route exact path = '/'       element={<PaginaUno />}/>
            <Route exact path = '/registro'        element = {<Register/>}/>
            <Route exact path = '/FormE'           element = {<FormEstudiante/>}/>
            <Route exact path = '/Login'           element = {<Login/>}/>
            <Route exact path = '/FormA'           element = {<FormAcudiente/>}/>
            <Route exact path = '/FormAA'          element = {<FormAdmin/>}/>
            <Route exact path = '/FormD'           element = {<FormDocente/>}/>
            <Route exact path = "/adminformtwo"    element = {<AdminFormTwo/>} /> 
            <Route exact path = "/adminformfour"   element = {<AdminFormFour/>} /> 
            <Route exact path = "/adminpage"       element = {<AdminPage/>} /> 
            <Route exact path = "/DocenteFormOne"  element = {<DocenteFormOne/>}/> 
            <Route exact path = "/DocentePage"     element = {<DocentePage/>} /> 
            <Route exact path = "/Planes"          element = {<Planes/>} /> 
            <Route exact path = "/Recuperar"       element = {<AdminRecuperarContra/>} />
            <Route exact path = "/Planes"          element = {<Planes/>} /> 
            <Route exact path = "/EmpezarConNosotros"          element = {<Empezar/>} /> 
            <Route exact path = "/Instituciones"          element = {<Instituciones/>} /> 
            <Route exact path = "/Nosotros"          element = {<Nosotros/>} /> 
            <Route exact path = "/Servicios"          element = {<Servicios/>} /> 
            <Route exact path = "/TerminosyCondiciones"       element = {<Terminos/>} />
            <Route exact path = "/Contacto"       element = {<Contacto/>} />
            
            
            <Route exact path = "/ClaveAdmin"   element = {<ClaveAdmin/>} /> 
            <Route exact path = "/ClaveAcudiente"   element = {<ClaveAcudiente/>} /> 
            <Route exact path = "/ClaveEstudiante"   element = {<ClaveEstudiante/>} /> 
            <Route exact path = "/claveDocente"   element = {<ClaveDocente/>} /> 
            <Route exact path = "/CambiarContra"   element = {<AdminCambiarContra/>} /> 
            <Route exact path = "/CambiarContraEstudiante"   element = {<EstudianteCambiarContra/>} /> 
            <Route exact path = "/CambiarContraDocente"   element = {<DocenteCambiarContra/>} /> 
            <Route exact path = "/CambiarContraAdmin"   element = {<AdministradorCambiarContra/>} />
            <Route exact path = "/CambiarContraAcudiente"   element = {<AcudienteCambiarContra/>} />
            <Route exact path = "/AdminProfile"         element = {<LoginSuperUsuario/>} />
            <Route exact path = "/2H365X2"         element = {<ClaveSuperUsuario/>} />  

            <Route exact path = '/AdminLearn'            element  = {<AdminPage />}/>
            <Route exact path = '/AdminSchool'           element  = {<AdminPage />}/>
            <Route exact path = '/AdminStatistics'       element  = {<AdminPage />}/>
            <Route exact path = '/AdminStudent'          element  = {<AdminPage />}/>
            <Route exact path = '/AdminTeacher'          element  = {<AdminPage />}/>
            <Route exact path = '/AdminDocenteCursos'    element  = {<AdminPage />}/>
            
            
            <Route exact path = "/DocenteEstadisticas" element  = {<DocentePage/>}/>
            <Route exact path = "/DocenteCursos"       element  = {<DocentePage/>}/>
            <Route exact path = "/DocenteDocentes"     element  = {<DocentePage/>}/>
            <Route exact path = "/DocenteInfo"         element  = {<DocentePage/>}/>
            <Route exact path = "/DocenteAula"         element  = {<DocentePage/>}/>
            <Route exact path = "/AulaDocente"         element  = {<DocentePage/>}/>
            <Route exact path = "/Actividades"         element  = {<DocentePage/>}/>
            <Route exact path = "/PlanillaEstudiante"  element  = {<DocentePage/>}/>
            <Route exact path = "/Evaluaciones"        element  = {<DocentePage/>}/>
            <Route exact path = "/DocenteEvaluaciones" element  = {<DocentePage/>}/>
            <Route exact path = "/DocenteActividades"  element  = {<DocentePage/>}/>
            <Route exact path = "/Libros"              element  = {<DocentePage/>}/>

            <Route exact path = '/EstudianteOnePage'        element  = {<EstudianteOnePage/>}/>  
            <Route exact path = '/EstudianteOneEventos'     element  = {<EstudianteOnePage/>}/>  
            <Route path="/EstudianteOneLecturas"            element  = {<EstudianteOnePage/>} />
            
            <Route exact path ='/EstudianteTwoPage'         element  = {<EstudianteTwoPage/>}/>  
            <Route exact path="/EstudianteTwoHome"          element={<EstudianteTwoPage/>} />
            <Route exact path="/EstudianteTwoAula"          element={<EstudianteTwoPage/>} />
            <Route exact path="/EstudianteTwoCurso"         element={<EstudianteTwoPage/>} />
            <Route exact path="/EstudianteTwoActividades"   element={<EstudianteTwoPage/>} />
            <Route exact path="/EstudianteTwoEvaluaciones"  element={<EstudianteTwoPage/>} />
            <Route exact path="/EstudianteTwoUser"          element={<EstudianteTwoPage/>} />
            <Route exact path="/EstudianteTwoConfiguracion" element={<EstudianteTwoPage/>} />

            <Route exact path="/EstudianteThreeHome" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeAulas" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeEvaluaciones" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeActividades" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeCurso" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeConfiguracion" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeUser" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeEventos" element={<EstudianteThreePage/>} />
            <Route exact path="/EstudianteThreeLecturas" element={<EstudianteThreePage/>} />

            <Route exact path="/AdminTemas"       element={<EstudianteTwoPage/>} />
            <Route exact path="/AdminActividades" element={<EstudianteTwoPage/>} />
            <Route exact path="/Acudientes"       element={<EstudianteTwoPage/>} />

            <Route path="/Acortador/:id"       element={<Acortador/>} />


           
            <Route path="/error" element = {<R404/>}/>
        </Routes >
    </BrowserRouter>
);
 

export default Router;