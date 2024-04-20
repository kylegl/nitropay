import { addComponent, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

interface ModuleOptions {
  siteId: string
  test?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'nitropay' },
  defaults: nuxt => ({
    siteId: 'test',
    test: nuxt.options.dev && (process.env.NODE_ENV !== 'production'),
  }),
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const head = nuxt.options.app.head
    head.script = head.script ?? []

    const nitroLoadAdScript = `window.nitroAds = window.nitroAds || { createAd: function () { return new Promise(e => { window.nitroAds.queue.push(["createAd", arguments, e]) }) }, addUserToken: function () { window.nitroAds.queue.push(["addUserToken", arguments]) }, queue: [] };`

    head.script.push({
      'hid': 'nitropay-load-ad-script',
      'defer': true,
      'data-cfasync': 'false',
      'innerHTML': nitroLoadAdScript,
    })

    head.script.push({
      'hid': 'nitropay-script',
      'defer': true,
      'data-cfasync': 'false',
      'async': true,
      'src': `https://s.nitropay.com/ads-${options.siteId}.js`,
    })

    addImports({
      name: 'useNitropay',
      as: 'useNitropay',
      from: resolve('runtime/composables/nitropay'),
    })

    addComponent({
      name: 'NitroAd',
      filePath: resolve('runtime/components/NitroAd.vue'),
    })

    nuxt.options.runtimeConfig.public.nitropay = defu(
      nuxt.options.runtimeConfig.public.nitropay,
      options,
    )
  },
})
