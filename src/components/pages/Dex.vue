<script setup lang="ts">
    import { newCoin } from "@/common/mockups"
    import { balancedCurrency as currency, percentage } from "@/common/numbers"
    import { TableColumn } from "@/types/table"
    import CryptoTable from "../CryptoTable.vue"

    const columns: TableColumn[] = [
        {
            name: 'index',
            required: true,
            label: '',
            align: 'left',
            field: 'index',
        },
        { 
            name: 'token',
            align: 'left',
            label: 'Token',
            field: 'name',
            sortable: true
        },
        {
            name: 'symbol',
            align: 'left',
            label: '',
            field: 'symbol',
            sortable: false,
            format: (val:any) => `$${val}`,
        },
        { name: 'price', label: 'Price', field: 'price', sortable: true, format: (val:any) => `${currency(val)} $`},
        { name: 'marketcap', label: 'Market Cap', field: 'marketCap', sortable: true, format: (val:any) => `${currency(val)} $` },
        { name: 'volume24H', label: 'Volume 24H', field: 'volumeLastDay', sortable: true, format: (val:any) => `${currency(val)} $` },
        { name: 'lastDayGain', label: '24H', field: 'lastDayGain', sortable: true, format: (val:any) => `${percentage(val)}%` },
        { 
            name: 'chart',
            align: 'right',
            label: '',
            field: 'lastNDaysPrice',
            sortable: false,
        },
    ]

    let i = 0
    const rows = [
        newCoin("CLAY", "Adam Clay"),
        newCoin("FNTY", "Fonti"),
        newCoin("VBRN", "Vibranium"),
        newCoin("MCX", "Mace"),
        newCoin("CLAY", "Adam Clay"),
        newCoin("FNTY", "Fonti"),
        newCoin("VBRN", "Vibranium"),
        newCoin("MCX", "Mace"),
        newCoin("CLAY", "Adam Clay"),
    ]
</script>
<template>
    <h3 class="q-mb-xl fs-27">Dex</h3>
    <CryptoTable :columns="columns" :rows="rows">
        <template v-slot:body-cell-lastDayGain="props">
            <q-td :props="props">
                <p :class="(props.row.lastDayGain > 0 ? 'text-positive' : 'opacity-40')">
                    {{props.value}}
                </p>
            </q-td>
        </template>
        <template v-slot:body-cell-chart="props">
            <q-td :props="props">
                <img v-if="props.row.lastDayGain > 0" src="@/assets/images/chart_placeholder_active.png" alt="">
                <img v-else="props.row.lastDayGain > 0" src="@/assets/images/chart_placeholder.png" alt="">
            </q-td>
        </template>
    </CryptoTable>
</template>