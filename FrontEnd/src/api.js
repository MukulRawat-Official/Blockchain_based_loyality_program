
const BASE_URL = 'http://localhost:3002/product'; // Replace with your API base URL

// Fetch products from the API
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
