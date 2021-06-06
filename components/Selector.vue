<template>
  <Listbox v-model="selected">
    <ListboxButton>{{ options.name }}</ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="option in options"
        :key="option.value"
        :value="value"
      >
        {{ option.text }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

export default {
  components: { Listbox, ListboxButton, ListboxOptions, ListboxOption },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: this.value,
    }
  },
}
</script>