import { z } from 'zod'

// !Esquemas de APIs
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  inventory: z.number(),
  categoryId: z.number(),
})

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const CategoriesResponseSchema = z.array(CategorySchema)
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
})

//! ShoppingCart
const ShoppingCartContentSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  inventory: true,
}).extend({
  productId: z.number(),
  quantity: z.number(),
})

export const ShoppingCartSchema = z.array(ShoppingCartContentSchema)

// !Types
export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
