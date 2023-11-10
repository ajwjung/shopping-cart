import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar/Navbar";

describe("Navbar component", () => {
    it("renders header logo", () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        );

        const brandLogo = screen.getByRole("heading", { name: "GOOD HOME" });

        expect(brandLogo).toBeInTheDocument();
    });

    it("renders nav links", () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        );

        const homeLink = screen.getByRole("link", { name: "Home" });
        const shopLink = screen.getByRole("link", { name: "Shop All" });

        expect(homeLink).toHaveAttribute("href", "/");
        expect(shopLink).toHaveAttribute("href", "/categories/all");
    });

    it ("renders cart icon linked to /cart page", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const cartBtn = screen.getByRole("link", { name: "Cart" });

        expect(cartBtn).toHaveAttribute("href", "/cart");
    });
});