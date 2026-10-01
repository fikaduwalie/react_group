// src/services/ProductService.js
// Service to fetch product data. Uses a public fake store API as fallback.

/**
 * Fetches products from the API.
 * @returns {Promise<Array>} Resolves to an array of product objects.
 */
export async function fetchProducts() {
  // Attempt to fetch from local backend first; if it fails, fallback to a public API.
  const localUrl = '/api/products';
  try {
    const response = await fetch(localUrl);
    if (!response.ok) throw new Error('Local API response not ok');
    return await response.json();
  } catch (localError) {
    console.warn('Local product API failed, falling back to public API:', localError);
    const fallbackUrl = 'https://fakestoreapi.com/products';
    const response = await fetch(fallbackUrl);
    if (!response.ok) {
      throw new Error('Fallback API request failed');
    }
    return await response.json();
  }
}
