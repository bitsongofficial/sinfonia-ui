<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from '@/components/navigation/Header.vue'
  import SideMenu from '@/components/navigation/SideMenu.vue'
  import WalletAddress from '@/components/WalletAddress.vue'
  import useBootstrap from '@/hooks/useBootstrap'

  const { bootstrap } = useBootstrap()

  bootstrap()

  
</script>

<template>
  <div class="min-h-window-height q-pt-70 q-pb-60 column">
    <div class="container column col-grow">
      <Header></Header>
      <div class="flex col-grow q-col-gutter-x-xl">
        <div class="w-xs-1/3 w-sm-1/4 w-md-1/6 self-end absolute-xs left-0 bottom-0">
          <div class="column justify-end">
            <div class="vertical-sm-fixed q-mt-vsm-40 no-pointer-events top-0 vertical-sm-window-height min-h-fit column justify-center">
              <SideMenu class="all-pointer-events"></SideMenu>
            </div>
            <div class="vertical-sm-fixed no-pointer-events bottom-0 q-mb-40 q-pt-lg w-fit">
              <p class="text-center fs-12 text-weight-medium opacity-30 q-mb-15">Price Data by CoinGecko</p>
              <WalletAddress class="all-pointer-events"></WalletAddress>
            </div>
          </div>
        </div>
        <div class="w-xs-2/3 w-sm-3/4 w-md-5/6 q-pt-74">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  color: white;
}
</style>