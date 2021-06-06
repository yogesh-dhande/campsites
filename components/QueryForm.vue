<template>
  <card class="bg-gray-900 p-3 opacity-90 text-xl text-white font-bold">
    <div class="flex space-x-4 items-center">
      <div class="flex space-x-8">
        <div>
          <!-- <label for="keywords" class="block p-1">Keywords</label> -->
          <div class="mt-1">
            <input
              id="keywords"
              v-model="query"
              type="text"
              name="keywords"
              placeholder="Keywords"
              class="
                w-full
                shadow-sm
                focus:ring-indigo-500
                focus:border-indigo-500
                rounded-md
                bg-gray-800
                py-2
                px-4
              "
            />
          </div>
        </div>
      </div>
      <div class="opacity-100">
        <button
          type="submit"
          class="
            block
            py-2
            px-4
            mx-auto
            w-full
            border border-transparent
            shadow-sm
            font-bold
            rounded-md
            bg-pink-600
            hover:bg-pink-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
          @click="findCampsites"
        >
          Find Campsites
        </button>
      </div>
    </div>
  </card>
</template>

<script>
export default {
  name: 'QueryForm',
  components: {},
  data() {
    const today = new Date()
    return {
      query: 'arroyo seco',
      dateRange: {
        startDate: '2021-08-09',
        endDate: '2021-08-11',
      },
      minDate: today,
      maxDate: new Date(today.getFullYear() + 1, today.getMonth()),
    }
  },
  methods: {
    findCampsites() {
      console.log('finding campsites ...')
      this.$store.dispatch('findCampsites', {
        query: this.query,
        dateRange: this.dateRange,
      })
    },
  },
}
</script>
