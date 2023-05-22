import { useRef } from "react";
import Modal from "./Modal";
import Axios from "axios";

const EditProductModal = ({
  setShowEditModal,
  setReload,
  editProduct,
}: any) => {
  const productCodeRef = useRef<any>("");
  const productNameRef = useRef<any>("");
  const productLineRef = useRef<any>("");
  const productScaleRef = useRef<any>("");
  const productVendorRef = useRef<any>("");
  const productDescRef = useRef<any>("");
  const quantityInStockRef = useRef<any>("");
  const buyPriceRef = useRef<any>("");
  const msrpRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      productCode: productCodeRef.current.value,
      productName: productNameRef.current.value,
      productLine: productLineRef.current.value,
      productScale: productScaleRef.current.value,
      productVendor: productVendorRef.current.value,
      productDescription: productDescRef.current.value,
      quantityInStock: Number(quantityInStockRef.current.value),
      buyPrice: Number(buyPriceRef.current.value),
      MSRP: Number(msrpRef.current.value),
    };

    const response = await Axios.put(
      `/products/${editProduct.productCode}`,
      data
    );
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center  bg-gradient-to-r from-green-500 to-yellow-500"
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-black-500">
        Edit Product
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="productCode"
                  className="font-semibold text-[1.15rem]"
                >
                  Product Code
                </label>
                <input
                  ref={productCodeRef}
                  defaultValue={editProduct.productCode}
                  id="productCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="font-semibold text-[1.15rem]"
                >
                  Product Name
                </label>
                <input
                  ref={productNameRef}
                  defaultValue={editProduct.productName}
                  id="productName"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="productLine"
                  className="font-semibold text-[1.15rem]"
                >
                  Product Line
                </label>
                <input
                  ref={productLineRef}
                  defaultValue={editProduct.productLine}
                  id="productLine"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="productScale"
                  className="font-semibold text-[1.15rem]"
                >
                  Product Scale
                </label>
                <input
                  ref={productScaleRef}
                  defaultValue={editProduct.productScale}
                  id="productScale"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="productVendor"
                    className="font-semibold text-[1.15rem]"
                  >
                    Product Vendor
                  </label>
                  <input
                    ref={productVendorRef}
                    defaultValue={editProduct.productVendor}
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
                    htmlFor="productDescCode"
                    className="font-semibold text-[1.15rem]"
                  >
                    Product Description
                  </label>
                  <input
                    ref={productDescRef}
                    defaultValue={editProduct.productDescription}
                    id="productDescCode"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="quantityInStock"
                    className="font-semibold text-[1.15rem]"
                  >
                    Quantity In Stock
                  </label>
                  <input
                    ref={quantityInStockRef}
                    defaultValue={editProduct.quantityInStock}
                    id="To"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="buyPrice"
                  className="font-semibold text-[1.15rem]"
                >
                  Buy Price
                </label>
                <input
                  ref={buyPriceRef}
                  defaultValue={editProduct.buyPrice}
                  id="buyPrice"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label htmlFor="MSRP" className="font-semibold text-[1.15rem]">
                  MSRP
                </label>
                <input
                  ref={msrpRef}
                  defaultValue={editProduct.MSRP}
                  id="MSRP"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-600 mt-[1.5rem] text-black h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-green-600"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
