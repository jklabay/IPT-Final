import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOrderdetailsModal from "../components/AddOrderdetailsModal";
import EditOrderdetailsModal from "../components/EditOrderdetailsModal";

const orderdetails = () => {
  const [orderdetails, setorderdetailss] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrderdetails, setEditOrder] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/orderdetails", {
          cancelToken: ourRequest.token,
        });
        setorderdetailss(response.data);
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
        <AddOrderdetailsModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOrderdetailsModal
          editOrderdetails={editOrderdetails}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className=" bg-gradient-to-r from-lime-600 via-lime-300 to bg-lime-600 w-full h-15 p-8">
        <h1 className="text-white  font-bold text-4xl flex justify-center">Order Details</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6 ">
        <div className=" text-right mb-6">
        <div className=" text-left mb-6">
        <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded ml-2"
            >
              Go to Orders
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
          <thead className="h-[20px] min-h-[1em] w-px self-stretch border border-black bg-gradient-to-tr from-lime-500 via-lime-400 to-lime-500 dark:opacity-100">
            <tr>
              <th className="py-3 px-10">Order Number</th>
              <th className="py-3 px-10">Product Code</th>
              <th className="py-3 px-10">Quantity Ordered</th>
              <th className="py-3 px-10">Price Each</th>
              <th className="py-3 px-10">Order Line Number</th>
              <th className="py-3 px-10">Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px  bg-gradient-to-tr from-lime-300 via-yellow-300 to-lime-300">
            {orderdetails.map((orderdetails: any) => (
              <tr key={orderdetails.orderNumber}>
                <td className="py-3 px-6">{orderdetails.orderNumber}</td>
                <td className="py-3 px-6">{orderdetails.productCode}</td>
                <td className="py-3 px-6">{orderdetails.quantityOrdered}</td>
                <td className="py-3 px-6">{orderdetails.priceEach}</td>
                <td className="py-3 px-6">{orderdetails.orderLineNumber}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditOrder({
                        orderNumber: orderdetails.orderNumber,
                        productCode: orderdetails.productCode,
                        quantityOrdered: orderdetails.quantityOrdered,
                        priceEach: orderdetails.priceEach,
                        orderLineNumber: orderdetails.orderLineNumber,
                      });
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-gradient-to-r from-lime-600 via-lime-300 to bg-lime-600 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `orderdetails/${orderdetails.orderNumber}`
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default orderdetails;