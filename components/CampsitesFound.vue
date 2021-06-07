<template>
  <card class="bg-indigo-600 bg-opacity-50 px-3">
    <h2 class="text-white font-bold">
      Found {{ campgrounds.length }} camgrounds.
      {{ availableCampgrounds.length }} of them have a total of
      {{ availableSites.length }} camp sites available on selected dates.
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
  },
}
</script>

<style></style>
