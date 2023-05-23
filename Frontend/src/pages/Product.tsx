import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

const Product = () => {
  const [products, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/products", {
          cancelToken: ourRequest.token,
        });
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

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
            onClick={() => setShowModal(true)}
            className="bg-green-500 rounded-full p-2 px-5 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
          >
            + Add
          </button>
          <button
          onClick={() => navigate("/")}
          className="bg-green-500 rounded-full p-2 px-5 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl ml-2"
        >
          Back
        </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center  h-auto w-full border  border-black"
        >
          <thead className=" text-white bg-gradient-to-r from-green-600 to-yellow-300 border border-black">
            <tr>
              <th className="py-2 px-4">Product Code</th>
              <th className="py-2 px-4">Product Name </th>
              <th className="py-2 px-4">Product Line</th>
              <th className="py-2 px-4">Product Scale</th>
              <th className="py-2 px-4">Product Vendor</th>
              <th className="py-2 px-4">Product Description </th>
              <th className="py-2 px-4">Quantity In Stock</th>
              <th className="py-2 px-4">Buy Price</th>
              <th className="py-2 px-4">MSRP</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border border-black">
            {products.map((product: any) => (
              <tr key={Math.random()} className="border-b border-gray-400">
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{product.productCode}</td>
                <td className=" italic hover:not-italic  py-4 p-4 border border-black">{product.productName}</td>
                <td className="italic hover:not-italic   py-4 p-4 border border-black">{product.productLine}</td>
                <td className=" italic hover:not-italic  py-4 p-4 border border-black">{product.productScale}</td>
                <td className="italic hover:not-italic   py-4 p-4 border border-black">{product.productVendor}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{product.productDescription}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{product.quantityInStock}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{product.buyPrice}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{product.MSRP}</td>
                
                <td className="italic hover:not-italic 0 py-8 p-6 border border-black" >
                  <div className="flex">
                  <button
                    onClick={async () => {
                      setEditProduct({
                        productCode: product.productCode,
                        productName: product.productName,
                        productLine: product.productLine,
                        productScale: product.productScale,
                        productVendor: product.productVendor,
                        productDescription: product.productDescription,
                        quantityInStock: product.quantityInStock,
                        buyPrice: product.buyPrice,
                        MSRP: product.MSRP,
                      });
                      setShowEditModal(true);
                    }}
                    className="m-6 my-2 bg-yellow-300 hover:bg-green-600  duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
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
                    className=" m-6 my-2 bg-green-600 hover:bg-yellow-300 duration-500 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &times;
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Product;
