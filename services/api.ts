import * as mock from "../product/mock.json";
import {Product} from "../types/types";

const api = {
  getProducts: (): Promise<Product[]> =>
    new Promise((resolve, reject) => {
      try {
        resolve(mock.products);
      } catch (e) {
        reject({error: e});
      }
    }),
};

export default api;
