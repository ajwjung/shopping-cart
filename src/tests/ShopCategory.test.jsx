import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ShopCategory from "../components/ShopCategory/ShopCategory";

describe("ShopCategory component", () => {
    it("renders when all props are passed in", () => {
        render (
            <BrowserRouter>
                <ShopCategory image="#" categoryName="all" />
            </BrowserRouter>
        );
        
        const allCategory = screen.getByRole("link", { name: "Shop all" });

        expect(allCategory).toBeInTheDocument;
    });

    it("does not render when a prop is not passed in", () => {
        render (
            <BrowserRouter>
                <ShopCategory />
            </BrowserRouter>
        );
        
        const nonexistentComponent = screen.queryByRole("link");

        expect(nonexistentComponent).toBe(null);
    });

    it("converts the category name 'Home Decor' to 'home-decor'", () => {
        render (
            <BrowserRouter>
                <ShopCategory image="#" categoryName="Home Decor" />
            </BrowserRouter>
        );

        const homeDecorComponent = screen.getByRole("link", { name: "Shop Home Decor" });

        expect(homeDecorComponent).toHaveAttribute("href", "/categories/home-decor");
    });

    it("renders with a link to /categories/lighting", () => {
        render (
            <BrowserRouter>
                <ShopCategory image="#" categoryName="lighting" />
            </BrowserRouter>
        );

        const lightingComponent = screen.getByRole("link", { name: "Shop lighting" });

        expect(lightingComponent).toHaveAttribute("href", "/categories/lighting");
    });

    it("renders with category text and a shop button", () => {
        render (
            <BrowserRouter>
                <ShopCategory image="#" categoryName="lighting" />
            </BrowserRouter>
        );

        const lightingComponent = screen.getByRole("link", { name: "Shop lighting" });
        const bgImage = screen.getByRole("img", { name: "Shop lighting" })
        const categoryText = screen.getByText("lighting");

        expect(lightingComponent).toContainElement(bgImage);
        expect(lightingComponent).toContainElement(categoryText);
    });
});