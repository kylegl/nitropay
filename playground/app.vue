<template>
  <div>
    <NitroAd :config="{
      id: 'ad-banner',
      refreshTime: 30,
      renderVisibleOnly: true,
      delayLoading: true,
      report: {
        enabled: true,
        icon: true,
        wording: 'Report Ad',
        position: 'top-right',
      },
    }">
      <div>Ads keep this site going. Consider turning ad blocker off.</div>
    </NitroAd>
  </div>
</template>
