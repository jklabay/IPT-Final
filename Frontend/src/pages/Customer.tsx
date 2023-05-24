import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<any>({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/customers", {
          cancelToken: ourRequest.token,
        });
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range of the currently displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {showModal && (
        <AddCustomerModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditCustomerModal
        editCustomer={editCustomer}
        setReload={setReload}
        setShowEditModal={setShowEditModal}
      />
      )}
      <div className="bg-green-400 w-full h-14 p-8 items-center flex">
        <h1 className="text-white font-bold text-2xl">Customers Management</h1>
      </div>
      <div className="container mx-auto mt-6">
        <div className=" text-right mb-6">
        <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded"
            >
              Homepage
            </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-lime-400 to bg-green-500  text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold py-2 px-4 rounded ml-3"
          >
            + Add
          </button>
          
        </div>
        <div className="flex justify-center">
        <table className="text-center h-auto w-full border border-black">
          <thead className="bg-green-500 border border-black">
            <tr>
              <th className="py-1 px-2 text-white border-double">Customer Number</th>
              <th className="py-1 px-2 text-white border-double">Customer Name</th>
              <th className="py-1 px-2 text-white border-double">Contact Last Name</th>
              <th className="py-1 px-2 text-white border-double">Contact First Name</th>
              <th className="py-1 px-2 text-white border-double">Phone</th>
              <th className="py-1 px-2 text-white border-double">Address Line 1</th>
              <th className="py-1 px-2 text-white border-double">Address Line 2</th>
              <th className="py-1 px-2 text-white border-double">City</th>
              <th className="py-1 px-2 text-white border-double">State</th>
              <th className="py-1 px-2 text-white border-double">Postal Code</th>
              <th className="py-1 px-2 text-white border-double">Country</th>
              <th className="py-1 px-2 text-white border-double">Sales Rep Employee Number</th>
              <th className="py-1 px-2 text-white border-double">Credit Limit</th>
              <th className="bg-green-500 py-2 px-2"></th>
              <th className="bg-green-500 py-2 px-2"></th>
            </tr>
          </thead>
          <tbody className="border border-black">
    {customers.map((customer: any) => (
      <>
      <tr key={customer.customerNumber} className="border-b border-gray-400">
        <td className="border-double italic hover:not-italic  border border-black">{customer.customerNumber}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.customerName}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.contactLastName}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.contactFirstName}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.phone}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.addressLine1}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.addressLine2}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.city}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.state}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.postalCode}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.country}</td>
        <td className="border-double italic hover:not-italic  border border-black"> {customer.salesRepEmployeeNumber}</td>
        <td className="border-double italic hover:not-italic  border border-black">{customer.creditLimit}</td>
        <td className="py-2">
          <div className="flex items-center">
         <button
          onClick={async () => {
            setEditCustomer({
              customerNumber: customer.customerNumber,
              customerName: customer.customerName,
              contactLastName: customer.contactLastName,
              contactFirstName: customer.contactFirstName,
              phone: customer.phone,
              addressLine1: customer.addressLine1,
              addressLine2: customer.addressLine2,
              city: customer.city,
              state: customer.state,
              postalCode: customer.postalCode,
              country: customer.country,
              salesRepEmployeeNumber: customer.salesRepEmployeeNumber,
              creditLimit: customer.creditLimit,
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
                const result = confirm("Want to delete?");
                if (result) {
                  const response = await Axios.delete(
                    `customers/${customer.customerNumber}`
                  );
                  console.log(response.data);
                  setReload((prev) => prev + 1);
                }
              } catch (e) {
                console.log(e);
              }
            }}
            className=" bg-red-500 hover:bg-red-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
          >
            &times;
          </button>
          </div>
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
            {customers.map((_, index) => (
              <li
                key={index}
                className={`${
                  index + 1 === currentPage ? "bg-green-500" : "bg-gray-200"
                } text-white py-2 px-4 cursor-pointer transition-all duration-300`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Customer;
