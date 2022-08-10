<template>
  <div>
    <HeaderItem />
    <div
      class="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4"
    >
      <div
        v-for="prod in products"
        :key="prod.id"
        class="border rounded-lg bg-gray-100 hover:shadow-lg"
      >
        <nuxt-link :to="`/products/${prod.id}`">
          <div class="rounded-t-lg bg-white pt-2 pb-2">
            <img class="crop mx-auto" :src="prod.image" />
          </div>
          <div class="pl-4 pr-4 pb-4 pt-4 rounded-lg">
            <h4
              class="mt-1 font-semibold text-base leading-tight truncate text-gray-700"
            >
              {{ prod.attributes.title }}
            </h4>
            <div class="mt-1 text-sm text-gray-700">
              {{ prod.attributes.description }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const res = await this.$http.$get('http://localhost:1337/api/products')
    this.products = await res.data
  },
}
</script>
