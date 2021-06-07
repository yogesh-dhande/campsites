<template>
  <card class="bg-gray-900 p-3 bg-opacity-25 text-xl text-white font-bold">
    <div
      class="
        flex flex-col
        lg:flex-row
        flex-wrap flex-1
        space-x-4 space-y-4
        items-center
        lg:items-end
        mx-4
        sm:mx-12
        justify-center
      "
    >
      <div>
        <label for="keywords" class="block p-1">Keywords</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div
            class="
              absolute
              inset-y-0
              right-0
              pr-3
              flex
              items-center
              pointer-events-none
              opacity-50
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
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
              bg-gray-900
              py-2
              px-4
            "
          />
        </div>
      </div>
      <div
        class="flex flex-col space-y-2 sm:flex-row sm:spaxe-x-4 sm:space-y-0"
      >
        <div>
          <label for="startDate" class="block p-1">Start</label>
          <input
            id="startDate"
            v-model="dateRange.startDate"
            type="date"
            class="text-white px-3 rounded-md bg-gray-900 py-2"
            :min="minDate"
            :max="maxDate"
            @input="handleStartDateInput"
          />
        </div>

        <div>
          <label for="endDate" class="block p-1">End</label>
          <input
            id="endDate"
            v-model="dateRange.endDate"
            type="date"
            class="text-white px-3 rounded-md bg-gray-900 py-2"
            :min="minEndDate"
            :max="maxDate"
          />
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
            bg-pink-600 bg-opacity-75
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
    return {
      query: 'arroyo seco',
      dateRange: {
        startDate: '2021-08-09',
        endDate: '2021-08-11',
      },
    }
  },
  computed: {
    minDate() {
      return new Date()
    },
    maxDate() {
      return new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth())
    },
    minEndDate() {
      return this.dateRange.startDate
    },
  },
  methods: {
    findCampsites() {
      console.log('finding campsites ...')
      this.$store.dispatch('findCampsites', {
        query: this.query,
        dateRange: this.dateRange,
      })
    },
    handleStartDateInput(e) {
      if (e.target.value > this.dateRange.endDate) {
        this.dateRange.endDate = e.target.value
      }
    },
  },
}
</script>

<style>
::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}
</style>
