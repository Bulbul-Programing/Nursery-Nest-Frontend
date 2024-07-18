import { useGetAllProductQuery } from "../../redux/Product/ProductAPI";

const Products = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!data) {
    return <div className="my-5">
        <h1 className="text-4xl font-semibold text-center my-2">No Data Found !</h1>
        <img className="w-[500px] mx-auto " src="https://i.ibb.co/74kjdxL/55024593-9264822.jpg" alt="" />
    </div>;
  }

  return (
    <div>
      <div>
            
      </div>
      <div>

      </div>
    </div>
  );
};

export default Products;
