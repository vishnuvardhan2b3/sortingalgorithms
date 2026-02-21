import React, { useEffect, useState } from "react";
import "./SelectionSortStepControl.css";

const COLORS = {
  DEFAULT: "#9aa0a6",
  MIN: "#e74c3c",
  COMPARE: "#f39c12",
  SORTED: "#3498db",
};

export default function SelectionSortStepControl() {
  const [array, setArray] = useState([]);
  const [i, setI] = useState(0); // current outer index
  const [j, setJ] = useState(null); // current inner index
  const [minIdx, setMinIdx] = useState(null);
  const [phase, setPhase] = useState("init"); // init | scan | swap | done

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      color: COLORS.DEFAULT,
    }));
    setArray(arr);
    setI(0);
    setJ(null);
    setMinIdx(null);
    setPhase("init");
  };

  const nextStep = () => {
    let arr = [...array];

    // finished
    if (i >= arr.length - 1) {
      arr[arr.length - 1].color = COLORS.SORTED;
      setArray(arr);
      setPhase("done");
      return;
    }

    // initialize new pass
    if (phase === "init") {
      arr.forEach((el, idx) => {
        if (idx < i) el.color = COLORS.SORTED;
        else el.color = COLORS.DEFAULT;
      });
      arr[i].color = COLORS.MIN;
      setMinIdx(i);
      setJ(i + 1);
      setArray(arr);
      setPhase("scan");
      return;
    }

    // scanning phase
    if (phase === "scan") {
      if (j >= arr.length) {
        setPhase("swap");
        return;
      }

      arr[j].color = COLORS.COMPARE;

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].color = COLORS.DEFAULT;
        setMinIdx(j);
        arr[j].color = COLORS.MIN;
      }

      setArray(arr);
      setJ(j + 1);
      return;
    }

    // swap phase (only once)
    if (phase === "swap") {
      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }

      arr[i].color = COLORS.SORTED;
      setArray(arr);
      setI(i + 1);
      setJ(null);
      setMinIdx(null);
      setPhase("init");
    }
  };

  return (
    <div className="App">
      <h2>Selection Sort – Animated by vishnuvardhan</h2>

      <div className="circle-container">
        {array.map((item, idx) => (
          <div
            key={idx}
            className="circle"
            style={{ backgroundColor: item.color }}
          >
            {item.value}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={resetArray}>Reset</button>
        <button onClick={nextStep} disabled={phase === "done"}>
          Next Step
        </button>
      </div>

      <p className="status">Phase: {phase}</p>
    </div>
  );
}