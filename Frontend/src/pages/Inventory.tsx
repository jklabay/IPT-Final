import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddModal from "../components/AddInventoryModal";
import EditModal from "../components/EditInventoryModal";


const Inventory = () => {
  const [inventories, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInventory, setEditInventory] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/inventories", {
          cancelToken: ourRequest.token,
        });
        setInventory(response.data);
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
          editInventory={editInventory}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-blue-500 w-full h-14 p-8 items-center flex">
        <h1 className="text-white font-bold text-3xl">Inventory and Return Management</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
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
        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
            <tr>
              <th>Inventory ID</th>
              <th>Country</th>
              <th>Office Address</th>
              <th>Product Name</th>
              <th>Quantity Available</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className = "h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
            {inventories.map((inventory: any, index: number) => (
              <>
              <tr key={inventory.inventoryId}>
                <td>{inventory.inventoryId}</td>
                <td>{inventory.country}</td>
                <td>{inventory.officeAddress}</td>
                <td>{inventory.productName}</td>
                <td>{inventory.quantityAvailable}</td>
                <td>{inventory.lastUpdated}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditInventory({
                        officeCode: inventory.officeCode,
                        productCode: inventory.productCode,
                        quantityAvailable: inventory.quantityAvailable,
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
                            `invetories/${inventory.inventoryId}`
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
              {index !== inventories.length - 1 && (
                  <tr className="spacing-row">
                    <td colSpan={7} className="h-7">
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

export default Inventory;