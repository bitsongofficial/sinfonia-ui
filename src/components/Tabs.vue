<script setup lang="ts">
    import { onMounted, ref, useSlots } from 'vue'

    const props = defineProps<
    {
        options: {name: string, label: string}[]
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
                :name="option.name"
                :label="option.label"
                class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0"
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