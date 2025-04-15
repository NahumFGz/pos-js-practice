import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Product, ShoppingCart } from './schemas'

interface Store {
  total: number
  contents: ShoppingCart
  addToCart: (product: Product) => void
  updateQuantity: (id: Product['id'], quantity: number) => void
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],
    addToCart: (product) => {
      const { id: productId, categoryId: _categoryId, ...data } = product

      //! get() se usa para acceder al estado actual del store
      const cart = get().contents

      // Buscar si el producto ya está en el carrito
      const existingItem = cart.find((item) => item.productId === productId)

      let updatedCart: ShoppingCart

      if (existingItem) {
        // Si ya alcanzó el inventario máximo, no hacemos nada
        if (existingItem.quantity >= existingItem.inventory) return

        // Incrementamos la cantidad del producto en el carrito
        updatedCart = cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Si no está en el carrito, lo agregamos con cantidad inicial 1
        updatedCart = [
          ...cart,
          {
            ...data,
            productId,
            quantity: 1,
          },
        ]
      }

      //! set() se usa para actualizar el estado del store
      set({ contents: updatedCart })
    },
    updateQuantity: (id, quantity) => {
      // Obtener el carrito actual
      const currentCart = get().contents

      // Generar el nuevo carrito actualizando solo el producto con el ID indicado
      const updatedCart = currentCart.map(
        (item) =>
          item.productId === id
            ? { ...item, quantity } // si coincide el ID, actualiza la cantidad
            : item // si no, deja el item igual
      )

      // Actualizar el estado
      set({ contents: updatedCart })
    },
  }))
)
