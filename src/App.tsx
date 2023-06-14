import React from "react";
import "./styles/app.css";

const img = require("./assets/images/floating-island.png");

function App() {
  return (
    <div>
      Lofi Loft
      <img src={img} alt="floating island" />
    </div>
  );
}

export default App;
