<script lang="ts" setup>
  import useSettings from '@/store/settings'
  import { useQuasar } from 'quasar'
  import { computed } from 'vue'
  const $q = useQuasar()
  const settingsStore = useSettings()

  const lightMode = computed({
    get() {
      return !$q.dark.isActive
    },
    set(value: boolean) {
      $q.dark.set(!value)
      settingsStore.setDarkMode(!value)
    },
  })
</script>

<template>
  <q-toggle
    v-model="lightMode"
    color="white"
    class="dark-mode-toggle q-mr-20 light:inner:shadow-none"
  />
</template>