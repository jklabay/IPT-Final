import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddOfficeModal = ({ setShowModal, setReload }: any) => {
  const officeCodeRef = useRef<any>("");
  const cityRef = useRef<any>("");
  const phoneRef = useRef<any>("");
  const addressLine1Ref = useRef<any>("");
  const addressLine2Ref = useRef<any>(null);
  const stateRef = useRef<any>(null);
  const countryRef = useRef<any>("");
  const postalCodeRef = useRef<any>("");
  const territoryRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      officeCode: officeCodeRef.current.value,
      city: cityRef.current.value,
      phone: phoneRef.current.value,
      addressLine1: addressLine1Ref.current.value,
      addressLine2:
        addressLine2Ref.current.value == ""
          ? null
          : addressLine2Ref.current.value,
      state:
        stateRef.current.value == "" ? null : addressLine2Ref.current.value,
      country: countryRef.current.value,
      postalCode: postalCodeRef.current.value,
      territory: territoryRef.current.value,
    };

    const response = await Axios.post("/offices/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowModal(false)}
      className="flex flex-col justify-center items-center bg-gradient-to-r from-slate-400 to-lime-500 antialiased leading-relaxed"
    >
      <h1 className="font-bold text-2rem mb-1.5rem text-white text-4xl">
        Add Office
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="officeCode"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Office Code
                </label>
                <input
                  ref={officeCodeRef}
                  id="officeCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="font-semibold text-[1.15rem] text-white">
                  City
                </label>
                <input
                  ref={cityRef}
                  id="city"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label htmlFor="phone" className="font-semibold text-[1.15rem] text-white">
                  Phone
                </label>
                <input
                  ref={phoneRef}
                  id="phone"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="addressLine1"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Address Line 1
                </label>
                <input
                  ref={addressLine1Ref}
                  id="addressLine1"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="addressLine2"
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    Address Line 2
                  </label>
                  <input
                    ref={addressLine2Ref}
                    id="addressLine2"
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
                    htmlFor="state"
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    State
                  </label>
                  <input
                    ref={stateRef}
                    id="state"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="country"
                    className="font-semibold text-[1.15rem] text-white"
                  >
                    Country
                  </label>
                  <input
                    ref={countryRef}
                    id="country"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="postalCode"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Postal Code
                </label>
                <input
                  ref={postalCodeRef}
                  id="postalCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="TERRITORY"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Territory
                </label>
                <input
                  ref={territoryRef}
                  id="TERRITORY"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 mt-6 text-white h-10 rounded w-72 font-semibold transition-all duration-300 ease-in-out hover:bg-green-600"
              >
                Add Office
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddOfficeModal;