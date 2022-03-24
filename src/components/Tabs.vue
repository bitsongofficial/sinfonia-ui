<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers'
    import { ref } from 'vue'
    import InformativeTooltip from './tooltips/InformativeTooltip.vue'

    const props = defineProps<
    {
        options: {
            name: string,
            label?: string,
            tooltip?: string,
            icon?: {name: string, width: number, height: number},
            url?: string,
        }[]
    }>()

    const firstValidOption = props.options.find(o => (o.icon == undefined && o.url == undefined))

    const tab = ref(firstValidOption ? firstValidOption.name : null)

    const isTab = (name): boolean =>
    {
        return props.options.find(o => (o.name == name && (o.tooltip || o.url))) == undefined
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
                v-if="option.label && !option.url"
                :name="option.name"
                :label="option.label"
                class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0"
                content-class="q-py-0"
                />
            <a
                v-if="option.url"
                :href="option.url"
                target="_BLANK"
                class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0 hover:opacity-100"
            >
                {{option.label}}
            </a>
            <q-icon
                v-if="option.icon"
                :name="resolveIcon(option.icon.name, option.icon.width, option.icon.height)"
                class="opacity-40 w-fit q-mr-50 !flex-0 q-px-0 hover:opacity-100"
                content-class="q-py-0"
            >
                <InformativeTooltip
                    anchor="bottom right"
                    self="top left"
                    :offset="[17, -40]">
                    <p>
                        {{option.tooltip}}
                    </p>
                </InformativeTooltip>
            </q-icon>
        </template>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="bg-white-5 rounded-30 q-py-52 q-px-60">
        <template v-for="(_, slot) of $slots">
            <template v-if="isTab(slot)">
                <q-tab-panel :name="slot">
                    <slot :name="slot"></slot>
                </q-tab-panel>
            </template>
            <template v-else>
                
            </template>
        </template>
    </q-tab-panels>
</template>