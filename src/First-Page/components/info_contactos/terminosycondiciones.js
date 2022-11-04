import React, { useState } from "react";
import imagen from './../../img/seguridad.jpg'
import BannerNostros from './../BannerNostros'

function Terminosycondiciones() {

    const [ventana, setVentana] = useState(1)

    const vistas = (valorvista) => {
        setVentana(valorvista)
    }
    return (
        <div>
            <BannerNostros imagen={imagen} titulo="Terminos y condiciones" texto="Queremos que te sientas protegidos cuando estamos contigo." />
            <div className="col-lg-5">
                <div className=" d-flex justify-content-center mt-4 align-self-center" >
                    <button className="btn  m-2" onClick={() => vistas(1)} > Políticas de uso </button>
                    <button className="btn  m-2" onClick={() => vistas(2)} > Politicas de Seguridad </button>
                </div>
                <hr></hr>
            </div>
            {ventana === 1 ?
                <div>
                    <h2 className="text-center font-weigth-bolder">Políticas de uso</h2>
                    <div className="w-75 m-auto">
                        <p>El presente apartado notifica al usuario los términos de uso, que admite conocer y permitir, después del registro de cuenta en el sitio enso-learning.com.co.</p>
                        <h3>Cuentas de usuario</h3>
                        <p>Solo los usuarios autorizados en contrato con la institución tendrán acceso al contenido del sitio, (videos, actividades y demás contenido educativo), de no ser así el sitio se reserva el derecho de admisión y no permite la vista de estos contenidos, también las cuentas no admitidas serán bloqueadas y en el mayor de los casos eliminadas.</p>
                        <h3>Divulgación del contenido </h3>
                        <p>El contenido suministrado por enso-learning que contenga la firma digital y el derecho intelectual y de autor no podrá ser divulgado por ningún medio sin el consentimiento del personal administrativo de enso-learning cualquier incumplimiento será tomando con la LEY 23 DE 1982 (enero 28) Colombia, la cual manda De acuerdo al artículo 35 de la Constitución Nacional "será protegida la propiedad literaria y artística como propiedad transferible, por el tiempo de la vida del autor y ochenta años más, mediante las formalidades que prescriba la Ley.</p>
                        <h3>Responsabilidad </h3>
                        <p>Enso-Learning se reserva el derecho de realizar cualquier cambio en las políticas de uso del sitio.</p>
                        <p>El leguaje nativo con el cual fue creado el sitio y sus términos fue español(Colombia), por ello cualquier traducción no será tomada en cuenta.</p>
                        <p>El usuario reconoce todos los términos y comprende el uso de datos personales, a su vez enso-Learning garantiza en buen uso de los datos y la seguridad de los datos suministrados.</p>

                    </div>
                </div> :
                 <div>
                 <h2 className="text-center font-weigth-bolder">Politicas de Seguridad</h2>
                 <div className="w-75 m-auto">
                     <p>El presente Política de Privacidad establece los términos en que Enso-Learning usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo, esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p>
                     <h3>Información que es recogida</h3>
                     <p>Nuestro sitio web podrá recoger información personal, por ejemplo: Nombre, información de contacto como su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.</p>
                     <h3>Uso de la información recogida</h3>
                     <p>Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios.  Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.</p>
                     <p>Enso-Learning está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</p>
                     <h3>Cookies</h3>
                     <p>Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.</p>
                     <p>Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo, las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente. Usted puede aceptar o negar el uso de cookies, sin embargo, la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.</p>
                     <h3>Enlaces a Terceros</h3>
                     <p>Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.</p>
                     <h3>Control de su información personal</h3>
                     <p>En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web.  Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico.  En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.</p>
                     <p>Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.</p>
                     <p>Enso-Learning Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p>
                 </div>
             </div>}
        </div>
    )
}

export default Terminosycondiciones;
