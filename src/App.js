import React  from 'react';
import Footer from './First-Page/components/footer.js';
import DiferenciarNavbar from './navbar/DiferenciarNavbar';
import Router from './router';


// es la agonia del route el que manda la alerta de error
const App = () => {
    return (
        <div>
            <DiferenciarNavbar/>
            <Router/>  
            <Footer />
        </div>
    );
}
 
export default App;