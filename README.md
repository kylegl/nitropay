<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Nuxt Nitropay

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A [Nitropay](https://nitropay.com/) Ads module for nuxt

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ✨ &nbsp; One stop shop for setting up Nitropay on your site
- 📦 &nbsp; NitroAd.vue component
- 📦 &nbsp; useNitropay composable

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-nitropay
```

```js
// nuxt.config.ts

{
  modules: ['nuxt-nitropay'],

  nitropay: {
    siteId: '####'
    test: true, // optional, default=true in dev mode

  }
}
```


That's it! You can now use Nitropay ads in your Nuxt app ✨

## Usage

- NitroAd.vue component accepts a prop `config`. Config must have a unique ad `id` and optionally include any of nitropay's ad configuration options.

- The ad will load & refresh automatically. To trigger manually, the component exposes the 'refreshAd' & 'createAd' functions with [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose).

```html
<template>
  <div>
    <NitroAd :config="{
        id: 'home-leaderboard',
        refreshTime: 30,
        renderVisibleOnly: false,
        demo: true,
        sizes: [
          [
            '970',
            '90',
          ],
        ],
        report: {
          enabled: true,
          icon: true,
          wording: 'Report Ad',
          position: 'top-right',
        },
      }" />
  </div>
</template>
```

- Under the hood, the component uses the `useNitropay` composable. You can use the composable to create your own component.

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-nitropay/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-nitropay

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-nitropay.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-nitropay

[license-src]: https://img.shields.io/npm/l/nuxt-nitropay.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-nitropay

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
