import fs from "node:fs";
import fsPromises from "fs/promises";
import * as Uuid from "uuid";
import path from "path";
import { json } from "express";

const DATA_FOLDER = path.join("src", "Data");
const PRODUCTS_FILE = path.join(DATA_FOLDER, "productsData.json");
const id = Uuid.v4();

// creating a folder and a file if they don't already exist
const JsonData = async () => {
  try {
    if (!fs.existsSync(DATA_FOLDER)) {
      await fsPromises.mkdir(DATA_FOLDER);
    }
    const initialProductsData = [];
    if (!fs.existsSync(PRODUCTS_FILE)) {
      await fsPromises.writeFile(PRODUCTS_FILE, `[]`, { encoding: "utf8" });
    }
  } catch (error) {}
};

/**
 *
 * @returns {{id: string, price: number, name: string, description: string}[]}
 */
// reads the file and contents inside then returns the products//
const getProducts = async () => {
  const productsFile = await fsPromises.readFile(PRODUCTS_FILE, {
    encoding: "utf8",
  });
  const products = JSON.parse(productsFile);
  return products;
};

const newProduct = async (product) => {
  const products = await getProducts();
  product.id = Uuid.v4();
  products.push(product);
  console.log(product);
  await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products));
};

const addAllProducts = async (allProducts) => {
  const products = await getProducts();
  allProducts.forEach((product) => {
    product.id = Uuid.v4();
    products.push(product);
    console.log(product);
  });
  await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products));
};

// deletes a product with a specific id then saves the updated products
const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("product deleted");
  }
  const products = await getProducts();
  const updatedProducts = products.filter((product) => {
    return product.id !== id;
  });
  await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(updatedProducts));
};


const updateProduct = async (newProduct) => {
  const products = await getProducts();
  const index = products.findIndex((product) => {
    return product.id === newProduct.id;
  });
  if (index === -1) {
    throw new Error("product updated");
  }

  products[index] = newProduct;

  await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products));
};

const patchProduct = async (newProduct) => {
    const products = await getProducts();
    const index = products.findIndex((product) => {
      return product.id === newProduct.id;
    });
    if (index === -1) {
      throw new Error("product updated");
    }

    const originalProduct = products[index]
    products[index] = {...originalProduct, ...newProduct};
  
    await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products));
  };
export { JsonData, getProducts, newProduct, addAllProducts, deleteProduct, updateProduct,patchProduct};
