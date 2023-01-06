/**
 * ==================================================
 * Sistema de planeación de recursos empresariales 
 * @author Enso-Learning
 * @copyright Copyright (c) 2022, Enso-Learning
 * @version 1.0 EDU_PLT
 * ==================================================
*/
import React from 'react'
import { useDispatch } from 'react-redux';


const Volver = ({ num }) => {
    const dispatch = useDispatch()

    const volver = () => {
        dispatch({
            type: "@updateNumberInterfazAula",
            numberInterfazAula: num ? num : 1
        })
    }

    return (
        // <div className="d-flex justify-content-start" >
        //     <div className="shadow p-3 m-2 rounded-circle pointer" onClick={volver} >
        //         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        //             <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        //         </svg>
        //     </div>
        // </div>
        <div className="d-flex justify-content-start mt-2 " >
            <div className="shadow pointer rounded-circle p-3 bg-white" onClick={volver} >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left text-warning" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
            </div>
        </div>

    );
}

    export default Volver;