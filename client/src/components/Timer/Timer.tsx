import React, { useEffect, useState } from "react";
import { TSocketRes } from "shared/types";

type TProps = {
  time: number; // seconds
  onTimeOff: React.Dispatch<React.SetStateAction<TSocketRes<any> | undefined>>;
};

export const Timer: React.FC<TProps> = ({ time, onTimeOff }) => {
  const [currentTime, setCurrentTime] = useState(time || 0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime < 2) {
          clearInterval(timerInterval);

          return -1;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time, onTimeOff]);

  useEffect(() => {
    if (currentTime === -1) {
      onTimeOff(undefined);
    }
  }, [currentTime, onTimeOff]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
  };

  return <div className="timer">{formatTime(currentTime)}</div>;
};
