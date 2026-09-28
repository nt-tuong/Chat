import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Stopwatch, { StopwatchHandle } from "../../components/StopwatchHandle";

const IndexPage: React.FC = () => {
  const navigate = useNavigate();
  const stopwatchRef = useRef<StopwatchHandle>(null);

  useEffect(() => {
    document.title = "Index Page";
  }, []);

  const openMiniWindow = () => {
    window.open(
      "/redis",
      "miniWindow",
      "width=600,height=400,resizable=yes,scrollbars=yes",
    );
    stopwatchRef.current?.start();
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:8004/favicon.ico");
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="index-page">
      <div className="index-container">
        <h1>Welcome to Image Slider App</h1>
        <p>Chào mừng bạn đến với ứng dụng Image Slider</p>

        <Stopwatch ref={stopwatchRef} />

        <div className="navigation-links">
          {/* <button 
            onClick={() => navigate('/test-image')} 
            className="nav-link"
          >
            Test Image Slider (Old Version)sid
          </button> */}
          <button onClick={() => navigate("/chat")} className="nav-link">
            Test Chat
          </button>
          <button onClick={() => navigate("/slider")} className="nav-link">
            Test Slider (New Version)
          </button>

          <button onClick={() => navigate("/login")} className="nav-link">
            Test Login
          </button>
          <button onClick={() => navigate("/christmas")} className="nav-link">
            Test Christmas Tree
          </button>
          <button onClick={() => navigate("/redis")} className="nav-link">
            Test Redis Persistent Local Storage
          </button>
          <button
            onClick={() => navigate("/re-render-component")}
            className="nav-link"
          >
            Test Re-render Component
          </button>
          <button onClick={openMiniWindow} className="nav-link">
            Open Home in Mini Window
          </button>
          <button onClick={fetchData} className="nav-link">
            Test Fetch Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
