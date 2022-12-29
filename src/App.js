import logo from "./logo.svg";
import "./App.css";
import { React, useEffect, useRef, useState } from "react";

function App() {
  const [time, setTime] = useState("");
  const [runningStatus, setRunningStatus] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const clearInput = useRef("");
  const [data, setData] = useState([]);

  const api= 'https://jsonplaceholder.typicode.com/todos/'

  // useEffect(()=>{
  //   fetch(api)
  //   .then(resp=>resp.json())
  //   .then(data=>console.log(data))
  // },[])

  async function fetchApi(){
    await fetch(api)
    .then(resp=>resp.json())
    .then(data=>setData(data))
  }

  const decreaseTime = () => {
    runningStatus ? setRunningStatus(false) : setRunningStatus(true);
    clearInput.current.value = "";
    let newtime = time;
    let timerId = setInterval(() => {
      newtime = newtime - 1;
      if (newtime >= 0) {
        setTime(newtime);
      } else {
        setTime("");
        clearInterval(timerId);
      }
    }, 1000);
  };

  return (
    <div className="App">
      {time > 0 && <h1>{time}</h1>}

      <input
        type="text"
        onChange={(e) => {
          setTime(e.target.value);
        }}
        placeholder="enter the timer"
        ref={clearInput}
      />
      <br />
      <br />
      <button style={{ marginRight: 10 }} onClick={decreaseTime}>
        {runningStatus ? "pause" : "start"}
      </button>
      <button onClick={fetchApi}>
        fetch
      </button>
      
    </div>
  );
}

export default App;
