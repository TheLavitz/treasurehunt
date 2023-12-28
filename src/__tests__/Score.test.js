import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Score from "../components/Score";

describe("<Score />", () => {
  it("renders Play Again button", () => {
    render(
      <Score viewWidth={10} marginSide={5} counter={3} restart={() => {}} />
    );
    const playAgainButton = screen.getByRole("button", { name: /play again/i });
    expect(playAgainButton).toBeInTheDocument();
  });

  it("renders Counter with the correct value", () => {
    render(
      <Score viewWidth={10} marginSide={5} counter={3} restart={() => {}} />
    );
    const counterElement = screen.getByText(/counter: 3/i);
    expect(counterElement).toBeInTheDocument();
  });

  it("clicking on Play Again button calls restart function", () => {
    const restartMock = jest.fn();
    render(
      <Score viewWidth={10} marginSide={5} counter={3} restart={restartMock} />
    );
    const playAgainButton = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(playAgainButton);
    expect(restartMock).toHaveBeenCalled();
  });
});
