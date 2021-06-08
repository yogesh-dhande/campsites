<template>
  <div>
    <label for="picker" class="block p-1"> {{ label }} </label>
    <select
      id="picker"
      :value="value"
      name="picker"
      class="
        block
        w-full
        pl-4
        pr-10
        py-2
        bg-gray-900
        border-none
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        rounded-md
      "
      @input="handleInput"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        <span> {{ option.text }}</span>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'OptionPicker',
  props: {
    label: {
      type: String,
      default: 'Pick one',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: this.value,
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
<style scoped>
</style>
