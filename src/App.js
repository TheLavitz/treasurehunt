import React, { useEffect, useState } from "react";
import "./App.css";
import Square from "./components/Square";
import Score from "./components/Score";

const App = () => {
  const [vwEquivalent, setVwEquivalent] = useState(11.25);
  const [marginEquivalent, setMarginEquivalent] = useState(8.28125);

  useEffect(() => {
    const calculateEquivalent = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ); // Get the viewport width
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ); // Get the viewport height
      const vhPixels = (20 * vh) / 100; // Calculate the pixel value for 20vh
      const marginPixels = (2.5 * vh) / 100; // Calculate the pixel value for 2.5vh
      const marginLR = (marginPixels / vw) * 100; // Calculate the equivalent vw for the pixel value of 2.5vh
      const newVwEquivalent = (vhPixels / vw) * 100; // Calculate the equivalent vw value for 20vh
      const newMarginEquivalent = Math.max(
        (100 - newVwEquivalent * 3) / 8,
        marginLR
      ); // Calculate the correct vw to use for the left and right margins and use the equivalent vw for the 2.5vh pixel value
      setVwEquivalent(newVwEquivalent); // Update state
      setMarginEquivalent(newMarginEquivalent);
    };
    calculateEquivalent(); // Initial calculation on mount
    window.addEventListener("resize", calculateEquivalent); // Recalculate on window resize
    return () => {
      window.removeEventListener("resize", calculateEquivalent);
    }; // Cleanup the event listener on component unmount
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
  ]); // Start the game board with a question mark emoji in each square

  const [bomb, setBomb] = useState(Math.floor(Math.random() * 9)); // Start the bomb at a number 0 through 8
  const [treasure, setTreasure] = useState(Math.floor(Math.random() * 9)); // Start the treasure at a number 0 through 8
  const [counter, setCounter] = useState(5); // Start the counter at 5
  const [message, setMessage] = useState("Treasure Hunt Game"); // Start the page heading at "Treasure Hunt Game"

  if (bomb === treasure && bomb > 0) {
    setBomb(bomb - 1); // Check if the bomb and treasure are at the same number and move the bomb down one as long as it isn't already on 0
  } else if (bomb === treasure && bomb === 0) {
    setBomb(bomb + 1); // Check if the bomb and treasure are at the same number and move the bomb up one if it's at 0
  }

  const handleClick = (index) => {
    // The index being passed in here is the index (within the board array) of the space the user clicked on
    let countDown = counter; // Establish a variable to hold the new counter value until we setCounter
    let gameMessage = message; // Establish a variable to hold the new message value until we setMessage
    if (board.includes("💣") || board.includes("💰") || counter === 0) {
      // Check if the bomb or treasure has been revealed and prevent further action from taking place | Also check if the counter has hit 0
      if (counter === 0) {
        gameMessage = "Out of Turns"; // Change the page heading to "Out of Turns" if the counter has reached 0
      }
    } else if (index === bomb) {
      // Check if the space the user clicked on contains the bomb
      board[index] = "💣"; // Change the displayed character for the value at that index to a bomb
      countDown = counter - 1; // Decrement the counter by 1
      gameMessage = "You Lose!"; // Change the page heading to "You Lose!"
    } else if (index === treasure) {
      // Check if the space the user clicked on contains the treasure
      board[index] = "💰"; // Change the displayed character for the value at that index to a moneybag
      countDown = counter - 1; // Decrement the counter by 1
      gameMessage = "You Win!"; // Change the page heading to "You Win!"
    } else {
      // If the space the user clicked on contains neither the treasure nor the bomb and the counter has not reached 0
      board[index] = "🌴"; // Change the displayed character for the value at that index to a palm tree
      countDown = counter - 1; // Decrement the counter by 1
    }
    setBoard([...board]); // Update the board state to reflect the above change(s)
    setCounter(countDown); // Update the counter state to reflect the above change(s)
    setMessage(gameMessage); // Update the message state to reflect the above change(s)
  }; // Function to execute when the user clicks a space on the game board

  const restart = () => {
    setBoard(["❔", "❔", "❔", "❔", "❔", "❔", "❔", "❔", "❔"]); // Set the board state back to default
    setBomb(Math.floor(Math.random() * 9)); // Move the bomb to a new value
    setTreasure(Math.floor(Math.random() * 9)); // Move the treasure to a new value
    setCounter(5); // Set the counter back to five
    setMessage("Treasure Hunt Game"); // Change the page heading back to "Treasure Hunt Game"
  }; // Function to execut when the user clicks the "Play Again" button

  return (
    <>
      <h1>{message}</h1>{" "}
      {/* Display the string from the message state variable as a heading */}
      <div className="board" data-testid="game-board">
        {" "}
        {/* Create a div to hold the game board */}
        {board.map((board, index) => {
          // Map over the array contained in the board state variable and hold the value of each index in board and the index number in index
          return (
            <Square // Display the Square component
              key={index} // Use the index number of this value in the board state variable to give each Square component being rendered a unique key
              board={board} // Pass the value at this index of the board state variable as props
              index={index} // Pass the index of this value of the board state variable as props
              click={handleClick} // Pass the handleClick function as functional props
              viewWidth={vwEquivalent} // Pass the correct vw value to maintain square borders around the game board spaces based off of the current size of the window
              marginSide={marginEquivalent} // Pass the correct vw value to maintain even spacing between game board spaces based off of the current size of the window
            />
          );
        })}
      </div>
      <Score // Display the Score component
        viewWidth={vwEquivalent} // Pass the correct vw value to maintain square borders around the game board spaces based off of the current size of the window
        marginSide={marginEquivalent} // Pass the correct vw value to maintain even spacing between game board spaces based off of the current size of the window
        counter={counter} // Pass the current value of the counter state variable as props
        restart={restart} // Pass the restart function as functional props
      />
    </>
  );
};

export default App;
