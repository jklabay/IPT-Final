import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOfficeModal from "../components/AddOfficeModal";
import EditOfficeModal from "../components/EditOfficeModal";

const office = () => {
  const [office, setOffices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOffice, setEditOffice] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/offices", {
          cancelToken: ourRequest.token,
        });
        setOffices(response.data);
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
        <AddOfficeModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOfficeModal
          editOffice={editOffice}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-green-400 w-full h-14 p-8 items-center flex">
        <h1 className="text-white font-bold text-4xl">Offices</h1>
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
              onClick={() => navigate("/employee")}
              className="bg-gradient-to-r from-lime-400 to bg-green-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded ml-2"
            >
              Go to Employee
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
          <thead className="bg-green-500 border border-black">
            <tr>
              <th>Office Code</th>
              <th>City</th>
              <th>Phone</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>State</th>
              <th>Country</th>
              <th>Postal Code</th>
              <th>Territory</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-lime-300 to-transparent opacity-20 dark:opacity-100">
            {office.map((office: any) => (
              <tr key={office.officeCode}>
                <td>{office.officeCode}</td>
                <td>{office.city}</td>
                <td>{office.phone}</td>
                <td>{office.addressLine1}</td>
                <td>{office.addressLine2}</td>
                <td>{office.state}</td>
                <td>{office.country}</td>
                <td>{office.postalCode}</td>
                <td>{office.territory}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditOffice({
                        officeCode: office.officeCode,
                        phone: office.phone,
                        city: office.city,
                        addressLine1: office.addressLine1,
                        addressLine2: office.addressLine2,
                        state: office.state,
                        country: office.country,
                        postalCode: office.postalCode,
                        territory: office.territory,
                      });
                      setShowEditModal(true);
                    }}
                    className="m-6 bg-green-500 hover:bg-green-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  {/* <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `offices/${office.officeCode}`
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

export default office;