import React, { useState, useEffect } from "react";
import classes from "./Products.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleProducts from "./SingleProducts";

const Products = () => {
  const [products, SetProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(
        // "http://Localhost/Project/Backend/API/View.php"
        "https://testapi.veluxpay.com/Bookme/getProduct"
      );
      const data = response.data;
      SetProducts(data);
    };
    loadProducts();
  }, []);

  // delete products function
  // const deleteProducts = async () => {
  //   await axios.post(
  //     // "http://Localhost/Project/Backend/API/Delete.php",
  //     "https://testapi.veluxpay.com/Bookme/deleteProduct",
  //     {
  //       checkbox: selected,
  //     }
  //   );
  // };
  const deleteProducts = () => {
    
    const formData = new FormData();
    selectedItems.forEach((productId) => {
        formData.append('product_id', productId);
  
      axios
        .post('https://testapi.veluxpay.com/Bookme/deleteProduct',formData )
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(`Error deleting item with ID ${productId}:`, error);
        });
    });
    setSelectedItems([]);
    window.location.reload();
  };

  // handle Delete functionality
  // const formSubmitHandler = (e) => {
  //   e.preventDefault();
  //   deleteProducts();
    
  // };

  // to handle checkbox function
  const handleCheckboxClick = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };
  //
  const allProducts = products.map((item, i) => {
    return (
      <SingleProducts
      item={item}
        
        handleCheckboxClick={handleCheckboxClick}
        key={item.id}
      />
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1> Product List</h1>
        <div className={classes["actions_button"]}>
          <Link to="/addproduct">
            <button className={classes["add_button"]}>ADD</button>
          </Link>
          <button
            className={classes["delete_button"]}
            form="delete_products"
            id="delete-product-btn"
            onClick={deleteProducts}
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <hr />

      <div className={classes["product_lists"]}>{allProducts}</div>
    </div>
  );
};

export default Products;
