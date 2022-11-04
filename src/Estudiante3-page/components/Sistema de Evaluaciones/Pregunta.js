import React from 'react'

const Pregunta = ({ pregunta, numero }) => {
    return (
        <div className="p-md-5 p-2">
            <div >
                <h2 className="text-center font-chewy text-orange text-break" > <strong> Evaluacion </strong> </h2>
            </div>
            <div className="m-auto" >
                <h5><strong>{numero}.</strong> {pregunta} Lorem ipsum dolor sit amet consectetur, adipiscing elit sagittis donec sem dui, urna et nunc bibendum. Quam egestas enim fames duis ornare luctus massa cursus, augue varius integer parturient cum nulla ac mi, dapibus molestie senectus mauris auctor suspendisse mollis. Rhoncus tortor aptent arcu nascetur duis lacinia massa orci tellus laoreet euismod sociis vivamus, penatibus nibh praesent bibendum tempus consequat purus parturient tincidunt fringilla diam.

                </h5>
            </div>
        </div>
    );
}

export default Pregunta;