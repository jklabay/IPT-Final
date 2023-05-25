import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";

import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import Office from "./pages/Office";
import Product from "./pages/Product";
import Inventory from "./pages/Inventory";
import ProductLine from "./pages/Productline";
import Order from "./pages/Order";
import Orderdetails from "./pages/Orderdetails";
import Payment from "./pages/Payment";

Axios.defaults.baseURL = "http://localhost:4000";

function App() {
  // const [user, setUser] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/office" element={<Office />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/product" element={<Product />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/productline" element={<ProductLine />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/orderdetails" element = {<Orderdetails/>}/>
          <Route path="/payments" element = {<Payment/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
