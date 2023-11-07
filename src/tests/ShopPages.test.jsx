import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ShopMain from "../components/ShopPages/ShopMain";
import ProductCard from "../components/ProductCard/ProductCard";
import AllProducts from "../components/ShopPages/AllProducts";
import Lighting from "../components/ShopPages/Lighting";
import HomeDecor from "../components/ShopPages/HomeDecor";
import Furniture from "../components/ShopPages/Furniture";
import Navbar from "../components/Navbar/Navbar";

// Test 1: ShopMain renders the navbar
// Test 2: ShopMain renders the child component content 
// Test 3: depending on URL param, page should render correct heading

describe("AllProducts component", () => {
    it("renders five cards when given 5 products", () => {
        const fakeProducts = [{
            thumbnail: "",
            title: "Dummy",
            brand: "Fake Brand",
            category: "furniture",
            rating: 3.8,
            price: 39.99,
            id: 31
        },
        {
            thumbnail: "",
            title: "Dummy",
            brand: "Knockoff",
            category: "lighting",
            rating: 4.3,
            price: 19.99,
            id: 51
        },
        {
            thumbnail: "",
            title: "Dummy",
            brand: "No Brand",
            category: "lighting",
            rating: 4.5,
            price: 12.39,
            id: 1
        },
        {
            thumbnail: "",
            title: "Dummy",
            brand: "Fake Brand",
            category: "home-decoration",
            rating: 2.9,
            price: 17.99,
            id: 21
        },
        {
            thumbnail: "",
            title: "Dummy",
            brand: "Knockoff",
            category: "furniture",
            rating: 2.2,
            price: 5.99,
            id: 35
        }];

        const routes = [
            {
                path: "/categories/all",
                element: <AllProducts allProductData={fakeProducts} />,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories/all"],
            initialIndex: 0,
        });

        render(
            <RouterProvider router={router} />
        );

        const productsContainer = screen.getAllByRole("heading", { name: "Dummy" });
        expect(productsContainer).toHaveLength(5);
    });
});

describe("ShopMain component", () => {
    it("renders Furniture component when URL params is `furniture`", () => {
        const fakeProducts = [{
            thumbnail: "",
            title: "Dummy",
            brand: "Fake Brand",
            category: "furniture",
            rating: 3.8,
            price: 39.99,
            id: 31
        }];

        const routes = [
            {
                path: "/categories/furniture",
                element: <Furniture allProductData={fakeProducts} />,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories/furniture"],
            initialIndex: 0,
        });

        render(
            <RouterProvider router={router} />
        );

        const productsContainer = screen.getByRole("heading", { name: "Furniture" });
        expect(productsContainer).toHaveTextContent("Furniture");
    });
})