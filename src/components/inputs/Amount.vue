<script setup lang="ts">
    import { computed } from 'vue'
    import SmallButton from '../buttons/SmallButton.vue';

    const props = defineProps<{
        modelValue: number | null,
        max?: number,
    }>()
    const emit = defineEmits<{
        (e:'update:modelValue', value:number | null): void,
    }>()
    const value = computed({
        get():(number | null) {
            return props.modelValue
        },
        set(value: number | null) {
            if(props.max != undefined && value)
            {
                emit('update:modelValue', (value > props.max ? props.max : value))
                return
            }
            emit('update:modelValue', value)
        }
    })
</script>

<template>
    <div class="relative-position flex justify-between q-px-20 q-py-10 no-wrap items-center">
        <div class="absolute-full rounded-20 bg-primary-darker opacity-50 ">

        </div>
        <q-input borderless v-model="value" class="fs-32 q-mb-0 text-white" />
        <div v-if="max != undefined">
            <SmallButton label="max" xs @click="value = max as number"></SmallButton>
        </div>
    </div>
</template>