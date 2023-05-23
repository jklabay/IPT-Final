import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddProductModal from "../components/AddProductLineModal";
import EditProductModal from "../components/EditProductLineModal";

const ProductLine = () => {
  const [productLines, setProductLines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductLine, setEditProductLine] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/productlines", {
          cancelToken: ourRequest.token,
        });
        setProductLines(response.data);
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
          editProductLine={editProductLine}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-green-400 w-full h-14 p-8 items-center flex">
        <h1 className="text-white font-bold text-3xl">ProductLine Management</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-right mb-6">
        <div className=" text-left mb-6">
        <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/product")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded ml-2"
            >
              Go to Product 
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded"
          >
            + Add
          </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="bg-green-500">
            <tr>
              <th className="py-2 px-4">Product Line</th>
              <th className="py-2 px-4">Text Description </th>
              <th className="py-2 px-4">Html Description</th>
              <th className="py-2 px-4">Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-lime-300 to-transparent opacity-20 dark:opacity-100">
            {productLines.map((productLines: any, index: number) => (
              <>
                <tr key={productLines.productLine}>
                  <td>{productLines.productLine}</td>
                  <td>{productLines.textDescription}</td>
                  <td>{productLines.htmlDescription}</td>
                  <td>{productLines.image}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditProductLine({
                          productLine: productLines.productLine,
                          textDescription: productLines.textDescription,
                          htmlDescription: productLines.htmlDescription,
                          image: productLines.image,
                        });
                        setShowEditModal(true);
                      }}
                      className="m-6 bg-blue-400 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      &#9998;
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          var result = confirm("Want to delete?");
                          if (result) {
                            const response = await Axios.delete(
                              `productlines/${productLines.productLine}`
                            );
                            console.log(response.data);
                            setReload((prev) => prev + 1);
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      className="bg-red-400 hover:bg-red-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
                {index !== productLines.length - 1 && (
                  <tr className="spacing-row">
                    <td colSpan={11} className="h-4">
                      <hr className="border-gray-400" />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductLine;