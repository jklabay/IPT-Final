import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddProductModal = ({ setShowModal, setReload }: any) => {
  const productCode = useRef<any>("");
  const productName = useRef<any>("");
  const productLineRef = useRef<any>("");
  const productScaleRef = useRef<any>("");
  const productVendorRef = useRef<any>("");
  const productDescRef = useRef<any>("");
  const quantityInStockRef = useRef<any>("");
  const buyPriceRef = useRef<any>(null);
  const msrpRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      productCode: productCode.current.value,
      productName: productName.current.value,
      productLine: productLineRef.current.value,
      productScale: productScaleRef.current.value,
      productVendor: productVendorRef.current.value,
      productDescription: productDescRef.current.value,
      quantityInStock: Number(quantityInStockRef.current.value),
      buyPrice: Number(buyPriceRef.current.value),
      MSRP: Number(msrpRef.current.value),
    };

    const response = await Axios.post("/products/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowModal(false)}
      className="flex flex-col justify-center items-center bg-gradient-to-r from-slate-400 to-lime-500 antialiased leading-relaxed"
    >
      <h1 className="font-bold text-4xl mb-6 text-white">
        Add Payment
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="productCode"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                  Product Code
                </label>
                <input
                  ref={productCode}
                  id="productCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                  Product Name
                </label>
                <input
                  ref={productName}
                  id="productName"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="productLine"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                  Product Line
                </label>
                <input
                  ref={productLineRef}
                  id="productLine"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="productScale"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                  Product Scale
                </label>
                <input
                  ref={productScaleRef}
                  id="productScale"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="productVendor"
                    className="font-semibold text-[1.15rem]  text-white"
                  >
                    Product Vendor
                  </label>
                  <input
                    ref={productVendorRef}
                    id="productVendor"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="productDesc"
                    className="font-semibold text-[1.15rem]  text-white"
                  >
                    Product Description
                  </label>
                  <input
                    ref={productDescRef}
                    id="productDesc"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="quantityInStock"
                    className="font-semibold text-[1.15rem]  text-white"
                  >
                    Quantity In Stock
                  </label>
                  <input
                    ref={quantityInStockRef}
                    id="quantityInStock"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="buyPrice"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                  Buy Price
                </label>
                <input
                  ref={buyPriceRef}
                  id="buyPrice"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label htmlFor="MSRP" className="font-semibold text-[1.15rem]  text-white">
                  MSRP
                </label>
                <input
                  ref={msrpRef}
                  id="MSRP"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
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
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;