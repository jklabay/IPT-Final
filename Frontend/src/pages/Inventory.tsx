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
      <div className="h-14 bg-gradient-to-r from-green-600 to-yellow-300  w-full p-8 items-center flex">
        <h1 className="text-white font-bold text-3xl">Inventory and Return Management</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
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
        <table
         // cellPadding={10}
         // className=" text-center h-auto w-full border  border-black"
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="border border-black">  
            <tr>
              <th className="py-2 px-4">Inventory ID</th>
              <th className="py-2 px-4">Country</th>
              <th className="py-2 px-4">Office Address</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Quantity Available</th>
              <th className="py-2 px-4">Last Updated</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory: any, index: number) => (
              <>
              <tr key={inventory.inventoryId}>
            
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.inventoryId}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.country}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.officeAddress}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.productName}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.quantityAvailable}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.lastUpdated}</td>
                <td className="italic hover:not-italic  py-8 p-6 border border-black">
                  <button
                    onClick={async () => {
                      setEditInventory({
                        inventoryId: inventory.inventoryId,
                        country: inventory.country,
                        officeAddress: inventory.officeAddress,
                        productName: inventory.productName,
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
                            `inventories/${inventory.inventoryId}`
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
                    <td colSpan={7}>
                  
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