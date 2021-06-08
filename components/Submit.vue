<template>
  <div>
    <errors v-if="errors.length > 0" :errors="errors" />
    <errors
      v-else-if="disabled"
      :errors="['Please correct all errors before proceeding.']"
    />
    <div v-if="!isLoading">
      <custom-button
        :disabled="errors.length > 0 || disabled"
        @click="() => $emit('click')"
        >{{ label }}</custom-button
      >
    </div>
    <div v-else>
      <custom-button disabled
        ><svg
          class="animate-spin mx-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path></svg
      ></custom-button>
    </div>
  </div>
</template>

<script>
import Errors from '@/components/Errors'
import CustomButton from '@/components/CustomButton'

export default {
  name: 'Submit',
  components: {
    errors: Errors,
    'custom-button': CustomButton,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: 'Submit',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
</style>