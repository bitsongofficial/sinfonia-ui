<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterView, RouterLink } from "vue-router"
  import Logo from "@/components/Logo.vue"
  import { menuItems } from '@/configs/routes'
  import { resolveIcon } from '@/common/resolvers'

  const rightDrawerOpen = ref(false)

  const toggleRightDrawer = () =>
  {
    rightDrawerOpen.value = !rightDrawerOpen.value
  }
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-transparent text-white container">
      <q-toolbar class="flex justify-between q-pt-40 q-px-0">
        <RouterLink to="/fantokens">
          <Logo></Logo>
        </RouterLink>

        <q-btn dense flat round :icon="resolveIcon('menu', 20, 14)" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" class="bg-primary-dark">
       <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuItems" :key="index">
              <q-separator :key="'sep' + index" v-if="index > 0" />
              <RouterLink
                v-if="!menuItem.isLink"
                :to="menuItem.path"                 
              >
                <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple class="flex justify-between items-center">
                  <q-item-section>
                    {{ menuItem.label }}
                  </q-item-section>
                  <q-item-section avatar class="flex justify-end">
                    <q-icon :name="resolveIcon(menuItem.icon.name, menuItem.icon.width, menuItem.icon.height)" />
                  </q-item-section>
                </q-item>
              </RouterLink>
            </template>
          </q-list>
        </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>