import { useState } from "react";
import {
  useGetAllProductQuery,
  useProductCountQuery,
} from "../../redux/Product/ProductAPI";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./product.css";
import { addToCart } from "../../redux/fetures/addToCartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "@/redux/store";

export type TProduct = {
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
  stockStatus: string;
};

export type TFilter = {
  searchTerm ?: string;
  sort?: string;
  maxValue?: string;
  minValue?: string;
  category?: string;
  page?: number;
  limit?: number;
  fields?: string;
};

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sortFelid, setSortFelid] = useState<TFilter>({ page: 1, limit: 10 });
  const { data, isLoading } = useGetAllProductQuery(sortFelid);
  const { data: productCount, isLoading: isLoading2 } =
    useProductCountQuery(undefined);
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state: RootState) => state.addToCart.products
  );

  if (isLoading || isLoading2) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center my-10">
        <div className="my-5">
          <h1 className="text-4xl font-semibold text-center my-2">
            No Data Found !
          </h1>
          <img
            className="w-[500px] mx-auto "
            src="https://i.ibb.co/74kjdxL/55024593-9264822.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
  
  const numberOfPage = Math.ceil(Number(productCount?.data) / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handleMinMax = (e: any) => {
    e.preventDefault();
    const minValue = e.currentTarget.minimum.value;
    const maxValue = e.currentTarget.maximum.value;

    if (!minValue || !maxValue) {
      return toast.error("Please Set Price Value");
    }
    if (Number(maxValue) <= Number(minValue)) {
      return toast.error("Please provide grater then value form minimum value");
    }
    setSortFelid({
      ...sortFelid,
      minValue: minValue,
      maxValue: maxValue,
    });
    setCurrentPage(1);
  };

  const handleNextPrePage = (btn: string) => {
    if (btn === "next") {
      if (currentPage < numberOfPage) {
        setCurrentPage(currentPage + 1);
        setSortFelid({
          ...sortFelid,
          page: currentPage + 1,
          limit: itemPerPage,
        });
      }
    }
    if (btn === "pervious") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        setSortFelid({
          ...sortFelid,
          page: currentPage - 1,
          limit: itemPerPage,
        });
      }
    }
  };

  const handlePagination = (currentPage: number) => {
    setCurrentPage(currentPage as number);
    setSortFelid({ ...sortFelid, page: currentPage, limit: itemPerPage });
  };

  const handlePageViewContent = (e: any) => {
    setCurrentPage(1),
      setSortFelid({ ...sortFelid, page: 1, limit: parseInt(e.target.value) });
    setItemPerPage(parseInt(e.target.value));
  };

  const handleAddToCart = (id: string, maxQuantity: number) => {
    const existItem = cartItems.filter((item) => item.id === id);
    const quantity = existItem.length > 0 ? existItem[0].quantity + 1 : 1;
    if (existItem) {
      dispatch(addToCart({ id, quantity, maxQuantity }));
    }
  };
  
  return (
    <div className="m-5 ">
      <button
        className="btn my-8 block md:block lg:hidden "
        onClick={() =>
          (document.getElementById(
            "my_modal_6"
          ) as HTMLDialogElement)!.showModal()!
        }
      >
        <div className="flex space-x-3 justify-center items-center">
          <p className="text-lg ">Filter</p>
          <img
            className="w-[20px]"
            src="https://i.ibb.co/SsGYLDx/setting-10302722.png"
            alt=""
          />
        </div>
      </button>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex gap-x-5">
              <div className="dropdown w-36">
                <div tabIndex={10} role="button" className="btn w-full ">
                  Sort by
                </div>
                <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
                  <li className="mb-2 w-full border rounded-lg selected">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          sort: "name",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      A To Z
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          sort: "-name",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Z To A
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          sort: "-price",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      High to Low
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          sort: "price",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Low to High
                    </button>
                  </li>
                </ul>
              </div>
              <div className="dropdown w-56">
                <div tabIndex={0} role="button" className="btn w-full ">
                  Sort by Category
                </div>
                <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
                  <li className="mb-2 w-full border rounded-lg selected">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          category: "Indoor Plants",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Indoor Plants
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg selected">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          category: "Outdoor Plants",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Outdoor Plants
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg selected">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          category: "Plant Care & Accessories",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Plant Care & Accessories
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg selected">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          category: "Pots & Planters",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Pots & Planters
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg selected">
                    <button
                      onClick={() => {
                        setSortFelid({
                          ...sortFelid,
                          category: "Gardening Tools & Supplies",
                          page: 1,
                          limit: itemPerPage,
                        });
                        setCurrentPage(1);
                      }}
                    >
                      Gardening Tools & Supplies
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-3">
              {/* <h1 className="text-center text-lg font-medium">Price Filter</h1> */}
              <form
                action=""
                onSubmit={handleMinMax}
                className=" flex space-x-2 md:space-x-5"
              >
                <input
                  type="number"
                  min="1"
                  className="p-2 w-32 outline-none border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
                  placeholder="Price From"
                  name="minimum"
                />
                <input
                  type="number"
                  className="p-2 w-32 outline-none border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
                  placeholder="Price To"
                  name="maximum"
                />

                <input
                  type="submit"
                  className="btn w-28 p-4 bg-[#8FBC8F] text-center text-white hover:text-black"
                  name="Search"
                  id=""
                  value="Search"
                />
              </form>
            </div>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setSortFelid({ page: 1, limit: itemPerPage })}
              className="btn mr-3 bg-red-400 text-white hover:text-black"
            >
              Clear Filter
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className=" my-10 border hidden md:hidden lg:block rounded-lg px-4 py-5">
        <h1 className="text-xl font-semibold text-center">Filter</h1>
        <div className="flex space-x-8 justify-center items-center">
          <div className="dropdown w-36">
            <div tabIndex={0} role="button" className="btn w-full ">
              Sort by
            </div>
            <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      sort: "name",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  A To Z
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      sort: "-name",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Z To A
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      sort: "-price",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  High to Low
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      sort: "price",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Low to High
                </button>
              </li>
            </ul>
          </div>
          <div className="dropdown w-56">
            <div tabIndex={0} role="button" className="btn w-full ">
              Sort by Category
            </div>
            <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      category: "Indoor Plants",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Indoor Plants
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      category: "Outdoor Plants",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Outdoor Plants
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      category: "Plant Care & Accessories",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Plant Care & Accessories
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      category: "Pots & Planters",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Pots & Planters
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({
                      ...sortFelid,
                      category: "Gardening Tools & Supplies",
                      page: 1,
                      limit: itemPerPage,
                    });
                    setCurrentPage(1);
                  }}
                >
                  Gardening Tools & Supplies
                </button>
              </li>
            </ul>
          </div>
          <div className="my-3">
            {/* <h1 className="text-center text-lg font-medium">Price Filter</h1> */}
            <form action="" onSubmit={handleMinMax} className=" flex space-x-5">
              <input
                type="number"
                min="1"
                className="p-2 w-32 outline-none border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
                placeholder="Price From"
                name="minimum"
              />
              <input
                type="number"
                className="p-2 w-32 outline-none border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
                placeholder="Price To"
                name="maximum"
              />

              <input
                type="submit"
                className="btn w-28 p-4 bg-[#8FBC8F] text-center text-white hover:text-black"
                name="Search"
                id=""
                value="Search"
              />
            </form>
          </div>
          <button
            onClick={() => setSortFelid({ page: 1, limit: itemPerPage })}
            className="btn bg-red-400 text-white hover:text-black"
          >
            Clear Filter
          </button>
        </div>
      </div>
      <div>
        {data?.data.length < 1 ? (
          <div className="flex justify-center my-10">
            <div className="my-5">
              <h1 className="text-4xl font-semibold text-center my-2">
                No Data Found !
              </h1>
              <img
                className="w-[500px] mx-auto "
                src="https://i.ibb.co/74kjdxL/55024593-9264822.jpg"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className=" grid md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {data?.data?.map((item: TProduct) => (
              <div
                key={item._id}
                className=" relative h-[580px] md:h-[450px] lg:h-[500px] main-content border overflow-hidden  rounded-lg hover:border-[#228B22] delay-75 ease-in"
              >
                <Link to={`/productDetails/${item._id}`}>
                  <div className="">
                    <img
                      className=" border-b-2 rounded-t-md md:h-[260px] lg:h-[350px] w-full"
                      src={item.images[0]}
                      alt=""
                    />
                    <div className="p-2">
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className=" text-[#7e7e7e] mt-2 block md:hidden lg:hidden">
                        {item.description.length > 60
                          ? item.description.slice(0, 60)
                          : item.description}
                        {item.description.length > 60 ? "..." : ""}
                      </p>
                      <p className=" text-[#7e7e7e] mt-2 hidden md:hidden lg:block">
                        {item.description.length > 55
                          ? item.description.slice(0, 55)
                          : item.description}
                        {item.description.length > 55 ? "..." : ""}
                      </p>
                      <p className=" text-[#7e7e7e] mt-2 hidden md:block lg:hidden">
                        {item.description.length > 40
                          ? item.description.slice(0, 40)
                          : item.description}
                        {item.description.length > 40 ? "..." : ""}
                      </p>
                    </div>
                    <div className="absolute bottom-14 md:bottom-12 lg:bottom-0 p-2">
                      <p className="text-2xl font-bold mt-2">$ {item.price}</p>
                    </div>
                  </div>
                </Link>
                <div className="absolute bottom-0 w-full p-2">
                  <button
                    onClick={() => handleAddToCart(item._id, item.stock)}
                    className="btn text-center block md:block lg:hidden border-2 text-white hover:border-white bg-[#8FBC8F] hover:bg-[#6db46d] w-full"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="absolute w-full bottom-0 add-to-cart text-white text-lg font-semibold hidden transition-opacity duration-300">
                  <div
                    className={`p-5 w-full hidden md:hidden lg:block rounded-md bg-[#8FBC8F] ${
                      item.stock < 1 ? "bg-opacity-100" : "bg-opacity-40"
                    }`}
                  >
                    {item.stock < 1 ? (
                      <p className="text-white">Product Stock Out</p>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item._id, item.stock)}
                        className="btn text-center border-2 text-white hover:border-white bg-[#8FBC8F] hover:bg-[#6db46d] w-full"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="my-10">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button onClick={() => handleNextPrePage("pervious")} className="btn">
            Previous
          </button>
          {pages.map((page) => (
            <button
              onClick={() => handlePagination(page + 1)}
              key={page}
              className={`btn ${
                page + 1 === currentPage &&
                "bg-[#8FBC8F] hover:bg-[#689968] text-white"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button className="btn" onClick={() => handleNextPrePage("next")}>
            Next
          </button>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium ml-5 text-[#8FBC8F]">
              Page pre view
            </p>
            <select
              className="w-20 border p-2 rounded"
              defaultValue={itemPerPage}
              onChange={handlePageViewContent}
              name=""
              id=""
            >
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
