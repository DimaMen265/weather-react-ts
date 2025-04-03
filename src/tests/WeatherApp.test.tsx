import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherApp from "../components/WeatherApp";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherApp", () => {
  test("displays weather data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        name: "Kyiv",
        main: { temp: 10 },
        weather: [{ description: "clear", icon: "01d" }],
        dt: 1712230000,
      },
    });
    
    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "Kyiv" },
    });
    fireEvent.click(screen.getByText("Get Weather"));
    
    expect(await screen.findByText("Kyiv")).toBeInTheDocument();
  });
  
  test("displays error message when city is not found", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("City not found"));
    
    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "InvalidCity" },
    });
    fireEvent.click(screen.getByText("Get Weather"));
    
    expect(await screen.findByText("City not found or API error.")).toBeInTheDocument();
  });
});