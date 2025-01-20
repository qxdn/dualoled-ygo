import { createRoot } from "react-dom/client";
import skyStriker from "./assets/sky-striker.png";
import "./Card.css";
import "./Holo.css";
import { useEffect, useState } from "react";

// 获取窗口大小
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const App = () => {
  const { height, width } = useWindowDimensions();

  const styles = {
    "--aspect-ratio": width / height,
    width: `${width}px`,
    top: 0,
    left: 0,
    position: "absolute",
  };

  return (
    <div>
      <img src={skyStriker} className="ygo-card" />
      <div className="cardShinePlusAfterElement" style={styles} />
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
