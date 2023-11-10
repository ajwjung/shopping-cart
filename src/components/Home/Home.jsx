import Navbar from "../Navbar/Navbar";
import ShopCategory from "../ShopCategory/ShopCategory";

function Home() {
    return (
        <>
        <Navbar />
        <main className="home-content">
            <ShopCategory 
                categoryName="All" 
                image="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ShopCategory 
                categoryName="Lighting" 
                image="https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ShopCategory 
                categoryName="Home Decor" 
                image="https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ShopCategory 
                categoryName="Furniture" 
                image="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
        </main>
        </>
    )
}

export default Home;