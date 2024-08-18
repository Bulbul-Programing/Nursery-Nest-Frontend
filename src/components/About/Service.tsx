
const Service = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 text-center justify-between m-5 md:m-10 lg:m-10">
            <div className="group p-4 gap-y-3 flex flex-col items-center">
                <img src="https://i.ibb.co/6n2Rr5j/icon-garden-care.png" alt="" />
                <p className="text-xl group-hover:text-[#8FBC8F] font-semibold">Garden Care</p>
                <p className="text-sm text-slate-500">Comprehensive garden care to maintain the health and aesthetics of your garden. </p>
            </div>
            <div className="group p-4 gap-y-3 flex flex-col items-center">
                <img src="https://i.ibb.co/BcRJ6xR/icon-watering-graden.png" alt="" />
                <p className="text-xl group-hover:text-[#8FBC8F] font-semibold">Plant Renovation</p>
                <p className="text-sm text-slate-500">Revitalize your garden with our plant renovation service. We prune, trim, and rejuvenate your plants.</p>
            </div>
            <div className="group p-4 gap-y-3 flex flex-col items-center">
                <img src="https://i.ibb.co/R3NGrhP/icon-seed-supply.png" alt="" />
                <p className="text-xl group-hover:text-[#8FBC8F] font-semibold">Seed Supply</p>
                <p className="text-sm text-slate-500">Get high-quality seeds for a variety of plants, guaranteed to sprout and thrive.</p>
            </div>
            <div className="group p-4  gap-y-3 flex flex-col items-center">
                <img src="https://i.ibb.co/3SyhHyy/icon-plant-renovation.png" alt="" />
                <p className="text-xl group-hover:text-[#8FBC8F] font-semibold">Watering Garden</p>
                <p className="text-sm text-slate-500">Ensure your garden stays lush and vibrant with our expert watering services.</p>
            </div>
        </div>
    );
};

export default Service;
