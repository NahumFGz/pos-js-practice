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

// !Types
export type Product = z.infer<typeof ProductSchema>
