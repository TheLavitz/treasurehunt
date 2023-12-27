import React from "react";

const Score = ({ viewWidth, marginSide, counter, restart }) => {
  return (
    <>
      <div className="score">
        <button
          style={{
            width: `${viewWidth}vw`,
            marginLeft: `${marginSide}vw`,
            marginRight: `${marginSide}vw`,
          }}
          onClick={() => restart()}
        >
          Play Again
        </button>
        <h2
          style={{
            width: `${viewWidth}vw`,
            marginLeft: `${marginSide}vw`,
            marginRight: `${marginSide}vw`,
          }}
        >
          Counter: {counter}
        </h2>
      </div>
    </>
  );
};
export default Score;
