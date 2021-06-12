<template>
  <div class="px-3 text-white font-bold text-lg">
    <card class="bg-indigo-600 bg-opacity-50">
      <h2>
        <span v-if="campgrounds.length === 0">
          <span v-if="error">{{ error }}</span>
          <span v-else>No campgrounds found.</span>
        </span>

        <span v-else>
          Found {{ campgrounds.length }}
          <span v-if="campgrounds.length === 1">camground</span>
          <span v-else>camgrounds</span>,
          <span v-if="availableSites.length > 0">
            of which
            {{ availableCampgrounds.length }}
            <span v-if="availableCampgrounds.length === 1">has</span>
            <span v-else>have</span> a total of {{ availableSites.length }} camp
            sites available on selected dates.
          </span>
          <span v-else
            >but no camp sites are available on selected dates. Try selecting
            other dates or search for other campgrounds.
          </span>
        </span>
      </h2>
    </card>
    <div
      v-if="availableSites.length === 0"
      class="flex text-base justify-center bg-gray-900 bg-opacity-75"
    >
      <ul class="px-6 py-2 rounded-md list-decimal">
        <li v-for="campground in campgrounds" :key="campground">
          {{ toTitleCase(campground) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  name: 'Summary',
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
  methods: {
    toTitleCase(str) {
      try {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
      } catch (error) {
        return ''
      }
    },
  },
}
</script>

<style></style>
