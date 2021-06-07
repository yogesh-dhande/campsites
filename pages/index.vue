<template>
  <div class="text-indigo-100">
    <div class="flex flex-col h-screen items-center">
      <div class="relative px-4 py-16 sm:px-6 lg:px-8">
        <h1
          class="
            text-center text-5xl
            font-extrabold
            sm:text-6xl
            lg:text-7xl
            text-white
          "
        >
          Find <span class="text-indigo-200">Campsites</span>
          <span class="block">
            by <span class="text-indigo-200">Availability</span>
          </span>
        </h1>
      </div>
      <query-form></query-form>
      <campsites-found />
      <div class="mt-6">
        <campsite
          v-for="site in availableSites"
          :key="site.campsite_id"
          :campsite="site"
          class="mt-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CampsitesFound from '~/components/CampsitesFound.vue'
export default {
  components: { CampsitesFound },
  computed: {
    ...mapGetters(['availableSites']),
  },
}
</script>
