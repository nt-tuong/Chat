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
    // stopwatchRef.current?.start();
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

        <div
          style={{
            overflow: "auto",
            width: "600px",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "max-content",
              minWidth: "100%",
              height: "max-content",
              flexShrink: 0,
            }}
          >
            <span>Employment Income Adjustment Deduction Declaration Form</span>
            <br />

            <img
              alt=""
              src="./basic_spouse_hr_payroll_system_files/spacer.gif"
              style={{ width: "8px" }}
            />

            <span>
              If you are eligible for the Employment Income Adjustment
              Deduction, the "Income Amount" under Salary Income on the Basic
              Deduction Declaration Form must be recalculated.
            </span>

            <br />

            <img
              alt=""
              src="./basic_spouse_hr_payroll_system_files/spacer.gif"
              style={{ width: "8px" }}
            />

            <span>
              Please click the "Recalculate" button after entering the
              information. However, if you do not want to change the "Income
              Amount" that you entered manually, please do not click the
              "Recalculate" button.
            </span>
          </div>
        </div>

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
