import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOrderModal from "../components/AddOrderModal";
import EditOrderModal from "../components/EditOrderModal";

const orders = () => {
  const [orders, setorderss] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/orders", {
          cancelToken: ourRequest.token,
        });
        setorderss(response.data);
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
        <AddOrderModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOrderModal
          editOrder={editOrder}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className=" flex items-center justify-center bg-gradient-to-r from-lime-500 via-green-500 to-lime-500 w-full h-15 p-8 ">
        <h1 className="text-white font-bold text-4xl">Orders</h1>
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
              onClick={() => navigate("/orderdetails")}
              className="bg-gradient-to-r from-green-500 to bg-lime-500 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded ml-2"
            >
              Go to Order Details
            </button>
            </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-green-500 to bg-lime-500 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-outfont-semibold py-2 px-4 rounded"
          >
            + Add
          </button>
        </div>

        <table
          cellPadding={10}
          className=" text-centerh-auto w-full border  border-black"
        >
          <thead className="h-[20px] min-h-[1em] w-px self-stretch border border-black bg-gradient-to-tr from-lime-500 via-lime-400 to-lime-500 dark:opacity-100">
            <tr>
              <th className="py-3 px-10">Order Number</th>
              <th className="py-3 px-10">Order Date</th>
              <th className="py-3 px-10">Required Date</th>
              <th className="py-3 px-10">Shipped Date</th>
              <th className="py-3 px-10">Status</th>
              <th className="py-3 px-10">Comments</th>
              <th className="py-3 px-10">Customer Number</th>
              <th className="py-3 px-10">Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch bg-gradient-to-tr from-lime-300 via-lime-200 to-lime-300">
            {orders.map((orders: any) => (
              <tr key={orders.orderNumber}>
                <td className="py-3 px-6 border-black border">{orders.orderNumber}</td>
                <td className="py-3 px-6 border border-black">{orders.orderDate}</td>
                <td className="py-3 px-6 border border-black">{orders.requiredDate}</td>
                <td className="py-3 px-6 border border-black">{orders.shippedDate}</td>
                <td className="py-3 px-6 border border-black">{orders.status}</td>
                <td className="py-3 px-6 border border-black">{orders.comments}</td>
                <td className="py-3 px-6 border border-black">{orders.customerNumber}</td>
                <td className="border border-black">
                  <button
                    onClick={async () => {
                      setEditOrder({
                        orderNumber: orders.orderNumber,
                        orderDate: orders.orderDate,
                        requiredDate: orders.requiredDate,
                        shippedDate: orders.shippedDate,
                        status: orders.status,
                        comments: orders.comments,
                        customerNumber: orders.customerNumber,
                      });
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-gradient-to-r from-lime-600 via-lime-300 to bg-lime-600 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded ml-7"
                  >
                    &#9998;
                  </button>
                  {/* <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `orders/${orders.orderNumber}`
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
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default orders;