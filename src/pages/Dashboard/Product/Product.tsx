import { TProduct } from "../../../pages/shop/Products";
import { useGetAllProductQuery } from "../../../redux/Product/ProductAPI";

const Product = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined);

  if (isLoading) {
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
  console.log(data?.data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">
          Total Product : <span className="text-2xl font-semibold">145</span>
        </p>
        <div className="flex justify-between items-center gap-x-3">
          <input
            type="text"
            className="border-2 border-slate-300 focus:border-[#228B22] outline-none rounded-md px-3 py-3 w-full"
            placeholder="Search hear"
            name=""
            id=""
          />
          <button className="btn px-3 border-2 bg-white hover:bg-[#8FBC8F] hover:text-white hover:border-white border-[#8FBC8F]">
            Add new Product
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
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-black">Product</th>
                  <th className="text-black">Customer Info</th>
                  <th className="text-black">Price</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((product : TProduct) => (
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product.images[0]}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-bold">{product.name}</span>
                      <br />
                      <span className="badge badge-ghost badge-sm">
                       {}
                      </span>
                    </td>
                    <td>
                      <span className="font-semibold">
                        Quantity: {product.stock}
                      </span>{" "}
                      <br />
                      <span className="font-medium">
                        Price : {product.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
