/* 
NEED TO TEST: <ShopCategory prop={prop} /> 
    - accepts a prop
    - button text is correct (e.g., "Shop _clothing_")
    - links to the correct urls
*/

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ShopCategory from "../components/ShopCategory/ShopCategory";

describe("ShopCategory component", () => {
    it("renders when a prop of type string is passed in", () => {
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

    it("renders with a link to /category/lighting", () => {
        render (
            <BrowserRouter>
                <ShopCategory image="#" categoryName="lighting" />
            </BrowserRouter>
        );

        const lightingComponent = screen.getByRole("link", { name: "Shop lighting" });

        expect(lightingComponent).toHaveAttribute("href", "/category/lighting");
    });

    it("renders with an image and a shop button", () => {
        render (
            <BrowserRouter>
                <ShopCategory image="#" categoryName="lighting" />
            </BrowserRouter>
        );

        const lightingComponent = screen.getByRole("link", { name: "Shop lighting" });
        const bgImage = screen.getByRole("img", { name: "Shop lighting" })
        const shopButton = screen.getByRole("button", { name: "lighting" });

        expect(lightingComponent).toContainElement(bgImage);
        expect(lightingComponent).toContainElement(shopButton);
    });
});