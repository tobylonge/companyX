import Vue from 'vue'

const mixin = {
  methods: {
    generateImageSrc(url) {
      return process.env.strapiURL + url
    },
    formatNumber(amount) {
      return `₦${new Intl.NumberFormat().format(amount)}`
    },
  },
}

Vue.mixin(mixin)
