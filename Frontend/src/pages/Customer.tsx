import {useState, useEffect} from "react";
import Axios from "axios";
import AddModal from "../components/addmodal";
import EditModal from "../components/editmodal";

const employees = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<any>({});
  const [reload, setReload] = useState(0);

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
        <AddModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditModal
          editUser={editUser}
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
        </div>
        <div className="flex justify-center">
        <table className="text-center w-full border border-black">
          <thead className="bg-green-500">
            <tr>
              <th className="py-2 px-4 text-white">Customer Number</th>
              <th className="py-2 px-4 text-white">Customer Name</th>
              <th className="py-2 px-4 text-white">Contact Last Name</th>
              <th className="py-2 px-4 text-white">Contact First Name</th>
              <th className="py-2 px-4 text-white">Phone</th>
              <th className="py-2 px-4 text-white">Address Line 1</th>
              <th className="py-2 px-4 text-white">Address Line 2</th>
              <th className="py-2 px-4 text-white">City</th>
              <th className="py-2 px-4 text-white">State</th>
              <th className="py-2 px-4 text-white">Postal Code</th>
              <th className="py-2 px-4 text-white">Country</th>
              <th className="py-2 px-4 text-white">Sales Rep Employee Number</th>
              <th className="py-2 px-4 text-white">Credit Limit</th>
              <th className="bg-green-500"></th>
              <th className="bg-green-500"></th>
            </tr>
          </thead>
          <tbody>
    {customers.map((customers: any) => (
      <tr key={customers.customerNumber}>
        <td className="py-2 px-4">{customers.customerNumber}</td>
        <td className="py-2 px-4">{customers.customerName}</td>
        <td className="py-2 px-4">{customers.contactLastName}</td>
        <td className="py-2 px-4">{customers.contactFirstName}</td>
        <td className="py-2 px-4">{customers.phone}</td>
        <td className="py-2 px-4">{customers.addressLine1}</td>
        <td className="py-2 px-4">{customers.addressLine2}</td>
        <td className="py-2 px-4">{customers.city}</td>
        <td className="py-2 px-4">{customers.state}</td>
        <td className="py-2 px-4">{customers.postalCode}</td>
        <td className="py-2 px-4">{customers.country}</td>
        <td className="py-2 px-4">{customers.salesRepEmployeeNumber}</td>
        <td className="py-2 px-4">{customers.creditLimit}</td>
        <td className="py-2 px-4"></td>
        <td className="py-2 px-4">
        {/* <button
          onClick={async () => {
            setEditUser({
            customerNumber = customers.customerNumber,
            customerName =  customers.customerName,
            contactLastName = customers.contactLastName,
            contactFirstName = customers.contactFirstName,
            phone =customers.phone,
            addressLine1 = customers.addressLine1,
            addressLine2 = customers.addressLine2,
            city = customers.city,
            state = customers.state,
            postalCode = customers.postalCode,
            country = customers.country,
            salesRepEmployeeNumber = customers.salesRepEmployeeNumber,
            creditLimit = customers.creditLimit,
            });
            setShowEditModal(true);
          }}
          className="mr-4 bg-blue-500 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
        > */}
            {/* &#9998;
          </button> */}
          <button
            onClick={async () => {
              try {
                const result = confirm("Want to delete?");
                if (result) {
                  const response = await Axios.delete(
                    `customers/${customers.customerNumber}`
                  );
                  console.log(response.data);
                  setReload((prev) => prev + 1);
                }
              } catch (e) {
                console.log(e);
              }
            }}
            className="bg-red-500 hover:bg-red-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
          >
            &times;
          </button>
        </td>
      </tr>
    ))}

          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default employees;
