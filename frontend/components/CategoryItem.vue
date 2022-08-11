<template>
  <div class="">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div class="container flex flex-wrap mx-auto ml-4 mr-6 mt-8">
        <nuxt-link
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.id}`"
          class="bg-white hover:bg-gray-100 text-gray-600 text-sm py-2 px-4 ml-2 border border-gray-400 rounded shadow"
        >
          {{ category?.attributes?.label }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      error: null,
    }
  },
  async mounted() {
    try {
      const categories = await this.$http.$get(
        `${process.env.strapiAPI}categories`
      )
      this.categories = categories.data
    } catch (error) {
      this.error = error
    }
  },
}
</script>

<style lang="css" scoped></style>
