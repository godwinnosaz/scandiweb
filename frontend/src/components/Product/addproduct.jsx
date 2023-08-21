
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import '../../assets/css/addproduct.css'; // Update the path to your CSS file
import axios from 'axios';

const AddProductPage = () => {
  // const history = useHistory();
  const [type, setType] = useState('Furniture'); // Default type
  const [skuId, setSkuId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [errors, setErrors] = useState({});

  const typeDescriptions = {
    Furniture: 'Please provide height, width, and length',
    weight: 'Please provide weight',
    size: 'Please provide size',
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  // const handleBackButtonClick = () => {
  //   history.goBack();
  // };
  
 

  // ...
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate input fields
    const newErrors = {};
    if (!skuId) newErrors.skuId = 'SKU ID is required';
    if (!name) newErrors.name = 'Name is required';
    if (!price) newErrors.price = 'Price is required';
    if (type === 'Furniture') {
      if (!height) newErrors.height = 'Height is required';
      if (!width) newErrors.width = 'Width is required';
      if (!length) newErrors.length = 'Length is required';
    }
    if (type === 'weight') {
      if (!weight) newErrors.weight = 'Weight is required';
    }
    if (type === 'size') {
      if (!size) newErrors.size = 'Size is required';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Prepare the data for the POST request
    let combinedDimensions = '';
    if (type === 'Furniture') {
      combinedDimensions = `${height} x ${width} x ${length}`;
    }
  
    const data = {
      sku_id: skuId,
      name,
      price,
      type,
      dimensions: combinedDimensions,
      ...(type === 'Book' && { weight }),
      ...(type === 'DISC' && { size }),
    };
  
  
    try {
      // Send the POST request using Axios
      const response = await axios.post('https://testapi.veluxpay.com/Bookme/addProduct', data);
        
      if (response.status === 200) {
        console.log(response);
        // Product added successfully, you can perform any additional actions here
        toast.success('Product added successfully', {
          autoClose: 10000,
          onClose: () => {
            // Reload the page after the toast is closed
            window.location.reload();
          }})
      } else {
        // Handle error cases
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="add-product-container">
      <header className='head'>
      <h2>Add Product</h2>
      <Link to="/">
            <button className="back-button">Cancel</button>
          </Link>
      </header>
      <form id='product_form' className="add-product-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="label" htmlFor="skuId">SKU</label>
          <input
            type="text"
            id="sku"
            name="skuId"
            className={`input ${errors.skuId ? 'error' : ''}`}
            onChange={(e) => setSkuId(e.target.value)}
          />
          {errors.skuId && <span className="error-message">{errors.skuId}</span>}
        </div>
        <div className="form-group">
          <label className="label" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`input ${errors.name ? 'error' : ''}`}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="label" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className={`input ${errors.price ? 'error' : ''}`}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>
        <div className="form-group">
          <label id='productType' className="label">Type</label>
          <div className="switch-container">
            <label className="switch-label">Furniture</label>
            <label className="switch">
              <input
                type="radio"
                className='Furniture'
                value="Furniture"
                checked={type === 'Furniture'}
                onChange={handleTypeChange}
              />
              <span className="slider" special={typeDescriptions.dimension}></span>
            </label>
            <label className="switch-label">Book</label>
            <label className="switch">
              <input
                type="radio"
                className='Book'
                value="Book"
                checked={type === 'Book'}
                onChange={handleTypeChange}
              />
              <span className="slider" special={typeDescriptions.weight}></span>
            </label>
            <label className="switch-label">DVD</label>
            <label className="switch">
              <input
                type="radio"
                className='DVD'
                value="DISC"
                checked={type === 'DISC'}
                onChange={handleTypeChange}
              />
              <span className="slider" special={typeDescriptions.size}></span>
            </label>
          </div>
        </div>
        {type === 'Furniture' && (
          <div>
            <div className="form-group">
              <label className="label" htmlFor="height">Height (CM)</label>
              <input
                type="text"
                id="height"
                name="height"
                className={`input ${errors.height ? 'error' : ''}`}
                // required={type === 'dimension'}
                onChange={(e) => setHeight(e.target.value)}
              />
              {errors.height && <span className="error-message">{errors.height}</span>}
            </div>
            <div className="form-group">
              <label className="label" htmlFor="width">Width (CM)</label>
              <input
                type="text"
                id="width"
                name="width"
                className={`input ${errors.width ? 'error' : ''}`}
                // required={type === 'dimension'}
                onChange={(e) => setWidth(e.target.value)}
              />
              {errors.width && <span className="error-message">{errors.width}</span>}
            </div>
            <div className="form-group">
              <label className="label" htmlFor="length">Length (CM)</label>
              <input
                type="text"
                id="length"
                name="length"
                className={`input ${errors.length ? 'error' : ''}`}
                // required={type === 'dimension'}
                onChange={(e) => setLength(e.target.value)}
              />
              {errors.length && <span className="error-message">{errors.length}</span>}
            </div>
          </div>
        )}
        {type === 'Book' && (
          <div className="form-group">
            <label className="label" htmlFor="weight">Weight (Kg)</label>
            <input
              type="text"
              id="weight"
              name="weight"
              className={`input ${errors.weight ? 'error' : ''}`}
              // required={type === 'weight'}
              onChange={(e) => setWeight(e.target.value)}
            />
            {errors.weight && <span className="error-message">{errors.weight}</span>}
          </div>
        )}
        {type === 'DISC' && (
          <div className="form-group">
            <label className="label" htmlFor="size">Size</label>
            <input
              type="text"
              id="size"
              name="size"
              className={`input ${errors.size ? 'error' : ''}`}
              // required={type === 'size'}
              onChange={(e) => setSize(e.target.value)}
            />
            {errors.size && <span className="error-message">{errors.size}</span>}
          </div>
        )}
        <div className="form-group">
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
