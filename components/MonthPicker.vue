<template>
  <div>
    <label for="month" class="block sm:mt-px sm:pt-2"> Pick a Month </label>
    <div class="mt-1">
      <select
        id="month"
        :value="value"
        name="month"
        autocomplete="month"
        class="
          max-w-lg
          block
          focus:ring-indigo-500
          focus:border-indigo-500
          w-full
          shadow-sm
          border-gray-300
          rounded-md
          bg-gray-800
          p-2
        "
        @input="handleInput"
      >
        <option v-for="(month, index) in months" :key="month" :value="index">
          <span> {{ month }}</span>
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export default {
  name: 'MonthPicker',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      months,
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.selectedIndex)
    },
  },
}
</script>
