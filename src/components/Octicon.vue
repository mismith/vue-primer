<script setup lang="ts">
import { computed, toRefs } from 'vue'
import octicons, { IconName, IconSize } from '@primer/octicons'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 16,
    validator(v: number) {
      return [12, 16, 24].includes(v)
    },
  },
})

const { name, size } = toRefs(props)
const octicon = computed(() => octicons[name.value as IconName]?.heights[size.value as IconSize])
</script>

<template>
  <svg
    v-if="octicon"
    v-bind="(octicon.options as any)"
    v-html="octicon.path"
  />
</template>
