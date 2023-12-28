import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Square from "../components/Square";

describe("<Square />", () => {
  it("clicking on square calls click function with correct index", () => {
    const clickMock = jest.fn();
    render(
      <Square
        board="❔"
        index={1}
        click={clickMock}
        viewWidth={10}
        marginSide={5}
      />
    );
    const squareElement = screen.getByText(/❔/i);
    fireEvent.click(squareElement);
    expect(clickMock).toHaveBeenCalledWith(1);
  });
});
