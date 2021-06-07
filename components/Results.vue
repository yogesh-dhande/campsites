<template>
  <div>
    <campsites-found
      :available-sites="availableSites"
      :available-campgrounds="availableCampgrounds"
      :campgrounds="campgrounds"
    />
    <div class="flex flex-col lg:flex-row lg:space-x-4 mt-6">
      <div class="flex flex-col min-w-min space-y-2">
        <filter-menu
          v-if="campgrounds.length"
          v-model="selectedCampgroundNames"
          title="Campgrounds"
          :options="campgroundNames"
        ></filter-menu>
      </div>
      <div class="flex flex-col space-y-2">
        <campsite
          v-for="site in availableSites"
          :key="site.campsite_id"
          :campsite="site"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CampsitesFound from '~/components/CampsitesFound.vue'

export default {
  components: { CampsitesFound },
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
  data() {
    return {
      selectedCampgroundNames: this.campgroundNames,
    }
  },
  computed: {
    campgroundNames() {
      return this.availableCampgrounds.map((ground) =>
        this.toTitleCase(ground.FacilityName)
      )
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
