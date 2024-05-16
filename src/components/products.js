import React, { createContext, useContext } from 'react';

// Define a context for the products
const ProductsContext = createContext();

// Define the ProductsProvider component to provide the products to all components
export const ProductsProvider = ({ children }) => {
  const products = [
    {
      "id": 1,
      "category": "Electronics",
      "name": "Laptop",
      "description": "Powerful laptop for all your computing needs",
      "price": 999.99
    },
    {
      "id": 2,
      "category": "Clothing",
      "name": "T-Shirt",
      "description": "Comfortable cotton t-shirt for everyday wear",
      "price": 19.99
    },
    {
      "id": 3,
      "category": "Electronics",
      "name": "Smartphone",
      "description": "Advanced smartphone with cutting-edge features",
      "price": 699.99
    },
    {
      "id": 4,
      "category": "Books",
      "name": "Novel",
      "description": "Bestselling novel loved by readers worldwide",
      "price": 14.99
    },
    {
      "id": 5,
      "category": "Electronics",
      "name": "Headphones",
      "description": "High-quality headphones for immersive audio experience",
      "price": 79.99
    },
    {
      "id": 6,
      "category": "Clothing",
      "name": "Jeans",
      "description": "Classic denim jeans for a timeless look",
      "price": 39.99
    },
    {
      "id": 7,
      "category": "Books",
      "name": "Cookbook",
      "description": "Collection of delicious recipes from around the world",
      "price": 24.99
    },
    {
      "id": 8,
      "category": "Electronics",
      "name": "Smartwatch",
      "description": "Stylish smartwatch with fitness tracking capabilities",
      "price": 149.99
    },
    {
      "id": 9,
      "category": "Toys",
      "name": "Building Blocks",
      "description": "Educational building blocks for children's creative play",
      "price": 29.99
    },
    {
      "id": 10,
      "category": "Beauty",
      "name": "Moisturizer",
      "description": "Hydrating moisturizer for soft and supple skin",
      "price": 29.99
    }
  ];

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to consume the products from any component
export const useProducts = () => useContext(ProductsContext);
