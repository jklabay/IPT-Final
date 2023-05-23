import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const EditOrderModal = ({ setShowEditModal, setReload, editOrder }: any) => {
  const orderNumberRef = useRef<any>("");
  const orderDateRef = useRef<any>("");
  const requiredDateRef = useRef<any>("");
  const shippedDateRef = useRef<any>(null);
  const statusRef = useRef<any>("");
  const commentsRef = useRef<any>(null);
  const customerNumberRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      orderNumber: orderNumberRef.current.value,
      orderDate: orderDateRef.current.value,
      requiredDate: requiredDateRef.current.value,
      shippedDate: shippedDateRef.current.value == "" ? null : shippedDateRef.current.value,
      status: statusRef.current.value,
      comments: commentsRef.current.value == "" ? null : commentsRef.current.value,
      customerNumber: customerNumberRef.current.value,
    };

    const response = await Axios.put(`/orders/${editOrder.orderNumber}`, data);
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-white"
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-sky-400">
        Edit Order
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="orderNumber"
                  className="font-semibold text-[1.15rem]"
                >
                  Order Number
                </label>
                <input
                  ref={orderNumberRef}
                  defaultValue={editOrder.orderNumber}
                  id="orderNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="orderDate"
                  className="font-semibold text-[1.15rem]"
                >
                  Order Date
                </label>
                <input
                  ref={orderDateRef}
                  defaultValue={editOrder.orderDate}
                  id="orderDate"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="requiredDate"
                  className="font-semibold text-[1.15rem]"
                >
                  requiredDate
                </label>
                <input
                  ref={requiredDateRef}
                  defaultValue={editOrder.requiredDate}
                  id="requiredDate"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="shippedDate"
                  className="font-semibold text-[1.15rem]"
                >
                  Shipped Date
                </label>
                <input
                  ref={shippedDateRef}
                  defaultValue={editOrder.shippedDate}
                  id="shippedDate"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              </div>
              <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="status"
                    className="font-semibold text-[1.15rem]"
                  >
                    Status
                  </label>
                  <input
                    ref={statusRef}
                    defaultValue={editOrder.status}
                    id="status"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="comments"
                    className="font-semibold text-[1.15rem]"
                  >
                    Comments
                  </label>
                  <input
                    ref={commentsRef}
                    defaultValue={editOrder.comments}
                    id="comments"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="customerNumber"
                    className="font-semibold text-[1.15rem]"
                  >
                    Customer Number
                  </label>
                  <input
                    ref={customerNumberRef}
                    defaultValue={editOrder.customerNumber}
                    id="customerNumber"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-sky-400 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-blue-600"
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditOrderModal;