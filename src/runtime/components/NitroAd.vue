<script setup lang="ts">
import type { UseNitropayOptions } from '../composables/nitropay'
import { useNitropay, ref } from '#imports'

const props = defineProps<{
  config: UseNitropayOptions
}>()

const adEl = ref()

const {
  createAd,
  refreshAd,
} = useNitropay({
  el: adEl,
  ...props.config,
})

defineExpose({ createAd, refreshAd })
</script>

<template>
  <div :id="props.config.id" ref="adEl" />
</template>
