<script setup lang="ts">import { computed } from 'vue';

    const props = defineProps<
    {
        modelValue?: any,
    }>()
    const emit = defineEmits<{
        (e:'update:modelValue', value:any): void,
    }>()
    const model = computed({
        get():any {
            return props.modelValue
        },
        set(value: any) {
            emit('update:modelValue', value)
        }
    })
</script>

<template>
    <q-dialog v-model="model">
        <div class="rounded-20 bg-dark-lighter shadow-20-alt blur-60 q-px-34 q-py-30">
            <slot></slot>
        </div>
    </q-dialog>
</template>