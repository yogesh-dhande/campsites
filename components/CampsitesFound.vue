<template>
  <card class="bg-indigo-600 bg-opacity-50 px-3">
    <h2 class="text-white font-bold">
      <span v-if="error">{{ error }}</span>
      <span v-else>
        Found {{ campgrounds.length }} camgrounds, of which
        {{ availableCampgrounds.length }} have a total of
        {{ availableSites.length }} camp sites available on selected dates.
      </span>
    </h2>
  </card>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components: {
    Card,
  },
  props: {
    availableSites: {
      type: Array,
      default: () => [],
    },
    availableCampgrounds: {
      type: Array,
      default: () => [],
    },
    campgrounds: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: null,
    },
  },
}
</script>

<style></style>
