import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Cart from "../components/Cart/Cart";

describe("Cart component", () => {
    const FAKE_ITEMS = [
        {
            title: "Armin x Gudetama Plush",
            price: 4400,
            quantity: 1,
            thumbnail: "",
        },
        {
            title: "Mikasa x Gudetama Plush",
            price: 4400,
            quantity: 2,
            thumbnail: "",
        }
    ];

    it("should render the navbar", () => {
        const routes = [
            {
                path: "/cart",
                element: <Cart cartedItems={FAKE_ITEMS} />,
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        })

        render(
            <RouterProvider router={router} />
        )

        waitFor(() => {
            expect(screen.getByRole("navigation", { name: "Navbar" }))
                .toBeInTheDocument();
        })
    });

    it("should render a table of carted items", () => {
        const routes = [
            {
                path: "/cart",
                element: <Cart cartedItems={FAKE_ITEMS} />,
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        })

        render(
            <RouterProvider router={router} />
        )

        waitFor(() => {
            expect(screen.getByRole("table", { name: "" })).toBeInTheDocument();
            expect(screen.getByRole("row", { name: "cartedItem" })).toBeInTheDocument();
        })
    });

    it("should render two rows when there are two items in cart", () => {
        const routes = [
            {
                path: "/cart",
                element: <Cart cartedItems={FAKE_ITEMS} />,
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        })

        render(
            <RouterProvider router={router} />
        )

        waitFor(() => {
            expect(screen.getAllByRole("row", { name: "cartedItem" })).toHaveLength(2);
        })
    });

    it("should display the calculated subtotal for items with qty > 1", () => {
        const routes = [
            {
                path: "/cart",
                element: <Cart cartedItems={FAKE_ITEMS} />,
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        })

        render(
            <RouterProvider router={router} />
        )
        
        waitFor(() => {
            expect(screen.getByText("textbox", { name: "quantity" }))
                .toEqual(FAKE_ITEMS[1].quantity * FAKE_ITEMS[1].price);
        });
    });

    it("should render a button to remove a given item from cart", () => {
        const routes = [
            {
                path: "/cart",
                element: <Cart cartedItems={FAKE_ITEMS} />,
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        })

        render(
            <RouterProvider router={router} />
        )

        waitFor(() => {
            expect(screen.getByRole("button", { name: "removeItem" }))
                .toBeInTheDocument();
        });
    });

    it("should display the calculated total for the entire cart", () => {
        const routes = [
            {
                path: "/cart",
                element: <Cart cartedItems={FAKE_ITEMS} />,
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        })

        render(
            <RouterProvider router={router} />
        )

        const TOTAL_PRICE = FAKE_ITEMS.map((item) => {
            return (Math.round(
                (Number(item.quantity) * Number(item.price)) * 100) / 100
            );
        }).reduce((prev, current) => {
            return prev + current;
        }, 0);

        waitFor(() => {
            expect(screen.getByText("textbox", { name: "$13200" }))
                .toEqual(`$${TOTAL_PRICE}`)
        })
    })
})