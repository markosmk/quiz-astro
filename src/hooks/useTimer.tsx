import { useCallback, useEffect, useState } from 'react';

function formatSecondsToTime(seconds: number, returnTxt = false) {
  if (seconds === 0) return returnTxt ? '00:00:00' : 0;
  const hrs = parseInt(seconds / 3600 + '', 10);
  const mins = parseInt(seconds / 60 + '', 10);
  const secs = parseInt((seconds % 60) + '', 10);
  const time = {
    hrs: hrs.toString().padStart(2, '0'),
    mins: mins === 60 ? '00' : mins.toString().padStart(2, '0'),
    secs: secs.toString().padStart(2, '0'),
  };
  return returnTxt ? time.hrs + ':' + time.mins + ':' + time.secs : time;
}

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(formatSecondsToTime(seconds, true) as string);

  const tick = useCallback(() => {
    if (!isRunning) return;
    if (seconds <= 0) return setIsRunning(false);
    setSeconds((seconds) => seconds - 1);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning((prev) => !prev);
  const reset = () => setSeconds(0);
  const startTimer = (time: number) => {
    setSeconds(time);
    setIsRunning(true);
  };
  const stopTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    setTimeElapsed(formatSecondsToTime(seconds, true) as string);
  }, [seconds]);

  return {
    startTimer,
    stopTimer,
    isRunning,
    seconds,
    timeElapsed,
    // not used yet
    start,
    pause,
    reset,
  };
};
