import React from 'react';
import Menu from './menu';
import '../css/index.css';
import Rutas from './rutas';
import Header from './header'
const Dashboard = () => {
    return (
        <div  >     
            <div>
                <Header/>
            </div>
            <div className='separador-admin'>
                <div>
                    <Menu />
                </div>
                <div>
                    <Rutas  />
                </div>      
            </div>            
        </div>
    );
}
 



export default Dashboard;