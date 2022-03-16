<script setup lang="ts">
    import { computed } from 'vue'
    import LightTable from './LightTable.vue'
    const props = defineProps(['rows', 'columns'])
    const actualRows = computed(() =>
    {
        return props.rows.map((r:any, i:number) => (Object.assign({index: i+1}, r)))
    })
</script>

<template>
    <LightTable
        :rows="actualRows"
        :columns="props.columns"
        >
        <template v-slot:body-cell-symbol="props">
            <q-td :props="props">
                <span class="opacity-40 fs-10">
                    {{props.value}}
                </span>
            </q-td>
        </template>
        <template v-slot:body-cell-token="props">
            <q-td :props="props">
                <div class="row items-center">
                    <q-avatar
                        size="sm"
                        class="q-mr-22">
                        <img :src="props.row.iconUrl" alt="">                   
                    </q-avatar>
                    <p class="text-weight-medium">
                        {{props.row.name}}
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