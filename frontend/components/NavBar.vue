<template>
  <nav class="flex justify-between ml-6 mr-6 mt-4 items-center">
    <nuxt-link to="/">
      <span class="logo">
        <!--reference: downloaded from https://www.vecteezy.com/-->
        <img src="~/assets/logo.svg" class="logo" height="80" width="80" />
      </span>
    </nuxt-link>

    <div class="flex">
      <ul v-if="username" class="flex items-center justify-between">
        <li class="mx-6">
          <button class="flex items-center">
            <img src="~/assets/cart.svg" height="35" width="35" />
            <span v-if="numberOfItems" class="text-sm"
              >{{ numberOfItems }} Item(s)</span
            >
          </button>
        </li>
        <li class="flex items-center">
          <img
            class="opacity-75 mr-2"
            src="~/assets/user.svg"
            height="30"
            width="30"
          />
          <div class="leading-3">
            <p class="mb text-sm">Welcome {{ username }}</p>
            <button class="text-xs opacity-80 underline" @click="logout">
              Log out
            </button>
          </div>
        </li>
      </ul>
      <ul v-else class="uk-navbar-nav">
        <li><NuxtLink to="/auth/login">Log In</NuxtLink></li>
        <li><NuxtLink to="/auth/register">Register</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      username: 'auth/username',
      numberOfItems: 'cart/numberOfItems',
    }),
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout',
    }),
  },
}
</script>
