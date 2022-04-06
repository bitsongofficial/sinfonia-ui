<script setup lang="ts">
  import { balancedCurrency, gtnZero, isNaN } from '@/common'
  import { validateRules } from '@/common/inputs'
  import { TokenBalance } from '@/types'
  import { ValidationRule } from 'quasar'
  import { computed, ref } from 'vue'
  import CardDark from '../cards/CardDark.vue'
  import SmallButton from '../buttons/SmallButton.vue'
  import CoinSelect from './CoinSelect.vue'

  const props = defineProps<{
    modelValue: string,
    coin: TokenBalance | null,
    options: TokenBalance[],
    swapAmountFiat?: string,
    showInput?: boolean,
    showMax?: boolean,
	  rules?: ValidationRule<any>[] | undefined,
  }>()

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | undefined): void
    (e: "errorStatusChange", value: boolean): void
    (e: "maxClick"): void
  }>()

  const errorMessage = ref("")
  const hasError = computed(() => errorMessage.value != "")

  const validate = (val = value.value) =>
  {
    validateRules(props.rules, val, errorMessage)
  }

  const value = computed<string | undefined>({
    get() {
      return props.modelValue
    },
    set(value) {
      const prevError = hasError.value
      validate(value)
      emit('errorStatusChange', hasError.value)
      if(value == '' || (value && !isNaN(value) && gtnZero(value))) emit("update:modelValue", value)
    },
  })

  defineExpose(
    {
      validate
    }
  )
</script>
<template>
  <div>
    <CardDark :class="(hasError ? 'border-primary ' : '' ) + 'light:bg-white/50 light:shadow-none'">
      <div class="flex justify-between no-wrap">
        <div class="flex-1 flex justify-between items-center q-py-6 no-wrap">
          <div class="q-mr-10">
            <q-input
              borderless
              v-model="value"
              hide-bottom-space
              class="fs-24 q-mb-0 text-white"
              :rules="rules"
            />
            <p v-if="swapAmountFiat && coin" class="fs-12 text-dark text-no-wrap">
              {{ balancedCurrency(swapAmountFiat) }} $
            </p>
          </div>
          <div v-if="showMax">
            <SmallButton xs label="MAX" @click="$emit('maxClick')"></SmallButton>
          </div>
        </div>
        <div class="vertical-separator q-mx-28"></div>
        <div class="flex-1">
          <CoinSelect
            v-model="coin"
            :options="options"
            class="q-mx--30"
          ></CoinSelect>
        </div>
      </div>
    </CardDark>
    <p v-if="hasError" class="text-primary q-mt-8">
      {{errorMessage}}
    </p>    
  </div>
</template>