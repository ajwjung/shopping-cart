import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import NavDropdown from "../components/Navbar/Dropdown";
import Navbar from "../components/Navbar/Navbar";

vi.mock("../components/Navbar/Dropdown", () => ({
    default: () => {
        const onClick = vi.fn();

        return (
            <>
                <button type="button" onClick={onClick}>Shop by Category</button>
                <div>
                    <Link to="/categories/lighting">Lighting</Link>
                    <Link to="/categories/home-decor">Home Decor</Link>
                    <Link to="/categories/furniture">Furniture</Link>
                </div>
            </>
        )
    }
}));

describe("NavDropdown component", () => {
    it("renders a 'Shop by Category' button", () => {
        render(
            <BrowserRouter>
                <NavDropdown />
            </BrowserRouter>
        );

        const dropdownBtn = screen.getByRole("button", { name: "Shop by Category" });
        
        expect(dropdownBtn).toBeInTheDocument();
    });

    it("renders Lighting, Furniture, and Home Decor nav links", () => {
        render(
            <BrowserRouter>
                <NavDropdown />
            </BrowserRouter>
        );

        const lighting = screen.getByRole("link", { name: "Lighting" });
        const homeDecor = screen.getByRole("link", { name: "Home Decor" });
        const furniture = screen.getByRole("link", { name: "Furniture" });

        expect(lighting).toHaveAttribute("href", "/categories/lighting");
        expect(homeDecor).toHaveAttribute("href", "/categories/home-decor");
        expect(furniture).toHaveAttribute("href", "/categories/furniture");
    })
});

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

    it("renders 'Shop All' link", () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        );

        const shopAllLink = screen.getByRole("link", { name: "Shop All" });

        expect(shopAllLink).toHaveAttribute("href", "/categories/all");        
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