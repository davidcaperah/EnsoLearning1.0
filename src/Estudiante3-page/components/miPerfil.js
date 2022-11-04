import React from 'react'
import URL from '../../URL'
import '../css/miPerfil.css'

const MiPerfil = ()=>{
    return(
        <div>
            <div className='cont-info-estu1-perfil'>
                <div className='cont-avatar-perfil-estu1'>
                    <div className='cont-avatar-descri-estu1'>
                        <img src={`${URL.servidor}Archivos_u/iconos/estu-chica-avatar.svg`}/>
                        <p className='selec-avatar-perfil-estu1'>Seleciona un avatar</p>
                    </div> 
                    <div className='cont-generon-peerfil-estu1'>
                        <div className='femenino-estu1'>
                            <img src={`${URL.servidor}Archivos_u/iconos/femenino.svg`}></img>
                        </div>
                        <div className='masculino-estu1'>
                            <img src={`${URL.servidor}Archivos_u/iconos/masculino.svg`}></img>r
                        </div>
                    </div>
                    <p className='recor-perfil-estu1'>*Recuerda que puedes canjear tus diamantes acumulados por nuevos avatar</p>
                </div>
                <div className='cont-info-estu1-miperfil'>
                    <div className='titu-perfil-estu3'>
                        Mi Perfil
                    </div>
                    <div>
                        <div className='datos-basi-estu2-perfil'>
                            <h5>Datos basicos</h5>
                            <form>
                                <div className='input-medio-perfil-estu1'> 
                                    <label>Nombre del estudiante</label>
                                    <input type="text" placeholder='Maria angelica diaz'/>
                                </div>
                                <div className='input-medio-perfil-estu1'>
                                    <label>Correo electronico del estudiante</label>
                                    <input type="text" placeholder='MariaDiaz123@gmail.com'/>
                                </div>
                                <div >
                                    <label>Telefono del estudiante</label>
                                    <input type="text" placeholder='3165874512'/>
                                </div>
                                <div className='input-sangre-estu1-perfil'>
                                    <label>Tipo de sangre</label>
                                    <input type="text" placeholder='O+'/>
                                </div>
                                <div >
                                    <label>Fecha de nacimiento</label>
                                    <input type="text" placeholder='15 de septiembre 2014'/>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cont-datos-acu-estu1'>
                <div className='datos-basi-estu2-perfil'>
                    <h5>Datos basicos Acudiente</h5>
                    <form>   
                        <div >
                            <label>*Nombre del Acudiente</label>
                            <input type="text" placeholder='Ricardo Perez Ruiz'/>
                        </div>
                        <div className='input-sangre-estu1-perfil1'>
                            <label>*Telefono del acudiente</label>
                            <input type="text" placeholder='3165874512'/>
                        </div>
                        <div >
                            <label>*Correo electronico del acudiente</label>
                            <input type="text" placeholder='perezRicardo123@gmail.com'/>
                        </div>        
                    </form>
                </div>
            </div>
            
        </div>
    )
}


export default MiPerfil