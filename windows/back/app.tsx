import { createRoot } from "react-dom/client";
import cardBack from "./assets/card-back.png";
import "./Card.css";

const App = () => {
  return <img src={cardBack} className="ygo-card" />;
};

const root = createRoot(document.body);
root.render(<App />);
