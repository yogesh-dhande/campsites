<template>
  <div
    v-if="errors.length > 0"
    class="text-pink-600 font-medium rounded mt-1 px-2"
  >
    <div v-for="error in errors" :key="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Errors',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
</style>