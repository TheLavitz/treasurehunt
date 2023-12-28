import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders game message", () => {
    render(<App />);
    const headingElement = screen.getByRole("heading", {
      name: /treasure hunt game/i,
    });
    expect(headingElement).toHaveTextContent("Treasure Hunt Game");
  });

  it("renders game board", () => {
    render(<App />);
    const boardElement = screen.getByTestId("game-board");
    expect(boardElement).toBeInTheDocument();
  });

  it("clicking on a square updates the board", () => {
    render(<App />);
    const squareElement = screen.getByTestId("square-0");
    fireEvent.click(squareElement);
    const possibleValues = ["🌴", "💰", "💣"];
    const squareContent = squareElement.textContent;
    expect(possibleValues).toContain(squareContent);
  });

  it("clicking on the 'Play Again' button restarts the game", () => {
    render(<App />);
    const playAgainButton = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(playAgainButton);
    const resetBoard = screen.getAllByText("❔");
    expect(resetBoard).toHaveLength(9);
  });
});
