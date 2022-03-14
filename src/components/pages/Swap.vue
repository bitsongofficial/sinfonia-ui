<script setup lang="ts">
import CardDark from '../cards/CardDark.vue';
import SmallButton from '../buttons/SmallButton.vue';
import Card from '../cards/Card.vue';
</script>
<template>
    <div class="row font-weight-medium">
        <div class="col-12 col-md-7">
            <Title class="q-mb-36 opacity-30">Swap Tokens</Title>
            <Card class="q-pa-36">
                <p class="fs-14 q-mb-20">Swap from</p>
                <CardDark>
                    <div class="flex justify-between">
                        <div class="flex justify-between align-items">
                            <div>
                                <p class="fs-24 q-mb-2">100.34</p>
                                <p class="fs-12 text-dark">0.00 $</p>
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