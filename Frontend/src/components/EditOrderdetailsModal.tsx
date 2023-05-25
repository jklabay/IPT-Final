import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const editOrderdetailsModal = ({ setShowEditModal, setReload, editOrderdetails}: any) => {
  const orderNumberRef = useRef<any>("");
  const productCode = useRef<any>("");
  const quantityOrdered = useRef<any>("");
  const priceEach = useRef<any>("");
  const orderLineNumber = useRef<any>("");


  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      orderNumber: orderNumberRef.current.value,
      productCode: productCode.current.value,
      quantityOrdered: quantityOrdered.current.value,
      priceEach:priceEach.current.value,
      orderLineNumber: orderLineNumber.current.value,
    };

    const response = await Axios.put(`/orderdetails/${editOrderdetails.orderNumber}`, data);
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center  bg-gradient-to-r from-green-500 to-yellow-500 "
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-white">
        Edit Order
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="orderNumber"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Order Number
                </label>
                <input
                  ref={orderNumberRef}
                  defaultValue={editOrderdetails.orderNumber}
                  id="orderNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productCode"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Product Code
                </label>
                <input
                  ref={productCode}
                  defaultValue={editOrderdetails.productCode}
                  id="productCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="quantityOrdered"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Quantity Ordered
                </label>
                <input
                  ref={quantityOrdered}
                  defaultValue={editOrderdetails.quantityOrdered}
                  id="quantityOrdered"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="priceEach"
                  className="font-semibold text-[1.15rem] text-white" 
                >
                  Price
                </label>
                <input
                  ref={priceEach}
                  defaultValue={editOrderdetails.priceEach}
                  id="priceEach"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              </div>
              <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="orderLineNumber"
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    Order Line Number
                  </label>
                  <input
                    ref={orderLineNumber}
                    defaultValue={editOrderdetails.orderLineNumber}
                    id="orderLineNumber"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-600 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-green-600"
              >
                Update Order Details
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default editOrderdetailsModal;