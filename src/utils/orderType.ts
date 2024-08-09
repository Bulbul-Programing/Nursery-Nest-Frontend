export type TCreateProduct = {
  id: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    rating: number;
    stockStatus: "In" | "Out";
  };
  quantity : number,
  maxQuantity : number
};

export type TCreateOrder = {
  name: string;
  address: string;
  districtName: string;
  email?: string;
  phone: string;
  subdistrict: string;
  totalPrice: string;
  products: TCreateProduct[];
};
