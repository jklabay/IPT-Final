import { useState, useEffect } from "react";
import Axios from "axios";
import AddModal from "../components/addmodal";
import EditModal from "../components/editmodal";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<any>({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchEmployees = async () => {
      try {
        const response = await Axios.get("/employees", {
          cancelToken: ourRequest.token,
        });
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();

    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range of the currently displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
      <div className="h-20 flex items-center justify-center bg-gradient-to-r from-slate-400 to-lime-500">
        <h1 className="text-white font-bold text-2xl">Employees Management</h1>
      </div>
      <div className="container mx-auto mt-6">
        <div className="text-right mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-lime-400 to bg-green-500 hover:bg-green-800 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded flex justify-right"
          >
            Homepage
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-lime-400 to bg-green-500 hover:bg-green-800 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded ml-3"
          >
            + Add
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-600 hover:bg-green-300 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded ml-2"
          >
            Back
          </button>
        </div>

        <table className="text-center h-auto w-full border border-black">
          <thead className="border border-black">
            <tr>
              <th>Employee Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee: any) => (
              <tr key={employee.employeeNumber}>
                <td>{employee.employeeNumber}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.jobTitle}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditUser(employee);
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-green-400 hover:bg-slate-400 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const result = window.confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `employees/${employee.employeeNumber}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="bg-red-400 hover:bg-slate-400 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>
    </>
  );
};

export default Employees;
