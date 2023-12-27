import React, { useEffect, useState } from "react";
import "./App.css";
import Square from "./components/Square";

const App = () => {
  const [vwEquivalent, setVwEquivalent] = useState(11.25);
  const [marginEquivalent, setMarginEquivalent] = useState(8.28125);

  useEffect(() => {
    const calculateEquivalent = () => {
      // Get the viewport width
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );

      // Get the viewport height
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      // Calculate the pixel value for 20vh
      const vhPixels = (20 * vh) / 100;

      // Calculate the pixel value for 2.5vh
      const marginPixels = (2.5 * vh) / 100;

      // Calculate the equivalent vw for the pixel value of 2.5vh
      const marginLR = (marginPixels / vw) * 100;

      // Calculate the equivalent vw value for 20vh
      const newVwEquivalent = (vhPixels / vw) * 100;

      // Calculate the correct vw to use for the left and right margins and use the equivalent vw for the 2.5vh pixel value
      const newMarginEquivalent = Math.max(
        (100 - newVwEquivalent * 3) / 8,
        marginLR
      );

      // Update state
      setVwEquivalent(newVwEquivalent);
      setMarginEquivalent(newMarginEquivalent);
    };

    // Initial calculation on mount
    calculateEquivalent();

    // Recalculate on window resize
    window.addEventListener("resize", calculateEquivalent);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateEquivalent);
    };
  }, []);

  const [board, setBoard] = useState([
    "❔",
    "❔",
    "❔",
    "❔",
    "❔",
    "❔",
    "❔",
    "❔",
    "❔",
  ]);

  const [bomb, setBomb] = useState(Math.floor(Math.random() * 9));
  const [treasure, setTreasure] = useState(Math.floor(Math.random() * 9));
  const [counter, setCounter] = useState(5);

  if (bomb === treasure && bomb > 0) {
    setBomb(bomb - 1);
  } else if (bomb === treasure && bomb === 0) {
    setBomb(bomb + 1);
  }

  const HandleClick = (index) => {
    if (index === bomb) {
      board[index] = "💣";
    } else if (index === treasure) {
      board[index] = "💰";
    } else {
      board[index] = "🌴";
    }
    setBoard([...board]);
    setCounter(counter - 1);
  };

  const restart = () => {
    setBoard(["❔", "❔", "❔", "❔", "❔", "❔", "❔", "❔", "❔"]);
    setBomb(Math.floor(Math.random() * 9));
    setTreasure(Math.floor(Math.random() * 9));
    setCounter(5);
  };

  return (
    <>
      <h1>Treasure Hunt Game</h1>
      <div className="board">
        {board.map((board, index) => {
          return (
            <Square
              key={index}
              board={board}
              index={index}
              click={HandleClick}
              viewWidth={vwEquivalent}
              marginSide={marginEquivalent}
            />
          );
        })}
      </div>
      <div className="score">
        <button
          style={{
            width: `${vwEquivalent}vw`,
            marginLeft: `${marginEquivalent}vw`,
            marginRight: `${marginEquivalent}vw`,
          }}
          onClick={() => restart()}
        >
          Play Again
        </button>
        <h2
          style={{
            width: `${vwEquivalent}vw`,
            marginLeft: `${marginEquivalent}vw`,
            marginRight: `${marginEquivalent}vw`,
          }}
        >
          Counter: {counter}
        </h2>
      </div>
    </>
  );
};

export default App;
