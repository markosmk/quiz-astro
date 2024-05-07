import { useCallback, useEffect, useState } from 'react';

function formatSecondsToTime(seconds: number, returnTxt = false) {
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

export const useTimer = ({ timeInSeconds = 0, initiallyRunning = false, isCountDown = true } = {}) => {
  const [seconds, setSeconds] = useState(!isCountDown ? 0 : timeInSeconds);
  const [isRunning, setIsRunning] = useState(initiallyRunning);
  const [timeElapsed, setTimeElapsed] = useState(
    !isCountDown ? '00:00:00' : (formatSecondsToTime(timeInSeconds, true) as string)
  );

  const tick = useCallback(() => {
    if (!isRunning) return;
    if (isCountDown && seconds <= 0) return stop();
    if (!isCountDown && seconds >= timeInSeconds) return pause();
    isCountDown ? setSeconds((seconds) => seconds - 1) : setSeconds((seconds) => seconds + 1);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning((prev) => !prev);
  const reset = () => setSeconds(0);
  const reStart = () => {
    setSeconds(!isCountDown ? 0 : timeInSeconds);
    setIsRunning(true);
  };
  const stop = () => {
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

  return { pause, reset, reStart, isRunning, seconds, timeElapsed, start, stop };
};
