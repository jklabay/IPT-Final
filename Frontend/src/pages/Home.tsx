import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <body className ="bg-gradient-to-r from-slate-400 to-lime-500 antialiased leading-relaxed"> 
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-8xl font-bold mb-4 text-gray-100">Select</h1>
      <div className="justify-center gap-4 p-4 rounded w-[350px] flex flex-row">
        <button
          onClick={() => navigate("/employee")}
          className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
        >
          Employee
        </button>
        <button
          onClick={() => navigate("/office")}
          className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
        >
          Office
        </button>
        <button
          onClick={() => navigate("/product")}
          className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
        >
          Product
        </button>
        <button
          onClick={() => navigate("/customer")}
          className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
        >
          Customer
        </button>
        <button
          onClick={() => navigate("/inventory")}
          className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
        >
          Inventory
        </button>
        <button
            onClick={() => navigate("productline")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
          >
            ProductLine
          </button>
        </div>
        <div className="justify-center gap-4 p-4 rounded w-[350px] flex flex-row">
          <button
            onClick={() => navigate("/orders")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
          >
            Orders
          </button>
          <button
            onClick={() => navigate("/orderdetails")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
          >
            OrderDetails
          </button>
          <button
            onClick={() => navigate("/payments")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-900 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-900 hover:shadow-lg hover:drop-shadow-2xl"
          >
            Payments
          </button>
      </div>
    </div>
    </body>
  );
};

export default Home;
