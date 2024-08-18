import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { FaCartArrowDown, FaDollarSign } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "@/redux/store";
import { useDebounce } from "../hooks/Debounce";
import { useGetAllProductQuery } from "../redux/Product/ProductAPI";

type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

const Navbar = () => {
  const cartItems = useAppSelector(
    (state: RootState) => state.addToCart.products
  );
  // const modalEvent = document.getElementById("modal") as HTMLElement;
  // const modalIcon = document.getElementById("modalIcon") as HTMLElement;
  // const modalForm = document.getElementById("modalForm") as HTMLElement;
  // const modalButton = document.getElementById("modalButton") as HTMLElement;
  const [hideNavbar, setHideNavbar] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [searchValue, setSearchValue] = useState({ searchTerm: "undefined" });
  const {debounceValue, loading} = useDebounce(searchValue);
  const { data, isLoading } = useGetAllProductQuery(debounceValue);
   
  const navElement = (
    <>
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm font-medium font-[lato] text-lg"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm font-medium font-[lato] text-lg"
        to="/shop"
      >
        Shop
      </NavLink>
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm font-medium font-[lato] text-lg"
        to="/dashboard/home"
      >
        Dashboard
      </NavLink>
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm font-medium font-[lato] text-lg"
        to="/about"
      >
        About us
      </NavLink>
    </>
  );
  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  window.addEventListener("scroll", function () {
    if (scrollValue < this.scrollY) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
    setScrollValue(this.scrollY);
  });

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setSearchValue({ searchTerm: e.currentTarget.value });
    } else {
      setSearchValue({ searchTerm: "undefined" });
    }
  };

  const handleModal = () => {
    (document.getElementById(
      "my_modal_7"
    ) as HTMLDialogElement)!.close()!
  }
 
  return (
    <div>
      <div className={`sticky top-0 z-10 transition duration-500 ${
          hideNavbar ? "translate-y-[-110px]" : "top-0 translate-y-0"
        }`}
      >
        <div className="navbar bg-base-100">
          <div className="navbar-start w-[60%] md:w-1/2 lg:w-1/2">
            <div className="dropdown flex-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navElement}
              </ul>
            </div>
            <Link to="/" className="flex justify-center items-center">
              <img
                className="w-[40px] md:w-[70px] lg:w-[70px]"
                src="https://i.ibb.co/jrdZn9q/New-Project-8.png"
                alt=""
              />
              <p className="text-base md:text-2xl lg:text-2xl font-bold">
                Nursery <span className="text-[#29a529]">Nest</span>
              </p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navElement}</ul>
          </div>
          <div className="navbar-end w-[43%] md:w-1/2 lg:w-1/2">
            <button
              onClick={() =>
                (document.getElementById(
                  "my_modal_7"
                ) as HTMLDialogElement)!.showModal()!
              }
            >
              <IoSearch
                id="modalIcon"
                className="text-3xl mr-3 cursor-pointer"
              />
            </button>
            <Link to='/checkout' className="btn bg-[#8FBC8F] hover:bg-[#639c63] text-white">
              <FaCartArrowDown className="text-xl" />
              {cartItems?.length} items
            </Link>
          </div>
        </div>
      </div>
      <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-xl font-semibold text-center mb-5">Search Hear</h1>
          <div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="border-2 border-slate-300 focus:border-[#228B22] outline-none rounded-md px-3 py-3 w-full"
                placeholder="Type hear"
                onChange={handleSearch}
              />
              <button className="btn hover:bg-[#6ba56b] bg-[#8FBC8F] text-white ml-3">
                Search
              </button>
              <div className="modal-action mt-0 ml-2">
                <form method="dialog">
                  <button className="btn bg-red-400 hover:bg-red-500 text-white">
                    Close
                  </button>
                </form>
              </div>
            </div>
            <div className={`${data?.data ? 'mt-5' : 'mt-0'}`}>
              <div>
                {
                  loading ? <div className="flex justify-center"><span className="loading loading-ring loading-lg"></span></div> : ''
                }
              </div>
              {data?.data &&
                data?.data.map((product: TProduct) => (
                  <Link key={product._id} onClick={handleModal} to={`/productDetails/${product._id}`} className={`flex modal-action ${loading ? 'hidden' : 'block'} justify-between items-center gap-x-3 mb-3 rounded-md border-2 hover:border-[#8FBC8F] border-slate-300 p-1`}>
                    <div className="w-1/4 dialog">
                      <img
                        className="w-full rounded-md"
                        src={product.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="w-3/4 space-y-1">
                      <p className="text-xl font-semibold">{product.name}</p>
                      <p className="text-slate-500">
                        {product.description.length > 55
                          ? product.description.slice(0, 55)
                          : product.description}
                        {product.description.length > 55 ? "..." : ""}
                      </p>
                      <p className="flex text-base md:text-base lg:text-xl items-center text-[#8FBC8F] font-bold">
                        <FaDollarSign className="text-lg md:text-2xl lg:text-xl font-extrabold"></FaDollarSign>{" "}
                        <span className="text-xl">
                          {product.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Navbar;
