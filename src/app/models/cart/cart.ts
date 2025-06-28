import { IProduct } from "../product/products";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
