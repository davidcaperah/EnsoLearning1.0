import React, { forwardRef } from "react";
import "./style.css";

const Index = forwardRef(function (
  { title, titlebutton, handleSubmit, noteText, handleInput, id },
  ref
) {
  return (
    <div ref={ref} className="container-form">
      <h2>{title}</h2>
      <form className="form-create-note" onSubmit={handleSubmit}>
        <textarea
          placeholder="Descripción de la nota"
          required
          onChange={handleInput}
        >
          {noteText}
        </textarea>
        <button type="submit">{titlebutton}</button>
      </form>
    </div>
  );
});

export default Index;
