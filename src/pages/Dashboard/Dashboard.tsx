import { CSSProperties, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import {
  useGetAllOrderQuery,
  useLastSevenDaysOrderQuery,
  useLastSevenDaysVisitorsQuery,
} from "../../redux/Product/ProductAPI";
import { TCreateOrder } from "../../utils/orderType";

interface CustomCSSProperties extends CSSProperties {
  "--value"?: string | number;
  "--size"?: string | number;
  "--thickness"?: string | number;
}

type TSevenOrderData = { _id: string; totalSales: number; count?: number };
type TSevenVisitorData = { _id: string; totalVisitors: number; count?: number };

type TOrderData = {
  Date: string;
  Order: number;
};
type TOrderPrice = {
  Date: string;
  Price: number;
};
type TVisitors = {
  Date: string;
  visitor: number;
};

const Dashboard = () => {
  const { data: orders, isLoading } = useGetAllOrderQuery({
    page: 1,
    limit: 10,
  });
  const { data: lastSevenDaysOrder, isLoading: loading } =
    useLastSevenDaysOrderQuery(undefined);
  const {data : lastSevenDaysVisitors, isLoading : loadingVisitor} = useLastSevenDaysVisitorsQuery(undefined)
  const [orderData, setOrderData] = useState<TOrderData[]>([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [orderPrice, setOrderPrice] = useState<TOrderPrice[]>([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [visitors, setVisitors] = useState<TVisitors[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);

  const customStyle: CustomCSSProperties = {
    "--value": "70",
    "--thickness": "1rem",
    "--size": "6rem",
  };

  useEffect(() => {
    if (lastSevenDaysOrder?.success) {
      const totalSeal: TOrderData[] = lastSevenDaysOrder.data.map(
        (order: TSevenOrderData) => ({
          Date: order._id,
          Order: order.count,
        })
      );
      const totalSealPrice: TOrderPrice[] = lastSevenDaysOrder.data.map(
        (order: TSevenOrderData) => ({
          Date: order._id,
          Price: order.totalSales,
        })
      );

      const totalOrder = lastSevenDaysOrder.data.reduce(
        (accumulator: number, currentOrder: TSevenOrderData) => {
          return accumulator + (currentOrder.count as number);
        },
        0
      );

      const totalPrice = lastSevenDaysOrder.data.reduce(
        (accumulator: number, currentOrder: TSevenOrderData) => {
          return accumulator + (currentOrder.totalSales as number);
        },
        0
      );

      setTotalOrder(totalOrder);
      setTotalOrderPrice(totalPrice);
      setOrderPrice(totalSealPrice);
      setOrderData(totalSeal);
    }
    if(lastSevenDaysVisitors?.success){
      const totalVisitor: TVisitors[] = lastSevenDaysVisitors.data.map(
        (visitor: TSevenVisitorData) => ({
          Date: visitor._id,
          visitor: visitor.count,
        })
      );
      const totalVisitors = lastSevenDaysVisitors.data.reduce(
        (accumulator: number, currentVisitor: TSevenVisitorData) => {
          return accumulator + (currentVisitor.count as number);
        },
        0
      );
      setTotalVisitors(totalVisitors)
      setVisitors(totalVisitor)
    }
  }, [lastSevenDaysOrder, lastSevenDaysVisitors]);

  if (isLoading || loading || loadingVisitor) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!orders) {
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
  return (
    <div>
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
        <div className="rounded-xl shadow-xl bg-[url('https://i.ibb.co/GdCJ2Q5/goal.jpg')] bg-cover bg-center">
          <div className="rounded-xl h-full p-5 flex justify-between items-center bg-gradient-to-r from-[#0040a6]/50 to-blue-500/80">
            <div className=" w-2/3 text-white">
              <p className=" md:text-xl lg:text-2xl my-2 font-bold">
                Great! Your goal is almost complete
              </p>
              <p className="text-sm md:text-sm lg:text-base">
                Great! Your goal is almost complete You have completed 70% of
                your target. You can view the work details.
              </p>
            </div>
            <div
              className="radial-progress text-white w-24 h-24  md:w-24 md:h-24 lg:h-24 lg:w-24"
              style={customStyle}
              role="progressbar"
            >
              70%
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl h-[250px] py-5 flex justify-between">
          <div className="flex w-1/3 md:w-4/12 lg:w-3/12 space-y-3 flex-col justify-center items-center">
            <IoBagCheckOutline className="text-[60px] p-3 mask mask-hexagon bg-[#22C55E] text-white">
              {" "}
            </IoBagCheckOutline>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Total Seals</p>
              <p className=""> last 7 days</p>
            </div>
            <p className="text-2xl font-semibold">{totalOrder}</p>
          </div>
          <div className="w-2/3 md:w-8/12 lg:w-9/12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orderData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="1 3" />
                <XAxis dataKey="Date" />
                <Tooltip />
                <Bar
                  dataKey="Order"
                  fill="#8884d8"
                  activeBar={<Rectangle stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl h-[250px] py-5 flex justify-between">
          <div className="flex w-1/3 md:w-4/12 lg:w-3/12 space-y-3 flex-col justify-center items-center">
            <FaDollarSign className="text-[60px] p-3 mask mask-hexagon bg-[#FF5200] text-white">
              {" "}
            </FaDollarSign>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Total Income</p>
              <p className=""> last 7 days</p>
            </div>
            <p className="text-2xl font-semibold">${(totalOrderPrice).toFixed(2)}</p>
          </div>
          <div className="w-2/3 md:w-8/12 lg:w-9/12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orderPrice}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="1 3" />
                <XAxis dataKey="Date" />
                <Tooltip />
                <Bar
                  dataKey="Price"
                  fill="#8FBC8F"
                  activeBar={<Rectangle stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl h-[250px] py-5 flex justify-between">
          <div className="flex w-1/3 md:w-4/12 lg:w-3/12 space-y-3 flex-col justify-center items-center">
            <FaRegUser className="text-[60px] p-4 mask mask-hexagon bg-[#2377FC] text-white">
              {" "}
            </FaRegUser>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Total Visitor</p>
              <p className=""> last 7 days</p>
            </div>
            <p className="text-2xl font-semibold">{totalVisitors}</p>
          </div>
          <div className="w-2/3 md:w-8/12 lg:w-9/12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visitors}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="1 3" />
                <XAxis dataKey="Date" />
                <Tooltip />
                <Bar
                  dataKey="visitor"
                  fill="#97C0FF"
                  activeBar={<Rectangle stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="border rounded-lg shadow-2xl p-5 my-10 bg-white">
        <h1 className="text-xl font-medium">Resent Orders</h1>
        <div>
          {orders?.data.length < 1 ? (
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
                  {orders?.data?.map((order: TCreateOrder, index: string) => (
                    <tr key={index}>
                      <td>
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
                      <td>
                        <span className="font-bold">{order.name}</span>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {order.districtName}, {order.subdistrict},{" "}
                          {order.address}
                        </span>
                      </td>
                      <td>
                        <span className="font-semibold">
                          Quantity: {order.products[0].quantity}
                        </span>{" "}
                        <br />
                        <span className="font-medium">
                          Price : {order.products[0].id.price}
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
    </div>
  );
};

export default Dashboard;
