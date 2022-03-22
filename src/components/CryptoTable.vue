<script setup lang="ts">
    import { computed } from 'vue'
    import LightTable from './LightTable.vue'
    import {TableColumn} from "@/types/table"
    const props = defineProps
    <{
        rows: any[],
        columns: TableColumn[],
    }>()
    const actualRows = computed(() =>
    {
        return props.rows.map((r:any, i:number) => (Object.assign({index: i+1}, r)))
    })
</script>

<template>
    <LightTable
        :rows="actualRows"
        :columns="columns"
        >
        <template v-slot:body-cell-symbol="slotProps">
            <q-td :props="slotProps">
                <span class="opacity-40 fs-10">
                    {{slotProps.value}}
                </span>
            </q-td>
        </template>
        <template v-slot:body-cell-token="slotProps">
            <q-td :props="slotProps">
                <div class="row items-center no-wrap">
                    <q-avatar
                        size="sm"
                        class="q-mr-22">
                        <img :src="slotProps.row.iconUrl" alt="">                   
                    </q-avatar>
                    <p class="text-weight-medium">
                        {{slotProps.row.name}}
                    </p>
                </div>
            </q-td>
        </template>
        <template v-slot:body-cell-index="props">
            <q-td :props="props">
                <span class="opacity-40">
                    {{props.value}}
                </span>
            </q-td>
        </template>
        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
        </template>
    </LightTable>
</template>