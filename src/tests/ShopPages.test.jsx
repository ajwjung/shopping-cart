import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShopMain from "../components/ShopPages/ShopMain";
import AllProducts from "../components/ShopPages/AllProducts";
import Furniture from "../components/ShopPages/Furniture";

describe("AllProducts component", () => {
    const FAKE_PRODUCTS = [{
        products: [
            {
                thumbnail: "",
                title: "Dummy",
                brand: "Fake Brand",
                category: "furniture",
                rating: 3.8,
                price: 39.99,
                id: 31
            }
        ]
    },
    {
        products: [
            {
                thumbnail: "",
                title: "Dummy",
                brand: "Knockoff",
                category: "lighting",
                rating: 4.3,
                price: 19.99,
                id: 51
            },
        ]   
    },
    {
        products: [
            {
                thumbnail: "",
                title: "Dummy",
                brand: "Fake Brand",
                category: "home-decoration",
                rating: 2.9,
                price: 17.99,
                id: 21
            }
        ]
    }];

    it("renders three cards when given three products", async () => {
        const routes = [
            {
                path: "/categories/all",
                element: <AllProducts />,
                loader: () => FAKE_PRODUCTS,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories/all"],
            initialIndex: 0,
        });

        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getAllByRole("heading", { name: "Dummy" }));
        expect(screen.getAllByRole("heading", { name: "Dummy" })).toHaveLength(3);
    });
});

describe("ShopMain component", () => {
    const FAKE_PRODUCTS = [{
        products: [
            {
                thumbnail: "",
                title: "Dummy",
                brand: "Fake Brand",
                category: "furniture",
                rating: 3.8,
                price: 39.99,
                id: 31
            }
        ]
    },
    {
        products: [
            {
                thumbnail: "",
                title: "Dummy",
                brand: "Knockoff",
                category: "lighting",
                rating: 4.3,
                price: 19.99,
                id: 51
            },
        ]   
    },
    {
        products: [
            {
                thumbnail: "",
                title: "Dummy",
                brand: "Fake Brand",
                category: "home-decoration",
                rating: 2.9,
                price: 17.99,
                id: 21
            }
        ]
    }];

    it("renders the navbar", () => {
        const routes = [
            {
                path: "categories",
                element: <ShopMain />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories"],
            initialIndex: 0,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByRole("navigation", { name: "Navbar" })).toBeInTheDocument();
    });

    it("renders Furniture component when URL params is `furniture`", async () => {
        const routes = [
            {
                path: "/categories/furniture",
                element: <Furniture />,
                loader: () => FAKE_PRODUCTS,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/categories/furniture"],
            initialIndex: 0,
        });

        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByRole("heading", { name: "Furniture" }));
        expect(screen.getByRole("heading", { name: "Furniture" }))
            .toHaveTextContent("Furniture");
    });
})