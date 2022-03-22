<script setup lang="ts">
    import { newCoin, newUser } from '@/common/mockups'
    import { Coin } from '@/types/coin'
    import { User } from '@/types/user'
    import Title from '../typography/Title.vue'
    import { balancedCurrency } from '@/common/numbers'
    import LightTable from '../LightTable.vue'
    import IconButton from '../buttons/IconButton.vue'
    import InfoCard from '../cards/InfoCard.vue'
    import { TableColumn } from '@/types/table'

    const btsg:Coin = newCoin("BTSG")
    const user:User = newUser()
    user.coins = user.coins.map((c,i) => (Object.assign(c, {index:i+1})))
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
            field: (row:any) => row.coin.symbol,
            sortable: false,
            format: (val:any) => `${val}`,
        },
        { name: 'available', label: 'Available assets', field: 'total', sortable: true, format: (val:any) => `${balancedCurrency(val)} $`},
        { name: 'bonded', label: 'Available tokens', field: 'bonded', sortable: true, format: (val:any, row:any) => `${balancedCurrency(val)} ${row.coin.symbol}`},
        { name: 'arrows', label: '', field: '', sortable: false},
    ]
</script>

<template>
    <Title class="q-mb-36">Assets</Title>
    <div class="row font-weight-medium q-col-gutter-lg q-mb-75">
        <div class="col-2">
            <InfoCard header="Total assets">
                {{balancedCurrency(user.totalAssets)}} $
            </InfoCard>
        </div>
        <div class="col-2">
            <InfoCard header="Available assets">
                    {{balancedCurrency(user.totalAssets - user.bondedAssets)}} $
            </InfoCard>
        </div>
        <div class="col-2">
            <InfoCard header="Bonded assets">
                    {{balancedCurrency(user.bondedAssets)}} $
            </InfoCard>
        </div>
        <div class="col-2">
            <InfoCard header="BTSG price">
                    {{balancedCurrency(btsg.price)}} $
            </InfoCard>
        </div>
    </div>
    <p class="q-mb-21 fs-18 font-weight-medium">Tokens</p>
    <div>
        <LightTable :columns="columns" :rows="user.coins">
            <template v-slot:body-cell-token="props">
                <q-td :props="props">
                    <div class="row items-center">
                        <q-avatar
                            size="sm"
                            class="q-mr-22">
                            <img :src="props.row.coin.iconUrl" alt="">                   
                        </q-avatar>
                        <p class="text-weight-medium fs-14">
                            {{props.row.coin.name}}
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
                    <span class="opacity-40 fs-12">
                        {{props.value}}
                    </span>
                </q-td>
            </template>
            <template v-slot:body-cell-available="props">
                <q-td :props="props">
                    <p :class="(props.row.total > 0 ? '' : 'opacity-40')">
                        {{props.value}}
                    </p>
                </q-td>
            </template>
            <template v-slot:body-cell-bonded="props">
                <q-td :props="props">
                    <p :class="(props.row.bonded > 0 ? '' : 'opacity-40')">
                        {{props.value}}
                    </p>
                </q-td>
            </template>
            <template v-slot:body-cell-arrows="props">
                <q-td :props="props">
                    <div>
                        <IconButton icon="arrow-up" height="12" width="14" class="q-mr-42 fs-12 s-20"></IconButton>
                        <IconButton icon="arrow-up" height="12" width="14" class="rotate-180 fs-12 s-20"></IconButton>
                    </div>
                </q-td>
            </template>
        </LightTable>
    </div>
</template>