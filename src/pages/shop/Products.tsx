import { useState } from "react";
import {
  useGetAllProductQuery,
  useProductCountQuery,
} from "../../redux/Product/ProductAPI";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

type TFilter = {
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

  if (isLoading || isLoading2) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!data) {
    return <h1>Not found</h1>;
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
  };

  const handleNextPrePage = (btn: string) => {
    if (btn === "next") {
      if (currentPage < numberOfPage) {
        setCurrentPage(currentPage + 1);
        setSortFelid({ page: currentPage + 1, limit: itemPerPage });
      }
    }
    if (btn === "pervious") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        setSortFelid({ page: currentPage - 1, limit: itemPerPage });
      }
    }
  };

  const handlePagination = (currentPage: number) => {
    setCurrentPage(currentPage as number);
    setSortFelid({ page: currentPage, limit: itemPerPage });
  };

  const handlePageViewContent = (e: any) => {
    setCurrentPage(1),
    setSortFelid({ page: 1, limit: parseInt(e.target.value) });
    setItemPerPage(parseInt(e.target.value));
  };
  console.log(sortFelid);
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
                        setSortFelid({ ...sortFelid, sort: "name" });
                      }}
                    >
                      A To Z
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg">
                    <button
                      onClick={() => {
                        setSortFelid({ ...sortFelid, sort: "-name" });
                      }}
                    >
                      Z To A
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg">
                    <button
                      onClick={() => {
                        setSortFelid({ ...sortFelid, sort: "-price" });
                      }}
                    >
                      High to Low
                    </button>
                  </li>
                  <li className="mb-2 w-full border rounded-lg">
                    <button
                      onClick={() => {
                        setSortFelid({ ...sortFelid, sort: "price" });
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
                        });
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
                        });
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
                        });
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
                        });
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
                        });
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
              onClick={() => setSortFelid({})}
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
      <div className=" border hidden md:hidden lg:block rounded-lg px-4 py-5">
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
                    setSortFelid({ ...sortFelid, sort: "name" });
                  }}
                >
                  A To Z
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg">
                <button
                  onClick={() => {
                    setSortFelid({ ...sortFelid, sort: "-name" });
                  }}
                >
                  Z To A
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg">
                <button
                  onClick={() => {
                    setSortFelid({ ...sortFelid, sort: "-price" });
                  }}
                >
                  High to Low
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg">
                <button
                  onClick={() => {
                    setSortFelid({ ...sortFelid, sort: "price" });
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
                    setSortFelid({ ...sortFelid, category: "Indoor Plants" });
                  }}
                >
                  Indoor Plants
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({ ...sortFelid, category: "Outdoor Plants" });
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
                    });
                  }}
                >
                  Plant Care & Accessories
                </button>
              </li>
              <li className="mb-2 w-full border rounded-lg selected">
                <button
                  onClick={() => {
                    setSortFelid({ ...sortFelid, category: "Pots & Planters" });
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
                    });
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
            onClick={() => setSortFelid({})}
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
              <div key={item._id}>
                <Link to={`/productDetails/${item._id}`}>
                  <div className="border rounded-lg hover:border-[#228B22] delay-75 ease-in">
                    <img
                      className=" border-b-2 md:h-[260px] lg:h-[350px] p-2 w-full"
                      src={item.images[0]}
                      alt=""
                    />
                    <div className="p-2">
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className=" text-[#7e7e7e] mt-2">
                        {item.description.length > 55
                          ? item.description.slice(0, 55)
                          : item.description}
                        {item.description.length > 55 ? "..." : ""}
                      </p>
                      <p className="text-2xl font-bold mt-2">$ {item.price}</p>
                    </div>
                  </div>
                </Link>
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
