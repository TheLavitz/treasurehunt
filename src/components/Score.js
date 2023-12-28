import React from "react";

const Score = ({ viewWidth, marginSide, counter, restart }) => {
  // Destructure the props being passed in for easier access below
  return (
    <>
      <div className="score">
        {" "}
        {/* Display a div to hold the button and counter */}
        <button
          style={{
            width: `${viewWidth}vw`, // Sets the width of the button to be the same as the squares of the game board
            marginLeft: `${marginSide}vw`, // Sets the margin around the button to be the same as the squares of the game board
            marginRight: `${marginSide}vw`, // Sets the margin around the button to be the same as the squares of the game board
          }}
          onClick={() => restart()} // Has the button perform the restart function that was passed in on click
        >
          Play Again
        </button>
        <h2
          style={{
            width: `${viewWidth}vw`, // Sets the width of the counter text to be the same as the squares of the game board
            marginLeft: `${marginSide}vw`, // Sets the margin around the counter text to be the same as the sqaures of the game board
            marginRight: `${marginSide}vw`, // Sets the margin around the counter text to be the same as the sqaures of the game board
          }}
        >
          Counter: {counter}{" "}
          {/* Displays the text "Counter: " as well as the value of the counter state variable that was passed in */}
        </h2>
      </div>
    </>
  );
};
export default Score;
