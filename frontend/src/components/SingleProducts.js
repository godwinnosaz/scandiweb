import React from "react";
import classes from "./SingleProducts.module.css";

const SingleProducts = ({ item, handleCheckboxClick }) => {
  return (
    <div key={item.id} className={classes.card}>
      <div id="delete_products">
        <input
          type="checkbox"
          id={`checkbox-${item.id}`}
          name="checkbox"
          // checked={isSelected}
          onClick={() => handleCheckboxClick(item.id)}
          className="delete-checkbox"
        />
      </div>
      <div className={classes["card_item"]}>
        <h3>#{item.sku_id}</h3>
        <h3>{item.name}</h3>
        <h3>{item.price}.00$</h3>
        {item.size !== '' && <h3> size: {item.size} mb</h3>}
        {item.dimension !== '' && <h3> Dimension: {item.dimension}</h3>}
        {item.weight !== '' && <h3> Weight: {item.weight} kg</h3>}
      </div>
    </div>
  );
};



export default SingleProducts;
