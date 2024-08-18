import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center m-5 h-[600px] md:h-[600px] lg:h-[700px]">
      <div>
        <div className="flex justify-center">
          <img
            className="w-[600px]"
            src="https://i.ibb.co/Xky6x70/404-min.png"
            alt=""
          />
        </div>
        <p className="text-3xl mt-10 font-bold text-center">
          Oops page Not Found !
        </p>
        <div className="flex justify-center my-5">
          <Link to="/">
            <button className="btn bg-[#8FBC8F] hover:bg-[#64a564] text-white">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
