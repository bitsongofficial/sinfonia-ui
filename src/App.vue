<script setup lang="ts">
  import Header from '@/components/navigation/Header.vue';
  import SideMenu from '@/components/navigation/SideMenu.vue';
  import WalletAddress from '@/components/WalletAddress.vue';
  import Dex from '@/components/pages/Dex.vue';
</script>

<template>
  <div class="bg-primary-dark window-height window-width q-pa-xl">
    <div class="container column full-height">
      <Header></Header>
      <div class="row col-grow q-col-gutter-x-xl">
        <div class="col-2 full-height">
          <div class="column justify-end full-height">
            <div class="absolute top-0 window-height min-h-fit column justify-center">
              <SideMenu></SideMenu>
            </div>
            <div>
              <p class="text-center">Price Data by CoinGecko</p>
              <WalletAddress></WalletAddress>
            </div>
          </div>
        </div>
        <div class="col-10">
          <Dex></Dex>
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