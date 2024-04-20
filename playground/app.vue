<template>
  <div>
    <NitroAd
      :config="{
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
      }"
    />
  </div>
</template>
