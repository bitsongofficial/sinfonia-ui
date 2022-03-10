<script setup lang="ts">
  import Header from '@/components/navigation/Header.vue';
  import SideMenu from '@/components/navigation/SideMenu.vue';
  import WalletAddress from '@/components/WalletAddress.vue';
  import Dex from '@/components/pages/Dex.vue';
</script>

<template>
  <div class="bg-primary-dark min-h-window-height window-width q-pa-xl column">
    <div class="container column col-grow">
      <Header></Header>
      <div class="row col-grow q-col-gutter-x-xl">
        <div class="col-4 col-lg-2 self-end">
          <div class="column justify-end">
            <div class="vertical-sm-absolute top-0 vertica-sm-window-height min-h-fit column justify-center">
              <SideMenu></SideMenu>
            </div>
            <div class="q-pt-lg w-fit">
              <p class="text-center">Price Data by CoinGecko</p>
              <WalletAddress></WalletAddress>
            </div>
          </div>
        </div>
        <div class="col-8 col-lg-10">
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