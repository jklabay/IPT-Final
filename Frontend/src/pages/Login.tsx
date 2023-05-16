import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = ({ setUser }: any) => {
  const usernameRef = useRef<any>("");
  const passwordRef = useRef<any>("");
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      return alert("Username and Password are required");
    }

    const data = {
      email: username,
      password: password,
    };

    try {
      const res = await Axios.post("/employees/authenticate", data);
      console.log(res.data);
      if (res.data) {
        setUser(res.data.username);
        return navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid username or password");
    }
  };

  return (
    <body className ="bg-gradient-to-r from-sky-900 to-rose-900 antialiased leading-relaxed"> 
      <section className="min-h-screen flex items-center justify-center">
      <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <div className="flex rounded-2xl shadow-lg max-w-full p-5 items-center">

<div className=" flex max-w-5xl p-5 items-center">

      <div className="md:w-full px-16"><h2 className="font-bold text-6xl text-sky-100">Login</h2>
      <p className="text-l text-gray-100 mt-6">If you're already a member, easily log in</p>
          <div className="relative mb-6">
            <input
              ref={usernameRef}
              type="text"
              className="peer p-2.5 mt-8 rounded-xl w-full text-l drop-shadow-2xl hover:shadow-2xl hover:scale-105 duration-300 hover:shadow-neutral-400 focus:outline-none focus:ring-0 focus:border-gray-600"
              id="username"
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <input
              ref={passwordRef}
              type="password"
              className="peer p-2.5 rounded-xl w-full text-l drop-shadow-2xl hover:shadow-2xl hover:scale-105 duration-300 hover:shadow-neutral-400 focus:outline-none focus:ring-0 focus:border-gray-600"
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-rose-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label
                className="form-check-label inline-block mr-4 text-sky-100 font-semibold"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
            <h1 className="text-sky-100 font-semibold">Forgot password?</h1>
          </div>

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block w-full mt-2.5 bg-white rounded-xl font-bold py-2 btn btn-primary drop-shadow-xl hover:scale-105 duration-300  hover:bg-rose-800 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
            >
              Login
            </button>
          </div>
        </div>
        </div>
        </div>
      </form>
    </section>
    </body>
  );
};

export default Login;
