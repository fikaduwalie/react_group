// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch product");
//         const data = await res.json();
//         setProduct(data);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div className="text-center py-8">Loading product...</div>;
//   if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
//   if (!product) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
//         <button
//           onClick={() => navigate("/products")}
//           className="mb-4 text-blue-600 hover:underline"
//         >
//           ← Back to Products
//         </button>
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1 flex justify-center items-center bg-gray-50 p-4">
//             <img src={product.image} alt={product.title} className="max-w-full max-h-[300px] object-contain" />
//           </div>
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
//             <p className="text-xl font-semibold text-gray-800 mb-2">${product.price}</p>
//             <p className="text-gray-600 mb-2">Category: {product.category}</p>
//             <p className="text-gray-700 mb-4">{product.description}</p>
//             <p className="text-yellow-600 mb-2">
//               Rating: {product.rating?.rate ?? "N/A"} ({product.rating?.count ?? 0} reviews)
//             </p>
//             <button className="mt-4 bg-[#561361] text-white font-semibold py-2 px-4 rounded hover:bg-[#450d48] transition">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
