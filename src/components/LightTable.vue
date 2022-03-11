
<script setup lang="ts">
    const props = defineProps(['rows', 'columns'])
</script>
<template>
    <q-table
      row-key="index"
      :rows="props.rows"
      :columns="props.columns"
    >
        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="fs-12 text-uppercase text-weight-medium transactions-table-head-row"
                >
                    {{ col.label }}
                </q-th>
            </q-tr>
        </template>
        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
        </template>
    </q-table>
</template>