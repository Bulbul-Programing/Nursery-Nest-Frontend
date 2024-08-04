import { useEffect, useState } from "react";
import districts from "./districts";
import { useGetMultipleProductQuery } from "../../redux/Product/ProductAPI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";
import { TProduct } from "../shop/Products";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { addToCart } from "../../redux/fetures/addToCartSlice";

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

  useEffect(() => {
    const newArray = [] as TSubDistrict;
    cartItems.map((item) => {
      newArray.push(item.id);
    });
    setCartItemsId(newArray);
  }, [cartItems]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.currentTarget.value;
    setSelectedDistrict(districtName);
    console.log(districts.length);
    const district = districts.find((d) => d.name === districtName);

    if (district) {
      setSubdistrictOptions(district.subdistricts);
    }
    setSelectedSubdistrict("");
  };

  const handleSubdistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubdistrict(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const target = e.currentTarget;
    const name = target.name.value;
    const phone = target.phoneNumber.value;
    const email = target.email.value;
    const districtName = selectedDistrict;
    const subdistrict = selectedSubdistrict;
    const customerInfo = { name, phone, email, districtName, subdistrict };
    console.log(customerInfo);
  };

  const handleCartItem = (
    id: string,
    value: string,
    status: string,
    maxQuantity: number
  ) => {
    const g = Number((document.getElementById(`${id}`) as HTMLInputElement)!.value) + 1 ;
   const s= cartItems.find({id})
    
    (document.getElementById(`${id}`) as HTMLInputElement)!.value = g.toString()
    // console.log(data?.data);  
    // console.log(id, value, status, maxQuantity);
  };
  
  return (
    <div className="m-10 flex justify-between gap-x-5">
      <div className="w-3/6 border">
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
          <div className="flex justify-between flex-wrap mb-3">
            <div>
              <label htmlFor="district" className="text-lg font-medium mr-2">
                District :
              </label>
              <select
                id="district"
                value={selectedDistrict}
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
      <div className="w-3/6">
        {data?.data.length < 1 ? (
          <div className="p-5 bg-slate-100 rounded-lg">
            <h1 className="text-center text-2xl font-bold">
              You are not select any Product
            </h1>
            <Link
              to="/shop"
              className="btn my-5 w-full hover:bg-[#76aa76] bg-[#8FBC8F] text-white"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div>
            <div>
              <h1 className="text-xl font-bold pb-5">Order Summary :</h1>
            </div>
            <div>
              {data?.data?.map((product: TProduct) => (
                <div className="border flex justify-between items-center gap-x-3 mb-2 rounded-md">
                  <div className="flex gap-x-3">
                    <img
                      className="w-20 rounded-md border-r"
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
                    </div>
                  </div>
                  <div className="flex mr-4 gap-x-3 items-center">
                    <FaPlus
                      onClick={() =>
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
                      className="border border-slate-400 p-2 rounded-md w-24"
                      type="number"
                      name=""
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
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
                        return foundItem ? foundItem.quantity.toString() : "1";
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
