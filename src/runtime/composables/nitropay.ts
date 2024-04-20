import type { ComputedRefWithControl, MaybeElementRef, VueInstance } from '@vueuse/core'
import { useCurrentElement } from '@vueuse/core'
import { nextTick, ref, watchEffect, onMounted, useRuntimeConfig } from '#imports'

// ref: https://api-docs.nitropay.com/interfaces/_options_.nitroadoptions.html
interface NitroAdsOptions {
  anchor?: 'bottom' | 'top'
  anchorBgColor?: string
  anchorPersistClose?: boolean
  className?: string
  contentRating?: string
  delayLoading?: boolean
  demo?: boolean
  floating?: {
    position: 'left' | 'right'
    reduceMobileSize?: boolean
  }
  frequencyCap?: number
  geoAllow?: string[]
  geoDeny?: string[]
  interstitial?: {
    triggers: Partial<Record<'unhideWIndow', boolean>>
  }
  keywords?: string
  mediaQuery?: string
  outstream?: 'auto' | 'never'
  pageInterval?: number
  rail?: string
  railCollisionWhitelist?: string[]
  railDistance?: number
  railOffsetBottom?: number
  railOffsetTop?: number
  railSpacing?: number
  railStack?: boolean
  refreshDisabled?: string[]
  refreshLimit?: number
  refreshTime?: number
  refreshVisibleOnly?: boolean
  renderVisibleOnly?: boolean
  report?: {
    enabled?: boolean
    icon?: boolean
    wording?: string
    position:
      | 'bottom-center'
      | 'bottom-left'
      | 'bottom-left-side'
      | 'bottom-right'
      | 'bottom-right-side'
      | 'top-center'
      | 'top-left'
      | 'top-left-side'
      | 'top-right'
      | 'top-right-side'
  }
  rewarded?: {
    accept?: string
    decline?: string
    prompt?: string
    rewardGranted: () => void
    rewardRejected: () => void
    wait?: string
  }
  sizes?: Array<[string, string]>
  skipBidders?: string[]
  stickStackLimit?: number
  stickStackOffset?: number
  stickyStackResizable?: boolean
  stickStackSpace?: number
  targeting?: object
  title?: string
  video?: {
    float: 'left' | 'right'
    hidePlaylist: boolean
    initialDelay: number
    interval: number
    mobile: 'compact' | 'full'
    persistMinimizeTime: number
  }
  visibleMargin?: number
}

export interface NitropayWindow extends Window {
  nitroAds: {
    createAd: (id: string, options: NitroAdsOptions) => void
  }
}

// eslint-disable-next-line import/no-mutable-exports
export declare let window: NitropayWindow

export interface UseNitropayOptions extends NitroAdsOptions {
  el?: MaybeElementRef<VueInstance>
  id: string
  immediate?: boolean
}

export function useNitropay(options: UseNitropayOptions) {
  const {
    el,
    id,
    immediate = true,
    ...nitroOptions
  } = options

  const { test } = useRuntimeConfig().public.nitropay

  if (test)
    nitroOptions.demo = true

  const adEl = useCurrentElement(el) as ComputedRefWithControl<HTMLElement | SVGElement>
  const show = ref(false)

  async function refreshAd() {
    if (import.meta.server)
      return

    show.value = false

    await nextTick()
    loadAd()
  }

  async function loadAd() {
    show.value = true

    await nextTick()

    try {
      if (!window?.nitroAds)
        throw new Error('Nitro Ads is not loaded')

      if (!adEl.value)
        throw new Error('Nitro Ads element not found')

      if (adEl.value.innerHTML)
        return

      if (adEl.value?.getAttribute('id') !== id)
        adEl.value?.setAttribute('id', id)

      window.nitroAds.createAd(id, nitroOptions)
    }
    catch (err) {
      console.error(err)
    }
  }

  watchEffect(() => {
    if (!adEl.value || !adEl.value.isConnected)
      return

    if (show.value)
      adEl.value.innerHTML = ''
    else
      adEl.value.innerHTML = ' '
  })

  if (immediate)
    onMounted(() => loadAd())

  return {
    refreshAd,
    loadAd,
  }
}
