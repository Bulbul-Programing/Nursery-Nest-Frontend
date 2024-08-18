import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoMdGift } from "react-icons/io";

const OurService = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 mx-10 gap-y-5 my-20 gap-x-10">
      <div className="text-left md:text-center lg:text-center flex flex-row md:flex-col lg:flex-col items-center space-x-3 shadow-md rounded-md p-3 space-y-2">
        <div className="flex justify-center">
          <BiSupport className="text-4xl font-bold text-[#228B22]"></BiSupport>
        </div>
        <div>
          <p className="md:text-base lg:text-lg font-semibold">
            24 X 7 Free Support
          </p>
          <p className="text-[#999999] text-xs">
            Need help? We're available anytime, day or night, to provide you
            with the best customer service.
          </p>
        </div>
      </div>
      <div className="text-left md:text-center lg:text-center flex flex-row md:flex-col lg:flex-col items-center space-x-3 shadow-md rounded-md p-3 space-y-2">
        <div className="flex justify-center">
          <LiaShippingFastSolid className="text-4xl font-bold text-[#228B22]"></LiaShippingFastSolid>
        </div>
        <div>
          <p className="md:text-base lg:text-lg font-semibold">Free Shipping</p>
          <p className="text-[#999999] text-xs">
            No hidden fees, no surprises. Enjoy the convenience of free shipping
            on all your orders.
          </p>
        </div>
      </div>
      <div className="text-left md:text-center lg:text-center flex flex-row md:flex-col lg:flex-col items-center space-x-3 shadow-md rounded-md p-3 space-y-2">
        <div className="flex justify-center">
          <MdOutlineAttachMoney className="text-4xl font-bold text-[#228B22]"></MdOutlineAttachMoney>
        </div>
        <div>
          <p className=" md:text-base lg:text-lg  font-semibold">
            Money Back Guarantee
          </p>
          <p className="text-[#999999] text-xs">
            Satisfaction guaranteed or your money back. Shop with peace of mind.
          </p>
        </div>
      </div>
      <div className="text-left md:text-center lg:text-center flex flex-row md:flex-col lg:flex-col items-center space-x-3 shadow-md rounded-md p-3 space-y-2">
        <div className="flex justify-center">
          <IoMdGift className="text-4xl font-bold text-[#228B22]"></IoMdGift>
        </div>
        <div>
          <p className="md:text-base lg:text-lg font-semibold">Win a Gift</p>
          <p className="text-[#999999] text-xs">
            Every purchase gives you a chance to win exciting gifts. Enjoy
            special rewards with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
