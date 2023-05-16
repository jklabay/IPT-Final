import {useState, useEffect} from "react";
import Axios from "axios";

const Employee = ({user}: any) => {

  const [employees, setEmployees] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get('/employees', {
          cancelToken: ourRequest.token,
        });
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  return (
    <>
     
    <section > 
     <div className='container mx-auto mt-6'>
        <div className=' text-right mb-6'>
          <button
           
           className="px-10 mt-2.5 bg-white tracking-widest rounded-xl font-bold py-3 btn btn-primary drop-shadow-xl hover:scale-105 duration-300  hover:bg-rose-800 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
          >
            + Add
          </button>
        </div>
        <table
          cellPadding={10}
          className='text-center h-auto w-full border border-black'
        >
          <thead className=' border border-black'>
            <tr>
              <th>Employee Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Extension</th>
              <th>Email</th>
              <th>Office Code</th>
              <th>Reports To</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => (
              <tr key={employee.employeeNumber}>
                <td>{employee.employeeNumber}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.extension}</td>
                <td>{employee.email}</td>
                <td>{employee.officeCode}</td>
                <td>{employee.reportsTo}</td>
                <td>{employee.jobTitle}</td>
                {/* <td>
                  <button
                    // onClick={() => {
                    //   setEditUser({
                    //     idno: employee.idno,
                    //     lastname: employee.lastname,
                    //     firstname: employee.firstname,
                    //     course: employee.course,
                    //     level: employee.level,
                    //   });
                    //   setEditShowModal(true);
                    // }}
                    className='mr-4 bg-blue-400 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded'
                  >
                    &#9998;
                  </button>
                  <button
                    onClick={async () => {
                      const data = { idno: employee.idno };
                      try {
                        const response = await Axios.delete('/api/students', {
                          data,
                        });
                        console.log(response.data);
                        setReload((prev) => prev + 1);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className='bg-red-400 hover:bg-red-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded'
                  >
                    &times;
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </section>
    </>
    
  );
};

export default Employee;
