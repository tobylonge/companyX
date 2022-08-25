<template>
  <div class="flex justify-center bg-gray-200 p-4">
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
        <div class="mx-auto font-semibold">Cart Summary</div>
      </div>
      <div v-if="price && price > 0">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="w-full bg-white rounded-lg flex items-center p-4 mb-6 flex-col sm:flex-row"
        >
          <div class="w-1/2 sm:w-1/6">
            <img
              class="w-full"
              :src="item?.attributes.image?.data?.attributes?.url"
            />
          </div>
          <div class="w-3/4 sm:w-4/6 ml-2 mr-4">
            <h2>{{ item?.attributes?.title }}</h2>
            <p class="mt-1 text-gray-600 truncate text-xs font-light">
              {{ item?.attributes?.description }}
            </p>
          </div>
          <div class="w-1/2 sm:w-1/6 mt-4">
            <p class="text-xs font-thin mb-1">Quantity</p>
            <div class="quantity">
              <button class="quantity__button" @click="removeFromCart(item)">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  alt="Decrement quantity"
                  title="Decrement quantity"
                  class="snipcart__icon"
                >
                  <path d="M48 31H16v2.462h32V31z" fill="#313749"></path>
                </svg>
              </button>
              <span>{{ item.quantity }}</span>
              <button class="quantity__button" @click="addToCart(item)">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  alt="Increment quantity"
                  title="Increment quantity"
                  class="snipcart__icon"
                >
                  <path
                    d="M33.23 30.77H48v2.46H33.23V48h-2.46V33.23H16v-2.46h14.77V16h2.46v14.77z"
                    fill="#313749"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            class="sm:w-1/6 flex sm:flex-col items-end justify-between self-stretch"
          >
            <div>
              <button class="button__icon" @click="removeFromCart(item)">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  alt="Remove item"
                  title="Remove item"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 4v6.47H12v3.236h40V10.47H42V4H22zm3.333 6.47V7.235H38.67v3.235H25.333zm20.001 9.707h3.333V59H15.334V20.177h3.333v35.588h26.667V20.177zm-15 29.116V23.412h3.334v25.881h-3.334z"
                    fill="#313749"
                  ></path>
                </svg>
              </button>
            </div>
            <p>{{ formatNumber(item.attributes?.price) }}</p>
          </div>
        </div>
        <div v-if="checkout">
          <NuxtLink
            class="mt-4 bg-blue-500 text-white border border-gray-200 d hover:shadow-lg py-2 px-4 rounded shadow w-40 mx-auto block text-center"
            to="/checkout"
          >
            Checkout
          </NuxtLink>
        </div>
      </div>
      <div v-else class="uk-text-meta">Empty Cart</div>
    </div>
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

<style lang="scss">
.quantity {
  display: flex;
  align-items: center;
  color: #313332;
  line-height: normal;
  height: 52px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: #fdfefe;
  justify-content: space-between;
  border: 1px solid #f0f5f6;
  &__button {
    max-height: 18px;
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
.button__icon {
  border: 1px solid #f0f5f6;
  padding: 3.2px;
  display: -webkit-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
