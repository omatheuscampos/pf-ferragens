const productCache = createProductCache();
export async function useProducts(): Promise<ProductResponse[]> {
  let products = await productCache.getProducts();
  return products;
}

function createProductCache() {
  let products: ProductResponse[] = [];
  async function getProducts() {
    if (products.length === 0) {
      await updateProducts();
    }
    return Array.from(products);
  }

  const refreshTime = 24 * 60 * 60 * 1000;
  async function updateProducts() {
    products = await fetchProducts();
    setTimeout(async () => {
      await updateProducts();
    }, refreshTime);
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  async function fetchProducts(): Promise<ProductResponse[]> {
    try {
      const response = await fetch(`${API_URL}/products`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return {
    getProducts,
  };
}
