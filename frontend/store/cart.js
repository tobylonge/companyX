// store/cart.js
import Cookies from 'js-cookie'

export const state = () => ({
  items: [],
})

export const mutations = {
  setItems(state, items) {
    state.items = items
  },

  // add Items to Cart
  add(state, item) {
    // find item in Cart
    const data = state.items.find((i) => i.id === item.id)

    // If item isn't in the cart add as new item with quantity 1
    if (!data) {
      state.items.push({
        quantity: 1,
        ...item,
      })
    } else {
      // increase quantity of existing item in cart
      data.quantity++
    }

    Cookies.set('cartItems', JSON.stringify(state.items))
  },
  remove(state, item) {
    const data = state.items.find((i) => i.id === item.id)

    if (data.quantity > 1) {
      data.quantity--
    } else {
      const index = state.items.findIndex((i) => i.id === item.id)
      state.items.splice(index, 1)
    }

    Cookies.set('cartItems', JSON.stringify(state.items))
  },
  emptyList(state) {
    state.items = []
    Cookies.set('cartItems', JSON.stringify(state.items))
  },
}

export const getters = {
  items: (state) => {
    return state.items
  },
  price: (state) => {
    const totalPrice = state.items.reduce(
      (accumulator, item) =>
        accumulator + item?.attributes.price * item.quantity,
      0
    )
    return totalPrice
  },
  numberOfItems: (state) => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    )
  },
}
