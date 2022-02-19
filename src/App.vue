<script setup lang="ts">
import { ref } from 'vue'

import ActionListItem from './components/ActionListItem.vue'
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import Dropdown from './components/Dropdown.vue'
import Octicon from './components/Octicon.vue'
import Spinner from './components/Spinner.vue'
import Toast from './components/Toast.vue'

const isShowingDialog = ref(false)
const isShowingToast = ref(false)
</script>

<template>
  <div class="d-flex flex-column flex-items-center flex-justify-center">
    <h1>vue-primer</h1>
    <div class="d-flex flex-column" style="gap: 16px;">
      <div>
        <ActionListItem>ActionListItem</ActionListItem>
      </div>
      <div>
        <Button>Button</Button>
      </div>
      <div>
        <button @click="isShowingDialog = !isShowingDialog">Show Dialog</button>
        <Dialog v-model="isShowingDialog">
          <h2>Dialog</h2>
        </Dialog>
      </div>
      <div>
        <Dropdown>
          <template #text>Dropdown</template>
          Dropdown contents
        </Dropdown>
      </div>
      <div>
        <Octicon name="mark-github" />
      </div>
      <div>
        <Spinner :size="32" />
      </div>
      <div>
        <button @click="isShowingToast = !isShowingToast">Show Toast</button>
        <Toast v-model="isShowingToast">Toast</Toast>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@primer/css/index.scss';
@import '@primer/octicons/index.scss';
</style>
