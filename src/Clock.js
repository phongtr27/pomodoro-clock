import { useState, useRef } from "react";
const Clock = () => {
  let [breakTime, setBreakTime] = useState(5);
  let [sessionTime, setSessionTime] = useState(25);
  let [isPaused, setIsPaused] = useState(true);
  let temp = useRef(null);
  let paused = useRef();
  paused.current = isPaused;
  let [val, setVal] = useState(false);
  let value = useRef();
  value.current = val;
  let time = useRef(1500);
  let interval = useRef(null);

  const handleDecrement = (num, cb) => {
    if (isPaused) {
      if (num > 1) {
        num--;
        cb(num);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const handleIncrement = (num, cb) => {
    if (isPaused) {
      if (num < 60) {
        num++;
        cb(num);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  let countdown = () => {
    let minutes = Math.floor((time.current - 1) / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = (time.current - 1) % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("time-left").innerHTML = `${minutes}:${seconds}`;
    temp.current = time.current;
    time.current--;
    if (time.current === 0) {
      setVal(!value.current);
      time.current = value.current ? breakTime * 60 + 1 : sessionTime * 60 + 1;
      document.getElementById("beep").play();
      value.current
        ? (document.getElementById("timer-label").innerHTML = `Break`)
        : (document.getElementById("timer-label").innerHTML = `Session`);
    }
  };

  let handleStart = () => {
    setIsPaused(false);
    return (interval.current = setInterval(countdown, 1000));
  };

  let handlePaused = () => {
    setIsPaused(true);
    time.current = temp.current - 1;
    let minutes = Math.floor(time.current / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = time.current % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("time-left").innerHTML = `${minutes}:${seconds}`;
    return clearInterval(interval.current);
  };

  const handleReset = () => {
    clearInterval(interval.current);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    setBreakTime(5);
    setSessionTime(25);
    document.getElementById("time-left").innerHTML = `${(sessionTime =
      sessionTime < 10 ? "0" + sessionTime : sessionTime)}:00`;
    document.getElementById("timer-label").innerHTML = `Session`;
    setVal(false);
    setIsPaused(true);
    time.current = 1500;
  };

  return (
    <div id="clock">
      <section className="row1">
        <div className="break">
          <h3 id="break-label">Break Length</h3>
          <div className="row">
            <span
              id="break-decrement"
              onClick={() => handleDecrement(breakTime, setBreakTime)}
            >
              <i className="fas fa-minus"></i>
            </span>
            <p id="break-length">{breakTime}</p>
            <span
              id="break-increment"
              onClick={() => handleIncrement(breakTime, setBreakTime)}
            >
              <i className="fas fa-plus"></i>
            </span>
          </div>
        </div>

        <div className="session">
          <h3 id="session-label">Session Length</h3>
          <div className="row">
            <span
              id="session-decrement"
              onClick={() => {
                handleDecrement(sessionTime, setSessionTime);
                if (paused.current) {
                  time.current = sessionTime === 1 ? 60 : sessionTime * 60 - 60;
                  time.current = time.current === 0 ? 60 : time.current;
                }
              }}
            >
              <i className="fas fa-minus"></i>
            </span>
            <p id="session-length">{sessionTime}</p>
            <span
              id="session-increment"
              onClick={() => {
                handleIncrement(sessionTime, setSessionTime);
                if (paused.current) {
                  time.current = sessionTime < 1 ? 60 : sessionTime * 60 + 60;
                  time.current = time.current === 3660 ? 3600 : time.current;
                }
              }}
            >
              <i className="fas fa-plus"></i>
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="timer">
          <h2 id="timer-label">Session</h2>
          <p id="time-left">{`${(sessionTime =
            sessionTime < 10 ? "0" + sessionTime : sessionTime)}:00`}</p>
          <audio
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ></audio>
        </div>

        <div className="control">
          {paused.current ? (
            <span id="start_stop" onClick={handleStart}>
              <i className="fas fa-play"></i>
            </span>
          ) : (
            <span id="start_stop" onClick={handlePaused}>
              <i className="fas fa-pause"></i>
            </span>
          )}
          <span id="reset" onClick={handleReset}>
            <i className="fas fa-redo"></i>
          </span>
        </div>
      </section>
    </div>
  );
};

export default Clock;
