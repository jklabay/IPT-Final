import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const EditInventoryModal = ({
  setShowEditModal,
  setReload,
  editInventory,
}: any) => {
  const inventoryId = useRef<any>("");
  const country = useRef<any>("");
  const officeAddress = useRef<any>("");
  const productName = useRef<any>("");
  const quantityAvailable = useRef<any>("");
  

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      inventoryId: inventoryId.current.value,
      country: country.current.value,
      officeAddress: officeAddress.current.value,
      productName: productName.current.value,
      quantityAvailable: quantityAvailable.current.value,
    };

    const response = await Axios.put(
      `/inventories/${editInventory.inventoryId}`,
      data
    );
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-white"
    >
      <h1 className="font-bold text-2rem mb-1.5rem text-green-500 text-3xl">
        Edit Inventory
      </h1>
      <br></br>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="inventoryId"
                  className="font-semibold text-1.15rem"
                >
                  Inventory ID
                </label>
                <input
                  ref={inventoryId}
                  defaultValue={editInventory.inventoryId}
                  id="inventoryId"
                  type="text"
                  className="block mt-0.5rem bg-white border border-solid border-gray-300 h-2.5rem w-18rem outline-none p-1rem rounded"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="font-semibold text-1.15rem"
                >
                  Country
                </label>
                <input
                  ref={country}
                  defaultValue={editInventory.country}
                  id="country"
                  type="text"
                  className="block mt-0.5rem bg-white border border-solid border-gray-300 h-2.5rem w-18rem outline-none p-1rem rounded"
                  disabled
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="officeAddress"
                  className="font-semibold text-1.15rem"
                >
                  Office Address
                </label>
                <input
                  ref={officeAddress}
                  defaultValue={editInventory.officeAddress}
                  id="officeAddress"
                  type="text"
                  className="block mt-0.5rem bg-white border border-solid border-gray-300 h-2.5rem w-18rem outline-none p-1rem rounded"
                  disabled
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="productName"
                  className="font-semibold text-1.15rem"
                >
                  Product Name
                </label>
                <input
                  ref={productName}
                  defaultValue={editInventory.productName}
                  id="productName"
                  type="text"
                  className="block mt-0.5rem bg-white border border-solid border-gray-300 h-2.5rem w-18rem outline-none p-1rem rounded"
                  disabled
                />
              </div>
              <div className="block mb-4">
                <div className="mb-1rem">
                  <label
                    htmlFor="quantityAvailable"
                    className="font-semibold text-1.15rem"
                  >
                    Quantity Available
                  </label>
                  <input
                    ref={quantityAvailable}
                    defaultValue={editInventory.quantityAvailable}
                    id="quantityAvailable"
                    type="text"
                    className="block mt-0.5rem bg-white border border-solid border-gray-300 h-2.5rem w-18rem outline-none p-1rem rounded"
                    autoFocus
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center">
            <button
                type="submit"
                className="bg-green-500 mt-6 text-white h-10 rounded w-72 font-semibold transition-all duration-300 ease-in-out hover:bg-green-600"
              >
                Update Inventory
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditInventoryModal;
