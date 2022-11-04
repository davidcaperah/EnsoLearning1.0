import React,{useState,useEffect} from 'react';
import RutasCicloUno from './../router';
import Header from './header';
import HeaderHome from './headerHome'
import Carga from './pantallaCarga'
import URL from '../../URL';

const Dashboard = () => {
    
    const path = window.location.pathname
    const [load, setLoad] = useState(0);
    useEffect(() => {

        fetch(URL+path)
        .then((response) => {
          if(response.status === 200){
            setLoad(200)
          }
        }) 
    
      }, []);
 

    if(load === 200){
        return (
        
            <div className={path == "/EstudianteOnePage"? 'cont-home-menu-estu1': ""} >
                {
                    path == "/EstudianteOnePage" ?
                    <HeaderHome />
                    :<Header />
                }
                <RutasCicloUno />
            </div>
            
        );
      }
    else{
        return(
            <Carga/>
        )
    }
}
 
/*className='cont-vista'*/ 
export default Dashboard;