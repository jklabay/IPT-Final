import { useRef } from "react";

import Axios from "axios";
import Modal from "./modal";

const EditModal = ({ setReload, setShowEditModal, editUser }: any) => {
  const employeeNumberRef = useRef<any>("");
  const lastNameRef = useRef<any>("");
  const firstNameRef = useRef<any>("");
  const extensionRef = useRef<any>("");
  const emailRef = useRef<any>("");
  const officeCodeRef = useRef<any>("");
  const reportsToRef = useRef<any>(null);
  const jobTitleRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      employeeNumber: Number(employeeNumberRef.current.value),
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      extension: extensionRef.current.value,
      email: emailRef.current.value,
      officeCode: officeCodeRef.current.value,
      reportsTo: Number(reportsToRef.current.value),
      jobTitle: jobTitleRef.current.value,
    };

    try {
      const response = await Axios.put(
        `/employees/${editUser.employeeNumber}`,
        data
      );

      console.log(response.data);
      setReload((prev: any) => prev + 1);
    } catch (e) {
      console.log(e);
    }
    setShowEditModal(false);
  };
  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-white"
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-blue-500">
        Edit Employee
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="employeeNumber"
                  className="font-semibold text-[1.15rem]"
                >
                  Employee Number
                </label>
                <input
                  ref={employeeNumberRef}
                  defaultValue={editUser.employeeNumber}
                  id="employeeNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="font-semibold text-[1.15rem]"
                >
                  Lastname
                </label>
                <input
                  ref={lastNameRef}
                  defaultValue={editUser.lastName}
                  id="lastName"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="firstName"
                  className="font-semibold text-[1.15rem]"
                >
                  Firstname
                </label>
                <input
                  ref={firstNameRef}
                  defaultValue={editUser.firstName}
                  id="firstName"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="extension"
                  className="font-semibold text-[1.15rem]"
                >
                  Extension
                </label>
                <input
                  ref={extensionRef}
                  defaultValue={editUser.extension}
                  id="extension"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="email"
                    className="font-semibold text-[1.15rem]"
                  >
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    defaultValue={editUser.email}
                    id="email"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="officeCode"
                    className="font-semibold text-[1.15rem]"
                  >
                    Office Code
                  </label>
                  <input
                    ref={officeCodeRef}
                    defaultValue={editUser.officeCode}
                    id="officeCode"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="reportsTo"
                    className="font-semibold text-[1.15rem]"
                  >
                    Reports To
                  </label>
                  <input
                    ref={reportsToRef}
                    defaultValue={editUser.reportsTo}
                    id="reportsTo"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="jobTitle"
                  className="font-semibold text-[1.15rem]"
                >
                  Job Title
                </label>
                <select
                  ref={jobTitleRef}
                  defaultValue={editUser.jobTitle}
                  name="jobTitle"
                  id="jobTitle"
                  className="w-[18rem] h-[2.5rem] block mt-2 px-4 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 outline-none"
                >
                  <option value="President">President</option>
                  <option value="VP Sales">VP Sales</option>
                  <option value="VP Marketing">VP Marketing</option>
                  <option value="Sales Rep">Sales Rep</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;