import { useState, useCallback } from 'react';
import './BubbleSortVideoStyle.css';

function BubbleSortVideoStyle() {
  const [bubbles, setBubbles] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [delayTime, setDelayTime] = useState(400);

  const createBubbles = useCallback(() => {
    const newBubbles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 90) + 10,
      position: i * 60, // 60px spacing
      color: '#6b73ff'
    }));
    setBubbles(newBubbles);
    setIsSorting(false);
  }, []);

  const bubbleSortAnimation = useCallback(async () => {
    setIsSorting(true);
    let workingArray = [...bubbles.map(b => b.value)];
    
    for (let i = 0; i < workingArray.length; i++) {
      for (let j = 0; j < workingArray.length - i - 1; j++) {
        // Highlight comparing bubbles (red)
        setBubbles(prev => prev.map(b => 
          b.position === j * 60 || b.position === (j + 1) * 60
            ? { ...b, color: '#ff4757' }
            : b
        ));

        await new Promise(resolve => setTimeout(resolve, delayTime));

        // Check if swap needed
        if (workingArray[j] > workingArray[j + 1]) {
          // Swap values in working array
          [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
          
          // Animate swap (swap positions + green flash)
          setBubbles(prev => prev.map(b => {
            if (b.position === j * 60) {
              return { ...b, position: (j + 1) * 60, color: '#2ed573' };
            }
            if (b.position === (j + 1) * 60) {
              return { ...b, position: j * 60, color: '#2ed573' };
            }
            return b;
          }));

          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Reset to purple after swap animation
          setBubbles(prev => prev.map(b => 
            b.position === j * 60 || b.position === (j + 1) * 60
              ? { ...b, color: '#6b73ff' }
              : b
          ));
        } else {
          // Reset colors if no swap
          setBubbles(prev => prev.map(b => 
            b.position === j * 60 || b.position === (j + 1) * 60
              ? { ...b, color: '#6b73ff' }
              : b
          ));
        }
      }
      // Mark last bubble as sorted (permanent green)
      setBubbles(prev => prev.map(b => 
        b.position === (workingArray.length - i - 1) * 60
          ? { ...b, color: '#1e90ff' }
          : b
      ));
    }
    setIsSorting(false);
  }, [bubbles, delayTime]);

  return (
    <div className="bubble-container">
      <h2>Bubble Sort (GFG Video Style)</h2>
      <div className="bubble-track">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              left: `${bubble.position}px`,
              backgroundColor: bubble.color,
              transition: isSorting ? 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {bubble.value}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={createBubbles} disabled={isSorting}>New Array</button>
        <button onClick={bubbleSortAnimation} disabled={isSorting}>Animate Sort</button>
        <label>
          Speed: <input 
            type="range" 
            min="1000" max="8000" 
            value={delayTime} 
            onChange={e => setDelayTime(Number(e.target.value))}
            disabled={isSorting}
          /> {delayTime}ms
        </label>
      </div>
    </div>
  );
}

export default BubbleSortVideoStyle;