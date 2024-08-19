import { useEffect, useState } from "react";
import districts from "./districts";
import {
  useCreateOrderMutation,
  useGetMultipleProductQuery,
} from "../../redux/Product/ProductAPI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { TProduct } from "../shop/Products";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import {
  addToCart,
  deleteToCart,
  removeAllCarts,
} from "../../redux/fetures/addToCartSlice";
import { ImCross } from "react-icons/im";
import { toast } from "sonner";
import Swal from "sweetalert2";

type TSubDistrict = string[];
const Checkout = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [subdistrictOptions, setSubdistrictOptions] = useState(
    [] as TSubDistrict
  );
  const cartItems = useAppSelector(
    (state: RootState) => state.addToCart.products
  );
  const [cartItemsId, setCartItemsId] = useState([] as TSubDistrict);
  const { data, isLoading } = useGetMultipleProductQuery(cartItemsId);
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const [orderCreate] = useCreateOrderMutation();

  useEffect(() => {
    const newArray = [] as TSubDistrict;
    cartItems.map((item) => {
      newArray.push(item.id);
    });
    setCartItemsId(newArray);
  }, [cartItems, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (data?.data.length < 1) {
    return (
      <div className="flex justify-center items-center my-20 mx-5">
        <div className="p-5 bg-slate-100 rounded-lg">
          <h1 className="text-center text-2xl font-bold">
            You are not select any Product
          </h1>
          <Link
            to="/shop"
            className="btn my-5 flex justify-center hover:bg-[#76aa76] bg-[#8FBC8F] text-white"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const checkoutItems = data?.data.map((item: TProduct) => {
    const cartItem = cartItems.find((i) => i.id === item._id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const totalPrice = item.price * quantity;
    return totalPrice;
  });

  const totalPrice = checkoutItems
    .reduce((sum: number, item: string) => sum + item, 0)
    .toFixed(2);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.currentTarget.value;
    setSelectedDistrict(districtName);
    const district = districts.find((d) => d.name === districtName);

    if (district) {
      setSubdistrictOptions(district.subdistricts);
    }
    setSelectedSubdistrict("");
  };

  const handleSubdistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubdistrict(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const target = e.currentTarget;
      const name = target.name.value;
      const phone = target.phoneNumber.value;
      const email = target.email.value;
      const districtName = selectedDistrict;
      const subdistrict = selectedSubdistrict;
      const address = target.address.value;
      const customerInfo = {
        name,
        phone,
        email,
        districtName,
        subdistrict,
        address,
        products: cartItems,
        totalPrice,
      };
      const res = await orderCreate(customerInfo).unwrap();
      if (res?.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order create successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(removeAllCarts());
        Navigate("/shop");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  const handleCartItem = (
    id: string,
    value: string,
    status: string,
    maxQuantity: number
  ) => {
    const inputElement = document.getElementById(`${id}`) as HTMLInputElement;
    if (status === "plus") {
      const increaseOne = parseInt(inputElement.value) + 1;
      if (increaseOne <= maxQuantity) {
        inputElement.value = increaseOne.toString();
        dispatch(addToCart({ id, quantity: parseInt(value) + 1, maxQuantity }));
      }
    }
    if (status === "minus") {
      const decrease = parseInt(inputElement.value) - 1;
      if (decrease >= 1) {
        inputElement.value = decrease.toString();
        dispatch(addToCart({ id, quantity: parseInt(value) - 1, maxQuantity }));
      }
    }
    if (status === "default") {
      const felidValue = parseInt(value);
      if (maxQuantity >= felidValue) {
        inputElement.value = felidValue.toString();
        dispatch(addToCart({ id, quantity: Number(value), maxQuantity }));
      } else {
        inputElement.value = maxQuantity.toString();
        dispatch(addToCart({ id, quantity: maxQuantity, maxQuantity }));
      }
    }
  };

  const validatePhone = (e: React.FormEvent<HTMLInputElement>) => {
    const number = e.currentTarget.value;
    const operatorPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
    const checkOperator = number.slice(0, 3);

    if (number.length === 11) {
      if (operatorPrefixes.indexOf(checkOperator) < 0) {
        toast.error("Please Provide a valid Number");
      } else {
      }
    }
  };

  return (
    <div className="m-5 md:m-10 lg:m-10 flex flex-col md:flex-col lg:flex-row gap-y-5 md:gap-y-10 justify-between gap-x-5">
      <div className=" w-full md:w-full lg:w-3/6 ">
        <div>
          <h1 className="text-xl font-bold pb-5">Delivery Information :</h1>
        </div>
        <form
          className="bg-slate-100 p-5 rounded-lg"
          onSubmit={handleSubmit}
          action=""
        >
          <label htmlFor="name" className="text-lg font-medium">
            Name : <span className="text-red-500">*</span>
          </label>
          <input
            required
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
          />
          <label htmlFor="phone" className="text-lg font-medium">
            Phone Number : <span className="text-red-500">*</span>
          </label>
          <input
            required
            id="phone"
            type="text"
            onChange={validatePhone}
            minLength={11}
            maxLength={11}
            name="phoneNumber"
            placeholder="Your Phone Number"
            className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
          />
          <label htmlFor="email" className="text-lg font-medium">
            Email :
          </label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Your email"
            className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
          />
          <div className="flex justify-between gap-y-3 flex-wrap mb-3">
            <div>
              <label htmlFor="district" className="text-lg font-medium mr-2">
                District :
              </label>
              <select
                id="district"
                value={selectedDistrict}
                required
                onChange={handleDistrictChange}
                className="p-2 border-2 rounded-lg border-slate-500"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subdistrict" className="text-lg font-medium mr-2">
                Sub-District
              </label>
              <select
                id="subdistrict"
                required
                value={selectedSubdistrict}
                onChange={handleSubdistrictChange}
                disabled={!selectedDistrict}
                className="p-2 border-2 rounded-lg border-slate-500"
              >
                <option value="">Select Sub-District</option>
                {subdistrictOptions.map((subdistrict, index) => (
                  <option key={index} value={subdistrict}>
                    {subdistrict}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label htmlFor="address" className="text-lg font-medium">
            Your Address : <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            id="address"
            className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-[#8FBC8F] rounded-lg text-slate-500"
            name="address"
          ></textarea>
          <input
            type="checkbox"
            id="cashOnDelivery"
            checked
            name="cashOnDelivery"
            className="mb-6"
          />
          <label htmlFor="cashOnDelivery" className="text-lg font-medium ml-3">Cash On Delivery</label>
          {data?.data.length < 1 ? (
            <Link
              to="/shop"
              className="btn w-full hover:bg-[#76aa76] bg-[#8FBC8F] text-white"
            >
              Go to Shop
            </Link>
          ) : (
            <input
              type="submit"
              className="btn w-full hover:bg-[#76aa76] bg-[#8FBC8F] text-white"
            />
          )}
        </form>
      </div>
      <div className="w-full md:w-full lg:w-3/6">
        {data?.data.length < 1 ? (
          <div></div>
        ) : (
          <div>
            <div>
              <h1 className="text-xl font-bold pb-5">Order Summary :</h1>
            </div>
            <div>
              {data?.data?.map((product: TProduct) => (
                <div
                  key={product._id}
                  className="border flex justify-between items-center gap-x-3 mb-2 rounded-md"
                >
                  <div className="flex gap-x-3">
                    <img
                      className="w-32 md:w-20 lg:w-20 rounded-md border-r"
                      src={product.images[0]}
                      alt=""
                    />
                    <div>
                      <p className="text-lg font-medium">
                        {product.name.length > 60
                          ? product.name.slice(0, 60)
                          : product.name}
                        {product.name.length > 60 ? "..." : ""}
                      </p>
                      <p className="text-sm">
                        Quantity :{" "}
                        <span className="text-lg font-semibold">
                          {cartItems.map(
                            (item) => item.id === product._id && item.quantity
                          )}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Price :{" "}
                        {cartItems.map(
                          (item) =>
                            item.id === product._id &&
                            (item.quantity * product.price).toFixed(2)
                        )}
                      </p>
                      <div className="block my-3 md:hidden lg:hidden">
                        <div className="flex mr-4 items-center gap-x-5">
                          <div className="flex gap-x-3 items-center">
                            <FaPlus
                              onClick={
                                () =>
                                  handleCartItem(
                                    product._id,
                                    (document.getElementById(
                                      `${product._id}`
                                    ) as HTMLInputElement)!.value,
                                    "plus",
                                    product.stock
                                  )

                                // (document.getElementById(`${product._id}`) as HTMLInputElement)!.value
                                // (parseInt((document.getElementById(`${product._id}`) as HTMLInputElement)!.value+ 5)).toString()
                              }
                              className="cursor-pointer"
                            ></FaPlus>
                            <input
                              className="border border-slate-400 p-2 rounded-md w-20"
                              type="number"
                              name=""
                              onChange={(
                                e: React.FormEvent<HTMLInputElement>
                              ) =>
                                handleCartItem(
                                  product._id,
                                  e.currentTarget.value,
                                  "default",
                                  product.stock
                                )
                              }
                              id={product._id}
                              defaultValue={(() => {
                                const foundItem = cartItems.find(
                                  (item) => item.id === product._id
                                );
                                return foundItem
                                  ? foundItem.quantity.toString()
                                  : "1";
                              })()}
                              min={1}
                              max={product.stock}
                            />
                            <FaMinus
                              onClick={() =>
                                handleCartItem(
                                  product._id,
                                  (document.getElementById(
                                    `${product._id}`
                                  ) as HTMLInputElement)!.value,
                                  "minus",
                                  product.stock
                                )
                              }
                              className="cursor-pointer"
                            ></FaMinus>
                          </div>
                          <ImCross
                            onClick={() =>
                              dispatch(deleteToCart({ id: product._id }))
                            }
                            className="text-red-500 cursor-pointer"
                          ></ImCross>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block lg:block">
                    <div className="flex mr-4 items-center gap-x-5">
                      <div className="flex gap-x-3 items-center">
                        <FaPlus
                          onClick={
                            () =>
                              handleCartItem(
                                product._id,
                                (document.getElementById(
                                  `${product._id}`
                                ) as HTMLInputElement)!.value,
                                "plus",
                                product.stock
                              )

                            // (document.getElementById(`${product._id}`) as HTMLInputElement)!.value
                            // (parseInt((document.getElementById(`${product._id}`) as HTMLInputElement)!.value+ 5)).toString()
                          }
                          className="cursor-pointer"
                        ></FaPlus>
                        <input
                          className="border border-slate-400 p-2 rounded-md w-20"
                          type="number"
                          id={product._id}
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            handleCartItem(
                              product._id,
                              e.currentTarget.value,
                              "default",
                              product.stock
                            )
                          }
                          value={(() => {
                            const foundItem = cartItems.find(
                              (item) => item.id === product._id
                            );
                            return foundItem
                              ? foundItem.quantity.toString()
                              : "1";
                          })()}
                          min={1}
                          max={product.stock}
                        />
                        <FaMinus
                          onClick={() =>
                            handleCartItem(
                              product._id,
                              (document.getElementById(
                                `${product._id}`
                              ) as HTMLInputElement)!.value,
                              "minus",
                              product.stock
                            )
                          }
                          className="cursor-pointer"
                        ></FaMinus>
                      </div>
                      <ImCross
                        onClick={() =>
                          dispatch(deleteToCart({ id: product._id }))
                        }
                        className="text-red-500 cursor-pointer"
                      ></ImCross>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-100 p-2 my-4 rounded-lg">
              <h1 className="text-2xl font-bold mb-3 text-center">Order</h1>
              <span className="flex justify-between">
                <p className="text-lg font-semibold">Total Price : </p>
                <p className="text-lg font-semibold">$ {totalPrice}</p>
              </span>
              <span className="flex justify-between border-b border-black pb-2">
                <p className="text-lg font-semibold">Shipping Cost : </p>
                <p className="text-lg font-semibold">$ 10</p>
              </span>
              <span className="flex justify-between pt-2">
                <p className="text-lg font-semibold">Grand Total : </p>
                <p className="text-lg font-semibold text-white px-4 rounded-md bg-[#8FBC8F]">
                  $ {(Number(totalPrice) + 10).toFixed(2)}
                </p>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
