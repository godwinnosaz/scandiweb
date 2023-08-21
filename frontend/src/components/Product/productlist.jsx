import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get('https://testapi.veluxpay.com/Bookme/getProduct')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
 
  const handleMassDelete = () => {
    const formData = new FormData();
    selectedItems.forEach((productId) => {
        formData.append('product_id', productId);
  
      axios
        .post('https://testapi.veluxpay.com/Bookme/deleteProduct',formData )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(`Error deleting item with ID ${productId}:`, error);
        });
    });
    setSelectedItems([]);
  };
  

  const handleCheckboxClick = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="header">
        <div className="title">Product List</div>
        <div className="actions">
          <Link to="/addproduct">
            <button className="add-button">ADD</button>
          </Link>
          <button  className="mass-delete-button" onClick={handleMassDelete}>
            MASS DELETE
          </button>
        </div>
      </div>
      <div className="grid">
        {products.length === 0 ? (
          <h6>No products available.</h6>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className={`product-item ${
                selectedItems.includes(product.id) ? 'selected' : ''
              }`}
            >
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="delete-checkbox"
                  onClick={() => handleCheckboxClick(product.id)}
                />
                {/* <label className="checkbox-label"></label> */}
              </div>
              <h6>{product.sku_id}</h6>
              <h6>{product.name}</h6>
              <h6>${product.price}</h6>
              {product.size !== '' && <h6> size: {product.size} mb</h6>}
              {product.dimension !== '' && <h6> Dimension: {product.dimension}</h6>}
              {product.weight !== '' && <h6> Weight: {product.weight} kg</h6>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
