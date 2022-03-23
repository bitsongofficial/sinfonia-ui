<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers'
    import { shortenMiddle } from '@/common/strings';
    import { computed, ref } from 'vue'

    interface AddrressType {name: string, address: string}

    const props = defineProps<{
        addresses: AddrressType[],
        title?: string,
        modelValue: AddrressType | null,
    }>()

    const emit = defineEmits<{
        (e:'update:modelValue', value: AddrressType | null): void,
    }>()

    const value = computed({
        get():(AddrressType | null) {
            return props.modelValue
        },
        set(value: AddrressType | null) {
            emit('update:modelValue', value)
        }
    })
</script>

<template>
    <div class="rounded-20 select-border">
        <q-select
            v-model="value"
            :options="addresses"
            :dropdown-icon="resolveIcon('dropdown', 11, 7)"
            borderless
            class="text-white q-px-select-20"
            input-class="q-px-20 q-py-20"
            popup-content-class="rounded-20 q-px-10 q-py-0"
            :menu-offset="[0, 8]"
        >
            <template v-slot:option="{itemProps, opt}">
                <div v-bind="itemProps" class="text-white q-py-16 q-px-10 cursor-pointer">
                    <p class="fs-14 q-mb-2">
                        {{opt.name}}
                    </p>
                </div>
            </template>
            <template v-slot:selected-item="{ opt }">
                <div class="q-py-15">
                    <p class="fs-10 text-uppercase font-weight-medium opacity-40 q-mb-8">
                        {{title}}
                    </p>
                    <p class="fs-14 q-mb-2">
                        {{opt.name}}
                    </p>
                    <p class="fs-12 font-weight-medium opacity-40">
                        {{shortenMiddle(opt.address, 20)}}
                    </p>
                </div>
            </template>
        </q-select>
    </div>
</template>