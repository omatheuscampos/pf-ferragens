"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShoppingCartContext {
  products: shoppingCartProduct[];
  addProduct: (product: shoppingCartProduct) => void;
  removeProduct: (productId: string) => void;
  updateProductAmount: (productId: string, amount: number) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

const CART_KEY = "shopping_cart";
export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<shoppingCartProduct[]>([]);

  useEffect(() => {
    const cart = getShoppingCartProductsFromLocalStorage();
    setProducts(cart);
  }, []);

  function getShoppingCartProductsFromLocalStorage(): shoppingCartProduct[] {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  useEffect(() => {
    saveTheShoppingCartToLocalStorage(products);
  }, [products]);

  function saveTheShoppingCartToLocalStorage(
    cart: shoppingCartProduct[]
  ): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function addProduct(product: shoppingCartProduct): void {
    const existingProduct = !!products.find((item) => item.id === product.id);

    if (existingProduct) {
      product.amount += 1; // Atualiza a quantidade
      return;
    }

    setProducts([product, ...products]);
  }

  function removeProduct(productId: string): void {
    const updatedCart = products.filter((item) => item.id !== productId);
    setProducts(updatedCart);
  }

  function updateProductAmount(productId: string, amount: number): void {
    if (amount <= 0) return;

    const updatedProducts: shoppingCartProduct[] = [];
    for (const product of products) {
      if (product.id === productId) {
        product.amount = amount;
      }
      updatedProducts.push(product);
    }

    setProducts(updatedProducts);
  }

  function clearCart() {
    setProducts([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        addProduct,
        products,
        removeProduct,
        updateProductAmount,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  return context;
}
