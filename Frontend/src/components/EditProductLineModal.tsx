import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const EditProductLineModal = ({
  setShowEditModal,
  setReload,
  editProductLine,
}: any) => {
  const productLineRef = useRef<any>("");
  const textDescriptionRef = useRef<any>("");

  const htmlDescriptionRef = useRef<any>("");
  const imageRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      productLine: productLineRef.current.value,
      textDescription: textDescriptionRef.current.value,
      htmlDescriptionRef:
        htmlDescriptionRef.current.value == ""
          ? null
          : htmlDescriptionRef.current.value,
      image: imageRef.current.value == "" ? null : imageRef.current.value,
    };

    const response = await Axios.put(
      `/productlines/${editProductLine.productLine}`,
      data
    );
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(response.data);
  };

  // Rest of your component...

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-white"
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-blue-500">
        Edit Product
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="productLine"
                  className="font-semibold text-[1.15rem]"
                >
                  Product Line
                </label>
                <input
                  ref={productLineRef}
                  defaultValue={editProductLine.productLine}
                  id="productLine"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="textDescription"
                  className="font-semibold text-[1.15rem]"
                >
                  textDescription
                </label>
                <input
                  ref={textDescriptionRef}
                  defaultValue={editProductLine.textDescription}
                  id="textDescription"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="htmlDescription"
                  className="font-semibold text-[1.15rem]"
                >
                  htmlDescription
                </label>
                <input
                  ref={htmlDescriptionRef}
                  defaultValue={editProductLine.htmlDescription}
                  id="htmlDescription"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label htmlFor="image" className="font-semibold text-[1.15rem]">
                  Product Scale
                </label>
                <input
                  ref={imageRef}
                  defaultValue={editProductLine.image}
                  id="image"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-blue-600"
              >
                Update ProductLine
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductLineModal;