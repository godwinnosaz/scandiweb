import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
