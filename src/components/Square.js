import React from "react";

const Square = ({ board, index, click, viewWidth, marginSide }) => {
  // Destructure the props being passed for easier access below
  const fontSize = viewWidth / 1.1; // Calculate the font size of the character in the square needed for it to be slightly less than the width of the square

  return (
    <>
      <div
        onClick={() => click(index)}
        className="square"
        style={{
          // Create a div that performs the handleClick function that was passed in as click
          width: `${viewWidth}vw`, // Sets the width of the square to the correct value to keep the box square based off of the vh
          marginLeft: `${marginSide}vw`, // Sets the margin to maintain even spacing between square as the window is resized
          marginRight: `${marginSide}vw`, // Sets the margin to maintain even spacing between square as the window is resized
          fontSize: `${fontSize}vw`, // Set the font size of the character in the square to be slightly less than the width of the square
        }}
        data-testid={`square-${index}`}
      >
        {board}
        {/* Display the value from the current index of the board state variable that was passed in as board */}
      </div>
    </>
  );
};
export default Square;
