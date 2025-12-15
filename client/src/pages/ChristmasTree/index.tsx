import { useState } from 'react';
import './index.css';

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

      {/* Stars in background */}
      <div className="stars">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Moon */}
      <div className="moon">🌙</div>

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

      {/* Tree */}
      <div className="tree-container">
        {/* Star on top */}
        <div className="tree-star">⭐</div>

        {/* Red bow under star */}
        <div className="red-bow">🎀</div>

        {/* String lights (white) on tree */}
        <div className="string-lights-white">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="string-light-white"
              style={{
                '--index': i,
                '--delay': `${i * 0.15}s`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>

        {/* Tree layers */}
        <div className="tree-layer layer-1">
          <div className="ornament red solid"></div>
          <div className="ornament blue solid"></div>
          <div className="ornament yellow solid"></div>
          <div className="ornament yellow-pattern"></div>
          <div className="ornament blue-pattern"></div>
        </div>
        <div className="tree-layer layer-2">
          <div className="ornament red solid"></div>
          <div className="ornament blue solid"></div>
          <div className="ornament yellow solid"></div>
          <div className="ornament yellow-pattern"></div>
          <div className="ornament blue-pattern-striped"></div>
        </div>
        <div className="tree-layer layer-3">
          <div className="ornament red solid"></div>
          <div className="ornament blue solid"></div>
          <div className="ornament yellow solid"></div>
          <div className="ornament yellow-pattern"></div>
          <div className="ornament blue-pattern"></div>
        </div>
        <div className="tree-layer layer-4">
          <div className="ornament red solid"></div>
          <div className="ornament blue solid"></div>
          <div className="ornament yellow solid"></div>
          <div className="ornament yellow-pattern"></div>
          <div className="ornament blue-pattern"></div>
        </div>

        {/* Tree trunk */}
        <div className="tree-trunk"></div>

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

