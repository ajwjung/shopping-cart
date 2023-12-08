import { render, screen, within } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard/ProductCard";

describe("ProductCard component", () => {
    it("renders card with product details when prop passed in", () => {
        const fakeProduct = {
            thumbnail: "",
            title: "Dummy",
            brand: "Fake Brand",
            category: "furniture",
            rating: 3.8,
            price: 39.99,
            id: 31
        };

        const routes = [
            {
                path: "/product/:id",
                element: <ProductCard product={fakeProduct} />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/product/31"],
            initialIndex: 1,
        });

        render(
            <RouterProvider router={router} />
        );

        const productName = screen.getByRole("heading", { name: "Dummy"});
        const img = screen.getByRole("img", { name: "Dummy" });
        const price = screen.queryByText("$39.99");
        
        expect(productName).toBeInTheDocument();
        expect(img).toBeInTheDocument();
        expect(price).toBeInTheDocument();
    });

    it("does not render when product is not passed in", () => {
        expect(() => render(<ProductCard />))
            .toThrow("Cannot read properties of undefined (reading 'price')");
    });

    it("renders a heading linked to '/product/31'", () => {
        const fakeProduct = {
            thumbnail: "",
            title: "Dummy Product",
            brand: "Fake Brand",
            category: "furniture",
            rating: 3.8,
            price: 39.99,
            id: 31
        };

        const routes = [
            {
                path: "/product/:id",
                element: <ProductCard product={fakeProduct} />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/product/31"],
            initialIndex: 1,
        });

        render(
            <RouterProvider router={router} />
        );

        const product = screen.getByRole("link", 
            { name: "View listing for Dummy Product" }
        )

        expect(product).toHaveAttribute("href", "/product/31");
    });
});