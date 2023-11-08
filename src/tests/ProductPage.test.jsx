import { render, screen, waitFor, act } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProductPage from "../components/ProductPage/ProductPage";

describe("ProductPage component", () => {
    it("displays a loading page while fetching", () => {
        const routes = [
            {
                path: "/product/:id",
                element: <ProductPage />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/categories/furniture", "/product/26"],
            initialIndex: 2,
        });

        render(<RouterProvider router={router} />);

        const loading = screen.getByText("Loading...");
        expect(loading).toBeInTheDocument();
    });

    it("renders the product image", () => {
        const routes = [
            {
                path: "/product/:id",
                element: <ProductPage />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/categories/furniture", "/product/26"],
            initialIndex: 2,
        });

        act(() => {
            render(<RouterProvider router={router} />);
        });

        waitFor(() => {
            expect(screen.getByAltText("Planter Hanger For Home"))
            .toBeInTheDocument();
        });
    });

    it("renders buttons to change the quantity", () => {
        const routes = [
            {
                path: "/product/:id",
                element: <ProductPage />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/categories/furniture", "/product/26"],
            initialIndex: 2,
        });

        act(() => {
            render(<RouterProvider router={router} />);
        });

        waitFor(() => {
            expect(screen.getByRole("button", { name: "-" }))
            .toBeInTheDocument();
            expect(screen.getByRole("button", { name: "+" }))
            .toBeInTheDocument();
        });
    });

    it("renders an input field to enter the quantity", () => {
        const routes = [
            {
                path: "/product/:id",
                element: <ProductPage />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/categories/furniture", "/product/26"],
            initialIndex: 2,
        });

        act(() => {
            render(<RouterProvider router={router} />);
        });

        waitFor(() => {
            expect(screen.getByRole("textbox", { name: "quantity" }))
            .toBeInTheDocument();
        });
    });

    it("renders an add to cart button", () => {
        const routes = [
            {
                path: "/product/:id",
                element: <ProductPage />
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/categories/furniture", "/product/26"],
            initialIndex: 2,
        });

        act(() => {
            render(<RouterProvider router={router} />);
        });

        waitFor(() => {
            expect(screen.getByRole("button", { name: "Add to Cart" }))
            .toBeInTheDocument();
        });
    });
})

describe("'+' and '-' buttons", () => {
    it("should call the onClick function when clicked", async () => {
        const onClick = vi.fn();
        const onChange = vi.fn();
        const user = userEvent.setup();
        
        render(
            <div className="qtyBtns">
                <button 
                    type="button"
                    onClick={onClick}
                >-</button>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value="1"
                    onChange={onChange}
                />
                <button 
                    type="button"
                    onClick={onClick}
                >+</button>
            </div>
        );

        const increaseBtn = screen.getByRole("button", { name: "+" });

        await user.click(increaseBtn);

        expect(onClick).toHaveBeenCalled();
    });

    it("should not call on the Onclick function when not clicked", async () => {
        const onClick = vi.fn();
        const onChange = vi.fn();
        
        render(
            <div className="qtyBtns">
                <button 
                    type="button"
                    onClick={onClick}
                >-</button>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value="1"
                    onChange={onChange}
                />
                <button 
                    type="button"
                    onClick={onClick}
                >+</button>
            </div>
        );

        expect(onClick).not.toHaveBeenCalled();
    })
})

describe("Add to cart button", () => {
    it("should call handleAddToCart function when clicked", async () => {
        const handleAddToCart = vi.fn();
        const user = userEvent.setup();        
        
        render(
            <button onClick={handleAddToCart} type="button">Add to Cart</button>
        );

        const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
        
        await user.click(addToCartButton);

        expect(handleAddToCart).toHaveBeenCalled();
    });

    it("should not call handleAddToCart function when not clicked", async () => {
        const handleAddToCart = vi.fn();    
        
        render(
            <button onClick={handleAddToCart} type="button">Add to Cart</button>
        );

        expect(handleAddToCart).not.toHaveBeenCalled();
    });
})