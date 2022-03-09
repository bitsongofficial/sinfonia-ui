<script setup lang="ts">
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
            align: 'center',
            label: 'Token',
            field: 'name',
            sortable: true
        },
        { 
            name: 'icon',
            align: 'center',
            label: '',
            field: 'symbol',
            format: (val:any) => (`$${val}`),
            sortable: false,
        },
        { name: 'price', label: 'Price', field: 'price', sortable: true, format: (val:any) => `${val.toFixed(2)} $`},
        { name: 'marketcap', label: 'Market Cap', field: 'marketCap', format: (val:any) => `${val} $` },
        { name: 'volume24H', label: 'Volume 24H', field: 'volumeLastDay', format: (val:any) => `${val} $` },
        { name: 'lastDayGain', label: '24H', field: 'lastDayGain', format: (val:any) => `${val.toFixed(2)} %` },
    ]

    let i = 0
    const newCoin = (name: string, symbol: string) =>
    {
        i++
        return {
            index: i,
            name,
            symbol,
            coinIcon: "https://cdn.icon-icons.com/icons2/812/PNG/512/social_network_facebook_icon-icons.com_66156.png",
            price: Math.random() * 1.5,
            marketCap: Math.random() * 15000000000,
            volumeLastDay: Math.random() * 60000000,
            lastDayGain: Math.random() * 10,
        }
    }

    const rows = [
        newCoin("Adam Clay", "CLAY"),
        newCoin("Fonti", "FNTY"),
        newCoin("Vibranium", "VBRN"),
        newCoin("Mace", "MCX"),
        newCoin("Adam Clay", "CLAY"),
        newCoin("Fonti", "FNTY"),
        newCoin("Vibranium", "VBRN"),
        newCoin("Mace", "MCX"),
        newCoin("Adam Clay", "CLAY"),
    ]
</script>
<template>
    <h3 class="q-mb-xl">Dex</h3>
    <q-table
      row-key="index"
      :rows="rows"
      :columns="columns"
    />
</template>