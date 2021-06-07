<template>
  <card class="mt-3 bg-indigo-600 bg-opacity-50">
    <h2 class="text-white font-bold">
      Found {{ campgrounds.length }} camgrounds.
      {{ availableCampgrounds.length }} of them have a total of
      {{ availableSites.length }} camp sites available on selected dates.
    </h2>
  </card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
export default {
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['availableSites', 'availableCampgrounds']),
    ...mapState(['campgrounds']),
  },
}
</script>

<style></style>
