import { useState } from "react";
import { useGetAllProductQuery } from "../../redux/Product/ProductAPI";
import { Link } from "react-router-dom";

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

const Products = () => {
  const [priceFilter, setPriceFilter] = useState(["sort", "price"]);
  const [priceBtn, setPriceBtn] = useState("HTL");
  const { data, isLoading } = useGetAllProductQuery(priceFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!data) {
    return (
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
    );
  }
  console.log(data.data);
  return (
    <div className="m-5 flex gap-x-5">
      <div className="w-1/4 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Filter</h1>
        <div className=" mx-3">
          <p className="text-lg font-semibold my-2">Price</p>
          <details className="dropdown">
            <summary className="btn m-1">Filter</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] md:w-36 lg:w-64 p-2 shadow">
              <li className="mb-2 border rounded-lg">
                <button
                  onClick={() => {
                    setPriceBtn("HTL"), setPriceFilter(["sort", "price"]);
                  }}
                >
                  High to Low
                </button>
              </li>
              <li className="mb-2 border rounded-lg">
                <button
                  onClick={() => {
                    setPriceBtn("LTH"), setPriceFilter(["sort", "-price"]);
                  }}
                >
                  Low to High
                </button>
              </li>
            </ul>
          </details>
        </div>
      </div>
      <div className="w-3/4 grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {data?.data &&
          data?.data?.slice(0, 8).map((item: TProduct) => (
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
    </div>
  );
};

export default Products;
