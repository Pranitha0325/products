import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './components/products'; // Update the path to the ProductsProvider file
import AddProduct from './components/addProduct';
import ProductsList from './components/productsList';
import './App.css';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </ProductsProvider>
    </Router>
  );
}

export default App;
