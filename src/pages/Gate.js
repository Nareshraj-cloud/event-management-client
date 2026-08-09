import { useState } from "react";
import NeuralBackground from "../components/NeuralBackground";

const Gate = ({ onOpen }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onOpen, 900); // matches CSS animation duration
  };

  return (
    <div className={`gate ${opening ? "gate-opening" : ""}`}>
      <NeuralBackground />
      <div className="gate-panel gate-panel-left" />
      <div className="gate-panel gate-panel-right" />
      <div className="gate-content">
        <p className="gate-eyebrow">Department of Artificial Intelligence &amp; Data Science</p>
        <h1 className="gate-title">AI&amp;DS Events Portal</h1>
        <p className="gate-sub">Every workshop, fest, and seminar — in one place.</p>
        <button className="gate-btn" onClick={handleOpen}>Open</button>
      </div>
    </div>
  );
};

export default Gate;
