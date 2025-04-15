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

      //* Verificar si el elemento ya se encuentra en el estado
      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      )

      if (duplicated >= 0) {
        //Verificar la cantidad de inventario para no exceder
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].inventory
        )
          return

        // Buscar el producto y agregar
        contents = get().contents.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      } else {
        contents = [
          //* Get se usa para llamar a la variable del store
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ]
      }

      //*Set sirve para asignar el valor en memoria al estado
      set(() => ({ contents }))
    },
  }))
)
