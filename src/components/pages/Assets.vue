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
    import { resolveIcon } from '@/common/resolvers'

    const btsg:Coin = newCoin("BTSG")
    const user:User = newUser()
    user.coins = user.coins.map((c,i) => (Object.assign(c, {index:i+1, chains: [Math.random() > 0.5 ? 'bitsong' : 'osmosis']})))
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
            align: 'center',
            label: 'Symbol',
            field: (row:any) => row.coin.symbol,
            sortable: false,
            format: (val:any) => `${val}`,
        },
        {
            name: 'chain',
            align: 'center',
            label: 'Chain',
            field: 'chains',
            sortable: false,
        },
        { name: 'available', label: 'Available', field: 'total', sortable: true, format: (val:any) => `${balancedCurrency(val)} $`},
        { name: 'quantity', label: 'QTY', field: 'bonded', sortable: true, format: (val:any, row:any) => `${balancedCurrency(val)} ${row.coin.symbol}`},
        { name: 'arrows', label: '', field: '', sortable: false},
        { name: 'expandIcon', label: '', field: '', sortable: false},
    ]
</script>

<template>
    <Title class="q-mb-36">Assets</Title>
    <div class="row text-weight-medium q-col-gutter-lg q-mb-75">
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
    <p class="q-mb-21 fs-18 text-weight-medium">Tokens</p>
    <div>
        <LightTable :columns="columns" :rows="user.coins">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <span class="opacity-40">
                            {{props.row.index}}
                        </span>
                    </q-td>
                    <q-td>
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
                    <q-td>
                        <p class="text-white text-center">{{props.row.coin.symbol}}</p>
                    </q-td>
                    <q-td>
                        <div class="flex justify-center">
                            <q-icon
                                v-for="(chain, i) in props.row.chains"
                                :name="resolveIcon(chain, 20, 20)"
                                size="20px"
                                :class="i > 0 ? 'q-ml-8' : ''"
                            >
                            </q-icon>
                        </div>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (props.row.total > 0 ? '' : 'opacity-40')">
                            {{balancedCurrency(props.row.total - props.row.bonded)}} $
                        </p>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (props.row.bonded > 0 ? '' : 'opacity-40')">
                            {{balancedCurrency((props.row.total - props.row.bonded) * 100)}} {{props.row.coin.symbol}}
                        </p>
                    </q-td>
                    <q-td>
                        <div class="opacity-40 hover:opacity-100 cursor-pointer fs-15 text-right">
                            <q-icon :name="resolveIcon('swap', 21, 16)"></q-icon>
                        </div>
                    </q-td>
                    <q-td>
                        <div class="opacity-40 flex justify-end hover:opacity-100 cursor-pointer fs-12" @click="props.expand = !props.expand">
                            <div :class="'w-fit ' + (props.expand ? 'rotate-180' : '')">
                                <q-icon :name="resolveIcon('keyboard-arrow-down', 10, 6)"></q-icon>
                            </div>
                        </div>
                    </q-td>
                </q-tr>
                <q-tr v-for="chain in props.row.chains" v-show="props.expand" :props="props" no-hover>
                    <q-td>
                    </q-td>
                    <q-td>
                        <div class="flex justify-start q-ml-46">
                            <div class="text-capitalize text-primary-light flex items-center">
                                <p>
                                    {{chain}}
                                </p>
                                <q-icon :name="resolveIcon(chain, 20, 20)" class="q-ml-10"></q-icon>
                            </div>
                        </div>
                    </q-td>
                    <q-td>
                    </q-td>
                    <q-td>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (props.row.total > 0 ? '' : 'opacity-40')">
                            {{balancedCurrency(props.row.total - props.row.bonded)}} $
                        </p>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (props.row.bonded > 0 ? '' : 'opacity-40')">
                            {{balancedCurrency((props.row.total - props.row.bonded) * 100)}} {{props.row.coin.symbol}}
                        </p>
                    </q-td>
                </q-tr>
            </template>
        </LightTable>
    </div>
</template>