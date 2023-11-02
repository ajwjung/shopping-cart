import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import ShopCategory from "./ShopCategory/ShopCategory";

function useAllData() {
  let [lighting, setLighting] = useState(null);
  let [homeDecor, setHomeDecor] = useState(null);
  let [furniture, setFurniture] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);

  async function dataFetch() {
    try {
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

      const [lightingResult, homeDecorResult, furnitureResult] = 
        await Promise.all(result);

      setLighting(lightingResult);
      setHomeDecor(homeDecorResult);
      setFurniture(furnitureResult);
    } catch(error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    dataFetch();
  }, []);

  return { lighting, homeDecor, furniture, error, loading }
}

function App() {
  const { lighting, homeDecor, furniture, error, loading } = useAllData();

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <main className="home-content">
        <ShopCategory image="#" categoryName="All" />
        <ShopCategory image="#" categoryName="Lighting" />
        <ShopCategory image="#" categoryName="Home Decor" />
        <ShopCategory image="#" categoryName="Furniture" />
      </main>
    </>
  )
}

export default App;
