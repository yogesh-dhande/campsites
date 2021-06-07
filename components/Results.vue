<template>
  <div>
    <campsites-found
      v-if="dates.length > 0"
      :available-sites="availableSites"
      :available-campgrounds="availableCampgrounds"
      :campgrounds="campgrounds"
    />
    <div
      class="flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0 mt-6"
    >
      <div class="flex flex-col space-y-2">
        <filter-menu
          v-if="campgrounds.length"
          v-model="selectedCampgrounds"
          title="Campgrounds"
          :options="campgroundOptions"
        ></filter-menu>
      </div>
      <div class="flex flex-col space-y-2">
        <campsite
          v-for="site in filteredSites"
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
    dates: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCampgrounds: [],
    }
  },
  computed: {
    campgroundOptions() {
      return this.availableCampgrounds.map((ground) => {
        return {
          text: this.toTitleCase(ground.FacilityName),
          value: ground.FacilityID,
        }
      })
    },
    filteredSites() {
      if (this.selectedCampgrounds.length > 0) {
        return this.availableSites.filter((site) =>
          this.selectedCampgrounds.includes(site.FacilityID)
        )
      } else return this.availableSites
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
