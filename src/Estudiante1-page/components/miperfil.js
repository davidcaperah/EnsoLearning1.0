import React from 'react'
import '../css/perfil.css'
import URL from '../../URL'

const Perfil = ()=>{
    return(
        <div>
            <div className='cont-info-estu1-perfil'>
                <div className='cont-avatar-perfil-estu1'>
                    <div className='cont-avatar-descri-estu1'>
                        <img src={`${URL.servidor}Archivos_u/iconos/avatar-estu1.svg`}/>
                        <p className='selec-avatar-perfil-estu1'>Seleciona un avatar</p>
                    </div> 
                    <div className='cont-generon-peerfil-estu1'>
                        <div className='femenino-estu1'>
                            <img src={`${URL.servidor}Archivos_u/iconos/femenino.svg`}></img>
                        </div>
                        <div className='masculino-estu1'>
                            <img src={`${URL.servidor}Archivos_u/iconos/masculino.svg`}></img>
                        </div>
                    </div>
                    <p className='recor-perfil-estu1'>*Recuerda que puedes canjear tus diamantes acumulados por nuevos avatar</p>
                </div>
                <div className='cont-info-estu1-miperfil'>
                    <div className='titu-perfil-estu1'>
                        Mi Perfil
                    </div>
                    <div>
                        <div className='datos-basi-estu1-perfil'>
                            <h5>Datos basicos</h5>
                            <form>
                                <div className='input-medio-perfil-estu1'> 
                                    <label>Nombre del estudiante</label>
                                    <input type="text"/>
                                </div>
                                <div className='input-medio-perfil-estu1'>
                                    <label>Correo electronico del estudiante</label>
                                    <input type="text"/>
                                </div>
                                <div >
                                    <label>Telefono del estudiante</label>
                                    <input type="text"/>
                                </div>
                                <div className='input-sangre-estu1-perfil'>
                                    <label>Tipo de sangre</label>
                                    <input type="text"/>
                                </div>
                                <div >
                                    <label>Fecha de nacimiento</label>
                                    <input type="text"/>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cont-datos-acu-estu1'>
                <div className='datos-basi-estu1-perfil'>
                    <h5>Datos basicos Acudiente</h5>
                    <form>   
                        <div >
                            <label>*Nombre del Acudiente</label>
                            <input type="text"/>
                        </div>
                        <div className='input-sangre-estu1-perfil1'>
                            <label>*Telefono del acudiente</label>
                            <input type="text"/>
                        </div>
                        <div >
                            <label>*Correo electronico del acudiente</label>
                            <input type="text"/>
                        </div>        
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Perfil
