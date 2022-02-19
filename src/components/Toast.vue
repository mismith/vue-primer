<script lang="ts">
import { reactive } from 'vue'

export function useToast() {
  const state = reactive({
    isOpen: false,
    message: '',
    type: '',
    timeout: undefined as number | undefined,
  })
  function toast(message?: string, type?: string, timeout?: number) {
    state.isOpen = false
    setTimeout(() => {
      state.message = message || ''
      if (type) state.type = type
      state.timeout = timeout
      state.isOpen = Boolean(message)
    })
  }
  function error(error: any, timeout?: number) {
    toast(error?.getMessage?.() || error?.message || error, 'error', timeout)
  }

  return {
    state,
    toast,
    error,
  }
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, toRefs, watch } from 'vue'

import Octicon from './Octicon.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
    validator: (v: string) => ['', 'success', 'warning', 'error'].includes(v),
  },
  timeout: {
    type: Number,
    default: 5000,
  },
})
const { modelValue, type, timeout } = toRefs(props)

const emit = defineEmits([
  'update:modelValue',
])
function handleClose() {
  emit('update:modelValue', false)
}

const icon = computed(() => {
  const icons: Record<string, string> = {
    success: 'check',
    warning: 'alert',
    error: 'stop',
  }
  return icons[type.value] || 'info'
})
const color = computed(() => {
  const icons: Record<string, string> = {
    success: 'success',
    warning: 'attention',
    error: 'danger',
  }
  return icons[type.value] || 'accent'
})

const toastTimeout = ref()
watch(modelValue, (v) => {
  window.clearTimeout(toastTimeout.value)
  if (v && timeout.value) {
    toastTimeout.value = window.setTimeout(() => {
      handleClose()
    }, timeout.value)
  }
}, { immediate: true })
onBeforeUnmount(() => {
  window.clearTimeout(toastTimeout.value)
})
</script>

<template>
  <aside v-if="modelValue" class="ToastContainer position-fixed bottom-0 right-0">
    <div class="Toast position-relative overflow-hidden anim-fade-up" :class="`Toast--${type}`">
      <span class="Toast-icon">
        <Octicon :name="icon" />
      </span>
      <div class="Toast-content">
        <slot />
        <div
          v-if="timeout"
          class="position-absolute left-0 right-0 bottom-0 anim-grow-x"
          :class="`color-bg-${color}-emphasis`"
          :style="{ animationDuration: `${timeout}ms` }"
        />
      </div>
      <button class="Toast-dismissButton" @click="handleClose">
        <Octicon name="x" />
      </button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.ToastContainer {
  z-index: 110;
  max-width: 100%;

  .anim-fade-up {
    animation-delay: 0ms;
  }
  .anim-grow-x {
    padding-top: 2px;
    animation-delay: 0ms;
    animation-timing-function: linear;
  }
}
</style>
