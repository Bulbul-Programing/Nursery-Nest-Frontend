import { TCreateOrder } from "@/utils/orderType";
import {
  useGetAllOrderQuery,
  useUpdateOrderMutation,
} from "../../../redux/Product/ProductAPI";

const Order = () => {
  const { data, isLoading } = useGetAllOrderQuery(undefined);
  const [updateOrder] = useUpdateOrderMutation();

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

  const handleOrder = (id: string, status: string) => {
    updateOrder({ id, data:{status} });
  };

  return (
    <div>
      <h1 className="text-3xl font-medium"> Total order : <span className="text-2xl font-semibold">{data?.data?.length}</span></h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th className="text-black">Product</th>
                <th className="text-black">Customer Info</th>
                <th className="text-black">Price</th>
                <th className="text-black">Status</th>
                <th className="text-black text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((order: TCreateOrder) => (
                <tr className="border-b border-slate-400">
                  <td className="min-w-56 md:min-w-56">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={order.products[0].id.images[0]}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {order.products[0].id.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="min-w-56 md:min-w-56">
                    <span className="font-bold">{order.name}</span>
                    <br />
                    <span className="font-medium text-slate-500">
                      Address :{order.districtName}, {order.subdistrict},{" "}
                      {order.address}
                    </span>{" "}
                    <br />
                    <span className="font-medium text-slate-500">
                      Phone: {order.phone}
                    </span>
                  </td>
                  <td className="min-w-36 md:min-w-36">
                    <span className="font-semibold">
                      Quantity: {order.products[0].quantity}
                    </span>{" "}
                    <br />
                    <span className="font-medium">
                      Price : {order.products[0].id.price}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${
                        order.status === "Pending" && "bg-yellow-500"
                      } ${order.status === "Pending" && "bg-yellow-500"} ${
                        order.status === "Confirmed" && "bg-blue-500"
                      } ${
                        order.status === "Cancel" && "bg-red-500"
                      } text-white px-2 py-1 rounded-lg font-medium`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center gap-x-3">
                      <button
                        onClick={() => handleOrder(order._id, "Confirmed")}
                        className="btn bg-[#8FBC8F] hover:bg-[#60aa60] text-white"
                      >
                        Confirmed
                      </button>
                      <button
                        onClick={() => handleOrder(order._id, "Cancel")}
                        className="btn bg-red-500 hover:bg-red-600 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
