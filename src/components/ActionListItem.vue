<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
const emit = defineEmits([
  'update:modelValue',
])

const { modelValue } = toRefs(props)
const detailsRef = ref()
function get() {
  return Boolean(detailsRef.value?.open)
}
function set(isOpen: any) {
  if (isOpen) {
    detailsRef.value?.setAttribute('open', true)
  } else {
    detailsRef.value?.removeAttribute('open')
  }
}
watch(modelValue, set)
onMounted(() => set(modelValue.value))
function handleToggle() {
  emit('update:modelValue', get())
}
</script>

<template>
  <component
    ref="detailsRef"
    :is="$slots.children ? 'details' : 'li'"
    v-bind="$attrs"
    class="ActionList-item"
    :style="{ listStylePosition: 'inside' }"
    @toggle="handleToggle"
  >
    <component :is="$slots.children ? 'summary' : 'div'" class="ActionList-content">
      <span class="ActionList-item-action ActionList-item-action--leading">
        <span class="disclosureArrow" :style="{ opacity: $slots.children ? undefined : 0 }"></span>
      </span>
      <slot />
    </component>

    <slot name="children" />
  </component>
</template>

<style lang="scss" scoped>
.disclosureArrow {
  display: inline-block;
  vertical-align: middle;
  border: solid 0.4em transparent;
  border-left-width: 0.75em;
  border-left-color: currentColor;
  border-right-width: 0;
  transition: transform 0.1s;

  [open] > summary > * > & {
    transform: rotate(90deg);
  }
}
</style>
