import {useState, useEffect} from "react";
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
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
          >
            + Add
          </button>
          <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-neutral-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
        >
          Back
        </button>
        </div>
        <div className="flex justify-center">
        <table className="text-center w-full border border-black">
          <thead className="bg-green-500">
            <tr>
              <th className="py-2 px-4 text-white border-double">Customer Number</th>
              <th className="py-2 px-4 text-white border-double">Customer Name</th>
              <th className="py-2 px-4 text-white border-double">Contact Last Name</th>
              <th className="py-2 px-4 text-white border-double">Contact First Name</th>
              <th className="py-2 px-4 text-white border-double">Phone</th>
              <th className="py-2 px-4 text-white border-double">Address Line 1</th>
              <th className="py-2 px-4 text-white border-double">Address Line 2</th>
              <th className="py-2 px-4 text-white border-double">City</th>
              <th className="py-2 px-4 text-white border-double">State</th>
              <th className="py-2 px-4 text-white border-double">Postal Code</th>
              <th className="py-2 px-4 text-white border-double">Country</th>
              <th className="py-2 px-4 text-white border-double">Sales Rep Employee Number</th>
              <th className="py-2 px-4 text-white border-double">Credit Limit</th>
              <th className="bg-green-500"></th>
              <th className="bg-green-500"></th>
            </tr>
          </thead>
          <tbody>
    {customers.map((customer: any) => (
      <>
      <tr key={customer.customerNumber}>
        <td className="border-double">{customer.customerNumber}</td>
        <td className="border-double">{customer.customerName}</td>
        <td className="border-double">{customer.contactLastName}</td>
        <td className="border-double">{customer.contactFirstName}</td>
        <td className="border-double">{customer.phone}</td>
        <td className="border-double">{customer.addressLine1}</td>
        <td className="border-double">{customer.addressLine2}</td>
        <td className="border-double">{customer.city}</td>
        <td className="border-double">{customer.state}</td>
        <td className="border-double">{customer.postalCode}</td>
        <td className="border-double">{customer.country}</td>
        <td className="border-double"> {customer.salesRepEmployeeNumber}</td>
        <td >{customer.creditLimit}</td>
        <td></td>
        <td>
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
        </td>
      </tr>
      </>
    ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default Customer;
