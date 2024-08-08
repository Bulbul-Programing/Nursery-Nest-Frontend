import { Link } from "react-router-dom";

const NewCollection = () => {
  const newCollectionData = [
    {
      title: "New Collection",
      name: "Springtime Blossoms Collection",
      description:
        "Discover our latest collection inspired by the vibrant colors and fresh blooms of spring. From adorable outfits to charming accessories, each piece is designed to bring joy and beauty to your little one's wardrobe. ",
    },
    {
      title: "Just For You",
      name: "Handpicked Treasures for Your Little One",
      description:
        "Welcome to our 'Just For You' section, where we curate a selection of exclusive items tailored to your unique tastes and needs. From personalized gifts to special limited editions, find the perfect treasures that are as special as your little sprout.",
    },
  ];
  return (
    <div className="my-10">
      <div className="flex mb-10 md:mb-0 lg:mb-0 flex-col md:flex-row lg:flex-row gap-x-10 mx-10 justify-between items-center">
        <img
          className="w-full md:w-[50%] lg:w-[50%] md:h-[250px] lg:h-[320px] rounded-xl"
          src="https://i.ibb.co/dkpFgLG/675x410-1-ezgif-com-webp-to-jpg-converter.jpg"
          alt=""
        />
        <div className="text-center w-full md:w-[50%] lg:w-[50%]">
          <p className="font-[lato] font-bold md:text-lg lg:text-xl py-3">
            {newCollectionData[0].title}
          </p>
          <h1 className="text-2xl text-[#228B22] pb-3">
            {newCollectionData[0].name}
          </h1>
          <p className="text-[#999999] hidden md:hidden lg:block">{newCollectionData[0].description}</p>
          <Link to='/shop' className="btn hover:bg-[#6ba56b] border-2 border-[#8FBC8F] my-1 md:my-4 lg:my-5 hover:text-white ml-3">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row lg:flex-row gap-x-10 mx-10 justify-between items-center">
        <div className="text-center w-full md:w-[50%] lg:w-[50%]">
          <p className="font-[lato] font-bold md:text-lg lg:text-xl py-3">
            {newCollectionData[1].title}
          </p>
          <h1 className="text-2xl text-[#228B22] pb-3">
            {newCollectionData[1].name}
          </h1>
          <p className="text-[#999999] hidden md:hidden lg:block">{newCollectionData[1].description}</p>
          <Link to='/shop' className="btn hover:bg-[#6ba56b] border-2 border-[#8FBC8F] my-1 md:my-4 lg:my-5 hover:text-white ml-3">
            {" "}
            Shop Now
          </Link>
        </div>
        <img
          className="w-full md:w-[50%] lg:w-[50%] md:h-[250px] lg:h-[320px] rounded-xl"
          src="https://i.ibb.co/QQFZzZG/675x410-2-ezgif-com-webp-to-jpg-converter.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default NewCollection;
