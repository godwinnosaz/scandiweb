import React, { useState } from "react";
import classes from "./AddProduct.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const history = useNavigate();
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");

  // save products
  let combinedDimensions = '';
  if (type === 'Furniture') {
    combinedDimensions = `${height} x ${width} x ${length}`;
  }
  const saveProducts = async () => {
   

    const response = await axios.post(
      // "http://Localhost/Project/Backend/API/Insert.php",
      "https://testapi.veluxpay.com/Bookme/addProduct",
      {
        sku_id: sku,
        name: name,
        price: price,
        type: type,
        dimensions: combinedDimensions,
        ...(type === 'Book' && { weight }),
        ...(type === 'DVD' && { size }),
      }
    );
    if (response.data === "sku already used") {
      setError(true);
    } else {
      history("/");
    }
  };

  // handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProducts();
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1> Product Add</h1>
        <div className={classes.actionsButton}>
          <button type="submit" form="product_form">
            Save
          </button>
          <Link to="/">
            <button className={classes.cancelButton}>Cancel</button>
          </Link>
        </div>
      </div>
      <hr />

      {/* form */}

      {/* <----- form starts here ---> */}
      <form action="" method="post" id="product_form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            placeholder="#sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
          {error ? (
            <span className={classes.error}> Sku value must be unique </span>
          ) : (
            <p></p>
          )}
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="#name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="">Price ($)</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            placeholder="#price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* select */}
        <div className={classes["type_switcher"]}>
          <label htmlFor="">Type Switcher</label>
          <select
            name="type"
            id="productType"
            onChange={(e) => setType(e.target.value)}
            value={type}
            required
          >
            <option value="">Type Switcher</option>
            <option name="Furniture" value="Furniture">
              Furniture
            </option>
            <option name="Book" value="Book">
              Book
            </option>
            <option name="DVD" value="DVD">
              DVD
            </option>
          </select>
        </div>

        {type === "DVD" && (
          <div>
            <label htmlFor="size">Size (MB)</label>
            <input
              type="number"
              name="size"
              id="size"
              value={size}
              required
              placeholder="#size"
              onChange={(e) => setSize(e.target.value)}
            />
            <span> Please provide size</span>
          </div>
        )}

        {type === "Furniture" && (
          <div>
            <div>
              <label htmlFor="height">Height (CM)</label>
              <input
                type="number"
                name="height"
                id="height"
                value={height}
                required
                placeholder="#height"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Width(CM)</label>
              <input
                type="number"
                name="width"
                value={width}
                id="width"
                required
                onChange={(e) => setWidth(e.target.value)}
                placeholder="#width"
              />
            </div>
            <div>
              <label htmlFor="">Length (CM)</label>
              <input
                type="number"
                name="length"
                id="length"
                value={length}
                required
                placeholder="#length"
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <span> Please provide Dimensions</span>
          </div>
        )}

        {/* weight */}

        {type === "Book" && (
          <div>
            <label htmlFor="">Weight (KG)</label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={weight}
              required
              placeholder="#weight"
              onChange={(e) => setWeight(e.target.value)}
            />
            <span> Please provide weight</span>
          </div>
        )}
      </form>

      {/* <----- form Ends here ---> */}
    </div>
  );
};

export default AddProduct;
