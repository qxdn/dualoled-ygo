import { createRoot } from "react-dom/client";
import "./Card.css";

const App = () => {
  return <div className="ygo-card protector" />;
};

const root = createRoot(document.body);
root.render(<App />);
