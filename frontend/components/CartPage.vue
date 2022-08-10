<template>
  <div>
    <div v-if="price && price > 0">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="uk-grid-small uk-flex"
        uk-grid
      >
        <div class="uk-width-expand">
          <p class="uk-margin-remove-bottom">
            {{ item.data?.attributes.name }}
          </p>
          <p class="uk-text-meta uk-margin-remove-top">
            {{ item.quantity }} &times; {{ item.data?.attributes?.price }};
          </p>
        </div>
        <div v-if="checkout" class="uk-width-auto">
          <button type="button" uk-close @click="removeFromCart(item)"></button>
        </div>
      </div>
      <div class="uk-grid-small uk-flex" uk-grid>
        <div class="uk-width-expand">Subtotal</div>
        <div>{{ price }}&euro;</div>
      </div>
      <div v-if="checkout">
        <NuxtLink
          class="uk-button uk-button-secondary uk-width-1-1"
          to="/checkout"
        >
          Checkout
        </NuxtLink>
      </div>
    </div>
    <div v-else class="uk-text-meta">Empty</div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    checkout: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/items',
      price: 'cart/price',
    }),
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
    }),
  },
}
</script>
