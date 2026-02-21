import { useState, useCallback } from 'react';
import './BubbleSortVideoStyle.css';

function BubbleSortStepControl2() {
  const [bubbles, setBubbles] = useState([]);
  const [step, setStep] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [comparing, setComparing] = useState(null);
  const n = 10;

  const reset = useCallback(() => {
    const newBubbles = Array.from({ length: n }, (_, i) => ({
      id: `bubble-${i}-${Date.now()}`,
      value: Math.floor(Math.random() * 90) + 10,
      position: i * 60,
      color: '#6b73ff'
    }));
    setBubbles(newBubbles);
    setStep(0);
    setIsSorted(false);
    setComparing(null);
  }, []);

  const getCurrentIJ = (currentStep) => {
    let i = 0;
    let stepCount = 0;
    
    while (i < n - 1) {
      const innerLoopLength = n - i - 1;
      if (stepCount + innerLoopLength > currentStep) break;
      stepCount += innerLoopLength;
      i++;
    }
    const j = currentStep - stepCount;
    return { i, j };
  };

  // NEW: Get start step of current pass
  const getPassStart = (pass) => {
    let start = 0;
    for (let k = 0; k < pass; k++) {
      start += (n - k - 1);
    }
    return start;
  };

  const nextStep = useCallback(() => {
    if (isSorted) return;

    const { i, j } = getCurrentIJ(step);
    const pos1 = j * 60;
    const pos2 = (j + 1) * 60;
    const bubble1 = bubbles.find(b => b.position === pos1);
    const bubble2 = bubbles.find(b => b.position === pos2);
    
    if (!bubble1 || !bubble2) return;

    // STEP 1: Show COMPARING (red highlight) - 1000ms
    setComparing({ pos1, pos2, values: [bubble1.value, bubble2.value] });
    setBubbles(prev => prev.map(b => {
      if (b.position === pos1 || b.position === pos2) {
        return { ...b, color: '#ff4757', scale: 1.2 };
      }
      return b;
    }));

    // STEP 2: Check swap after 1s
    setTimeout(() => {
      let newBubbles = [...bubbles];
      
      if (bubble1.value > bubble2.value) {
        // SWAP bubbles (green flash)
        newBubbles = newBubbles.map(b => {
          if (b.position === pos1) return { ...b, position: pos2, color: '#2ed573', scale: 1.1 };
          if (b.position === pos2) return { ...b, position: pos1, color: '#2ed573', scale: 1.1 };
          return b;
        });
      } else {
        // No swap - reset to purple
        newBubbles = newBubbles.map(b => {
          if (b.position === pos1 || b.position === pos2) {
            return { ...b, color: '#6b73ff', scale: 1 };
          }
          return b;
        });
      }
      setBubbles(newBubbles);

      // STEP 3: Blue marking + cleanup after 400ms
      setTimeout(() => {
        const passStart = getPassStart(i);
        const passEnd = passStart + (n - i - 1) - 1;
        
        // ✅ FIXED: Blue ONLY at END of current pass
        if (step === passEnd) {
          const sortedPosition = (n - i - 1) * 60;
          setBubbles(prev => prev.map(b => {
            if (b.position === sortedPosition) {
              return { ...b, color: '#1e90ff' };  // 🔵 Mark end of pass
            }
            if (b.color === '#ff4757' || b.color === '#2ed573') {
              return { ...b, color: '#6b73ff', scale: 1 };
            }
            return b;
          }));
        } else {
          // Just cleanup colors (middle of pass)
          setBubbles(prev => prev.map(b => {
            if (b.color === '#ff4757' || b.color === '#2ed573') {
              return { ...b, color: '#6b73ff', scale: 1 };
            }
            return b;
          }));
        }
        
        setComparing(null);
        setStep(step + 1);
        
        if (step + 1 >= (n * (n - 1)) / 2) {
          setIsSorted(true);
        }
      }, 400);
    }, 1000);

  }, [bubbles, step, isSorted, n]);

  const { i: currentI, j: currentJ } = getCurrentIJ(step);

  return (
    <div className="bubble-container">
      <h2>Bubble Sort - Animated by vishnuvardhan</h2>
      <p>Step <strong>{step}</strong> | Pass <strong>i={currentI}</strong> | Compare <strong>j={currentJ}</strong></p>
      {comparing && (
        <p>🔴 Comparing: {comparing.values[0]} vs {comparing.values[1]}</p>
      )}
      
      <div className="bubble-track">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              left: `${bubble.position}px`,
              backgroundColor: bubble.color,
              transform: `scale(${bubble?.scale || 1})`,
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {bubble.value}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <button onClick={reset}>New Array</button>
        <button onClick={nextStep} disabled={isSorted}>
          {isSorted ? '✅ SORT COMPLETE!' : '🔄 NEXT STEP →'}
        </button>
        <button onClick={() => {setStep(0); setComparing(null);}}>Reset Steps</button>
      </div>
      
      <div className="status">
        <p>🔴 <strong>Red (1s)</strong> = Comparing</p>
        <p>🟢 <strong>Green flash</strong> = Swapped</p>
        <p>🔵 <strong>Blue (end of pass)</strong> = Sorted portion ✓</p>
        <p>🟣 <strong>Purple</strong> = Normal</p>
      </div>
    </div>
  );
}

export default BubbleSortStepControl2;