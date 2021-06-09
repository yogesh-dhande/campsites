<template>
  <div class="max-w-sm lg:max-w-none">
    <campsites-found
      v-if="dates.length > 0"
      :available-sites="availableSites"
      :available-campgrounds="availableCampgrounds"
      :campgrounds="campgrounds"
    />
    <div
      v-if="campgrounds.length"
      class="
        flex flex-col
        space-y-2
        lg:flex-row
        lg:space-x-4 lg:space-y-0
        mt-6
        justify-center
      "
    >
      <div class="flex flex-col space-y-2">
        <div
          class="
            flex
            space-x-2
            items-center
            text-lg
            font-bold
            px-6
            py-2
            bg-pink-600
            rounded-md
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span class="font-medium">Filters</span>
        </div>
        <filter-menu
          v-if="campgroundOptions.length > 0"
          v-model="selectedCampgrounds"
          title="Campgrounds"
          :options="campgroundOptions"
        ></filter-menu>
        <filter-menu
          v-if="campsiteTypeOptions.length > 0"
          v-model="campsiteTypes"
          title="Campsite Types"
          :options="campsiteTypeOptions"
        ></filter-menu>
        <filter-menu
          v-if="permittedEquipmentOptions.length > 0"
          v-model="permittedEquipment"
          title="Permitted Equipment"
          :options="permittedEquipmentOptions"
        ></filter-menu>
        <div class="bg-gray-900 bg-opacity-75 rounded-md px-3 pt-3 pb-4 mt-2">
          <input
            id="accessible"
            v-model="isAccessible"
            type="checkbox"
            class="m-2 rounded"
          />
          <label for="accessible" class="font-medium"
            >Only Show Accessible Sites</label
          >
        </div>
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
      isAccessible: false,
      campsiteTypes: [],
      permittedEquipment: [],
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
    campsiteTypeOptions() {
      return [
        ...new Set(
          this.availableSites.map((site) => site.details.CampsiteType)
        ),
      ].map((type) => {
        return {
          text: this.toTitleCase(type),
          value: type,
        }
      })
    },
    permittedEquipmentOptions() {
      return [
        ...this.availableSites.reduce((accumulator, site) => {
          site.details.PERMITTEDEQUIPMENT.forEach((eq) =>
            accumulator.add(eq.EquipmentName)
          )
          return accumulator
        }, new Set()),
      ].map((eqName) => {
        return {
          text: eqName,
          value: eqName,
        }
      })
    },
    filteredSites() {
      let sites = this.availableSites
      if (this.selectedCampgrounds.length > 0) {
        sites = sites.filter((site) =>
          this.selectedCampgrounds.includes(site.FacilityID)
        )
      }
      if (this.isAccessible) {
        sites = sites.filter((site) => site.CampsiteAccessible)
      }
      if (this.campsiteTypes.length > 0) {
        sites = sites.filter((site) =>
          this.campsiteTypes.includes(site.details.CampsiteType)
        )
      }
      if (this.permittedEquipment.length > 0) {
        sites = sites.filter((site) => {
          return site.details.PERMITTEDEQUIPMENT.map((eq) =>
            this.permittedEquipment.includes(eq.EquipmentName)
          ).some(Boolean)
        })
      }
      return sites
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
