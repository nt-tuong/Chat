import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";

import "./index.css";

export interface StopwatchHandle {
  start: () => void;
  pause: () => void;
  stop: () => void; // reset về 0 và dừng
}

interface StopwatchProps {
  // có thể thêm className, style nếu muốn
  className?: string;
}

const Stopwatch = forwardRef<StopwatchHandle, StopwatchProps>(
  ({ className }, ref) => {
    const [time, setTime] = useState(0); // milliseconds
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const accumulatedRef = useRef<number>(0); // thời gian đã chạy trước khi pause

    // Format thời gian: HH:MM:SS.ms
    const formatTime = (ms: number) => {
      const hours = Math.floor(ms / 3600000);
      const minutes = Math.floor((ms % 3600000) / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const milliseconds = Math.floor((ms % 1000) / 10); // 2 chữ số

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0",
      )}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(
        2,
        "0",
      )}`;
    };

    const clearTimer = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const start = () => {
      if (isRunning) return;

      setIsRunning(true);
      startTimeRef.current = Date.now() - accumulatedRef.current;

      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10); // cập nhật mỗi 10ms
    };

    const pause = () => {
      if (!isRunning) return;

      setIsRunning(false);
      accumulatedRef.current = time;
      clearTimer();
    };

    const stop = () => {
      setIsRunning(false);
      clearTimer();
      setTime(0);
      accumulatedRef.current = 0;
    };

    // Expose các method ra ngoài cho component cha
    useImperativeHandle(ref, () => ({
      start,
      pause,
      stop,
    }));

    // Cleanup khi unmount
    useEffect(() => {
      return () => clearTimer();
    }, []);

    return (
      <div
        className={`stopwatch-container ${className}`}
        style={{ fontFamily: "monospace", fontSize: 32 }}
      >
        {formatTime(time)}
      </div>
    );
  },
);

Stopwatch.displayName = "Stopwatch";

export default Stopwatch;
