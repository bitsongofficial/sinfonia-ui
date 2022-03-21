<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers';
import { onMounted, ref, useSlots } from 'vue'

    const props = defineProps<
    {
        options: {name: string, label?: string, icon?: {name: string, width: number, height: number}}[]
    }>()

    const tab = ref(props.options[0].name)
</script>

<template>
    <q-tabs
          v-model="tab"
          dense
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          class="q-mb-26 q-px-60"
        >
        <template v-for="option in options">
            <q-tab
                v-if="option.label"
                :name="option.name"
                :label="option.label"
                class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0"
                content-class="q-py-0"
                />
            <q-tab
                v-if="option.icon"
                :name="option.name"
                :icon="resolveIcon(option.icon.name, option.icon.width, option.icon.height)"
                class="opacity-40 w-fit q-mr-50 !flex-0 q-px-0"
                content-class="q-py-0"
                />
        </template>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="bg-white-5 rounded-30 q-py-52 q-px-60">
        <template v-for="(_, slot) of $slots">
            <q-tab-panel :name="slot">
                <slot :name="slot"></slot>
            </q-tab-panel>
        </template>
    </q-tab-panels>
</template>