import { useState } from "react";
import { TFilter, TProduct } from "../../../pages/shop/Products";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../../redux/Product/ProductAPI";
import { useDebounce } from "../../../hooks/Debounce";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// type productDataType = {
//   _id: string;
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
//   description: string;
//   images: string[];
//   rating: number;
// };

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [searchValue, setSearchValue] = useState<TFilter>({
    sort: "-createdAt",
  });
  const { debounceValue, loading: loadingDebounce } = useDebounce(searchValue);
  const { data, isLoading, refetch } = useGetAllProductQuery(debounceValue);
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation()
  const imageHostingKey = import.meta.env.VITE_HOSTING_KEY;
  const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const [formData, setFormData] = useState({
    productTitle: '',
    price: 1,
    stock: 1,
    category: '',
    description: '',
  });

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
      const promises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(imageHosting, formData, {
          params: {
            key: imageHostingKey,
          },
        });
        return response.data.data.url;
      });

      const uploadedImageUrls = await Promise.all(promises);

      const data = {
        name,
        price,
        stock,
        category,
        description,
        images: uploadedImageUrls,
        rating: 1,
      };
      const res = await createProduct(data).unwrap();
      if (res.success) {
        setLoading(false);
        setFormData({
          productTitle: "",
          price: 0,
          stock: 0,
          category: "",
          description: "",
        });
        setFiles([]);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product create successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        (error.data.errorSources[0].message as any)
          ? (error.data.errorSources[0].message as string)
          : "something is wrong"
      );
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFiles(Array.from(files));
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setSearchValue({ searchTerm: e.currentTarget.value });
    } else {
      setSearchValue({ searchTerm: "" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteProduct = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(id)
          if (res?.data?.success) {
            refetch()
          }
        }
        catch (error : any) {
          console.log(error);
          toast.error(
            (error.data.errorSources[0].message as any)
              ? (error.data.errorSources[0].message as string)
              : "something is wrong"
          );
        }
      }
    });
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-y-3 justify-between items-center">
        <p className="text-xl font-medium">
          Total Product :{" "}
          <span className="text-2xl font-semibold">{data?.data?.length}</span>
        </p>
        <div className="flex justify-between items-center gap-x-3">
          <input
            type="text"
            className="border-2 border-slate-300 focus:border-[#228B22] outline-none rounded-md px-3 py-3 w-full"
            placeholder="Search hear"
            onChange={handleSearch}
          />
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn px-3 border-2 bg-white hover:bg-[#8FBC8F] hover:text-white hover:border-white border-[#8FBC8F]"
            onClick={() =>
              (document.getElementById(
                "addProductModal"
              ) as HTMLDialogElement)!.showModal()!
            }
          >
            Add New Product
          </button>
        </div>
          <dialog
            id="addProductModal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <form onSubmit={handleSubmit}>
                <input
                  className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                  type="text"
                  name="productTitle"
                  placeholder="Product Title"
                  value={formData.productTitle}
                  onChange={handleInputChange}
                  required
                />
                <div className="flex gap-x-3">
                  <input
                    className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                    type="text"
                    name="price"
                    placeholder="Price"
                    step="any"
                    min="1"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                    type="number"
                    name="stock"
                    id=""
                    min="1"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="stock"
                  />
                </div>
                <input
                  className="pr-4 w-full mb-6 outline-none  border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered "
                  onChange={handleFileChange}
                  type="file"
                  name="file"
                  multiple
                />
                <select
                  className="px-2 outline-none py-3 border-2 w-full mb-6 focus:border-blue-400 rounded-lg text-slate-500"
                  name="category"
                  id=""
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
                  value={formData.description}
                  onChange={handleInputChange}
                  id=""
                  placeholder="Product description"
                ></textarea>
                <div>
                  {loading === true ? (
                    <button className="btn bg-[#8FBC8F] w-full text-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </button>
                  ) : files?.length === 0 ? (
                    <input
                      className="btn  w-full text-center hover:text-black"
                      type="submit"
                      disabled
                      value="ADD"
                    />
                  ) : (
                    <input
                      className="btn bg-[#8FBC8F] hover:bg-[#6bac6b] w-full text-center text-white "
                      type="submit"
                      value="ADD"
                    />
                  )}
                </div>
              </form>
              <div className="modal-action ">
                <form method="dialog" className="w-full">
                  <button
                    onClick={() => setLoading(false)}
                    className="btn w-full text-white hover:bg-red-600 bg-red-500"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </dialog>
      </div>
      <div className="my-10">
        <div>
          {loadingDebounce ? (
            <p className="flex justify-center items-center my-5">
              <span className="loading loading-ring loading-lg"></span>
            </p>
          ) : (
            <div>
              {data?.data.length < 1 ? (
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
              ) : (
                <div className="overflow-x-auto">
                  <table className="table ">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-black text-center text-base">
                          Product Info
                        </th>
                        <th className="text-black  text-base">Price</th>
                        <th className="text-black  text-base">Stock</th>
                        <th className="text-black text-center text-base">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.map((product: TProduct) => (
                        <tr
                          key={product._id}
                          className="border-b mb-10 border-slate-500"
                        >
                          <td>
                            <div className="flex items-center gap-3 min-w-[350px]">
                              <div className="avatar">
                                <div className="mask mask-squircle h-16 w-16">
                                  <img
                                    src={product.images[0]}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-lg">
                                  {product.name}
                                </div>
                                <span className="text-base font-light">
                                  {product.description.slice(0, 40)}...
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="min-w-[150px]">
                            <span className="font-semibold">
                              Price :{" "}
                              <span className="text-lg">$ {product.price}</span>
                            </span>
                          </td>

                          <td className="min-w-[120px]">
                            <span
                              className={`font-medium ${product.stockStatus === "In"
                                ? "bg-[#8FBC8F]"
                                : "bg-red-400"
                                } px-2 py-1 text-white rounded-md`}
                            >
                              Stock :{" "}
                              <span className="text-lg">{product.stock}</span>
                            </span>
                          </td>

                          <td className="min-w-[200px]">
                            <div className="flex justify-center gap-x-3">
                              <Link
                              to={`/dashboard/update/product/${product._id}`}
                                className="btn bg-[#8FBC8F] hover:bg-[#60aa60] text-white"
                              >
                                Update
                              </Link>
                              <button onClick={() => handleDeleteProduct(product._id)} className="btn bg-red-500 hover:bg-red-600 text-white">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
