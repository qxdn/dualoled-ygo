import { createRoot } from "react-dom/client";
import skyStriker from "./assets/sky-striker.png";
import "./Card.css";
import "./Holo.css";

const App = () => {
  return (
    <div>
      <img src={skyStriker} className="ygo-card" />;
      <div className="cardShinePlusAfterElement" />;
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
