import { createRoot } from "react-dom/client";
import skyStriker from "./assets/sky-striker.png";
import "./Card.css";

const App = () => {
  return <img src={skyStriker} className="ygo-card" />;
};

const root = createRoot(document.body);
root.render(<App />);
