import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination } from "swiper/modules";
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

const TopProduct = () => {
  const [productItem, setProductItem] = useState("featured");
  const [params, setParams] = useState({sort : 'createdAt'});
  const { data, isLoading } = useGetAllProductQuery(params);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!data) {
    return <h1>Not found</h1>;
  }

  return (
    <div className="mb-10">
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Top Products</h1>
        <div className="flex justify-center gap-x-10 mt-5">
          <h1
            onClick={() => {
              setProductItem("featured"), setParams({sort : 'createdAt'});
            }}
            className={`text-2xl ${
              productItem === "featured" && "bg-[#228B22] text-white"
            } font-medium border-2 border-[#228B22]  rounded-md border-dashed px-4 py-2 cursor-pointer`}
          >
            Featured
          </h1>
          <h1
            onClick={() => {
              setProductItem("latest"), setParams({sort : '-createdAt'});
            }}
            className={`text-2xl ${
              productItem === "latest" && "bg-[#228B22] text-white"
            } font-medium border-2 border-[#228B22] rounded-md border-dashed px-4 py-2 cursor-pointer`}
          >
            Latest
          </h1>
        </div>
      </div>
      <div className="p-10 hidden md:block lg:block">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {data?.data &&
            data?.data?.slice(0, 8).map((item: TProduct) => (
              <SwiperSlide key={item._id}>
                <Link to={`/productDetails/${item._id}`}>
                  <div className="border rounded-lg hover:border-[#228B22] delay-75 ease-in">
                    <img
                      className=" md:h-[250px] lg:h-[350px] p-2 w-full"
                      src={item.images[0]}
                      alt=""
                    />
                    <div className="p-2">
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className="text-2xl font-bold mt-2">$ {item.price}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="p-10 block md:hidden lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {data?.data &&
            data?.data?.slice(0, 8).map((item: TProduct) => (
              <SwiperSlide key={item._id}>
                <Link to={`/productDetails/${item._id}`}>
                  <div className="border rounded-lg hover:border-[#228B22] delay-75 ease-in">
                    <img
                      className="h-[350px] w-full"
                      src={item.images[0]}
                      alt=""
                    />
                    <div className="p-2">
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className="text-2xl font-bold mt-2">$ {item.price}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopProduct;
