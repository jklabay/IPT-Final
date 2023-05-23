import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddInventoryModal = ({ setShowModal, setReload }: any) => {
  const inventoryId  = useRef<any>("");
  const officeCode = useRef<any>("");
  const productCode = useRef<any>("");
  const quantityAvailable = useRef<any>("");
 

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      inventoryId: inventoryId.current.value,
      officeCode: officeCode.current.value,
      productCode: productCode.current.value,
      quantityAvailable: quantityAvailable.current.value,
    };

    const response = await Axios.post("/customers/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(response.data);
  };

  return (
    <Modal onClick={() => setShowModal(false)} className="flex flex-col justify-center items-center bg-white">
      <h1 className="font-bold text-2xl mb-6 text-green-500">Add Inventory</h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label htmlFor="inventoryId" className="font-semibold text-lg">Inventory ID</label>
                <input
                  ref={inventoryId}
                  id="inventoryId"
                  type="text"
                  className="block mt-2 bg-white border border-gray-300 h-10 w-72 outline-none p-4 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="officeCode" className="font-semibold text-lg">Office Code</label>
                <input
                  ref={officeCode}
                  id="officeCode"
                  type="text"
                  className="block mt-2 bg-white border border-gray-300 h-10 w-72 outline-none p-4 rounded"
                />
              </div>
              <div className="block mb-4">
                <label htmlFor="productCode" className="font-semibold text-lg">Product Code</label>
                <input
                  ref={productCode}
                  id="productCode"
                  type="text"
                  className="block mt-2 bg-white border border-gray-300 h-10 w-72 outline-none p-4 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantityAvailable" className="font-semibold text-lg">Quantity Available</label>
                <input
                  ref={quantityAvailable}
                  id="quantityAvailable"
                  type="text"
                  className="block mt-2 bg-white border border-gray-300 h-10 w-72 outline-none p-4 rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 mt-6
                             text-white h-10 
                             rounded w-72 
                             font-semibold 
                             transition-all 
                             duration-300 
                             ease-in-out
                             hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddInventoryModal;