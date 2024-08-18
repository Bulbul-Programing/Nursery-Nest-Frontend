import { useState } from "react";
import { useSingleProductQuery } from "../../redux/Product/ProductAPI";
import { Link, useParams } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/fetures/addToCartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleProductQuery(id);
  const [selectImg, setSelectImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

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

  const handleImageIndex = (index: number) => {
    setSelectImg(index);
  };

  const handleQuantity = (value: string) => {
    if (value === "minus") {
      if (quantity === 1) {
        return;
      } else {
        setQuantity(quantity - 1);
      }
    }

    if (value === "plus") {
      if (data.data.stock > quantity) setQuantity(quantity + 1);
    }
  };

  const handleValue = (e: React.FormEvent<HTMLInputElement>) => {
    if (data.data.stock >= parseInt(e.currentTarget.value)) {
      setQuantity(parseInt(e.currentTarget.value));
    }
  };

  const handleZoom = () => {
    const image = document.getElementById("image-zoom") as HTMLElement;

    image.addEventListener("mousemove", (e: MouseEvent) => {
      const x = e.clientX - (e.target as HTMLElement).offsetLeft;
      const y = e.clientY - (e.target as HTMLElement).offsetTop;

      image.style.transformOrigin = `${x}px ${y}px`;
      image.style.transform = "scale(2)";
    });

    image.addEventListener("mouseleave", () => {
      image.style.transformOrigin = `center`;
      image.style.transform = "scale(1)";
    });
  };

  return (
    <div>
      {data.data && (
        <div className=" mx-5 md:mx-10 lg:mx-20 my-10 ">
          <div className="flex flex-col md:flex-row lg:flex-row">
            <div className=" w-full md:w-1/2 lg:w-1/2">
              <div id="zoom-image-container" className="overflow-hidden">
                <img
                  onMouseMove={handleZoom}
                  id="image-zoom"
                  className=" border cursor-zoom-in rounded-md w-full "
                  src={data.data.images[selectImg]}
                  alt=""
                />
              </div>
              <div className="overflow-x-auto my-3 gap-x-2 flex items-center">
                {data.data.images.map((img: string, index: number) => (
                  <img
                    key={index}
                    onClick={() => handleImageIndex(index)}
                    className={`${
                      selectImg === index && "border-[#84a793] border-2"
                    } p-[2px] w-20 h-20 cursor-pointer rounded-md flex justify-center items-center `}
                    src={img}
                    alt=""
                  />
                ))}
              </div>
            </div>
            <div className=" md:mx-5 lg:mx-10 my-5 md:w-1/2 lg:w-1/2">
              <p className="text-lg lg:text-2xl font-bold  border-b pb-3">
                {data.data.name}
              </p>
              <div className="py-5 border-b">
                <div className="flex items-center gap-x-2">
                  <p className="flex text-base md:text-base lg:text-xl items-center text-[#8FBC8F] font-bold">
                    <FaDollarSign className="text-lg md:text-2xl lg:text-2xl font-extrabold"></FaDollarSign>{" "}
                    <span className="text-2xl">
                      {(data.data.price * quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="mt-5 bg-slate-100 inline-block px-4 py-1 rounded-lg">
                    Category:{" "}
                    <span className="font-semibold">{data.data.category}</span>
                  </p>
                </div>
                <div>
                  <p className="mt-5 bg-slate-100 inline-block px-4 py-1 rounded-lg">
                    In Stock :{" "}
                    <span className="font-bold"> {data.data.stock}</span>
                  </p>
                </div>
                <div className="flex items-center  gap-x-4 mt-5">
                  <p className="text-lg font-medium">Quantity : </p>
                  <div className="flex items-center gap-x-4">
                    <FaMinus
                      onClick={() => handleQuantity("minus")}
                      className="cursor-pointer text-2xl font-bold"
                    ></FaMinus>
                    <input
                      className="w-[80px] text-slate-600 font-medium px-4 outline-none focus:border-blue-400 rounded-sm py-2 border"
                      type="number"
                      defaultValue="1"
                      max={data.data.stock}
                      onChange={handleValue}
                      value={quantity}
                      min="1"
                    />
                    <FaPlus
                      onClick={() => handleQuantity("plus")}
                      className="cursor-pointer text-2xl"
                    ></FaPlus>
                  </div>
                </div>
              </div>
              <h1 className={`text-[#8FBC8F] my-2 font-bold`}>
                {data.data.stockStatus == "Out" && "Product Stock Out!"}
              </h1>
              <div className="flex justify-start">
                {data.data.stock < 1 ? (
                  <div className="flex gap-x-3 justify-start">
                    <button
                      disabled
                      className="px-5 d py-3 my-2 disabled:bg-slate-100 mb-8  text-slate-600 cursor-not-allowed font-medium rounded-md"
                    >
                      Bye
                    </button>
                    <button
                      disabled
                      className="px-5 d py-3 my-2 disabled:bg-slate-100 mb-8  text-slate-600 cursor-not-allowed font-medium rounded-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <Link
                      //   onClick={() => handleCartItem(product)}
                      to={`/checkout`}
                    >
                      <button
                        id="checkout-fb-pixel"
                        onClick={() => dispatch(addToCart({ id : data.data._id, quantity: quantity, maxQuantity : data.data.stock }))}
                        className="px-5 py-3 my-2 bg-[#8FBC8F] mb-8 hover:bg-[#669c66] delay-75 transition ease-in-out text-white font-medium rounded-md"
                      >
                        Bye Now
                      </button>
                    </Link>
                    <button
                      id="add-to-cart-fb-pixel"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: data.data._id,
                            quantity: quantity,
                            maxQuantity: data.data.stock,
                          })
                        )
                      }
                      className="px-5 py-3 my-2 bg-[#8FBC8F] mb-8 hover:bg-[#669c66] delay-75 transition ease-in-out text-white font-medium rounded-md ml-3"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-medium pb-2 border-b mt-10 inline-block">
              Product Details:
            </h1>
            <p className="mt-2 text-slate-500">{data.data.description}</p>
          </div>
          <div>
            <h1 className="text-2xl font-medium pb-2 border-b mt-10 inline-block">
              Ratings & Reviews
            </h1>
            <p className="mt-2 text-slate-500">Ratings & Reviews coming...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
