import React from "react";
import { useNavigate } from "react-router-dom";

function Construction() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate("/EstudianteTwoHome")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          border: "2px solid #000",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
        }}
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Layer 1</title>
            <line
              id="svg_2"
              y2="358"
              x2="331"
              y1="358"
              x1="334"
              stroke="#000"
              fill="none"
            />
            <line
              id="svg_3"
              y2="360"
              x2="41"
              y1="360"
              x1="42"
              stroke="#000"
              fill="none"
            />
            <line
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              id="svg_1"
              y2="14.93243"
              x2="7.29732"
              y1="6.14868"
              x1="14.86486"
              stroke="#00639A"
              fill="none"
            />
            <path
              id="svg_4"
              d="m16.75675,3.71625l-9.45943,11.21618"
              opacity="undefined"
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              strokeWidth="4"
              stroke="#00639A"
              fill="none"
            />
            <path
              id="svg_6"
              d="m7.02705,12.36487l9.3243,10.94591"
              opacity="undefined"
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              strokeWidth="4"
              stroke="#00639A"
              fill="none"
            />
          </g>
        </svg>
      </div>
      <h1>Esta funcionalidad está en contrucción</h1>
    </div>
  );
}

export default Construction;
