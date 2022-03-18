<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers';
import { computed } from 'vue'

    const props = defineProps<
    {
        modelValue?: any,
        options?: string[],
        color?: string,
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

    const textClass = computed(() =>
    {
        return "text-" + (props.color ? props.color : "white")
    })
</script>

<template>
    <q-select 
        borderless v-model="model"
        :options="options"
        :class="textClass + ' w-fit'"
        :popup-content-class="textClass"
        :dropdown-icon="resolveIcon('dropdown', 11, 7)">
    </q-select>
</template>