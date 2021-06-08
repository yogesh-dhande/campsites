<template>
  <card class="bg-gray-900 p-3 bg-opacity-50 text-xl text-white font-bold">
    <div
      class="
        flex flex-col
        lg:flex lg:flex-row lg:flex-wrap lg:flex-1
        lg:space-x-4
        space-y-4
        lg:items-end
        mx-4
        sm:mx-12
        lg:justify-center
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
              border-none
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
        class="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
      >
        <div>
          <label for="startDate" class="block p-1">Start</label>
          <input
            id="startDate"
            v-model="dateRange.startDate"
            type="date"
            class="
              text-white
              w-full
              focus:ring-indigo-600
              px-4
              rounded-md
              bg-gray-900
              py-2
              border-none
            "
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
            class="
              text-white
              w-full
              px-4
              rounded-md
              bg-gray-900
              focus:ring-indigo-600
              py-2
              border-none
            "
            :min="minEndDate"
            :max="maxDate"
          />
        </div>
      </div>
      <option-picker
        v-model="state"
        :options="stateOptions"
        label="State"
      ></option-picker>
      <submit
        label="Find Campsites"
        :is-loading="isLoading"
        @click="findCampsites"
      />
    </div>
  </card>
</template>

<script>
import OptionPicker from '@/components/OptionPicker.vue'
import Submit from '@/components/Submit.vue'
import { states } from '@/static/data'
export default {
  name: 'QueryForm',
  components: { OptionPicker, Submit },
  data() {
    return {
      query: 'arroyo seco',
      dateRange: {
        startDate: '2021-08-09',
        endDate: '2021-08-11',
      },
      stateOptions: states.map((state) => {
        return {
          value: state.abbreviation,
          text: state.abbreviation,
        }
      }),
      state: 'CA',
      isLoading: false,
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
    async findCampsites() {
      console.log('finding campsites ...')
      this.isLoading = true
      try {
        await this.$store.dispatch('findCampsites', {
          query: this.query,
          dateRange: this.dateRange,
          state: this.state,
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
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
