<script setup lang="ts">
  import {RouterView} from "vue-router"
  import Header from '@/components/navigation/Header.vue'
  import SideMenu from '@/components/navigation/SideMenu.vue'
  import WalletAddress from '@/components/WalletAddress.vue'
  import Dex from '@/components/pages/Dex.vue'
</script>

<template>
  <div class="min-h-window-height window-width q-pt-70 q-pb-60 column">
    <div class="container column col-grow">
      <Header></Header>
      <div class="row col-grow q-col-gutter-x-xl">
        <div class="col-4 col-lg-3 col-xl-2 self-end absolute-sm left-0 bottom-0">
          <div class="column justify-end">
            <div class="vertical-sm-absolute top-0 vertica-sm-window-height min-h-fit column justify-center">
              <SideMenu></SideMenu>
            </div>
            <div class="q-pt-lg w-fit">
              <p class="text-center fs-12 font-weight-medium opacity-30 q-mb-15">Price Data by CoinGecko</p>
              <WalletAddress></WalletAddress>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8 col-lg-9 col-xl-10">
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