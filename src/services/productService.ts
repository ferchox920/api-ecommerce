import {
    CreateProductDTO,
    UpdateProductDTO,
    createProductSchema,
    updateProductSchema,
  } from "../dto/product.dto";
  import PRODUCT from "../models/PRODUCT";
  
  export async function createProduct(productData: CreateProductDTO): Promise<Object> {
    const { error, value  } = createProductSchema.validate(productData, {
      abortEarly: true,
    });
    if (error) {
      throw new Error(`Error de validación: ${error.message}`);
    }
    const product = await PRODUCT.create(value);
    return product;
  }
  
  export async function updateProduct(
    productId: number,
    updateData: UpdateProductDTO
  ): Promise<Object | null> {
    const product = await PRODUCT.findByPk(productId);
    if (!product) {
      return null;
    }
  
    const { error, value } = updateProductSchema.validate(updateData);
    if (error) {
      throw new Error(`Error de validación: ${error.message}`);
    }
  
    await product.update(value);
    return product;
  }
  
  export async function deleteProduct(productId: number): Promise<boolean> {
    const product = await PRODUCT.findByPk(productId);
    if (!product) {
      return false;
    }
    await product.destroy();
    return true;
  }
  
  export async function getProductById(productId: number): Promise<Object | null> {
    const product = await PRODUCT.findByPk(productId);
    return product;
  }
  
  export async function getAllProducts(): Promise<Object[]> {
    const products = await PRODUCT.findAll();
    return products;
  }
  