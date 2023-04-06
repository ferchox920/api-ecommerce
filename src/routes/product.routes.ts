import express, { Request, Response } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../services/productService';

 

const productRouter = express.Router();

// Obtener todos los productos
productRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo los productos');
  }
});

// Obtener un producto por su ID
productRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`Producto con ID ${productId} no encontrado`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo el producto');
  }
});

// Crear un nuevo producto
productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creando el producto');
  }
});

// Actualizar un producto existente
productRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await updateProduct(productId, req.body);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`Producto con ID ${productId} no encontrado`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error actualizando el producto');
  }
});

// Eliminar un producto existente
productRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const result = await deleteProduct(productId);
    if (result) {
      res.status(200).send(`Producto con ID ${productId} eliminado`);
    } else {
      res.status(404).send(`Producto con ID ${productId} no encontrado`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error eliminando el producto');
  }
});

export default productRouter;
