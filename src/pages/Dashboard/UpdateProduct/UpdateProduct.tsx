import {
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/Product/ProductAPI";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { uploadMultipleImages } from "../../../utils/UploadBlobImage";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleProductQuery(id);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [previousImage, setPreviousImage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.images) {
      setVisibleImages(data.data.images);
      setPreviousImage(data.data.images);
    }
  }, [data]);

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
            No Data Found!
          </h1>
          <img
            className="w-[500px] mx-auto"
            src="https://i.ibb.co/74kjdxL/55024593-9264822.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    let fileUrls: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        fileUrls.push(url);
      }
    }
    setUploadedFiles((prev) => [...prev, ...fileUrls]);
    setVisibleImages((prev) => [...prev, ...fileUrls]);
  };

  const handleRemoveImage = (image: string) => {
    if (visibleImages.length < 2) {
      toast.error("Please Select minimum one Image!");
    } else {
      setPreviousImage((prev) => prev.filter((img) => img !== image));
      setVisibleImages((prev) => prev.filter((img) => img !== image));
      setUploadedFiles((prev) => prev.filter((img) => img !== image));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const target = e.currentTarget;
      const name = target.productTitle.value;
      const price = Number(target.price.value);
      const stock = parseInt(target.stock.value);
      const category = target.category.value;
      const description = target.description.value;

      const uploadImage = await uploadMultipleImages(uploadedFiles);

      const images = [...previousImage, ...uploadImage];
      const data = {
        id,
        data: {
          name,
          price,
          stock,
          category,
          description,
          images,
          rating: 1,
          stockStatus: stock < 1 ? "Out" : "In",
        },
      };
      const res = await updateProduct(data).unwrap();
      if (res.success) {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product create successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/product");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        (error?.data?.errorSources[0]?.message as any)
          ? (error?.data?.errorSources[0]?.message as string)
          : "something is wrong"
      );
      setLoading(false);
    }
  };
  return (
    <div className=" mx-auto m-5 w-full md:w-3/4 lg:w-1/2">
      <h1 className="text-2xl font-bold text-center mb-5">
        Update Your Product
      </h1>
      <div className="bg-white p-5 rounded-lg">
        <div className="flex flex-wrap gap-3 px-2 mb-5 shadow-lg rounded-lg">
          {visibleImages.map((img: string, index: number) => (
            <div key={index} className="relative group">
              <img
                src={img}
                className="w-24 h-24 border hover:cursor-pointer rounded-full my-2"
                alt=""
              />
              <ImCross
                onClick={() => handleRemoveImage(img)}
                className="absolute top-2 hidden group-hover:block right-4 text-red-400 cursor-pointer hover:text-red-500"
              />
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            defaultValue={data.data.name}
            className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
            name="productTitle"
          />
          <div className="flex gap-x-3">
            <input
              type="text"
              defaultValue={data.data.price}
              step="any"
              className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
              name="price"
            />
            <input
              type="number"
              defaultValue={data.data.stock}
              min={0}
              className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
              name="stock"
            />
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="file-input mb-6 file-input-bordered w-full"
          />
          <select
            className="px-2 outline-none py-3 border-2 w-full mb-6 focus:border-blue-400 rounded-lg text-slate-500"
            name="category"
            defaultValue={data.data.category}
          >
            <option
              className="rounded-lg text-slate-500 p-2"
              value="DefaultCategory"
            >
              Select Category
            </option>
            <option
              className="rounded-lg text-slate-500 p-2"
              value="Indoor Plants"
            >
              Indoor Plants
            </option>
            <option
              className="rounded-lg text-slate-500 p-2"
              value="Outdoor Plants"
            >
              Outdoor Plants
            </option>
            <option
              className="rounded-lg text-slate-500 p-2"
              value="Plant Care & Accessories"
            >
              Plant Care & Accessories
            </option>
            <option
              className="rounded-lg text-slate-500 p-2"
              value="Pots & Planters"
            >
              Pots & Planters
            </option>
            <option
              className="rounded-lg text-slate-500 p-2"
              value="Gardening Tools & Supplies"
            >
              Gardening Tools & Supplies
            </option>
          </select>
          <textarea
            className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
            name="description"
          >
            {data.data.description}
          </textarea>
          <div className="flex justify-end gap-x-3">
            {loading ? (
              <button className="btn  hover:bg-[#69b169] text-white" disabled><span className="loading loading-spinner bg-[#8FBC8F] loading-sm"></span></button>
            ) : (
              <input
                type="submit"
                className="btn bg-[#8FBC8F] hover:bg-[#69b169] text-white"
                value="Update Product"
              />
            )}
            <Link
              to="/dashboard/product"
              className="btn bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
