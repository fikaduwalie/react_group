import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 transform cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="flex justify-center items-center h-48 bg-gray-100">
        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h2>
        <p className="text-gray-700 font-bold mb-2">${product.price}</p>
        <p className="text-gray-500 mt-auto">{product.category}</p>
      </div>
    </div>
  );
}

