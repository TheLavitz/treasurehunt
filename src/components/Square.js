import React from "react";

const Square = ({ board, index, click, viewWidth, marginSide }) => {
  const fontSize = viewWidth / 1.1;

  return (
    <>
      <div
        onClick={() => click(index)}
        className="square"
        style={{
          width: `${viewWidth}vw`,
          marginLeft: `${marginSide}vw`,
          marginRight: `${marginSide}vw`,
          fontSize: `${fontSize}vw`,
        }}
      >
        {board}
      </div>
    </>
  );
};
export default Square;
