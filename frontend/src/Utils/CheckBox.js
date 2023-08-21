import React from "react";

const CheckBox = ({handleCheckboxClick, item }) => {
  return (
    <div id="delete_products">
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        onClick={() => handleCheckboxClick(item.id)}
        className="delete-checkbox"
      />
    </div>
  );
};

export default CheckBox;
