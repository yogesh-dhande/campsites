<template>
  <card
    class="
      bg-gray-900
      pt-3
      pb-6
      bg-opacity-50
      text-xl text-white
      font-bold
      w-3/4
      sm:w-auto
    "
  >
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
        label="Search Campsites"
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
    const today = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 60)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 62)

    return {
      today,
      query: 'arroyo seco',
      dateRange: {
        startDate: this.dateToString(startDate),
        endDate: this.dateToString(endDate),
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
      return this.dateToString(this.today)
    },
    maxDate() {
      return this.dateToString(
        new Date(this.today.getFullYear() + 1, this.today.getMonth())
      )
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
    dateToString(date) {
      return date.toISOString().split('T')[0]
    },
  },
}
</script>

<style>
::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}
</style>
