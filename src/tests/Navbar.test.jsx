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

        const brandLogo = screen.getByRole("img", { name: "Brand Logo" });

        expect(brandLogo).toBeInTheDocument();
    });

    it("renders nav links", () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        );

        const homeLink = screen.getByRole("link", { name: "Home" });
        const shopLink = screen.getByRole("link", { name: "Shop Allq" });

        expect(homeLink).toHaveAttribute("href", "/");
        expect(shopLink).toHaveAttribute("href", "/categories/all");
    });

    it ("renders cart button linked to /cart page", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const cartBtn = screen.getByRole("link", { name: "Shopping Cart" });

        expect(cartBtn).toHaveAttribute("href", "/cart");
    });
});