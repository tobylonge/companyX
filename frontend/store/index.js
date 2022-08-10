import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const user = (parsed.user && JSON.parse(parsed.user)) || null
      const cartItems = (parsed.cartItems && JSON.parse(parsed.cartItems)) || []
      commit('cart/setItems', cartItems)
      commit('auth/setUser', user)
    }
  },
}
