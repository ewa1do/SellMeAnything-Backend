import fs from 'fs';
import { v4 as uuid } from 'uuid';

export interface DataRequest {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: string;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

const productsJSON = JSON.parse(
  fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
);

const { products } = productsJSON;

const formattedProds = products.map((product: DataRequest) => {
  return {
    ...product,
    id: uuid(),
  };
});

export const updateProductsID = function () {
  return fs.writeFileSync(
    `${__dirname}/data/products-with-uuid.json`,
    JSON.stringify(formattedProds),
    { encoding: 'utf-8' }
  );
};

export const filePromise = function (file: any) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) reject('I could not found the file 😥');

      resolve(data);
    });
  });
};
