import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../components/App";

describe("App component (home page)", () => {
    it("renders nav bar", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const navbar = screen.getByRole("navigation", { name: "Navbar" });

        expect(navbar).toBeInTheDocument();
    });

    it("renders shop overview content", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const container = screen.getByRole("main", { name: "" });

        expect(container).toBeInTheDocument();
    });
})
