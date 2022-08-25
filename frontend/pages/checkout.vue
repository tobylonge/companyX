<template>
  <div class="flex justify-center bg-gray-200">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <div class="flex w-full items-center mt-6 mb-10">
        <div class="flex items-center">
          <svg
            viewBox="0 0 64 64"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
            alt=""
            title=""
            class=""
            height="24"
            width="24"
          >
            <path
              d="M12.636 30.158H58v3.423H12.372l9.148 9.055L19.132 45 6 32l13.132-13 2.388 2.364-8.884 8.794z"
            ></path>
          </svg>
          <nuxt-link to="/">
            <p class="text-sm ml-2">Continue Shopping</p>
          </nuxt-link>
        </div>
        <div class="mx-auto font-semibold">Checkout</div>
      </div>
      <div class="w-full bg-white rounded-lg p-4 mb-6">
        <div
          v-if="err"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-8"
          role="alert"
        >
          <strong class="font-bold text-xs block">Error Message!</strong>
          <span class="block text-sm">{{ err.message }}.</span>
        </div>
        <div
          v-if="success"
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-8"
          role="alert"
        >
          <strong class="font-bold text-xs block">Success Message</strong>
          <span class="block text-sm">{{ success.message }}.</span>
        </div>
        <div class="mb-6">
          <label class="flex flex-col items-stretch text-left">
            <span class="text-xs font-medium mb-1">Address</span>
            <input
              v-model="address"
              class="border rounded-md bg-white p-2 text-gray-600 w-full"
              type="text"
            />
          </label>
        </div>
        <div>
          <button
            class="mt-4 bg-blue-500 text-white border border-gray-200 d hover:shadow-lg py-2 px-4 rounded shadow w-40 mx-auto block"
            @click="placeOrder"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      success: null,
      err: null,
      address: '',
      online: navigator.onLine,
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      username: 'auth/username',
      token: 'auth/token',
    }),
  },
  methods: {
    async placeOrder() {
      if (this.online) {
        const address = this.address
        const userId = this.user
        const token = this.token
        this.$http.setToken(token, 'Bearer')
        try {
          await this.$http.$post('orders', {
            data: {
              address,
              total: this.$store.getters['cart/price'],
              users_permissions_user: userId,
              products: this.$store.getters['cart/items'],
              token,
            },
          })
          // this.emptyCart()
          this.success = {
            message: 'Order placed successfully',
          }
        } catch (err) {
          this.err = err.response?.data?.error
        }
      } else {
        const cartItems = this.$store.getters['cart/items']
        const offlineCart = cartItems
          .map((el) => el.id + ':' + el.quantity)
          .toString()
        // console.log('Cart Items ', cartItems, offlineCart)
        window.open(`sms://+13013294373?body=I want to by ${offlineCart}`)
        // window.open(`sms://+13013294373?body=342:5,678:2`)
      }
    },
    ...mapMutations({
      emptyCart: 'cart/emptyList',
    }),
  },
}
</script>
