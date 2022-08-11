<template>
  <div class="flex justify-center bg-gray-200">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <NavBar />
      <CategoryItem />
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
              <img
                class="h-44 w-44 mx-auto"
                :src="prod.attributes.image?.data?.attributes?.url"
              />
            </div>
            <div class="pl-4 pr-4 pb-4 pt-4 rounded-lg">
              <h4 class="mt-1 text-sm leading-tight truncate text-gray-600">
                {{ prod.attributes.title }}
              </h4>
              <div class="mt-1 font-semibold">
                {{ formatNumber(prod.attributes.price) }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from '../components/CategoryItem.vue'
export default {
  name: 'IndexPage',
  components: { CategoryItem },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const res = await this.$http.$get(
      `${process.env.strapiAPI}products?populate=image`
    )
    this.products = await res.data
  },
}
</script>
