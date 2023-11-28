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

        const shopAllLink = screen.getByRole("link", { name: "Shop All" });
        const lighting = screen.getByRole("link", { name: "Lighting" });
        const homeDecor = screen.getByRole("link", { name: "Home Decor" });
        const furniture = screen.getByRole("link", { name: "Furniture" });

        expect(shopAllLink).toHaveAttribute("href", "/categories/all");
        expect(lighting).toHaveAttribute("href", "/categories/lighting");
        expect(homeDecor).toHaveAttribute("href", "/categories/home-decor");
        expect(furniture).toHaveAttribute("href", "/categories/furniture");
        
    });

    it ("renders cart icon linked to /cart page", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const cartBtn = screen.getByRole("link", { name: "" });

        expect(cartBtn).toHaveAttribute("href", "/cart");
    });
});