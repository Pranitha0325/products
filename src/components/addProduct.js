import React, { useState, useContext } from 'react';
import { navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useProducts } from './products';
import './products.css'; // Import CSS file for styling

const AddProduct = () => {
  const { products, updateProductList } = useProducts();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  console.log(products, "products Array")

  const handleSubmit = (e) => {
    e.preventDefault();



    // Check if all fields are filled
    if (!name || !category || !description || !price) {
      alert('Please fill in all fields');
      return;
    }else{
        setShouldRedirect(true);
        return
    }

    // Convert price to a number
    const priceNumber = parseFloat(price);

    // // Create a new product object
    // const newProduct = {
    //   id: products.length + 1, // Generate a unique ID (you can use a better approach for generating IDs)
    //   name,
    //   category,
    //   description,
    //   price: priceNumber,
    // };

    // // Update the product list in the context
    // updateProductList([...products, newProduct]);

    // Clear form fields
    setName('');
    setCategory('');
    setDescription('');
    setPrice('');
  };
  if (shouldRedirect) {
    return <Link to="/" />;
  }
  return (
    <div>
        <div style={{display:'flex', justifyContent:'center'}}>
        <h1>Add New Product </h1>

        </div>
<form className="add-product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
     <Link
      to="/" >  <button type="submit">Add Product</button></Link> 
    </form>
    </div>
    
  );
};

export default AddProduct;
