# vue-primer

## Usage

1. `npm install @mismith/vue-primer @primer/css @primer/octicons`
2. In `App.vue`: ```
    <style lang="scss">
    @import '@primer/css/index.scss';
    @import '@primer/octicons/index.scss';
    </style>
    ```
3. In any Vue component files, e.g.: ```
    <script lang="ts">
        import { Button } from '@mismith/vue-primer'
        // or
        import Button from '@mismith/vue-primer/components/Button.vue'
    </script>
    ```
