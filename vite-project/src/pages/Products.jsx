import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/ProductService";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
     async  function getProducts(){
      try {
        const data = await fetchProducts();

        setProducts(data);
        // Extract unique categories for filter dropdown
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        setError(error.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if(loading){
    return <div> loading products...</div>
  }
  if(error){
    return <div>Error has happend:{error}</div>
  }
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Product Store</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-[28px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-40 h-[28px] px-3 border border-gray-300 rounded-md focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}





