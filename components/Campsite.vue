<template>
  <card class="bg-gray-900 text-lg py-2 bg-opacity-90">
    <div class="flex justify-between items-center">
      <div class="flex flex-col mx-2">
        <h2 class="font-bold">{{ toTitleCase(campsite.FacilityName) }}</h2>
        <h3 class="text-sm">
          Site {{ campsite.site }}, Loop {{ toTitleCase(campsite.loop) }}
        </h3>
      </div>
      <a
        class="
          block
          bg-indigo-600
          font-bold
          text-sm
          px-2
          py-1
          mx-2
          shadow
          rounded
          hover:bg-indigo-700
        "
        :href="`https://www.recreation.gov/camping/campsites/${campsite.campsite_id}`"
        target="_blank"
        >View Details</a
      >
    </div>
  </card>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Campsite',
  components: {
    Card,
  },
  props: {
    campsite: {
      type: Object,
      default: () => {},
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
