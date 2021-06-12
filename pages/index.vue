<template>
  <div class="text-indigo-100">
    <div class="flex flex-col h-screen items-center">
      <div class="relative px-4 pt-16 pb-8 sm:pb-12 sm:px-6 lg:px-8">
        <h1
          class="
            text-center text-3xl
            font-extrabold
            sm:text-6xl
            lg:text-7xl
            text-white
          "
        >
          Search <span class="text-indigo-200">Campsites</span>
          <span class="block">
            by <span class="text-indigo-200">Availability</span>
          </span>
        </h1>
      </div>
      <query-form></query-form>
      <results
        class="mx-6 sm:mx-12 mt-6"
        :available-sites="availableSites"
        :available-campgrounds="availableCampgrounds"
        :campgrounds="campgroundNames"
        :dates="dates"
        :error="error"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Results from '~/components/Results.vue'
export default {
  components: { Results },
  computed: {
    ...mapState(['dates', 'error']),
    ...mapGetters([
      'availableSites',
      'availableCampgrounds',
      'campgroundNames',
    ]),
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
