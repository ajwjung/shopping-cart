import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../components/App";

describe("App component (home page)", () => {
    it("shows a loading screen while fetching for data", async () => {        
        act(() => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        });

        const loadingText = screen.getByText("Loading...");

        expect(loadingText).toBeInTheDocument();
    })

    it("renders nav bar", () => {
        render(
            <BrowserRouter>
                <App />
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
                <App />
            </BrowserRouter>
        )

        waitFor(() => {
            expect(screen.getByRole("main", { name: "" })).toBeInTheDocument();
        })
    });
})
