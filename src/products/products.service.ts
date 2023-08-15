import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  //add temporary products for testing route
  insertProduct(title: string, desc: string, price: number) {
    let prodId = Math.floor(Math.random() * 9000) + 1000;
    const newProdId = (prodId += 1).toString();
    const newProduct = new Product(newProdId, title, desc, price);
    this.products.push(newProduct);
    return newProdId;
  }
  //////
  // finding logic
  private findProduct(id: string): [Product, number] {
    //if want to get product by index
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found !!');
    }
    return [product, productIndex];
  }
  //////

  //Read/get ALl
  getProducts() {
    return [...this.products];
  }

  //Read/get by ID
  getSingleProduct(productId: string) {
    //const product = this.products.find((prod) => prod.id == productId);

    // move original finding logic serperately for best practice
    const product = this.findProduct(productId)[0];

    // if (!product) {
    //   throw new NotFoundException('Product not found !!');
    // }
    return { ...product };
  }
  //update
  updateProduct(productId: string, title: string, desc: string, price: number) {
    // const product = this.findProduct(productId)[0];
    // const index = this.findProduct(productId)[1];
    // or use modern TS/JS
    const [product, index] = this.findProduct(productId);

    const updateProduct = { ...product };
    //validate data
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.desc = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
