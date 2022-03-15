<script setup lang="ts">
    import CardDark from '../cards/CardDark.vue'
    import SmallButton from '../buttons/SmallButton.vue'
    import Card from '../cards/Card.vue'
    import Title from '../typography/Title.vue'
    import { newUser, newUserCoin } from '@/common/mockups'
    import { UserCoinInfo } from '@/types/user'
    import { ref } from 'vue'

    let user = newUser()

    let coin1:UserCoinInfo = newUserCoin("BTSG", "Bitsong")
    let coin2:UserCoinInfo = newUserCoin("CLAY")

    const swapAmount = ref(0)
</script>
<template>
    <div class="row font-weight-medium">
        <div class="col-12 col-md-7">
            <Title class="q-mb-36">Swap Tokens</Title>
            <Card class="q-pa-36" transparency="5">
                <p class="fs-14 q-mb-20 opacity-30">Swap from</p>
                <CardDark>
                    <div class="flex justify-between">
                        <div class="flex grow-1 justify-between items-center q-py-12">
                            <div>
                                <q-input borderless v-model.number="swapAmount" class="fs-24 q-mb-4 text-white" />
                                <p class="fs-12 text-dark">{{swapAmount * coin1.coin.price}} $</p>
                            </div>
                            <div>
                                <SmallButton label="MAX"></SmallButton>
                            </div>
                        </div>
                        <div class="vertical-separator q-mx-28"></div>
                        <div class="flex grow-1 justify-between align-items q-py-12">
                            <div>
                                <p class="fs-14 q-mb-4">{{coin1.coin.name}}</p>
                                <p class="fs-12 text-dark">{{coin1.total}} {{coin1.coin.symbol}}</p>
                            </div>
                            <div>
                                <SmallButton label="MAX"></SmallButton>
                            </div>
                        </div>
                    </div>
                </CardDark>
            </Card>
        </div>
        <div class="col-12 col-md-5">
            
        </div>
    </div>
</template>