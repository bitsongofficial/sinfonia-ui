<script setup lang="ts">
	import Title from '@/components/typography/Title.vue'
	import LightTable from '@/components/LightTable.vue'
	import IconButton from '@/components/buttons/IconButton.vue'
	import InfoCard from '@/components/cards/InfoCard.vue'
	import TransferModal from '@/components/modals/TransferModal.vue'
	import { TableColumn } from '@/types/table'
	import { balancedCurrency } from '@/common/numbers'
	import { ref } from 'vue'
	import { TokenBalance } from '@/types'
    import { resolveIcon } from '@/common/resolvers'
    import useBank from '@/store/bank'
	import usePrices from '@/store/prices'

	const bankStore = useBank()
	const pricesStore = usePrices()
	const openTransferDialog = ref(false)
	const transferFrom = ref<TokenBalance>()

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
        { name: 'available', label: 'Available', field: 'total', sortable: true },
        { name: 'quantity', label: 'QTY', field: 'bonded', sortable: true },
        { name: 'arrows', label: '', field: '', sortable: false },
        { name: 'expandIcon', label: '', field: '', sortable: false },
	]

	const openTransfer = (from: TokenBalance) => {
		transferFrom.value = from
		openTransferDialog.value = true
	}
</script>

<template>
    <Title class="q-mb-36">Assets</Title>
    <div class="row text-weight-medium q-col-gutter-lg q-mb-75">
        <div class="col-2">
			<InfoCard header="Total assets">
				{{ balancedCurrency(bankStore.total) }} $
			</InfoCard>
		</div>
		<div class="col-2">
			<InfoCard header="Available assets">
				{{ balancedCurrency(bankStore.available) }} $
			</InfoCard>
		</div>
		<div class="col-2">
			<InfoCard header="Bonded assets">
				{{ balancedCurrency(bankStore.bonded) }} $
			</InfoCard>
		</div>
		<div class="col-2">
			<InfoCard header="BTSG price">
				{{ balancedCurrency(pricesStore.btsgPrice) }} $
			</InfoCard>
		</div>
	</div>
	<p class="q-mb-21 fs-18 text-weight-medium">Tokens</p>
	<div>
		<LightTable :columns="columns" :rows="bankStore.balances">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <span class="opacity-40">
                            {{ props.rowIndex + 1 }}
                        </span>
                    </q-td>
                    <q-td>
                        <div class="row items-center">
                            <q-avatar
                                size="sm"
                                class="q-mr-22">
                                <img :src="props.row.logos.default" :alt="props.row.name">                
                            </q-avatar>
                            <p class="text-weight-medium fs-14">
                                {{ props.row.name }}
                            </p>
                        </div>
                    </q-td>
                    <q-td>
                        <p class="text-white text-center">{{ props.row.fantoken ? '$' : '' }}{{ props.row.symbol }}</p>
                    </q-td>
                    <q-td>
                        <div class="flex justify-center">
                            <q-avatar
                                v-for="(chain, i) in props.row.chains"
								                :key="i"
                                size="20px"
                                :class="i > 0 ? 'q-ml-8' : ''"
                            >
								              <img :src="chain.logos.default" />
                            </q-avatar>
                        </div>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (props.row.available > 0 ? '' : 'opacity-40')">
                            {{ props.row.available ? balancedCurrency(props.row.available) : '-' }}
                        </p>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (props.row.bonded > 0 ? '' : 'opacity-40')">
                            {{ props.row.bonded ? balancedCurrency(props.row.bonded) : '-' }}
                        </p>
                    </q-td>
                    <q-td>
                        <div class="opacity-40 hover:opacity-100 cursor-pointer fs-15 text-right" @click="openTransfer(props.row)">
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
                                    {{ chain.name }}
                                </p>
								<q-avatar size="20px" class="q-ml-10">
									<img :src="chain.logos.default" />
								</q-avatar>
                            </div>
                        </div>
                    </q-td>
                    <q-td>
                    </q-td>
                    <q-td>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (chain.total > 0 ? '' : 'opacity-40')">
                            {{ chain.available ? balancedCurrency(chain.available) : '-' }}
                        </p>
                    </q-td>
                    <q-td>
                        <p :class="'text-right ' + (chain.bonded > 0 ? '' : 'opacity-40')">
                            {{ chain.bonded ? balancedCurrency(chain.bonded) : '-' }}
                        </p>
                    </q-td>
                </q-tr>
            </template>
        </LightTable>
		<TransferModal
			v-model="openTransferDialog"
			:coin="transferFrom"
			v-if="transferFrom"
		/>
	</div>
</template>