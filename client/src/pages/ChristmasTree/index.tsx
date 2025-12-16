import { useState } from 'react';
import './index.css';
import { TreeCanvas } from './TreeCanvas';

const ChristmasTree = () => {
  const [snowflakes] = useState(() => Array.from({ length: 50 }, (_, i) => i));

  return (
    <div className="christmas-container">
      {/* Snowflakes */}
      <div className="snow-container">
        {snowflakes.map((flake) => (
          <div
            key={flake}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Confetti dots in background */}
      <div className="confetti">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="confetti-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#ff4444', '#4444ff', '#44ff44', '#ffffff'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Tree - Using Canvas */}
      <div className="tree-container">
        <TreeCanvas width={400} height={600} />

        {/* Presents under tree */}
        <div className="presents">
          <div className="present present-1">🎁</div>
          <div className="present present-2">🎁</div>
          <div className="present present-3">🎁</div>
        </div>
      </div>

      {/* Greeting */}
      <div className="greeting">
        <h1 className="greeting-title">Merry Christmas!</h1>
        <p className="greeting-subtitle">🎄 Happy Holidays! 🎄</p>
      </div>
    </div>
  );
};

export default ChristmasTree;

