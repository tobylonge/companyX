<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center bg-gray-200">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <NavBar />
      <div class="flex justify-center my-8 mx-4 product-item">
        <div v-if="product !== null">
          <div class="flex flex-col items-center border rounded-lg bg-gray-100">
            <div class="w-full bg-white rounded-lg flex justify-center">
              <img
                class="mx-auto h-80 p-8"
                :src="product.attributes.image?.data?.attributes?.url"
              />
            </div>
            <div class="w-full p-5 flex flex-col justify-between">
              <div>
                <h4
                  class="mt-1 font-semibold text-lg leading-tight truncate text-gray-700"
                >
                  {{ product.attributes.title }} -
                  {{ formatNumber(product.attributes.price) }}
                </h4>
                <div class="mt-1 text-gray-600">
                  <StrapiMarkdown :source="product.attributes.description" />
                </div>
              </div>
              <div class="w-full text-center">
                <button
                  class="mt-4 bg-blue-500 text-white border border-gray-200 d hover:shadow-lg py-2 px-4 rounded shadow w-40"
                  @click="addToCart(product)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      product: null,
      storeUrl: process.env.storeUrl,
    }
  },

  async created() {
    const res = await this.$http.$get(
      `${process.env.strapiAPI}products/${this.$route.params.id}?populate=image`
    )
    this.product = await res.data
  },

  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
    }),
  },
}
</script>
<style lang="scss">
.product-item {
  p {
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
}
</style>
