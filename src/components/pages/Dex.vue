<script setup lang="ts">
import { newCoin } from "@/common/mockups";
import { balancedCurrency as currency, percentage } from "@/common/numbers"
import LightTable from '@/components/LightTable.vue'
    const columns = [
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
    <LightTable :columns="columns" :rows="rows">
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
        <template v-slot:body-cell-symbol="props">
            <q-td :props="props">
                <span class="opacity-40 fs-10">
                    {{props.value}}
                </span>
            </q-td>
        </template>
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
    </LightTable>
</template>