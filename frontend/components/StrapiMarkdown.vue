<template>
  <vue-markdown
    :anchor-attributes="{
      target: '_blank',
    }"
    :source="source"
  >
    <slot />
  </vue-markdown>
</template>

<script>
import VueMarkdown from '@adapttive/vue-markdown'

export default {
  components: {
    VueMarkdown,
  },
  props: {
    source: {
      type: String,
      default: '',
    },
  },
}
</script>
