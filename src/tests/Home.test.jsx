import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../components/Home/Home";

describe("Home component", () => {
    it("renders nav bar", () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )

        waitFor(() => {
            expect(screen.getByRole("navigation", { name: "Navbar" }))
                .toBeInTheDocument();
        });
    });

    it("renders shop overview content", () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )

        waitFor(() => {
            expect(screen.getByRole("main", { name: "" })).toBeInTheDocument();
        })
    });
})