import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddPaymentModal from "../components/AddPaymentModal";
import EditPaymentModal from "../components/EditPaymentModal";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIventory, setEditPayment] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/payments", {
          cancelToken: ourRequest.token,
        });
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range of the currently displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = payments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
      {showModal && (
        <AddPaymentModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditPaymentModal
          editUser={editIventory}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-green-400 w-full h-14 p-8 items-center flex">
      <h1 className="text-white font-bold text-2xl">
          Payment
        </h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-right mb-8">
        <div className=" text-left mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/customer")}
              className="bg-gradient-to-r from-lime-400 via-green-600 to bg-lime-400 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
            >
              Go to Customer
            </button>
          </div> 
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
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
              <th className="py-2 px-4">Customer Number</th>
              <th className="py-2 px-4">Check Number</th>
              <th className="py-2 px-4">Payment Date</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-lime-300 to-transparent opacity-20 dark:opacity-100">
            {currentItems.map((payments: any) => (
              <>
                <tr key={payments.customerNumber}>
                  <td>{payments.customerNumber}</td>
                  <td>{payments.checkNumber}</td>
                  <td>{payments.paymentDate}</td>
                  <td>{payments.amount}</td>
                  <td>
                    <button
                      onClick={async () => {
                        setEditPayment({
                          customerNumber: payments.customerNumber,
                          checkNumber: payments.checkNumber,
                          paymentDate: payments.paymentDate,
                          amount: payments.amount,

                        });
                        setShowEditModal(true);
                      }}
                      className="m-6 bg-blue-400 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      &#9998;
                    </button>
                    {/* <button
                      onClick={async () => {
                        try {
                          var result = confirm("Want to delete?");
                          if (result) {
                            const response = await Axios.delete(
                              `invetories/${inventory.productCode}`
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
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
          <ul className="flex">
            {/* Generate pagination buttons */}
            {Array.from(Array(totalPages), (_, index) => index + 1).map((number) => (
              <li
                key={number}
                className={`${
                  number === currentPage ? "bg-green-500" : "bg-gray-200"
                } text-white py-2 px-4 cursor-pointer transition-all duration-300`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
    </>
  );
};
export default Payment;