import React, { useEffect, useState } from "react";
import "./InsertionSort.css";

const COLORS = {
  DEFAULT: "#9aa0a6",
  KEY: "#e74c3c",
  COMPARE: "#f39c12",
  SORTED: "#3498db",
};

export default function InsertionSort() {
  const [array, setArray] = useState([]);
  const [i, setI] = useState(1);
  const [j, setJ] = useState(null);
  const [keyValue, setKeyValue] = useState(null);
  const [phase, setPhase] = useState("init");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    if (!isPlaying || phase === "done") return;

    const timer = setTimeout(() => {
      nextStep();
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, phase, array, speed]);

  const resetArray = () => {
    const arr = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      color: COLORS.DEFAULT,
    }));

    arr[0].color = COLORS.SORTED;

    setArray(arr);
    setI(1);
    setJ(null);
    setKeyValue(null);
    setPhase("init");
    setExplanation("Starting insertion sort.");
    setIsPlaying(false);
  };

  const nextStep = () => {
    let arr = [...array];

    if (i >= arr.length) {
      arr.forEach(el => (el.color = COLORS.SORTED));
      setArray(arr);
      setPhase("done");
      setExplanation("Array is fully sorted 🎉");
      setKeyValue(null);
      setIsPlaying(false);
      return;
    }

    // Pick key
    if (phase === "init") {
      arr.forEach((el, idx) => {
        el.color = idx < i ? COLORS.SORTED : COLORS.DEFAULT;
      });

      arr[i] = { ...arr[i], color: COLORS.KEY };
      setKeyValue(arr[i].value);
      setJ(i - 1);
      setExplanation(`Selected key ${arr[i].value} to insert.`);
      setArray(arr);
      setPhase("compare");
      return;
    }

    // Compare
    if (phase === "compare") {
      if (j < 0) {
        setExplanation(`Reached start. Inserting key ${keyValue}.`);
        setPhase("insert");
        return;
      }

      if (arr[j].value <= keyValue) {
        setExplanation(
          `Key ${keyValue} ≥ ${arr[j].value}. Correct position found.`
        );
        setPhase("insert");
        return;
      }

      arr[j] = { ...arr[j], color: COLORS.COMPARE };
      setExplanation(
        `Key ${keyValue} < ${arr[j].value}. Shifting ${arr[j].value} right.`
      );
      setArray(arr);
      setPhase("shift");
      return;
    }

    // Shift
    if (phase === "shift") {
      arr[j + 1] = { ...arr[j] };
      arr[j] = { ...arr[j], color: COLORS.DEFAULT };
      setArray(arr);
      setJ(j - 1);
      setPhase("compare");
      return;
    }

    // Insert
    if (phase === "insert") {
      arr[j + 1] = { value: keyValue, color: COLORS.SORTED };
      setArray(arr);
      setI(i + 1);
      setJ(null);
      setKeyValue(null);
      setPhase("init");
    }
  };

  return (
    <div className="App">
      <h2>Insertion Sort – Animated By Vishnuvardhan</h2>

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

      {/* Key value shown below */}
      {keyValue !== null && (
        <div className="key-container">
          <div
            className="circle key-circle"
            style={{ backgroundColor: COLORS.KEY }}
          >
            {keyValue}
          </div>
          <span>Key value</span>
        </div>
      )}

      <div className="controls">
        <button onClick={resetArray}>Reset</button>
        <button onClick={nextStep} disabled={phase === "done"}>
          Next Step
        </button>
        <button
          onClick={() => setIsPlaying(p => !p)}
          disabled={phase === "done"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <div className="slider">
        <label>Speed: {speed} ms</label>
        <input
          type="range"
          min="200"
          max="1200"
          step="100"
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
        />
      </div>

      <p className="status">Phase: {phase}</p>
      <p className="explanation">📜 {explanation}</p>
    </div>
  );
}
