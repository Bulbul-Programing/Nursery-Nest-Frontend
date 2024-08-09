
const Product = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-xl font-medium">Total Product : <span className="text-2xl font-semibold">145</span></p>
                <div className="flex justify-between items-center gap-x-3">
                    <input type="text" className="border-2 border-slate-300 focus:border-[#228B22] outline-none rounded-md px-3 py-3 w-full" placeholder="Search hear" name="" id="" />
                    <button className="btn px-3 border-2 bg-white hover:bg-[#8FBC8F] hover:text-white hover:border-white border-[#8FBC8F]">Add new Product</button>
                </div>
            </div>
        </div>
    );
};

export default Product;