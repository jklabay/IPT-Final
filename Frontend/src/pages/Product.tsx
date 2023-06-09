import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/products", {
          cancelToken: ourRequest.token,
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();

    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range of the currently displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {showModal && (
        <AddProductModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditProductModal
          editProduct={editProduct}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-green-600 to-yellow-300">
        <h1 className="text-white font-bold text-5xl  flex justify-center">Product Management</h1>
      </div>
      <div className=" container md:mx-auto mt-8 mb-5">
        <div className=" text-right mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-lime-400 via-green-600 to bg-lime-400 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
          >
            Homepage
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-lime-400 via-green-600 to bg-lime-400 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded ml-3"
          >
            + Add
          </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center  h-auto w-full border  border-black"
        >
          <thead className=" text-white bg-gradient-to-r from-green-600 to-yellow-300 border border-black">
            <tr>
              <th className="py-2 px-4">Product Code</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Product Line</th>
              <th className="py-2 px-4">Product Scale</th>
              <th className="py-2 px-4">Product Vendor</th>
              <th className="py-2 px-4">Product Description</th>
              <th className="py-2 px-4">Quantity In Stock</th>
              <th className="py-2 px-4">Buy Price</th>
              <th className="py-2 px-4">MSRP</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border border-black">
            {currentItems.map((product: any) => (
              <tr key={product.productCode} className="border-b border-gray-400">
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productCode}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productName}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productLine}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productScale}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productVendor}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productDescription}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.quantityInStock}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.buyPrice}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.MSRP}
                </td>
                <td className="italic hover:not-italic 0 py-8 p-6 border border-black">
                  <div className="flex">
                    <button
                      onClick={() => {
                        setEditProduct(product);
                        setShowEditModal(true);
                      }}
                      className="m-6 my-2 bg-gradient-to-r from-lime-400 via-green-600 to bg-lime-400 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
                    >
                      &#9998;
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const response = await Axios.delete(
                            `products/${product.productCode}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      className="m-6 my-2 bg-gradient-to-r from-lime-400 via-green-600 to bg-lime-400 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
                    >
                      &times;
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center"> 
            <ul className="flex">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link  text-white py-2 px-4 cursor-pointer transition-all duration-300 bg-green-500"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </>
  );
};

export default Product;
