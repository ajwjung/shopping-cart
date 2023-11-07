async function loader() {
    const result = (
        await Promise.all([
            fetch("https://dummyjson.com/products/category/lighting"),
            fetch("https://dummyjson.com/products/category/home-decoration"),
            fetch("https://dummyjson.com/products/category/furniture"),
        ])
    ).map((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        
        return response.json();
    });

    return await Promise.all(result);
}

export default loader;