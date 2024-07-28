import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { FaCartArrowDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const cartItems = useAppSelector(
    (state: RootState) => state.addToCart.products
  );
  const modalEvent = document.getElementById("modal") as HTMLElement;
  const modalIcon = document.getElementById("modalIcon") as HTMLElement;
  const modalForm = document.getElementById("modalForm") as HTMLElement;
  const modalButton = document.getElementById("modalButton") as HTMLElement;
  const [hideNavbar, setHideNavbar] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  console.log(cartItems);
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
        to="/about"
      >
        About us
      </NavLink>
    </>
  );

  window.onclick = function (event: MouseEvent): void {
    if (
      event.target === modalEvent ||
      event.target === modalIcon ||
      event.target === modalForm ||
      event.target === modalButton
    ) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  window.addEventListener("scroll", function () {
    if (scrollValue < this.scrollY) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
    setScrollValue(this.scrollY);
  });

  return (
    <div
      className={`sticky top-0 z-10 transition duration-500 ${
        hideNavbar ? "translate-y-[-110px]" : "top-0 translate-y-0"
      } relative`}
    >
      <div
        id="modal"
        className={`${
          modal ? "block" : "hidden"
        } flex justify-center bg-slate-200 p-3 mt-2 rounded-md w-[90%] md:w-[80%]  lg:w-[60%] mx-auto z-20 absolute left-0 right-0 `}
      >
        <input
          type="text"
          className="border focus:border-[#228B22] outline-none rounded-md px-3 py-2 w-full"
          name=""
          id="modalForm"
        />
        <button
          id="modalButton"
          className="btn hover:bg-[#6ba56b] bg-[#8FBC8F] text-white ml-3"
        >
          Search
        </button>
      </div>
      <div className="navbar bg-base-100">
        <div className="navbar-start w-[60%] md:w-1/2 lg:w-1/2">
          <div className="dropdown flex-2">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              src="https://i.ibb.co/wwdVnGK/Abstract-Green-Healthy-Life-Free-Logo-1.png"
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
          <IoSearch
            id="modalIcon"
            onClick={() => setModal(true)}
            className="text-3xl mr-3 cursor-pointer"
          />
          <button className="btn bg-[#8FBC8F] hover:bg-[#639c63] text-white">
            <FaCartArrowDown className="text-xl" />
            {cartItems?.length} items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
