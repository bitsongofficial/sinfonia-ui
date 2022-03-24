<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers';
import { onMounted, ref, useSlots } from 'vue'

    const props = defineProps<
    {
        options: {name: string, label?: string, tooltip?: string, icon?: {name: string, width: number, height: number}}[]
    }>()

    console.log(props.options)

    const firstValidOption = props.options.find(o => (o.icon == undefined))

    const tab = ref(firstValidOption ? firstValidOption.name : null)

    const isTooltip = (name): boolean =>
    {
        return props.options.find(o => (o.name == name && o.tooltip)) != undefined
    }
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
            <q-icon
                v-if="option.icon"
                :name="resolveIcon(option.icon.name, option.icon.width, option.icon.height)"
                class="opacity-40 w-fit q-mr-50 !flex-0 q-px-0 hover:opacity-100"
                content-class="q-py-0"
            >
                <q-tooltip
                    anchor="bottom right"
                    self="top left"
                    :offset="[17, -40]">
                    <div class="q-mb-10">
                        <q-icon size="12px" :name="resolveIcon(option.icon.name, option.icon.width, option.icon.height)"></q-icon>
                    </div>
                    <p>
                        {{option.tooltip}}
                    </p>
                </q-tooltip>
            </q-icon>
        </template>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="bg-white-5 rounded-30 q-py-52 q-px-60">
        <template v-for="(_, slot) of $slots">
            <template v-if="!isTooltip(slot)">
                <q-tab-panel :name="slot">
                    <slot :name="slot"></slot>
                </q-tab-panel>
            </template>
            <template v-else>
                
            </template>
        </template>
    </q-tab-panels>
</template>