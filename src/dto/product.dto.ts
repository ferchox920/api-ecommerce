import Joi from 'joi';

export interface CreateProductDTO {
  sku?: string;
  barcode?: string;
  name?: string;
  image?: string;
  description?: string;
  color?: string;
  variety?: string;
  weight?: number | null;
  price?: number;
  category?: string;
  subcategory?: string;
  location?: string;
  manufacturing_origin?: string;
  sale_market?: string;
  product_url?: string;
  supplier?: string;
  tag?: string;
  units_available?: number | null;
  bundle?: boolean | null;
  item_cost?: number | null;
  roi?: number | null;
}

export const createProductSchema = Joi.object({
  sku: Joi.string().allow('').optional(),
  barcode: Joi.string().allow('').optional(),
  name: Joi.string().allow('').optional(),
  image: Joi.string().allow('').allow(null).optional(),
  description: Joi.string().allow('').optional(),
  color: Joi.string().allow('').optional(),
  variety: Joi.string().allow('').allow(null).optional(),
  weight: Joi.number().allow(null).optional(),
  price: Joi.number().allow(null).optional(),
  category: Joi.string().allow('').allow(null).optional(),
  subcategory: Joi.string().allow('').allow(null).optional(),
  location: Joi.string().allow('').allow(null).optional(),
  manufacturing_origin: Joi.string().allow('').optional(),
  sale_market: Joi.string().allow('').optional(),
  product_url: Joi.string().allow('').optional(),
  supplier: Joi.string().allow('').optional(),
  tag: Joi.string().allow('').optional(),
  units_available: Joi.number().allow(null).optional(),
  bundle: Joi.boolean().allow(null).optional(),
  item_cost: Joi.number().allow(null).optional(),
  roi: Joi.number().allow(null).optional(),
});

export interface UpdateProductDTO {
  sku?: string;
  barcode?: string;
  name?: string;
  image?: string;
  description?: string;
  color?: string;
  variety?: string;
  weight?: number | null;
  price?: number;
  category?: string;
  subcategory?: string;
  location?: string;
  manufacturing_origin?: string;
  sale_market?: string;
  product_url?: string;
  supplier?: string;
  tag?: string;
  units_available?: number | null;
  bundle?: boolean | null;
  item_cost?: number | null;
  roi?: number | null;
}

export const updateProductSchema = Joi.object({
  sku: Joi.string().allow('').optional(),
  barcode: Joi.string().allow('').optional(),
  name: Joi.string().allow('').optional(),
  image: Joi.string().allow('').optional(),
  description: Joi.string().allow('').optional(),
  color: Joi.string().allow('').optional(),
  variety: Joi.string().allow('').optional(),
  weight: Joi.number().allow(null).optional(),
  price: Joi.number().allow(null).optional(),
  category: Joi.string().allow('').optional(),
  subcategory: Joi.string().allow('').optional(),
  location: Joi.string().allow('').optional(),
  manufacturing_origin: Joi.string().allow('').optional(),
  sale_market: Joi.string().allow('').optional(),
  product_url: Joi.string().allow('').optional(),
  supplier: Joi.string().allow('').optional(),
  tag: Joi.string().allow('').optional(),
  units_available: Joi.number().allow(null).optional(),
  bundle: Joi.boolean().allow(null).optional(),
  item_cost: Joi.number().allow(null).optional(),
  roi: Joi.number().allow(null).optional(),
});
