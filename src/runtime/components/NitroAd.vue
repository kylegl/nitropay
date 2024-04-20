<script setup lang="ts">
import { useNitropay, ref } from '#imports'
// import type { UseNitropayOptions } from '#imports'

const props = defineProps<{
  config: Parameters<typeof useNitropay>[0]
}>()

const adEl = ref()

const {
  loadAd,
  refreshAd,
} = useNitropay({
  el: adEl,
  ...props.config,
})

defineExpose({ loadAd, refreshAd })
</script>

<template>
  <div
    :id="props.config.id"
    ref="adEl"
  />
</template>
