'use server'

import { ProductFormSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function addProduct(
  prevState: ActionStateType,
  formData: FormData
) {
  const product = ProductFormSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    inventory: formData.get('inventory'),
    categoryId: formData.get('categoryId'),
  })

  if (!product.success) {
    return {
      errors: product.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  return {
    errors: [],
    success: '',
  }
}
