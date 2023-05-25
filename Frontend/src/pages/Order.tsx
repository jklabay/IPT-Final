import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOrderModal from "../components/AddOrderModal";
import EditOrderModal from "../components/EditOrderModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchOrders = async () => {
      try {
        const response = await Axios.get("/orders", {
          cancelToken: ourRequest.token,
        });
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

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
      <div className="flex items-center justify-center bg-gradient-to-r from-lime-500 via-green-500 to-lime-500 w-full h-15 p-8">
        <h1 className="text-white font-bold text-4xl">Orders</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6">
        <div className="text-right mb-6">
          <div className="text-left mb-6">
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

        <table className="text-center h-auto w-full border border-black">
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
            {currentItems.map((order: any) => (
              <tr key={order.orderNumber}>
                <td className="py-3 px-6 border border-black">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.orderDate}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.requiredDate}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.shippedDate}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.status}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.comments}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.customerNumber}
                </td>
                <td className="border border-black">
                  <button
                    onClick={async () => {
                      setEditOrder(order);
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
                            `orders/${order.orderNumber}`
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

export default Orders;
