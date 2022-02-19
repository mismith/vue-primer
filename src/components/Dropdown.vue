<template>
  <details
    v-bind="$attrs"
    ref="detailsRef"
    class="Dropdown dropdown details-reset details-overlay" 
    @toggle="handleToggle"
  >
    <slot name="summary">
      <summary aria-haspopup="true" style="cursor: inherit;">
        <slot name="text" />
        <div class="dropdown-caret"></div>
      </summary>
    </slot>
    <div class="dropdown-menu" :class="`dropdown-menu-${direction} ${menuClass}`">
      <slot />
    </div>
  </details>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    modelValue: {
      default: false,
      required: false,
    },
    direction: {
      type: String,
      validator: (v: string) => ['ne', 'e', 'se', 's', 'sw', 'w', 'nw'].includes(v),
      default: 'sw',
    },
    menuClass: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)

    const detailsRef = ref()
    watch(modelValue, (v) => {
      if (v) {
        detailsRef.value?.setAttribute('open', true)
      } else {
        detailsRef.value?.removeAttribute('open')
      }
    }, { immediate: true })
    function handleToggle() {
      emit('update:modelValue', detailsRef.value?.open)
    }

    return {
      detailsRef,
      handleToggle,
    }
  }
})
</script>
