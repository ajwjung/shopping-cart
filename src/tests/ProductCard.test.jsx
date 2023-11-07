import { render, screen } from "@testing-library/react";
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
                path: "/categories/:category/:id",
                element: <ProductCard product={fakeProduct} />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories/furniture/31"],
            initialIndex: 1,
        });

        render(
            <RouterProvider router={router} />
        );

        const card = screen.getByRole("link", { name: 
            "Dummy Dummy Fake Brand 3.8 $39.99" 
        });
        const brand = screen.getByText("Fake Brand");
        
        expect(card).toBeInTheDocument();
        expect(brand).toBeInTheDocument();
    });

    it("does not render when product is not passed in", () => {
        render(<ProductCard />);

        const nonexistentBrand = screen.queryByText("Fake Brand");
        expect(nonexistentBrand).toBe(null);
    });

    it("renders a product card linked to '/categories/furniture/31'", () => {
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
                path: "/categories/:category/:id",
                element: <ProductCard product={fakeProduct} />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories/furniture/31"],
            initialIndex: 1,
        });

        render(
            <RouterProvider router={router} />
        );

        const card = screen.getByRole("link", { name: 
            "Dummy Dummy Fake Brand 3.8 $39.99" 
        });

        expect(card).toHaveAttribute("href", "/categories/furniture/31")
    });
});