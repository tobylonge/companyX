<template>
  <div class="uk-container uk-container-xsmall">
    <h1 class="uk-heading-small">Checkout</h1>
    <div v-if="success" class="uk-alert-success" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ success.message }}</p>
    </div>
    <div v-if="err" class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ err.message }}</p>
    </div>
    <Cart :checkout="false" />
    <div class="uk-margin">
      <label class="uk-form-label">
        Address
        <input v-model="address" class="uk-input" type="email" />
      </label>
    </div>
    <div class="uk-margin-top">
      <button
        class="uk-button uk-button-secondary uk-margin-top uk-width-1-1"
        @click="placeOrder"
      >
        Place Order
      </button>
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
          message: 'Order created successfuly',
        }
      } catch (err) {
        this.err = err.response?.data?.error
      }
    },
    ...mapMutations({
      emptyCart: 'cart/emptyList',
    }),
  },
}
</script>
