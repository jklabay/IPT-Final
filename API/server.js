require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("_middleware/error-handler");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// api routes
app.use("/employees", require("./employees/employee.controller"));
app.use("/offices", require("./offices/office.controller"));
app.use("/customers", require("./customers/customers.controller"));
app.use("/products", require("./products/product.controller"));
app.use("/productlines", require("./productlines/productlines.controller"));
app.use("/payments", require("./payments/payment.controller"));
app.use("/orders", require("./orders/orders.controller"));
app.use("/orderdetails", require("./orderdetails/orderdetails.controller"));
app.use("/inventories", require("./inventories/inventory.controller"));

// app.use("/customers", require("./COandODM/customerorders.controller"));
// app.use("/orderdetails", require("./COandODM/customerorders.controller"));
// app.use("/orders", require("./COandODM/customerorders.controller"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000; 
app.listen(port, () => console.log("Server listening on port " + port));