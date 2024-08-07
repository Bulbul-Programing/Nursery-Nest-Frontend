import Products from "./Products";

const Shop = () => {
  return (
    <div>
      <div className='bg-[url("https://i.ibb.co/J75n8bM/osman-hussaini-g10-BTLm3g-G8-unsplash.jpg")] bg-cover bg-center bg-fixed'>
        <h1 className="py-20 font-[Pacifico] text-center text-4xl font-semibold bg-[#519651] bg-opacity-60 text-white">
          Shop
        </h1>
      </div>
      <Products></Products>
    </div>
  );
};

export default Shop;
