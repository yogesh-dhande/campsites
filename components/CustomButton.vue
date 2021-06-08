<template>
  <button
    class="
      w-full
      inline-flex
      justify-center
      py-2
      px-4
      border border-transparent
      shadow-sm
      text-md
      font-bold
      rounded-md
      text-white
      hover:text-blue-100
      bg-pink-600
      hover:bg-pink-700
      focus:ring-4 focus:ring-pink-200
      disabled:opacity-25
    "
    @click="(e) => $emit('click', e)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
}
</script>

<style>
</style>