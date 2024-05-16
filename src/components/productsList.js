import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from './products'; // Update the path to the ProductsProvider file
import { Select, Input, Table, Modal, Button } from 'antd';
import './products.css';

const { Option } = Select;

const ProductsList = () => {
    // const history = useHistory();
  const products = useProducts();
  const [productList, setProductList] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [sortingOrder, setSortingOrder] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const categories = Array.from(new Set(productList.map(product => product.category)));
    setCategoryList(categories);
  }, [productList]);

  useEffect(() => {
    if (categoryFilter === '') {
      setProductList(products);
    } else {
      const filteredList = products.filter(product => product.category === categoryFilter);
      setProductList(filteredList);
    }
  }, [categoryFilter, products]);

  useEffect(() => {
    if (priceFilter === '') {
      setProductList(products);
    } else {
      const filteredList = products.filter(product => product.price <= parseFloat(priceFilter));
      setProductList(filteredList);
    }
  }, [priceFilter, products]);

  useEffect(() => {
    if (sortingOrder === 'asc') {
      const sortedList = [...productList].sort((a, b) => a.price - b.price);
      setProductList(sortedList);
    } else if (sortingOrder === 'desc') {
      const sortedList = [...productList].sort((a, b) => b.price - a.price);
      setProductList(sortedList);
    }
  }, [sortingOrder, productList]);

  useEffect(() => {
    const filteredList = products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setProductList(filteredList);
  }, [searchText, products]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setEditModalVisible(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalVisible(true);
  };

  const handleEditSubmit = () => {
    const updatedList = productList.map(item =>
      item.id === editedProduct.id ? editedProduct : item
    );
    setProductList(updatedList);
    setEditModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    const updatedList = productList.filter(item => item.id !== selectedProduct.id);
    setProductList(updatedList);
    setDeleteModalVisible(false);
  };

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
        title: 'Actions',
        dataIndex: '',
        key: 'actions',
        render: (text, record) => (
          <div>
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button onClick={() => handleDelete(record)} danger>Delete</Button>
          </div>
        )
      }
    
  ];

 


  return (
    <div className="container">
      <h2>Product List</h2>
      <div className="filters">
        <Select value={categoryFilter} onChange={setCategoryFilter} placeholder="Select category">
          <Option value="">All Categories</Option>
          {categoryList.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
        <Select value={priceFilter} onChange={setPriceFilter} placeholder="Select price range">
          <Option value="">All Prices</Option>
          <Option value="50">Less than $50</Option>
          <Option value="100">Less than $100</Option>
          <Option value="200">Less than $200</Option>
        </Select>
        <Select value={sortingOrder} onChange={setSortingOrder} placeholder="Sort by price">
          <Option value="">Sort by Price</Option>
          <Option value="asc">Lowest to Highest</Option>
          <Option value="desc">Highest to Lowest</Option>
        </Select>
        <Link to="/addProduct">
      <button 
        style={{
          backgroundColor: "blue", 
          color: "white", 
          borderRadius: "10px",
          height:"50px"
        }} 
        type="button"
      >
        Add Product
      </button>
    </Link>


        <Input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search by name or description..."
        />
      </div>
      <Table dataSource={productList} columns={columns} />

      <Modal
        title="Edit Product"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>
            Save
          </Button>
        ]}
      >
        <Input
          value={editedProduct?.name}
          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
        />
        <Input
          value={editedProduct?.price}
          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
        />

        {/* Add more fields for editing */}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Product"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" onClick={handleDeleteConfirm} danger>
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete {selectedProduct?.name}?</p>
      </Modal>
    
    </div>
  );
};

export default ProductsList;
