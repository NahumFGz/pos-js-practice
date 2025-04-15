import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Product, ShoppingCart } from './schemas'

interface Store {
  total: number
  contents: ShoppingCart
  addToCart: (product: Product) => void
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],
    addToCart: (product) => {
      const { id: productId, categoryId: _categoryId, ...data } = product
      let contents: ShoppingCart = []

      contents = [
        ...get().contents, //Get se usa para llamar a la variable del store
        {
          ...data,
          quantity: 1,
          productId,
        },
      ]

      set(() => ({ contents })) //Set sirve para asignar el valor en memoria al estado
    },
  }))
)
