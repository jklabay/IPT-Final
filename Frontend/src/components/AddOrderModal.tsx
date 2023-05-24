import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddOrderModal = ({ setShowModal, setReload }: any) => {
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
      orderNumber: Number(orderNumberRef.current.value),
      orderDate: orderDateRef.current.value,
      requiredDate: requiredDateRef.current.value,
      shippedDate: shippedDateRef.current.value,
      status: statusRef.current.value,
      comments:
        commentsRef.current.value == "" ? null : commentsRef.current.value,
      customerNumber: customerNumberRef.current.value,
    };

    const response = await Axios.post("/orders/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(data);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowModal(false)}
      className="flex flex-col justify-center items-center  bg-gradient-to-r from-green-500 to-yellow-500 "
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-white">
        Add Order
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
                  id="orderNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Order Date
                </label>
                <input
                  ref={orderDateRef}
                  id="lastName"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="requiredDate"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Required Date
                </label>
                <input
                  ref={requiredDateRef}
                  id="requiredDate"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="shippedDate"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Shipped Date
                </label>
                <input
                  ref={shippedDateRef}
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
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    Status
                  </label>
                  <input
                    ref={statusRef}
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
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    Comments
                  </label>
                  <input
                    ref={commentsRef}
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
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    Customer Number
                  </label>
                  <input
                    ref={customerNumberRef}
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
                className="bg-gradient-to-r from-lime-400 via-green-600 to bg-lime-400 text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-bold py-3 px-20 rounded"
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderModal;