<template>
  <div class="rounded-md">
    <div
      class="
        flex
        items-center
        justify-between
        relative
        rounded-md
        cursor-pointer
      "
      :class="
        showDrawer
          ? 'bg-gray-800 hover:bg-pink-900'
          : 'bg-gray-900 hover:bg-gray-800'
      "
      @click="show"
    >
      <span class="text-lg font-medium px-6 py-2">{{ title }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mx-6 stroke-2"
        :style="{ transform: showDrawer ? 'rotate(180deg)' : '' }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <transition name="slide">
      <div
        v-if="showDrawer"
        class="bg-gray-900 bg-opacity-75 rounded-md px-3 pt-3 pb-4 mt-2"
      >
        <ul>
          <li
            v-for="entry in options"
            :key="entry.value"
            class="drawer-list-item"
          >
            <div>
              <input
                :id="entry.value"
                v-model="checked"
                :value="entry.value"
                type="checkbox"
                class="m-2 rounded"
                @change="handleInput"
              />
              <label :for="entry.value" class="font-medium">{{
                entry.text
              }}</label>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showDrawer: true,
      checked: this.value,
    }
  },
  methods: {
    show(e) {
      this.showDrawer = !this.showDrawer
    },
    handleInput(e) {
      this.$emit('input', this.checked)
    },
  },
}
</script>

<style>
.slide-enter {
  opacity: 0;
  transform: translateY(-20px);
  transition: 0.2s all ease;
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0px);
  transition: 0.2s all ease;
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  transition: 0.2s all ease;
}
</style>
