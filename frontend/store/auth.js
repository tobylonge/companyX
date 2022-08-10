import Cookies from 'js-cookie'

export const state = () => ({
  user: {},
})

export const mutations = {
  setUser(state, user) {
    console.log('user ', user)
    state.user = user
    Cookies.set('user', JSON.stringify(user))
  },
  logout(state) {
    state.user = null
    Cookies.set('user', null)
  },
}

export const getters = {
  user: (state) => {
    return state.user?.id
  },
  username: (state) => {
    return state.user?.username
  },
  token: (state) => {
    return state.user?.jwt
  },
}
